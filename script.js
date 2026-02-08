let scale = 1;
let noClickCount = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const image = document.getElementById("mainImage");
const message = document.getElementById("message");
const finalText = document.getElementById("finalText");
const particles = document.getElementById("particles");

// Track No button offset for magnetic repel
let noX = 0;
let noY = 0;

/* 🎉 Particles */
function spawnParticles() {
  const emojis = ["❤️", "💖", "💘", "🎉", "✨"];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = "70%";
    particles.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

/* 💕 YES FLOW (used by both buttons) */
function triggerYesFlow() {
  message.style.display = "none";
  image.src = "2.gif";
  finalText.style.fontSize = Math.max(28, scale * 14) + "px";
  noBtn.style.display = "none";
  yesBtn.style.display = "none";
  spawnParticles();
}

/* ❌ NO CLICK → STILL YES 😈 */
noBtn.addEventListener("click", () => {
  noClickCount++;

  // Optional: tiny scale bump for drama
  scale += 0.15;
  image.style.transform = `scale(${scale})`;

  triggerYesFlow();
});

/* 🧲 Magnetic repel effect (infinite tries) */
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = cx - e.clientX;
  const dy = cy - e.clientY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const repelRadius = 120;

  if (distance < repelRadius) {
    const force = (repelRadius - distance) / repelRadius;
    noX += (dx / distance) * force * 16;
    noY += (dy / distance) * force * 16;
    noBtn.style.transform = `translate(${noX}px, ${noY}px)`;
  }
});

/* 💖 YES BUTTON */
yesBtn.addEventListener("click", () => {
  triggerYesFlow();
});
