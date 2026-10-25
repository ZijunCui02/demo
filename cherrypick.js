/* Cherry-pick: teaser candidates from the val and test sets, ranked; group picker, category chips, one card per pair with the reviewers' scores, video and spectrogram players. */

(function () {
  const picks = window.CHERRYPICK || [];
  const DUR = 5.0; // seconds spanned by every spectrogram canvas

  const LABELS = {
    ref: { name: "Reference", code: "" },
    tar: { name: "Target", code: "" }
  };

  // Mel-scale positions (fraction of the plot height from the bottom) of the frequency ticks.
  const FTICKS = [[500, 0.1356], [2000, 0.4533], [8000, 0.8178]];

  const CAT_ORDER = ["bridge", "guide", "bowling", "bowling_dominoes", "dominoes", "collision", "falling"];
  const CAT_TITLES = { bowling_dominoes: "Bowling + Dominoes" };
  const GROUPS = [
    { key: "top", name: "Picks", of: p => p.tier === "top" },
    { key: "spare", name: "Spares", of: p => p.tier === "spare" },
    ...CAT_ORDER.filter(c => picks.some(p => p.cat === c)).map(c => ({ key: c, name: catTitle(c), of: p => p.cat === c }))
  ];
  const ALL = "all";

  function title(s) { return s.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase()); }
  function catTitle(c) { return CAT_TITLES[c] || title(c); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function groupOf(key) { return GROUPS.find(g => g.key === key) || GROUPS[0]; }
  function chipsOf(group) {
    // Picks and Spares filter by category; a category filters by tier.
    if (group.key === "top" || group.key === "spare") return [ALL, ...CAT_ORDER.filter(c => picks.some(p => group.of(p) && p.cat === c))];
    return [ALL, "top", "spare"].filter(s => s === ALL || picks.some(p => group.of(p) && p.tier === s));
  }
  function chipName(s) { return s === ALL ? "All" : s === "top" ? "Picks" : s === "spare" ? "Spares" : catTitle(s); }
  function itemsOf(group, chip) {
    return picks.filter(p => group.of(p) && (chip === ALL || p.cat === chip || p.tier === chip)).sort((a, b) => a.rank - b.rank);
  }

  const params = new URLSearchParams(window.location.search);
  let active = groupOf(params.get("group")).key;
  let chip = chipsOf(groupOf(active)).includes(params.get("chip")) ? params.get("chip") : ALL;

  function syncUrl() {
    const url = new URL(window.location);
    url.searchParams.set("group", active);
    url.searchParams.set("chip", chip);
    history.replaceState(null, "", url.toString());
  }

  function renderPicker() {
    const el = document.getElementById("cat-picker");
    el.innerHTML = GROUPS.map(g => {
      const n = picks.filter(g.of).length;
      return `<button class="cat-btn${g.key === active ? " on" : ""}" data-group="${g.key}">${esc(g.name)}<span class="count">${n} pairs</span></button>`;
    }).join("");
    el.querySelectorAll(".cat-btn").forEach(b => b.addEventListener("click", () => {
      active = b.dataset.group;
      chip = ALL;
      syncUrl();
      render();
    }));
  }

  function renderChips() {
    const row = document.getElementById("sub-chip-row");
    const g = groupOf(active);
    row.innerHTML = chipsOf(g).map(s => {
      const n = itemsOf(g, s).length;
      return `<button class="sub-chip${s === chip ? " on" : ""}" data-chip="${s}">${esc(chipName(s))}<span class="count">${n}</span></button>`;
    }).join("");
    row.querySelectorAll(".sub-chip").forEach(b => b.addEventListener("click", () => {
      chip = b.dataset.chip;
      syncUrl();
      render();
    }));
  }

  function label(key) {
    const l = LABELS[key];
    return `<div class="cell-label"><span class="name">${esc(l.name)}</span></div>`;
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

  function noteCell(p) {
    const s = p.scores;
    const parts = [["overall", "Overall", 10], ["causal", "Causal change", 5], ["sound_contrast", "Sound contrast", 5], ["sound_quality", "Sound quality", 5],
                   ["visual", "Visual", 5], ["learnable", "Learnable", 5]];
    const chips = parts.map(([k, n, m]) => `<span class="pick-score"><b>${esc(s[k])}</b>/${m} ${n}</span>`).join("");
    const flags = (p.flags || []).length ? `<div class="pick-flags">${p.flags.map(f => `<span>${esc(f.replace(/_/g, " "))}</span>`).join("")}</div>` : "";
    const ends = p.ends ? `<div class="pick-ends">Ends on <b>${esc(p.ends.ref.join(", "))}</b> with the object, on <b>${esc(p.ends.tar.join(", "))}</b> without it</div>` : "";
    return `<div class="cell pick-note"><div class="cell-label"><span class="name">Why it was picked</span></div>
      ${ends}<div class="pick-scores">${chips}</div>
      <div class="caption"><b>${esc(p.why)}</b>${p.moment ? `<br>Teaser moment: ${esc(p.moment)}` : ""}${p.final ? `<br>Final review: ${esc(p.final)}` : ""}</div>${flags}</div>`;
  }

  function caseCard(p) {
    const tier = p.tier === "top" ? `#${p.rank}` : `spare ${p.rank - 50}`;
    return `<article class="case case-gt-only" id="pick-${p.rank}">
      <div class="case-head"><span class="case-idx">${esc(tier)}</span><span class="case-idx">${esc(p.id)}</span><span class="case-path">${esc(p.label)} <span class="pick-split">(${esc(p.split)})</span></span></div>
      <div class="case-body case-body-gt-only">
        <div class="block left gt-only">
          ${videoCell(p.dir, "ref")}${videoCell(p.dir, "tar")}
          ${specCell(p.dir, "ref")}${specCell(p.dir, "tar")}
          ${noteCell(p)}${captionCell(p.caption)}
        </div>
      </div>
    </article>`;
  }

  function render() {
    renderPicker();
    renderChips();
    const list = document.getElementById("case-list");
    const items = itemsOf(groupOf(active), chip);
    list.innerHTML = items.length ? items.map(caseCard).join("") : `<p class="empty-note">No pairs here.</p>`;
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
    let current = 0;
    all.forEach((el, i) => { if (anchorOf(el) <= y + TOL) current = i; });
    const prev = all.length && anchorOf(all[current]) < y - TOL ? current : current - 1;
    const next = current + 1 < all.length ? current + 1 : -1;
    prevBtn.disabled = prev < 0;
    nextBtn.disabled = next < 0;
    prevBtn.dataset.target = prev;
    nextBtn.dataset.target = next;
    posEl.textContent = all.length ? `pair ${current + 1} / ${all.length}` : "";
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

  /* ---------- player: a video with a seek bar below the frame, or a spectrogram with a draggable marker (as app.js) ---------- */
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
