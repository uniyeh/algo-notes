// 全站共用行為：玩家側欄（等級／經驗條）、首頁卡片、講義目錄、上下篇、複製按鈕。
// 內容由 lessons.js / problems.js 驅動，新增講義不需修改此檔。
(function () {
  const LESSONS = window.LESSONS || [];
  const PROBLEMS = window.PROBLEMS || {};
  const SITE = window.SITE || {};
  const body = document.body;
  const root = body.dataset.root || "./";
  const LEVEL_NAME = { 1: "入門", 2: "進階", 3: "挑戰" };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const num = (id) => id.slice(0, 2);

  // ---------- 吉祥物：像素海豹「噗噗」（側躺，26×12） ----------
  const SEAL = [
    "..........................",
    "....OOOOO.................",
    "..OOGGGGGOO...............",
    ".OGGGGKWGGGO..............",
    ".OGGGGKKGGGGOOOOOOOO......",
    "OGPGGGGGGGGGGGGGGGGGOOO.OO",
    "NLLGGGGGGGGGGGGGGGGGGGGOGO",
    "OLLLGGGGGGGGGGGGGGGGGGGGO.",
    ".OLLLLGGGGGGGGGGGGGGGGOGGO",
    "..OOLLLLLLLLLLLLLLLLLO.OO.",
    "....OOGGGOOOOOOOOOOOO.....",
    "......OOO.................",
  ];
  const PAL = { O: "#1a2340", G: "#a9bfd6", L: "#e9f1f8", K: "#0b0d18", W: "#ffffff", P: "#ff9eb5", N: "#0b0d18" };
  function sealSVG() {
    let r = "";
    SEAL.forEach((row, y) => [...row].forEach((c, x) => {
      if (PAL[c]) r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${PAL[c]}"/>`;
    }));
    return `<svg viewBox="0 0 26 12" shape-rendering="crispEdges" aria-label="像素海豹噗噗">${r}</svg>`;
  }
  window.sealSVG = sealSVG;

  // ---------- 進度（存在瀏覽器 localStorage） ----------
  const KEY = "algo-notes-progress-v1";
  const XP_PER_LEVEL = 100;
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { solved: {} }; } catch { return { solved: {} }; }
  }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
  function stats(p = load()) {
    const xp = Object.keys(p.solved).reduce((s, id) => s + ((PROBLEMS[id] || {}).xp || 10), 0);
    return { xp, level: Math.floor(xp / XP_PER_LEVEL) + 1, inLevel: xp % XP_PER_LEVEL, solved: Object.keys(p.solved).length };
  }
  const problemsOf = (lessonId) => Object.keys(PROBLEMS).filter((k) => k === lessonId || k.startsWith(lessonId + "-"));
  const lessonDone = (lessonId, p = load()) => {
    const ps = problemsOf(lessonId);
    return ps.length > 0 && ps.every((k) => p.solved[k]);
  };
  function title(level) {
    if (level >= 10) return "北極海傳說";
    if (level >= 5) return "浮冰獵人";
    if (level >= 3) return "冰原探險家";
    return "冰原新手";
  }

  window.Progress = {
    stats,
    isSolved: (id) => !!load().solved[id],
    solve(id) {
      const p = load();
      if (p.solved[id]) return { gained: 0 };
      const before = stats(p).level;
      p.solved[id] = Date.now();
      save(p);
      const s = stats(p);
      renderSidebar();
      renderCatalog();
      toast(`+${(PROBLEMS[id] || {}).xp || 10} XP`);
      if (s.level > before) setTimeout(() => toast(`LEVEL UP! LV ${s.level}`, true), 900);
      return { gained: 10, levelUp: s.level > before };
    },
  };

  function toast(text, lvup) {
    const t = document.createElement("div");
    t.className = "toast" + (lvup ? " lvup" : "");
    t.textContent = text;
    body.append(t);
    setTimeout(() => t.remove(), 2600);
  }

  // ---------- 版面：側欄 + 主內容 ----------
  const app = document.createElement("div");
  app.className = "app";
  const side = document.createElement("aside");
  side.className = "sidebar";
  const main = document.createElement("div");
  main.className = "main";
  while (body.firstChild) main.append(body.firstChild);
  const footer = document.createElement("footer");
  footer.innerHTML = `演算法講義 · 依 CLAUDE.md 規則擴充 · 判題由 <a href="https://godbolt.org">Compiler Explorer</a> 提供 · <a href="${esc(SITE.repo || "#")}">GitHub</a>`;
  main.append(footer);
  app.append(side, main);
  body.append(app);
  // 讓 main 內的 script 不重複執行：script 已執行過，移動 DOM 不會再跑

  const currentId = body.dataset.lesson;
  function renderSidebar() {
    const s = stats();
    const p = load();
    const cells = Array.from({ length: 10 }, (_, i) => `<i class="${i < Math.floor(s.inLevel / 10) ? "on" : ""}"></i>`).join("");
    side.innerHTML = `
      <a class="brand" href="${root}index.html">ALGO<br>NOTES</a>
      <div class="player">
        <div class="sprite">${sealSVG()}</div>
        <div class="name">噗噗</div>
        <div class="title">${title(s.level)}</div>
        <div class="lv-row"><span class="lv">LV ${s.level}</span><span class="xp-text">${s.inLevel}/${XP_PER_LEVEL}</span></div>
        <div class="xp-bar" title="每 100 XP 升一級">${cells}</div>
        <div class="xp-total">總經驗 ${s.xp} · 通關 ${s.solved}/${Object.keys(PROBLEMS).length} 題</div>
      </div>
      <div>
        <p class="side-h">MENU</p>
        <ul class="quests">
          <li><a href="${root}index.html"><span class="mark">⌂</span>所有關卡</a></li>
          <li><a href="${root}wiki.html" class="${body.dataset.page === "wiki" ? "current" : ""}"><span class="mark">📖</span>知識庫 Wiki</a></li>
        </ul>
      </div>
      <div>
        <p class="side-h">QUESTS</p>
        <ul class="quests">${LESSONS.map((l) => `
          <li class="${lessonDone(l.id, p) ? "done" : ""}">
            <a href="${root}lessons/${l.id}.html" class="${l.id === currentId ? "current" : ""}">
              <span class="mark">${lessonDone(l.id, p) ? "★" : "☆"}</span>${num(l.id)} ${esc(l.title)}</a></li>`).join("")}
        </ul>
      </div>
      <button class="reset" type="button">重置進度</button>`;
    const reset = side.querySelector(".reset");
    reset.onclick = () => {
      if (reset.dataset.armed) { save({ solved: {} }); location.reload(); return; }
      reset.dataset.armed = 1;
      reset.textContent = "再按一次確認重置";
      setTimeout(() => { delete reset.dataset.armed; reset.textContent = "重置進度"; }, 3000);
    };
  }
  renderSidebar();

  // ---------- 首頁 ----------
  document.querySelectorAll("[data-sprite]").forEach((el) => (el.innerHTML = sealSVG()));
  function renderCatalog() {
    const catalog = document.getElementById("catalog");
    if (!catalog) return;
    const p = load();
    const groups = {};
    LESSONS.forEach((l) => (groups[l.category] ||= []).push(l));
    catalog.innerHTML = Object.entries(groups).map(([cat, list]) => `
      <h2>// ${esc(cat)}</h2>
      <div class="grid">${list.map((l) => `
        <a class="card" href="lessons/${l.id}.html">
          ${lessonDone(l.id, p) ? '<span class="stamp">CLEAR</span>' : ""}
          <div class="num">STAGE ${num(l.id)} <span class="level">· ${LEVEL_NAME[l.level] || ""} · +${problemsOf(l.id).length * 10} XP</span></div>
          <h3>${esc(l.title)}</h3>
          <p>${esc(l.summary)}</p>
          <div class="tags">${l.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </a>`).join("")}
      </div>`).join("");
  }
  renderCatalog();

  // ---------- 講義頁 ----------
  const article = document.querySelector("article.lesson");
  if (!currentId || !article) return;
  const idx = LESSONS.findIndex((l) => l.id === currentId);
  const me = LESSONS[idx];

  if (me) {
    const h1 = article.querySelector("h1");
    const crumb = document.createElement("div");
    crumb.className = "breadcrumb";
    crumb.innerHTML = `<a href="${root}index.html">首頁</a> / ${esc(me.category)} / STAGE ${num(me.id)}`;
    h1.before(crumb);
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<span>${LEVEL_NAME[me.level] || ""}</span>` +
      me.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("") +
      (me.wiki ? `<a href="${root}wiki.html?p=${encodeURIComponent(me.wiki)}">📖 Wiki 筆記</a>` : "");
    h1.after(meta);
  }

  const toc = document.querySelector(".toc");
  const heads = [...article.querySelectorAll("h2")];
  heads.forEach((h, i) => (h.id ||= "s" + (i + 1)));
  if (toc) {
    toc.innerHTML = "<strong>CONTENTS</strong>" + heads.map((h) => `<a href="#${h.id}">${esc(h.textContent)}</a>`).join("");
    const links = [...toc.querySelectorAll("a")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === "#" + e.target.id));
      });
    }, { rootMargin: "-40px 0px -70% 0px" });
    heads.forEach((h) => io.observe(h));
  }

  if (idx >= 0) {
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const pager = document.createElement("div");
    pager.className = "pager";
    pager.innerHTML =
      (prev ? `<a class="prev" href="${prev.id}.html"><small>◀ PREV</small>${esc(prev.title)}</a>` : "") +
      (next ? `<a class="next" href="${next.id}.html"><small>NEXT ▶</small>${esc(next.title)}</a>` : "");
    article.append(pager);
  }

  article.querySelectorAll("pre").forEach((pre) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "複製";
    btn.onclick = async () => {
      try { await navigator.clipboard.writeText(pre.querySelector("code").innerText); btn.textContent = "已複製"; }
      catch { btn.textContent = "失敗"; }
      setTimeout(() => (btn.textContent = "複製"), 1500);
    };
    pre.append(btn);
  });

  if (window.hljs) window.hljs.highlightAll();
})();
