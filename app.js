"use strict";
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// --- demo access gate (client-side only, not real security) ---
$("enter").onclick = () => {
  if ($("code").value.trim().toUpperCase() === "RC-DEMO") {
    $("gate").hidden = true; $("chat").hidden = false; $("q").focus();
  } else {
    $("code").setAttribute("aria-invalid", "true");
    $("code").placeholder = "Wrong code — try RC-DEMO";
  }
};

// --- lightweight keyword retrieval, standing in for vector search ---
function score(question, sop) {
  const q = question.toLowerCase();
  return sop.keywords.reduce((n, k) => n + (q.includes(k) ? k.split(" ").length : 0), 0);
}
function retrieve(question) {
  return SOPS.map(s => ({ sop: s, score: score(question, s) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

function render(question) {
  const thread = $("thread");
  thread.insertAdjacentHTML("beforeend", `<div class="msg user">${esc(question)}</div>`);

  const hits = retrieve(question);
  let html = `<div class="msg bot">`;
  if (!hits.length) {
    html += `<p>No matching SOP found in this demo library for that question. In a live system this would fall back to a wider search or flag the gap to a team lead.</p>`;
  } else {
    const top = hits[0].sop;
    html += `<h3>Suggested steps — ${esc(top.title)}</h3><ol>` +
      top.steps.map(s => `<li>${esc(s)}</li>`).join("") + `</ol>`;
    html += `<h3>Related SOPs</h3><ul class="sops">` +
      hits.slice(0, 4).map(h => `<li><a href="${esc(h.sop.url)}" target="_blank" rel="noopener noreferrer">${esc(h.sop.title)}</a> <span class="cat">— ${esc(h.sop.category)}</span></li>`).join("") +
      `</ul><p class="note">Suggestion only — confirm the recorded Decision and Post-decision yourself.</p>`;
  }
  html += `</div>`;
  thread.insertAdjacentHTML("beforeend", html);
  thread.scrollTop = thread.scrollHeight;
}

$("f").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("q").value.trim();
  if (!v) return;
  render(v);
  $("f").reset();
});
