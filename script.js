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

/* ================= CONTACT FORM → MAILTO ================= */
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  formMessage.style.display = "block";

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill all the fields.";
    formMessage.className = "form-message error";
    return;
  }

  if (!nameRegex.test(name)) {
    formMessage.textContent = "Invalid name. Only letters and spaces are allowed.";
    formMessage.className = "form-message error";
    return;
  }

  if (!emailRegex.test(email)) {
    formMessage.textContent = "Invalid email address.";
    formMessage.className = "form-message error";
    return;
  }

  // Open the user's default email app with a pre-filled message to Neha
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Hi Neha,\n\n${message}\n\n— ${name} (${email})`);
  window.open(`mailto:tnehausrd@gmail.com?subject=${subject}&body=${body}`, "_self");

  formMessage.textContent = "Opening your email client… Message will be sent from your inbox!";
  formMessage.className = "form-message success";

  form.reset();

  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
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


/* ================= ASK NEHA AI CHATBOT ================= */
function toggleChat() {
  document.getElementById("chatbotWidget").classList.toggle("active");
}

const chatResponses = {
  internships: "Yes! Neha is actively looking for Software Engineering & Full-Stack Development internships. She is a 3rd-year B.Tech CSE student at Amrita Vishwa Vidyapeetham, Coimbatore. Feel free to reach out via the contact form or WhatsApp!",
  research: "Neha co-authored a research paper titled 'Deepfakes: A Review of Creation and Research Trends'. It was presented at the 11th ICTIS 2026 conference in Thailand and is accepted for publication in Springer (Lecture Notes in Networks and Systems). Check the Research tab for the full paper!",
  skills: "Neha's primary languages are Python and JavaScript. She also works with Flask, React, SQL, MongoDB, and is actively learning Full-Stack (Node.js) and exploring Machine Learning. She has hands-on experience with Gemini AI, OCR, and FastAPI.",
  contact: "You can email Neha at tnehausrd@gmail.com, connect on LinkedIn (linkedin.com/in/neha-1a9807355), or send a WhatsApp message using the button in the Contact section below!"
};

function askPreset(key) {
  const messagesEl = document.getElementById("chatbotMessages");

  // Show user question
  const questions = {
    internships: "💼 Are you open to internships?",
    research: "🎓 Tell me about your research paper!",
    skills: "🚀 What is your main programming language?",
    contact: "📧 How can I contact you?"
  };

  const userBubble = document.createElement("div");
  userBubble.className = "chatbot-bubble user";
  userBubble.textContent = questions[key];
  messagesEl.appendChild(userBubble);

  // Show typing indicator
  const typingBubble = document.createElement("div");
  typingBubble.className = "chatbot-bubble typing";
  typingBubble.textContent = "Typing…";
  messagesEl.appendChild(typingBubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  // Show AI response after a small delay
  setTimeout(() => {
    typingBubble.remove();
    const aiBubble = document.createElement("div");
    aiBubble.className = "chatbot-bubble ai";
    aiBubble.textContent = chatResponses[key];
    messagesEl.appendChild(aiBubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }, 800);
}

