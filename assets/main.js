// 全站共用行為。所有內容都由 lessons.js 驅動，新增講義不需修改此檔。
(function () {
  const LESSONS = window.LESSONS || [];
  const body = document.body;
  const root = body.dataset.root || "./";
  const LEVEL = { 1: "入門", 2: "進階", 3: "挑戰" };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const num = (id) => id.slice(0, 2);

  // ---------- 導覽列與頁尾 ----------
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML = `<div class="inner">
      <a class="brand" href="${root}index.html"><span>&lt;/&gt;</span> 演算法講義</a>
      <div class="links"><a href="${root}index.html#catalog">所有講義</a>
      <a href="${(window.SITE||{}).repo||"#"}">GitHub</a></div></div>`;
  body.prepend(nav);
  const footer = document.createElement("footer");
  footer.textContent = "演算法講義 · 以 CLAUDE.md 規則持續擴充 · C++17";
  body.append(footer);

  // ---------- 首頁：講義卡片 ----------
  const catalog = document.getElementById("catalog");
  if (catalog) {
    const groups = {};
    LESSONS.forEach((l) => (groups[l.category] ||= []).push(l));
    catalog.innerHTML = Object.entries(groups).map(([cat, list]) => `
      <h2>${esc(cat)}</h2>
      <div class="grid">${list.map((l) => `
        <a class="card" href="lessons/${l.id}.html">
          <div class="num">#${num(l.id)} <span class="level">· ${LEVEL[l.level] || ""}</span></div>
          <h3>${esc(l.title)}</h3>
          <p>${esc(l.summary)}</p>
          <div class="tags">${l.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </a>`).join("")}
      </div>`).join("");
  }

  // ---------- 講義頁 ----------
  const id = body.dataset.lesson;
  const article = document.querySelector("article.lesson");
  if (!id || !article) return;
  const idx = LESSONS.findIndex((l) => l.id === id);
  const me = LESSONS[idx];

  if (me) {
    const h1 = article.querySelector("h1");
    const crumb = document.createElement("div");
    crumb.className = "breadcrumb";
    crumb.innerHTML = `<a href="${root}index.html">首頁</a> / ${esc(me.category)} / #${num(me.id)}`;
    h1.before(crumb);
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<span>${LEVEL[me.level] || ""}</span>` +
      me.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    h1.after(meta);
  }

  // 自動目錄：從 h2 產生
  const toc = document.querySelector(".toc");
  const heads = [...article.querySelectorAll("h2")];
  heads.forEach((h, i) => (h.id ||= "s" + (i + 1)));
  if (toc) {
    toc.innerHTML = "<strong>本篇目錄</strong>" +
      heads.map((h) => `<a href="#${h.id}">${esc(h.textContent)}</a>`).join("");
    const links = [...toc.querySelectorAll("a")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === "#" + e.target.id));
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    heads.forEach((h) => io.observe(h));
  }

  // 上一篇 / 下一篇
  if (idx >= 0) {
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const pager = document.createElement("div");
    pager.className = "pager";
    pager.innerHTML =
      (prev ? `<a class="prev" href="${prev.id}.html"><small>← 上一篇</small>${esc(prev.title)}</a>` : "") +
      (next ? `<a class="next" href="${next.id}.html"><small>下一篇 →</small>${esc(next.title)}</a>` : "");
    article.append(pager);
  }

  // 程式碼複製按鈕
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

  // 語法上色（若 CDN 載入成功）
  if (window.hljs) window.hljs.highlightAll();
})();
