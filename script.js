/* ================= TYPING EFFECT ================= */
const nameText = "Thota Neha";
let index = 0;
const typingEl = document.getElementById("typing-name");

function typeEffect() {
  if (typingEl && index < nameText.length) {
    typingEl.textContent += nameText.charAt(index);
    index++;
    setTimeout(typeEffect, 120);
  }
}
typeEffect();

/* ================= PORTFOLIO TABS ================= */
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(c =>
    c.classList.remove("active")
  );
  document.querySelectorAll(".tab-btn").forEach(b =>
    b.classList.remove("active")
  );

  document.getElementById(tabId).classList.add("active");

  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.textContent.toLowerCase().includes(tabId)) {
      btn.classList.add("active");
    }
  });
}

/* ================= CERTIFICATE MODAL ================= */
function openCert(src) {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
  `;

  const img = document.createElement("img");
  img.src = src;
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    border-radius: 14px;
    box-shadow: 0 0 40px rgba(168,85,247,0.6);
  `;

  modal.appendChild(img);
  modal.onclick = () => modal.remove();
  document.body.appendChild(modal);
}

/* ================= CONTACT FORM VALIDATION ================= */
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop reload

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  formMessage.style.display = "block";

  // EMPTY CHECK
  if (!name || !email || !message) {
    formMessage.textContent = "Please fill all the fields.";
    formMessage.className = "form-message error";
    return;
  }

  // NAME VALIDATION
  if (!nameRegex.test(name)) {
    formMessage.textContent =
      "Invalid name. Only letters and spaces are allowed.";
    formMessage.className = "form-message error";
    return;
  }

  // EMAIL VALIDATION
  if (!gmailRegex.test(email)) {
    formMessage.textContent =
      "Invalid email. Please use a valid @gmail.com address.";
    formMessage.className = "form-message error";
    return;
  }

  // SUCCESS
  formMessage.textContent =
    "Message sent successfully! I will get back to you soon.";
  formMessage.className = "form-message success";

  form.reset();

  // hide after 4 seconds
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 4000);
});


/* ================= PARTICLES ================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.6,
  dy: (Math.random() - 0.5) * 0.6
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(167,139,250,0.55)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();
