const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function setupActiveNav() {
  const page = document.body.dataset.page;

  $$(".site-nav__link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === page);
  });
}

function setupIntro() {
  const intro = $("#introScreen");
  const canvas = $("#introCanvas");
  const skip = $("#skipIntro");

  if (!intro || !canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let animationId = 0;
  let columns = [];
  const letters = "01KT<>[]{}#$%+*";
  const fontSize = 16;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Array.from({ length: Math.floor(canvas.width / fontSize) }, () =>
      Math.random() * canvas.height
    );
  }

  function drawRain() {
    context.fillStyle = "rgba(5, 8, 13, 0.14)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px "IBM Plex Mono"`;

    columns.forEach((y, index) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = index * fontSize;

      context.fillStyle = index % 9 === 0 ? "#dbe5ba" : "#b6d36d";
      context.fillText(text, x, y);
      columns[index] = y > canvas.height + Math.random() * 120 ? 0 : y + fontSize;
    });

    animationId = window.requestAnimationFrame(drawRain);
  }

  function dismissIntro() {
    intro.classList.add("is-hidden");
    window.cancelAnimationFrame(animationId);
  }

  resizeCanvas();

  if (!reduceMotion) {
    drawRain();
  }

  window.addEventListener("resize", resizeCanvas);
  skip?.addEventListener("click", dismissIntro);
  window.setTimeout(dismissIntro, reduceMotion ? 200 : 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  setupActiveNav();
  setupIntro();
});
