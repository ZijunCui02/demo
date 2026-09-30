/* Preview wall: every sampled pair as a silent looping clip (the reference, then the target), shuffled on each visit, edge to edge
   with no gaps. The column count follows the window width and every row is full (clips repeat to fill the last row and at least one
   screen); clips play only while they are on screen. */

(function () {
  const clips = (window.PREVIEW || []).slice();
  const wall = document.getElementById("wall");
  const TILE = 210; // target tile width in CSS pixels

  for (let i = clips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clips[i], clips[j]] = [clips[j], clips[i]];
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { rootMargin: "200px 0px" });

  let cols = 0;

  function tile(c) {
    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = true;
    v.preload = "auto";
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.poster = c.poster;
    v.src = c.src;
    return v;
  }

  function layout() {
    const width = wall.clientWidth || window.innerWidth;
    const n = Math.max(2, Math.round(width / TILE));
    if (n === cols || !clips.length) return;
    cols = n;
    const tileH = width / cols * 9 / 16;
    const screenRows = Math.ceil((window.innerHeight - wall.getBoundingClientRect().top) / tileH);
    const rows = Math.max(Math.ceil(clips.length / cols), screenRows);
    observer.disconnect();
    wall.style.setProperty("--cols", cols);
    wall.replaceChildren(...Array.from({ length: rows * cols }, (_, k) => tile(clips[k % clips.length])));
    wall.querySelectorAll("video").forEach(v => observer.observe(v));
  }

  let timer = null;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(layout, 200);
  });
  layout();
})();
