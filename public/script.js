/* AI Music Quiz Studio — Landing page JS */
(function () {
  const notesLayer = document.getElementById("notes-layer");
  const notes = [
    { left: "12%", delay: "0s",   color: "pink", char: "♪", size: 22 },
    { left: "78%", delay: "1.4s", color: "cyan", char: "♫", size: 26 },
    { left: "30%", delay: "2.7s", color: "pink", char: "♬", size: 20 },
    { left: "62%", delay: "3.6s", color: "cyan", char: "♩", size: 18 },
    { left: "48%", delay: "4.5s", color: "pink", char: "♪", size: 24 },
    { left: "88%", delay: "5.2s", color: "cyan", char: "♫", size: 20 },
  ];
  notes.forEach((n) => {
    const el = document.createElement("span");
    el.className = "note note-" + n.color;
    el.textContent = n.char;
    el.style.left = n.left;
    el.style.animationDelay = n.delay;
    el.style.fontSize = n.size + "px";
    notesLayer.appendChild(el);
  });

  document.getElementById("play-free").addEventListener("click", () => {
    window.location.href = "game.html?mode=free";
  });
  document.getElementById("play-ai").addEventListener("click", () => {
    window.location.href = "game.html?mode=openai";
  });

  // ── How-to-play modal ──────────────────────────────────
  const howtoModal  = document.getElementById("howto-modal");
  const howtoOpen   = document.getElementById("how-to-play-btn");
  const howtoClose  = document.getElementById("howto-close");
  const howtoGotIt  = document.getElementById("howto-got-it");

  function openHowto()  { howtoModal.classList.remove("hidden"); }
  function closeHowto() { howtoModal.classList.add("hidden"); }

  howtoOpen.addEventListener("click", openHowto);
  howtoClose.addEventListener("click", closeHowto);
  howtoGotIt.addEventListener("click", closeHowto);
  howtoModal.addEventListener("click", (e) => {
    if (e.target === howtoModal) closeHowto();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeHowto();
  });

  // ── Home leaderboard ───────────────────────────────────
  (async () => {
    const list = document.getElementById("leaderboard-list");
    if (!list) return;
    try {
      const res  = await fetch("/api/leaderboard");
      const data = res.ok ? await res.json() : [];
      if (!data.length) {
        list.innerHTML = '<div class="leaderboard-loading">No scores yet — be the first!</div>';
        return;
      }
      const medals = ["🥇", "🥈", "🥉"];
      list.innerHTML = data.map((r, i) => {
        const rankCls = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
        return `<div class="lb-row">
          <span class="lb-rank ${rankCls}">${medals[i] ?? i + 1}</span>
          <div class="lb-info">
            <span class="lb-name">${escHtml(r.name)}</span>
            <span class="lb-theme">${escHtml(r.theme || '')}</span>
          </div>
          <span class="lb-score">${r.score} pts</span>
        </div>`;
      }).join("");
    } catch (_) {
      list.innerHTML = '<div class="leaderboard-loading">Leaderboard unavailable</div>';
    }
  })();

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
