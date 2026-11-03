// 線上判題：把程式碼送到 Compiler Explorer（godbolt.org）用 g++ 編譯執行，
// 輸出經 normalize() 後做 SHA-256，與 problems.js 的 hash 比對。全部 AC → +XP。
(function () {
  const PROBLEMS = window.PROBLEMS || {};
  const API = "https://godbolt.org/api/compiler/g132/compile"; // x86-64 gcc 13.2
  const STARTER = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    return 0;
}
`;
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  // 必須與 tools/make_tests.py 的 normalize() 完全一致
  function normalize(text) {
    const lines = text.replace(/\r\n/g, "\n").split("\n").map((l) => l.replace(/\s+$/, ""));
    while (lines.length && lines[lines.length - 1] === "") lines.pop();
    return lines.join("\n");
  }
  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
  const lines = (arr) => (arr || []).map((x) => x.text).join("\n");

  async function runOne(source, stdin) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        source,
        lang: "c++",
        options: {
          userArguments: "-O2 -std=c++17",
          executeParameters: { args: [], stdin },
          compilerOptions: { executorRequest: true },
          filters: { execute: true },
          tools: [],
          libraries: [],
        },
        allowStoreCodeDebug: false,
      }),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const r = await res.json();
    const build = r.buildResult || {};
    if (build.code && build.code !== 0) return { verdict: "CE", log: stripAnsi(lines(build.stderr)) };
    if (r.timedOut) return { verdict: "TLE" };
    if (r.code !== 0) return { verdict: "RE", log: stripAnsi(lines(r.stderr)) || `exit code ${r.code}` };
    return { verdict: "OK", stdout: lines(r.stdout) };
  }

  function mount(el) {
    const id = el.dataset.problem;
    const P = PROBLEMS[id];
    if (!P) { el.textContent = `找不到題目 ${id}`; return; }
    const draftKey = "algo-notes-draft-" + id;
    let draft = STARTER;
    try { draft = localStorage.getItem(draftKey) || STARTER; } catch {}

    el.innerHTML = `
      <div class="judge-head">⚔ ${esc(P.title)} <span class="xp-tag">+${P.xp} XP</span>
        <span class="clear" hidden>CLEAR</span></div>
      <p>${P.statement}</p>
      <h4>輸入格式</h4><p>${P.input}</p>
      <h4>輸出格式</h4><p>${P.output}</p>
      <div class="io">
        <div><h4>範例輸入</h4><pre>${esc(P.sample.input)}</pre></div>
        <div><h4>範例輸出</h4><pre>${esc(P.sample.output)}</pre></div>
      </div>
      <h4>你的程式（C++17）</h4>
      <textarea class="editor" spellcheck="false" aria-label="程式碼編輯區"></textarea>
      <div class="toolbar">
        <button class="btn submit" type="button">▶ 提交</button>
        <label class="btn ghost">上傳 .cpp<input type="file" accept=".cpp,.cc,.cxx,.txt"></label>
        <button class="btn ghost reset-code" type="button">重設</button>
      </div>
      <div class="verdicts"></div>
      <div class="judge-msg"></div>
      <pre class="judge-log" hidden></pre>
      <div class="judge-note">共 ${P.tests.length} 筆測資 · 由 Compiler Explorer 以 g++ 13 編譯，每筆約 1–3 秒</div>`;

    const editor = el.querySelector(".editor");
    const submit = el.querySelector(".submit");
    const file = el.querySelector("input[type=file]");
    const box = el.querySelector(".verdicts");
    const msg = el.querySelector(".judge-msg");
    const log = el.querySelector(".judge-log");
    const clear = el.querySelector(".clear");
    editor.value = draft;
    clear.hidden = !window.Progress?.isSolved(id);

    editor.addEventListener("input", () => { try { localStorage.setItem(draftKey, editor.value); } catch {} });
    editor.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const { selectionStart: s, selectionEnd: t } = editor;
      editor.setRangeText("    ", s, t, "end");
    });
    file.addEventListener("change", async () => {
      const f = file.files[0];
      if (!f) return;
      editor.value = await f.text();
      editor.dispatchEvent(new Event("input"));
      file.value = "";
    });
    el.querySelector(".reset-code").onclick = () => { editor.value = STARTER; editor.dispatchEvent(new Event("input")); };

    submit.onclick = async () => {
      const source = editor.value;
      if (!/\bmain\s*\(/.test(source)) { msg.className = "judge-msg bad"; msg.textContent = "找不到 main()，確認一下程式碼喔"; return; }
      submit.disabled = true;
      log.hidden = true;
      msg.className = "judge-msg";
      msg.textContent = "噗噗判題中…";
      box.innerHTML = P.tests.map((_, i) => `<span class="verdict">#${i + 1} ··</span>`).join("");
      const cells = [...box.children];
      let allAC = true;
      for (let i = 0; i < P.tests.length; i++) {
        cells[i].className = "verdict RUN";
        cells[i].textContent = `#${i + 1} RUN`;
        let v;
        try {
          const r = await runOne(source, P.tests[i].input);
          if (r.verdict === "OK") v = { verdict: (await sha256(normalize(r.stdout))) === P.tests[i].hash ? "AC" : "WA" };
          else v = r;
        } catch (err) {
          v = { verdict: "ERR", log: "無法連線到 Compiler Explorer：" + err.message };
        }
        cells[i].className = "verdict " + v.verdict;
        cells[i].textContent = `#${i + 1} ${v.verdict}`;
        if (v.verdict !== "AC") {
          allAC = false;
          if (v.log) { log.textContent = v.log; log.hidden = false; }
          for (let j = i + 1; j < P.tests.length; j++) cells[j].textContent = `#${j + 1} --`;
          const hint = { WA: "答案錯誤", CE: "編譯錯誤", RE: "執行時錯誤", TLE: "超過時間限制", ERR: "連線失敗，稍後再試" }[v.verdict];
          msg.className = "judge-msg bad";
          msg.textContent = `第 ${i + 1} 筆測資：${hint}${i === 0 && v.verdict === "WA" ? "（範例就沒過，先用範例在本機測試）" : ""}`;
          break;
        }
      }
      if (allAC) {
        const r = window.Progress ? window.Progress.solve(id) : { gained: 0 };
        msg.className = "judge-msg ok";
        msg.textContent = r.gained ? `全部通過！獲得 ${P.xp} XP` : "全部通過！（這題已經拿過經驗了）";
        clear.hidden = false;
      }
      submit.disabled = false;
    };
  }

  document.querySelectorAll(".judge[data-problem]").forEach(mount);
})();
