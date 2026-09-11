/* Case gallery: category picker, subcategory chips, one card per case, video and spectrogram players. */

(function () {
  const catalog = window.CATALOG || [];
  const MEDIA = "media";
  const DUR = 5.0; // seconds spanned by every spectrogram canvas

  const LABELS = {
    ref: { name: "Reference (No edits)", code: "" },
    tar: { name: "Ground Truth", code: "" },
    m1: { name: "Reference-only Baseline (No Mask)", code: "M1" },
    m2: { name: "Baseline Concat w/o Conditions", code: "M2" },
    m13: { name: "M2 + VAE Embedded Audio Mask", code: "M13" },
    m14: { name: "M2 + Learned Audio Mask Embeddings", code: "M14" },
    m12: { name: "Baseline w/ Video Control Net", code: "M12" },
    m15: { name: "M12 + VAE Embedded Audio Mask", code: "M15" },
    m16: { name: "M12 + Learned Audio Mask Embeddings", code: "M16" }
  };

  // Mel-scale positions (fraction of the plot height from the bottom) of the frequency ticks.
  const FTICKS = [[500, 0.1356], [2000, 0.4533], [8000, 0.8178]];

  const cats = [];
  const subsOf = new Map();
  catalog.forEach(c => {
    if (!subsOf.has(c.cat)) { cats.push(c.cat); subsOf.set(c.cat, []); }
    if (!subsOf.get(c.cat).includes(c.sub)) subsOf.get(c.cat).push(c.sub);
  });

  const params = new URLSearchParams(window.location.search);
  let activeCat = cats.includes(params.get("cat")) ? params.get("cat") : cats[0];
  let activeSub = (subsOf.get(activeCat) || []).includes(params.get("sub")) ? params.get("sub") : (subsOf.get(activeCat) || [])[0];

  function title(s) { return s.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase()); }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function syncUrl() {
    const url = new URL(window.location);
    url.searchParams.set("cat", activeCat);
    url.searchParams.set("sub", activeSub);
    history.replaceState(null, "", url.toString());
  }

  function renderPicker() {
    const el = document.getElementById("cat-picker");
    el.innerHTML = cats.map(c => {
      const n = catalog.filter(x => x.cat === c).length;
      return `<button class="cat-btn${c === activeCat ? " on" : ""}" data-cat="${c}">${title(c)}<span class="count">${n} cases</span></button>`;
    }).join("");
    el.querySelectorAll(".cat-btn").forEach(b => b.addEventListener("click", () => {
      activeCat = b.dataset.cat;
      activeSub = subsOf.get(activeCat)[0];
      syncUrl();
      render();
    }));
  }

  function renderChips() {
    const row = document.getElementById("sub-chip-row");
    row.innerHTML = subsOf.get(activeCat).map(s => {
      const n = catalog.filter(x => x.cat === activeCat && x.sub === s).length;
      return `<button class="sub-chip${s === activeSub ? " on" : ""}" data-sub="${s}">${title(s)}<span class="count">${n}</span></button>`;
    }).join("");
    row.querySelectorAll(".sub-chip").forEach(b => b.addEventListener("click", () => {
      activeSub = b.dataset.sub;
      syncUrl();
      render();
    }));
  }

  function label(key) {
    const l = LABELS[key];
    const code = l.code ? `<span class="code">${l.code}</span>` : "";
    return `<div class="cell-label">${code}<span class="name">${esc(l.name)}</span></div>`;
  }

  const CTRL = `<div class="pl-ctrl">
      <button class="pl-play" type="button" aria-label="Play"><svg class="i-play"><use href="#i-play"/></svg><svg class="i-pause"><use href="#i-pause"/></svg></button>
      <span class="pl-time">0.00 s</span>
    </div>`;

  function videoCell(dir, key) {
    return `<div class="cell">${label(key)}
      <div class="pl vid">
        <video class="pl-media" preload="none" playsinline poster="${dir}/${key}_poster.webp" src="${dir}/${key}.mp4"></video>
        <div class="pl-track vid-bar"><div class="pl-fill"></div></div>
        ${CTRL}
      </div></div>`;
  }

  function specCell(dir, key) {
    const ticks = FTICKS.map(([f, y]) => `<div class="spec-ftick" style="bottom:${(y * 100).toFixed(2)}%"><span>${f >= 1000 ? (f / 1000) + " kHz" : f + " Hz"}</span></div>`).join("");
    const axis = [0, 1, 2, 3, 4, 5].map(t => `<span style="left:${t / DUR * 100}%">${t === 5 ? "5 s" : t}</span>`).join("");
    return `<div class="cell cell-audio">
      <div class="pl spec" data-span="fixed">
        <div class="pl-track spec-plot"><img src="${dir}/${key}_spec.webp" alt="" loading="lazy" draggable="false">${ticks}<div class="pl-head spec-head"></div></div>
        <div class="spec-axis">${axis}</div>
        ${CTRL}
        <audio class="pl-media" preload="none" src="${dir}/${key}.m4a"></audio>
      </div></div>`;
  }

  function captionCell(text) {
    return `<div class="cell caption-cell"><div class="cell-label"><span class="name">Caption</span></div><div class="caption">${esc(text)}</div></div>`;
  }

  function caseCard(c) {
    const dir = `${MEDIA}/${c.cat}/${c.sub}/${c.id}`;
    return `<article class="case" id="${c.cat}-${c.sub}-${c.id}">
      <div class="case-head"><span class="case-idx">${c.id}</span><span class="case-path">${title(c.cat)} / ${title(c.sub)}</span></div>
      <div class="case-body">
        <div class="block left">
          ${videoCell(dir, "ref")}${videoCell(dir, "tar")}
          ${specCell(dir, "ref")}${specCell(dir, "tar")}
          ${captionCell(c.caption)}${videoCell(dir, "m1")}${specCell(dir, "m1")}
        </div>
        <div class="block right">
          ${videoCell(dir, "m2")}${videoCell(dir, "m13")}${videoCell(dir, "m14")}
          ${specCell(dir, "m2")}${specCell(dir, "m13")}${specCell(dir, "m14")}
          <div class="rule"></div>
          ${videoCell(dir, "m12")}${videoCell(dir, "m15")}${videoCell(dir, "m16")}
          ${specCell(dir, "m12")}${specCell(dir, "m15")}${specCell(dir, "m16")}
        </div>
      </div>
    </article>`;
  }

  function render() {
    renderPicker();
    renderChips();
    const list = document.getElementById("case-list");
    const items = catalog.filter(c => c.cat === activeCat && c.sub === activeSub);
    list.innerHTML = items.length ? items.map(caseCard).join("") : `<p class="empty-note">No cases in this subcategory.</p>`;
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
    const fixed = root.dataset.span === "fixed";
    let pending = null;
    let raf = 0;
    let wasPlaying = false;

    function span() {
      if (fixed) return DUR;
      const d = media.duration;
      return (d && isFinite(d)) ? d : DUR;
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
