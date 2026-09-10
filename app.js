/* Case gallery: category picker, subcategory chips, one card per case, spectrogram players. */

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

  function label(key, kind) {
    const l = LABELS[key];
    const code = l.code ? `<span class="code">${l.code}</span>` : "";
    return `<div class="cell-label">${code}<span class="name">${esc(l.name)}</span><span class="kind">${kind}</span></div>`;
  }

  function videoCell(dir, key) {
    return `<div class="cell">${label(key, "video")}
      <video controls preload="none" playsinline poster="${dir}/${key}_poster.webp" src="${dir}/${key}.mp4"></video></div>`;
  }

  function specCell(dir, key) {
    const ticks = FTICKS.map(([f, y]) => `<div class="spec-ftick" style="bottom:${(y * 100).toFixed(2)}%"><span>${f >= 1000 ? (f / 1000) + " kHz" : f + " Hz"}</span></div>`).join("");
    const axis = [0, 1, 2, 3, 4, 5].map(t => `<span style="left:${t / DUR * 100}%">${t === 5 ? "5 s" : t}</span>`).join("");
    return `<div class="cell">${label(key, "audio")}
      <div class="spec">
        <div class="spec-plot"><img src="${dir}/${key}_spec.webp" alt="" loading="lazy" draggable="false">${ticks}<div class="spec-head"></div></div>
        <div class="spec-axis">${axis}</div>
        <div class="spec-ctrl">
          <button class="spec-play" type="button" aria-label="Play"><svg class="i-play"><use href="#i-play"/></svg><svg class="i-pause"><use href="#i-pause"/></svg></button>
          <span class="spec-time">0.00 s</span>
        </div>
        <audio preload="none" src="${dir}/${key}.m4a"></audio>
      </div></div>`;
  }

  function captionCell(text) {
    return `<div class="cell"><div class="cell-label"><span>Caption</span></div><div class="caption">${esc(text)}</div></div>`;
  }

  function caseCard(c) {
    const dir = `${MEDIA}/${c.cat}/${c.sub}/${c.id}`;
    return `<article class="case" id="${c.cat}-${c.sub}-${c.id}">
      <div class="case-head"><span class="case-idx">${c.id}</span><span class="case-path">${title(c.cat)} / ${title(c.sub)}</span></div>
      <div class="case-body">
        <div class="block left">
          ${videoCell(dir, "ref")}${videoCell(dir, "tar")}
          ${specCell(dir, "ref")}${specCell(dir, "tar")}
          ${captionCell(c.caption)}${videoCell(dir, "m1")}
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
    list.querySelectorAll(".spec").forEach(initSpec);
  }

  /* ---------- spectrogram player ---------- */
  function initSpec(root) {
    const audio = root.querySelector("audio");
    const plot = root.querySelector(".spec-plot");
    const head = root.querySelector(".spec-head");
    const time = root.querySelector(".spec-time");
    const btn = root.querySelector(".spec-play");
    let pending = null;
    let raf = 0;
    let wasPlaying = false;

    function place(t) {
      head.style.left = (Math.max(0, Math.min(DUR, t)) / DUR * 100) + "%";
      time.textContent = t.toFixed(2) + " s";
    }

    function seek(t) {
      t = Math.max(0, Math.min(DUR, t));
      if (audio.readyState >= 1) {
        audio.currentTime = Math.min(t, audio.duration || t);
      } else {
        pending = t;
        audio.preload = "auto";
        audio.load();
      }
      place(t);
    }

    audio.addEventListener("loadedmetadata", () => {
      if (pending !== null) { audio.currentTime = Math.min(pending, audio.duration || pending); pending = null; }
    });

    function tick() {
      place(audio.currentTime);
      if (!audio.paused && !audio.ended) raf = requestAnimationFrame(tick);
    }

    audio.addEventListener("play", () => { root.classList.add("playing"); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
    audio.addEventListener("pause", () => { root.classList.remove("playing"); cancelAnimationFrame(raf); place(audio.currentTime); });
    audio.addEventListener("ended", () => { root.classList.remove("playing"); cancelAnimationFrame(raf); place(audio.currentTime); });

    btn.addEventListener("click", () => {
      if (audio.paused || audio.ended) audio.play().catch(() => {});
      else audio.pause();
    });

    function fracOf(e) {
      const r = plot.getBoundingClientRect();
      return (e.clientX - r.left) / r.width;
    }

    plot.addEventListener("pointerdown", e => {
      e.preventDefault();
      plot.setPointerCapture(e.pointerId);
      wasPlaying = !audio.paused && !audio.ended;
      if (wasPlaying) audio.pause();
      root.classList.add("dragging");
      seek(fracOf(e) * DUR);
    });
    plot.addEventListener("pointermove", e => {
      if (!root.classList.contains("dragging")) return;
      seek(fracOf(e) * DUR);
    });
    function release(e) {
      if (!root.classList.contains("dragging")) return;
      root.classList.remove("dragging");
      if (wasPlaying) audio.play().catch(() => {});
      wasPlaying = false;
    }
    plot.addEventListener("pointerup", release);
    plot.addEventListener("pointercancel", release);
  }

  // One sound at a time: starting any player pauses every other audio or video on the page.
  document.addEventListener("play", e => {
    const me = e.target;
    if (!(me instanceof HTMLMediaElement)) return;
    document.querySelectorAll("audio, video").forEach(m => { if (m !== me && !m.paused) m.pause(); });
  }, true);

  render();
})();
