/* Audit Page: Metric Vector selector, Percentile chips (P0..P100), side-by-side Before/After verification with telemetry. */

(function () {
  const auditData = window.AUDIT_DATA || { metrics: {} };
  const metrics = Object.keys(auditData.metrics);
  if (!metrics.length) return;

  const DUR = 5.0; // seconds spanned by spectrogram canvas
  const FTICKS = [[500, 0.1356], [2000, 0.4533], [8000, 0.8178]];

  const params = new URLSearchParams(window.location.search);
  let activeMetric = metrics.includes(params.get("metric")) ? params.get("metric") : metrics[0];
  const bins = auditData.metrics[activeMetric].bins;
  const pList = Object.keys(bins);
  let activeP = pList.includes(params.get("p")) ? params.get("p") : pList[0];

  function title(s) { return s.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase()); }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function syncUrl() {
    const url = new URL(window.location);
    url.searchParams.set("metric", activeMetric);
    url.searchParams.set("p", activeP);
    history.replaceState(null, "", url.toString());
  }

  function renderMetricPicker() {
    const el = document.getElementById("metric-picker");
    el.innerHTML = metrics.map(mId => {
      const m = auditData.metrics[mId];
      const totalCases = Object.values(m.bins).reduce((acc, list) => acc + list.length, 0);
      return `<button class="cat-btn${mId === activeMetric ? " on" : ""}" data-metric="${mId}">
        <div class="cat-btn-title">${esc(m.name)}</div>
        <span class="count">${totalCases} sampled</span>
      </button>`;
    }).join("");

    el.querySelectorAll(".cat-btn").forEach(b => b.addEventListener("click", () => {
      activeMetric = b.dataset.metric;
      activeP = "P0";
      syncUrl();
      render();
    }));
  }

  function renderPercentileChips() {
    const row = document.getElementById("percentile-chip-row");
    const currentBins = auditData.metrics[activeMetric].bins;
    row.innerHTML = Object.keys(currentBins).map(pKey => {
      const count = (currentBins[pKey] || []).length;
      return `<button class="sub-chip${pKey === activeP ? " on" : ""}" data-p="${pKey}">
        ${pKey}<span class="count">${count}</span>
      </button>`;
    }).join("");

    row.querySelectorAll(".sub-chip").forEach(b => b.addEventListener("click", () => {
      activeP = b.dataset.p;
      syncUrl();
      render();
    }));
  }

  const CTRL = `<div class="pl-ctrl">
      <button class="pl-play" type="button" aria-label="Play"><svg class="i-play"><use href="#i-play"/></svg><svg class="i-pause"><use href="#i-pause"/></svg></button>
      <span class="pl-time">0.00 s</span>
    </div>`;

  function videoCell(dir, key, labelName) {
    return `<div class="cell">
      <div class="cell-label"><span class="name">${esc(labelName)}</span></div>
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

  function auditCard(c) {
    const dir = c.media_dir;
    const m = auditData.metrics[activeMetric];
    let metricDisplayVal = "";
    if (activeMetric === "max_spike") metricDisplayVal = `${c.max_spike_mJ.toFixed(2)} mJ`;
    else if (activeMetric === "ratio") metricDisplayVal = `${c.ratio_pct.toFixed(2)}%`;
    else metricDisplayVal = `${c.tot_inj_mJ.toFixed(2)} mJ`;

    let badgeText = "Pass";
    let badgeClass = "badge-pass";
    if (c.health === "severe") { badgeText = "Severe Defect"; badgeClass = "badge-fail"; }
    else if (c.health === "warning") { badgeText = "Moderate"; badgeClass = "badge-warn"; }

    return `<article class="case audit-case" id="case-${c.id}">
      <div class="case-head">
        <span class="case-idx">${c.id}</span>
        <span class="case-path">${title(c.cat)} / ${title(c.sub)}</span>
        <span class="audit-badge ${badgeClass}">${badgeText}</span>
        <span class="audit-rank-tag">${m.shortName}: <strong>${metricDisplayVal}</strong> (${activeP})</span>
      </div>
      <div class="case-body audit-case-body">
        <div class="audit-col">
          ${videoCell(dir, "ref", "Reference (Before)")}
          ${specCell(dir, "ref")}
        </div>
        <div class="audit-col">
          ${videoCell(dir, "tar", "Target (Ground Truth)")}
          ${specCell(dir, "tar")}
        </div>
        <div class="audit-col audit-telemetry-col">
          <div class="telemetry-panel">
            <div class="telemetry-head">Physics Invariant Telemetry</div>
            <div class="t-row">
              <span class="t-label">Max Single-Step Spike:</span>
              <span class="t-val ${c.max_spike_mJ > 10 ? 'val-danger' : c.max_spike_mJ > 1 ? 'val-warn' : 'val-good'}">${c.max_spike_mJ.toFixed(2)} mJ</span>
            </div>
            <div class="t-row">
              <span class="t-label">Total Injected Energy:</span>
              <span class="t-val ${c.tot_inj_mJ > 100 ? 'val-danger' : c.tot_inj_mJ > 10 ? 'val-warn' : 'val-good'}">${c.tot_inj_mJ.toFixed(2)} mJ</span>
            </div>
            <div class="t-row">
              <span class="t-label">Injected / Initial E₀:</span>
              <span class="t-val ${c.ratio_pct > 5 ? 'val-danger' : c.ratio_pct > 1 ? 'val-warn' : 'val-good'}">${c.ratio_pct.toFixed(2)}%</span>
            </div>
            <div class="t-row">
              <span class="t-label">Positive Contact Work:</span>
              <span class="t-val">${c.poswork_steps} steps</span>
            </div>
            <div class="t-row">
              <span class="t-label">Legacy Production Gate:</span>
              <span class="t-val ${c.accepted ? 'val-accent' : ''}">${c.accepted ? 'Accepted (Passed)' : 'Rejected'}</span>
            </div>
            <div class="t-caption">
              <div class="t-caption-title">Caption &amp; Edit Instruction</div>
              <div class="t-caption-text">${esc(c.caption || "No caption provided.")}</div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }

  function render() {
    renderMetricPicker();
    renderPercentileChips();
    const list = document.getElementById("case-list");
    const currentBins = auditData.metrics[activeMetric].bins;
    const items = currentBins[activeP] || [];
    list.innerHTML = items.length ? items.map(auditCard).join("") : `<p class="empty-note">No cases sampled in ${activeP}.</p>`;
    list.querySelectorAll(".pl").forEach(initPlayer);
    fitSpacer();
    updateNav();
  }

  /* Navigation & scrolling */
  const NAV_OFFSET = 64;
  const TOL = 4;
  const prevBtn = document.getElementById("case-prev");
  const nextBtn = document.getElementById("case-next");
  const posEl = document.getElementById("case-pos");

  function cases() { return Array.from(document.querySelectorAll("#case-list .case")); }
  function anchorOf(el) { return el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET; }

  function fitSpacer() {
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

  /* Player controller */
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

  document.addEventListener("play", e => {
    const me = e.target;
    if (!(me instanceof HTMLMediaElement)) return;
    document.querySelectorAll("audio, video").forEach(m => { if (m !== me && !m.paused) m.pause(); });
  }, true);

  render();
})();

