/* Real Videos: the Case Study page's card, players and previous / next navigation for the 57 recorded real-world pairs, with the twelve methods of the real-pair comparison (November 10, 2026: our four models of the real-pair table, Stage 1 at epoch 25, Stages 1-2 at epoch 25, Stages 1-2-3 and the baseline; the epoch-12 Stages 1-2 model, its agentic-mask variant and the agentic masks left the page). */

(function () {
  const pairs = window.REAL_VIDEOS_MEDIA || [];

  const LABELS = {
    before: { name: "Input (with the object)", code: "" },
    after: { name: "Reference (recorded without it)", code: "" },
    vid_mask: { name: "Masks (agentic)", code: "" },
    aud_mask: { name: "Audio mask (agentic)", code: "" },
    stage1_e25: { name: "Ours, Stage 1 (epoch 25)", code: "" },
    stages12_e25: { name: "Ours, Stages 1-2 (epoch 25)", code: "" },
    stages123_u6750: { name: "Ours, Stages 1-2-3 (epoch 23.9)", code: "" },
    stages123_e25: { name: "Ours, Stages 1-2-3 (epoch 25)", code: "" },
    baseline: { name: "Ours, baseline (epoch 25)", code: "" },
    void_stages12: { name: "VOID Stages 1-2 (retrained) + MMAudio", code: "" },
    instructav2av_e19: { name: "InstructAV2AV (fine-tuned, epoch 19)", code: "" },
    void_mmaudio: { name: "VOID + MMAudio", code: "" },
    instructav2av: { name: "InstructAV2AV", code: "" },
    ltx_iclora_samaudio: { name: "LTX-2.5 IC-LoRA + SAM Audio", code: "" },
    minimax_h3: { name: "MiniMax H3 Ref2VA", code: "" },
    aved: { name: "AVED", code: "" },
    objwiper_mmaudio: { name: "Object-WIPER + MMAudio", code: "" }
  };

  // The method grid: our four models together in the first row, the eight other methods in the two rows below, four per row, in this order.
  // "stages123" is the pair's newest Stages 1-2-3 result: epoch 25 once it exists, else update 6,750 (epoch 23.9) of the run still in training.
  // A method without media for a pair shows a placeholder; a short last row is filled with empty cells.
  const OURS = ["stage1_e25", "stages12_e25", "stages123", "baseline"];
  const OTHERS = ["void_stages12", "instructav2av_e19", "void_mmaudio", "instructav2av", "ltx_iclora_samaudio", "minimax_h3", "aved", "objwiper_mmaudio"];
  const COLS = 4;
  const ROWS = [OURS];
  for (let i = 0; i < OTHERS.length; i += COLS) ROWS.push(OTHERS.slice(i, i + COLS));

  // Mel-scale positions (fraction of the plot height from the bottom) of the frequency ticks.
  const FTICKS = [[500, 0.1356], [2000, 0.4533], [8000, 0.8178]];

  function title(s) { return s.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase()); }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function renderPicker() {
    const el = document.getElementById("cat-picker");
    el.innerHTML = `<button class="cat-btn on" type="button">Recorded Pairs<span class="count">${pairs.length} cases</span></button>`;
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

  // The spectrogram spans the pair's own duration (3.0 to 5.0 s), with a tick at every whole second.
  function specCell(dir, key, dur) {
    const ticks = FTICKS.map(([f, y]) => `<div class="spec-ftick" style="bottom:${(y * 100).toFixed(2)}%"><span>${f >= 1000 ? (f / 1000) + " kHz" : f + " Hz"}</span></div>`).join("");
    const last = Math.floor(dur + 1e-6);
    const axis = Array.from({ length: last + 1 }, (_, t) => `<span style="left:${(t / dur * 100).toFixed(3)}%">${t === last ? t + " s" : t}</span>`).join("");
    return `<div class="cell cell-audio">
      <div class="pl spec" data-span="${dur}">
        <div class="pl-track spec-plot"><img src="${dir}/${key}_spec.webp" alt="" loading="lazy" draggable="false">${ticks}<div class="pl-head spec-head"></div></div>
        <div class="spec-axis">${axis}</div>
        ${CTRL}
        <audio class="pl-media" preload="none" src="${dir}/${key}.m4a"></audio>
      </div></div>`;
  }

  function captionCell(text) {
    return `<div class="cell caption-cell rv-caption"><div class="cell-label"><span class="name">Prompt</span></div><div class="caption">${esc(text)}</div></div>`;
  }

  // The audio-mask strip sits beside its video mask with a label of its own.
  function maskImageCell(dir, key) {
    const src = `${dir}/${key}.webp`;
    return `<div class="cell">${label(key)}<a class="mask-img" href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc(LABELS[key].name)}" loading="lazy"></a></div>`;
  }

  function placeholderVideo(key) {
    return `<div class="cell">${label(key)}<div class="cs-placeholder">Placeholder</div></div>`;
  }

  function placeholderSpec() {
    return `<div class="cell cell-audio"><div class="cs-placeholder cs-placeholder-spec"></div></div>`;
  }

  function placeholderMaskImage(key) {
    return `<div class="cell">${label(key)}<div class="cs-placeholder rv-placeholder-mask"></div></div>`;
  }

  const EMPTY = `<div class="cell"></div>`;

  function caseCard(c) {
    const dir = c.dir;
    const have = c.keys || [];
    const has = k => have.includes(k);
    const pad = row => EMPTY.repeat(COLS - row.length);
    const s3 = has("stages123_e25") ? "stages123_e25" : "stages123_u6750";
    const rows = ROWS.map(keys => keys.map(k => k === "stages123" ? s3 : k)).map(row =>
      row.map(k => has(k) ? videoCell(dir, k) : placeholderVideo(k)).join("") + pad(row) +
      row.map(k => has(k) ? specCell(dir, k, c.dur) : placeholderSpec()).join("") + pad(row)).join(`<div class="rule"></div>`);
    const [img, num, ...rest] = c.id.split("_");
    // Left: the input and the reference, the prompt, the masks our agent placed (video beside audio). Right: the method grid, our four models in the first row and the eight other methods four per row below (stacked under the left block on narrow screens).
    return `<article class="case" id="${esc(c.id)}">
      <div class="case-head"><span class="case-idx">${esc(img + "_" + num)}</span><span class="case-path">Real Recording / ${esc(title(rest.join("_")))}</span></div>
      <div class="case-body cs-body rv-body">
        <div class="block left">
          ${["before", "after"].map(k => has(k) ? videoCell(dir, k) : placeholderVideo(k)).join("")}
          ${["before", "after"].map(k => has(k) ? specCell(dir, k, c.dur) : placeholderSpec()).join("")}
          ${captionCell(c.caption || "")}
          ${has("vid_mask") ? videoCell(dir, "vid_mask") : placeholderVideo("vid_mask")}
          ${has("aud_mask") ? maskImageCell(dir, "aud_mask") : placeholderMaskImage("aud_mask")}
        </div>
        <div class="block right four">${rows}</div>
      </div>
    </article>`;
  }

  function render() {
    renderPicker();
    const list = document.getElementById("case-list");
    list.innerHTML = pairs.length ? pairs.map(caseCard).join("") : `<p class="empty-note">No pairs.</p>`;
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
    // A spectrogram spans the fixed duration of its pair (data-span, in seconds); a video bar spans the video's own duration.
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
