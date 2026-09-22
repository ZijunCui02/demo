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
        <span class="count">${totalCases} pairs</span>
      </button>`;
    }).join("");

    el.querySelectorAll(".cat-btn").forEach(b => b.addEventListener("click", () => {
      activeMetric = b.dataset.metric;
      activeP = "P100";
      visibleCount = PAGE_SIZE;
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
      visibleCount = PAGE_SIZE;
      syncUrl();
      render();
    }));
  }

  const CTRL = `<div class="pl-ctrl">
      <button class="pl-play" type="button" aria-label="Play"><svg class="i-play"><use href="#i-play"/></svg><svg class="i-pause"><use href="#i-pause"/></svg></button>
      <span class="pl-time">0.00 s</span>
    </div>`;

  function resolveMediaSrc(p) {
    if (!p) return "";
    if (window.location.protocol.startsWith("http") && p.includes("runs_v7/")) {
      return p.substring(p.indexOf("runs_v7/"));
    }
    return p;
  }

  function videoCell(c, key, labelName) {
    const isRef = key === "ref";
    const rawVid = isRef ? (c.video_before || (c.media_dir ? `${c.media_dir}/ref.mp4` : "")) : (c.video_after || (c.media_dir ? `${c.media_dir}/tar.mp4` : ""));
    const vidSrc = resolveMediaSrc(rawVid);
    const posterSrc = c.media_dir ? `${c.media_dir}/${key}_poster.webp` : "";

    if (!vidSrc) {
      return `<div class="cell cell-telemetry-notice">
        <div class="cell-label"><span class="name">${esc(labelName)}</span></div>
        <div class="telemetry-box">
          <span class="badge-tag">${isRef ? 'Reference State' : 'Ground Truth Target'}</span>
          <div class="t-gen">${esc(c.gen || 'runs_v7')}</div>
          <div class="t-bodies-label">Interacting Bodies:</div>
          <div class="t-bodies-val">${esc((c.bodies && c.bodies.length) ? c.bodies.join(', ') : 'Solid rigid bodies')}</div>
        </div>
      </div>`;
    }

    return `<div class="cell">
      <div class="cell-label"><span class="name">${esc(labelName)}</span></div>
      <div class="pl vid">
        <video class="pl-media" preload="none" playsinline poster="${posterSrc}" src="${vidSrc}"></video>
        <div class="pl-track vid-bar"><div class="pl-fill"></div></div>
        ${CTRL}
      </div></div>`;
  }

  function specCell(c, key) {
    const isRef = key === "ref";
    const rawAud = isRef ? (c.audio_before || (c.media_dir ? `${c.media_dir}/ref.m4a` : "")) : (c.audio_after || (c.media_dir ? `${c.media_dir}/tar.m4a` : ""));
    const audSrc = resolveMediaSrc(rawAud);
    const specImg = c.media_dir ? `${c.media_dir}/${key}_spec.webp` : "";

    if (specImg) {
      const ticks = FTICKS.map(([f, y]) => `<div class="spec-ftick" style="bottom:${(y * 100).toFixed(2)}%"><span>${f >= 1000 ? (f / 1000) + " kHz" : f + " Hz"}</span></div>`).join("");
      const axis = [0, 1, 2, 3, 4, 5].map(t => `<span style="left:${t / DUR * 100}%">${t === 5 ? "5 s" : t}</span>`).join("");
      return `<div class="cell cell-audio">
        <div class="pl spec" data-span="fixed">
          <div class="pl-track spec-plot"><img src="${specImg}" alt="" loading="lazy" draggable="false">${ticks}<div class="pl-head spec-head"></div></div>
          <div class="spec-axis">${axis}</div>
          ${CTRL}
          <audio class="pl-media" preload="none" src="${audSrc}"></audio>
        </div></div>`;
    }

    if (audSrc) {
      return `<div class="cell cell-audio">
        <div class="cell-label"><span class="name">${isRef ? 'Reference Audio (48kHz)' : 'Target Audio (48kHz)'}</span></div>
        <div class="pl aud" style="display:flex; flex-direction:column; justify-content:center; align-items:center; background:hsl(var(--bg-card)); border:1px solid hsl(var(--border)); border-radius:6px; min-height:86px; padding:0.75rem 1rem;">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:hsl(var(--fg-light)); width:100%; text-align:left; margin-bottom:6px;">Native Audio (48kHz WAV)</div>
          <div class="pl-track vid-bar" style="width:100%; height:4px; background:hsl(var(--border)); border-radius:2px; cursor:pointer; position:relative; margin-bottom:8px;">
            <div class="pl-fill" style="height:100%; width:0%; background:hsl(var(--primary)); border-radius:2px;"></div>
          </div>
          ${CTRL}
          <audio class="pl-media" preload="none" src="${audSrc}"></audio>
        </div></div>`;
    }

    return `<div class="cell cell-telemetry-notice">
      <div class="cell-label"><span class="name">${isRef ? 'Energy Profile' : 'Contact Work Profile'}</span></div>
      <div class="telemetry-box">
        <span class="badge-tag ${c.health === 'severe' ? 'badge-fail' : c.health === 'warning' ? 'badge-warn' : 'badge-pass'}">
          ${c.health === 'severe' ? 'High Energy Spike' : c.health === 'warning' ? 'Moderate Energy Defect' : 'Clean Physical Contact'}
        </span>
        <div class="t-bodies-label">Single-Step Peak:</div>
        <div class="t-bodies-val font-mono">${c.max_spike_mJ.toFixed(2)} mJ</div>
      </div>
    </div>`;
  }

  function auditCard(c) {
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
          ${videoCell(c, "ref", "Reference (Before)")}
          ${specCell(c, "ref")}
        </div>
        <div class="audit-col">
          ${videoCell(c, "tar", "Target (Ground Truth)")}
          ${specCell(c, "tar")}
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

  const PAGE_SIZE = 30;
  let visibleCount = PAGE_SIZE;

  function renderList() {
    const list = document.getElementById("case-list");
    const currentBins = auditData.metrics[activeMetric].bins;
    const items = (currentBins[activeP] || []).slice();
    const sortKey = activeMetric === "max_spike" ? "max_spike_mJ" : activeMetric === "ratio" ? "ratio_pct" : "tot_inj_mJ";
    items.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));

    if (!items.length) {
      list.innerHTML = `<p class="empty-note">No cases available in ${activeP}.</p>`;
      fitSpacer();
      updateNav();
      return;
    }

    const visibleItems = items.slice(0, visibleCount);
    let html = visibleItems.map(auditCard).join("");

    if (items.length > visibleCount) {
      const remaining = items.length - visibleCount;
      html += `<div class="load-more-container" style="text-align:center; padding: 2.5rem 1rem; margin-top: 1rem;">
        <button id="btn-load-more" class="load-more-btn" type="button">
          Load More (50 of ${remaining} remaining)
        </button>
        <button id="btn-load-all" class="load-more-btn" type="button" style="margin-left: 12px; background: hsl(var(--fg-light) / 0.1); color: hsl(var(--fg)); border-color: hsl(var(--border));">
          Display All (${items.length} pairs)
        </button>
      </div>`;
    }

    list.innerHTML = html;
    list.querySelectorAll(".pl").forEach(initPlayer);

    const btnMore = document.getElementById("btn-load-more");
    if (btnMore) {
      btnMore.addEventListener("click", () => {
        visibleCount += 50;
        renderList();
      });
    }

    const btnAll = document.getElementById("btn-load-all");
    if (btnAll) {
      btnAll.addEventListener("click", () => {
        visibleCount = items.length;
        renderList();
      });
    }

    fitSpacer();
    updateNav();
  }

  function render() {
    renderMetricPicker();
    renderPercentileChips();
    renderList();
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

