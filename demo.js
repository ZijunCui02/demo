/* Demo (November 14, 2026, owner: a page for a talk): a few cases in two sections, Simulation and Real Videos, each card with the input and the ground truth, the prompt and the masks on the left
   and the nine methods of the comparison on the right, three per row (the Case Study grid); the cases, their labels and their media come from demo_media.js (jobs/demo_site/build_demo_20261114.py). */

(function () {
  const DATA = window.DEMO || { sections: [], cases: [] };
  const SECTIONS = DATA.sections;
  const COLS = 3;

  // Mel-scale positions (fraction of the plot height from the bottom) of the frequency ticks.
  const FTICKS = [[500, 0.1356], [2000, 0.4533], [8000, 0.8178]];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  const params = new URLSearchParams(window.location.search);
  let active = SECTIONS.some(s => s.key === params.get("sec")) ? params.get("sec") : (SECTIONS[0] || {}).key;

  function casesOf(sec) { return DATA.cases.filter(c => c.sec === sec); }

  function syncUrl() {
    const url = new URL(window.location);
    url.searchParams.set("sec", active);
    history.replaceState(null, "", url.toString());
  }

  function renderPicker() {
    const el = document.getElementById("cat-picker");
    el.innerHTML = SECTIONS.map(s => `<button class="cat-btn${s.key === active ? " on" : ""}" type="button" data-sec="${s.key}">${esc(s.title)}<span class="count">${casesOf(s.key).length} cases</span></button>`).join("");
    el.querySelectorAll(".cat-btn").forEach(b => b.addEventListener("click", () => {
      active = b.dataset.sec;
      syncUrl();
      render();
      window.scrollTo({ top: 0 });
    }));
  }

  function label(name) {
    return `<div class="cell-label"><span class="name" title="${esc(name)}">${esc(name)}</span></div>`;
  }

  const CTRL = `<div class="pl-ctrl">
      <button class="pl-play" type="button" aria-label="Play"><svg class="i-play"><use href="#i-play"/></svg><svg class="i-pause"><use href="#i-pause"/></svg></button>
      <span class="pl-time">0.00 s</span>
    </div>`;

  function videoCell(dir, key, name) {
    return `<div class="cell">${label(name)}
      <div class="pl vid">
        <video class="pl-media" preload="none" playsinline poster="${dir}/${key}_poster.webp" src="${dir}/${key}.mp4"></video>
        <div class="pl-track vid-bar"><div class="pl-fill"></div></div>
        ${CTRL}
      </div></div>`;
  }

  // The spectrogram spans the case's canvas (5 s for the simulation's cases, the recording's own length for the real ones), with a tick at every whole second.
  function specCell(dir, key, span) {
    const ticks = FTICKS.map(([f, y]) => `<div class="spec-ftick" style="bottom:${(y * 100).toFixed(2)}%"><span>${f >= 1000 ? (f / 1000) + " kHz" : f + " Hz"}</span></div>`).join("");
    const last = Math.floor(span + 1e-6);
    const axis = Array.from({ length: last + 1 }, (_, t) => `<span style="left:${(t / span * 100).toFixed(3)}%">${t === last ? t + " s" : t}</span>`).join("");
    return `<div class="cell cell-audio">
      <div class="pl spec" data-span="${span}">
        <div class="pl-track spec-plot"><img src="${dir}/${key}_spec.webp" alt="" loading="lazy" draggable="false">${ticks}<div class="pl-head spec-head"></div></div>
        <div class="spec-axis">${axis}</div>
        ${CTRL}
        <audio class="pl-media" preload="none" src="${dir}/${key}.m4a"></audio>
      </div></div>`;
  }

  function captionCell(text) {
    return `<div class="cell caption-cell demo-caption"><div class="cell-label"><span class="name">Prompt</span></div><div class="caption">${esc(text)}</div></div>`;
  }

  function maskImageCell(dir, key, name) {
    const src = `${dir}/${key}.webp`;
    return `<div class="cell">${label(name)}<a class="mask-img" href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc(name)}" loading="lazy"></a></div>`;
  }

  function placeholderVideo(name) {
    return `<div class="cell">${label(name)}<div class="cs-placeholder">Placeholder</div></div>`;
  }

  function placeholderSpec() {
    return `<div class="cell cell-audio"><div class="cs-placeholder cs-placeholder-spec"></div></div>`;
  }

  function caseCard(c) {
    const dir = c.dir;
    const L = c.left;
    const rows = [];
    for (let i = 0; i < c.methods.length; i += COLS) {
      const row = c.methods.slice(i, i + COLS);
      rows.push(row.map(([name, key]) => key ? videoCell(dir, key, name) : placeholderVideo(name)).join("") +
                row.map(([, key]) => key ? specCell(dir, key, c.span) : placeholderSpec()).join(""));
    }
    return `<article class="case" id="${esc(c.sec + "-" + c.id)}">
      <div class="case-head"><span class="case-idx">${esc(c.id)}</span><span class="case-path">${esc(c.path)}</span></div>
      <div class="case-body cs-body">
        <div class="block left">
          ${videoCell(dir, L.input[1], L.input[0])}${videoCell(dir, L.gt[1], L.gt[0])}
          ${specCell(dir, L.input[1], c.span)}${specCell(dir, L.gt[1], c.span)}
          ${captionCell(c.caption)}
          ${videoCell(dir, L.vid_mask[1], L.vid_mask[0])}${maskImageCell(dir, L.aud_mask[1], L.aud_mask[0])}
        </div>
        <div class="block right three">${rows.join(`<div class="rule"></div>`)}</div>
      </div>
    </article>`;
  }

  function render() {
    renderPicker();
    const list = document.getElementById("case-list");
    const items = casesOf(active);
    list.innerHTML = items.length ? items.map(caseCard).join("") : `<p class="empty-note">No cases.</p>`;
    list.querySelectorAll(".pl").forEach(initPlayer);
    fitSpacer();
    updateNav();
  }

  /* ---------- previous / next case: scroll so the case headline sits at the top of the viewport ---------- */
  const NAV_OFFSET = 64; // px kept above the card, room for the auto-hiding navbar
  const TOL = 4;
  const prevBtn = document.getElementById("case-prev");
  const nextBtn = document.getElementById("case-next");
  const posEl = document.getElementById("case-pos");

  function cases() { return Array.from(document.querySelectorAll("#case-list .case")); }
  function anchorOf(el) { return el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET; }

  function fitSpacer() {
    // Bottom padding so that the last case can be scrolled to the anchor position as well.
    const list = document.getElementById("case-list");
    list.style.paddingBottom = "0px";
    const all = cases();
    if (!all.length) return;
    const need = anchorOf(all[all.length - 1]) + window.innerHeight - document.documentElement.scrollHeight;
    list.style.paddingBottom = Math.max(0, Math.ceil(need)) + "px";
  }

  function goTo(el) {
    window.scrollTo({ top: Math.max(0, anchorOf(el)), behavior: "smooth" });
  }

  function updateNav() {
    const all = cases();
    const y = window.scrollY;
    // The current case is the last one whose headline is at or above the viewport top; above the first headline it is the first case.
    let current = 0;
    all.forEach((el, i) => { if (anchorOf(el) <= y + TOL) current = i; });
    // Previous returns to the current headline when the page is scrolled below it, otherwise it goes one case up.
    const prev = all.length && anchorOf(all[current]) < y - TOL ? current : current - 1;
    const next = current + 1 < all.length ? current + 1 : -1;
    prevBtn.disabled = prev < 0;
    nextBtn.disabled = next < 0;
    prevBtn.dataset.target = prev;
    nextBtn.dataset.target = next;
    posEl.textContent = all.length ? `case ${current + 1} / ${all.length}` : "";
  }

  prevBtn.addEventListener("click", () => { const i = +prevBtn.dataset.target; if (i >= 0) goTo(cases()[i]); });
  nextBtn.addEventListener("click", () => { const i = +nextBtn.dataset.target; if (i >= 0) goTo(cases()[i]); });

  let navTick = false;
  window.addEventListener("scroll", () => {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(() => { updateNav(); navTick = false; });
  }, { passive: true });
  window.addEventListener("resize", () => { fitSpacer(); updateNav(); });

  /* ---------- player: a video with a seek bar below the frame, or a spectrogram with a draggable marker ---------- */
  function initPlayer(root) {
    const media = root.querySelector(".pl-media");
    const track = root.querySelector(".pl-track");
    const head = root.querySelector(".pl-head");
    const fill = root.querySelector(".pl-fill");
    const time = root.querySelector(".pl-time");
    const btn = root.querySelector(".pl-play");
    // A spectrogram spans the fixed duration of its case (data-span, in seconds); a video bar spans the video's own duration.
    const fixed = parseFloat(root.dataset.span);
    let pending = null;
    let raf = 0;
    let wasPlaying = false;

    function span() {
      if (fixed > 0) return fixed;
      const d = media.duration;
      return (d && isFinite(d)) ? d : 5.0;
    }

    function place(t) {
      const pct = (Math.max(0, Math.min(span(), t)) / span() * 100) + "%";
      if (head) head.style.left = pct;
      if (fill) fill.style.width = pct;
      time.textContent = t.toFixed(2) + " s";
    }

    function seek(t) {
      t = Math.max(0, Math.min(span(), t));
      if (media.readyState >= 1) {
        media.currentTime = Math.min(t, media.duration || t);
      } else {
        pending = t;
        media.preload = "auto";
        media.load();
      }
      place(t);
    }

    media.addEventListener("loadedmetadata", () => {
      if (pending !== null) { media.currentTime = Math.min(pending, media.duration || pending); pending = null; }
      place(media.currentTime);
    });

    function tick() {
      place(media.currentTime);
      if (!media.paused && !media.ended) raf = requestAnimationFrame(tick);
    }

    media.addEventListener("play", () => { root.classList.add("playing"); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
    media.addEventListener("pause", () => { root.classList.remove("playing"); cancelAnimationFrame(raf); place(media.currentTime); });
    media.addEventListener("ended", () => { root.classList.remove("playing"); cancelAnimationFrame(raf); place(media.currentTime); });

    function toggle() {
      if (media.paused || media.ended) media.play().catch(() => {});
      else media.pause();
    }
    btn.addEventListener("click", toggle);
    if (media.tagName === "VIDEO") media.addEventListener("click", toggle);

    function fracOf(e) {
      const r = track.getBoundingClientRect();
      return (e.clientX - r.left) / r.width;
    }

    track.addEventListener("pointerdown", e => {
      e.preventDefault();
      track.setPointerCapture(e.pointerId);
      wasPlaying = !media.paused && !media.ended;
      if (wasPlaying) media.pause();
      root.classList.add("dragging");
      seek(fracOf(e) * span());
    });
    track.addEventListener("pointermove", e => {
      if (!root.classList.contains("dragging")) return;
      seek(fracOf(e) * span());
    });
    function release() {
      if (!root.classList.contains("dragging")) return;
      root.classList.remove("dragging");
      if (wasPlaying) media.play().catch(() => {});
      wasPlaying = false;
    }
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);
  }

  // One sound at a time: starting any player pauses every other audio or video on the page.
  document.addEventListener("play", e => {
    const me = e.target;
    if (!(me instanceof HTMLMediaElement)) return;
    document.querySelectorAll("audio, video").forEach(m => { if (m !== me && !m.paused) m.pause(); });
  }, true);

  render();
})();
