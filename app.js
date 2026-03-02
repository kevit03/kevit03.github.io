const $ = (sel) => document.querySelector(sel);

function nowIso() {
  return new Date().toISOString();
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
}

function defaultState() {
  const created = nowIso();
  return {
    theme: "light",
    projects: [
      {
        id: "1",
        title: "Project One",
        description: "Replace this sample with your real project.",
        createdAt: created,
        updatedAt: created
      }
    ]
  };
}

let state = defaultState();

function renderProjects() {
  const grid = $("#projectGrid");
  if (!grid) return;
  grid.innerHTML = "";

  state.projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project";

    const title = document.createElement("h3");
    title.className = "project__title";
    title.textContent = p.title;

    const desc = document.createElement("p");
    desc.className = "project__desc";
    desc.textContent = p.description;

    card.appendChild(title);
    card.appendChild(desc);
    grid.appendChild(card);
  });
}

/* ---------- CURATED GALLERY ---------- */

const galleryData = [
  {
    src: "images/photo1.jpg",
    title: "Evening Silence",
    caption: "Manhattan • 2025",
    blog: "I was drawn to the softness of the fading light. The city felt suspended in a quiet pause."
  },
  {
    src: "images/photo2.jpg",
    title: "Bridge Study",
    caption: "Brooklyn • 2025",
    blog: "The geometry felt deliberate. I waited until a lone subject entered the frame."
  }
];

let currentIndex = 0;

function showImage(index) {
  const img = $("#galleryImage");
  const title = $("#galleryTitle");
  const caption = $("#galleryCaption");
  const blog = $("#galleryBlogText");

  const item = galleryData[index];

  img.classList.remove("is-visible");

  setTimeout(() => {
    img.src = item.src;
    title.textContent = item.title;
    caption.textContent = item.caption;
    blog.textContent = item.blog;
    img.classList.add("is-visible");
  }, 200);
}

function setupGallery() {
  $("#galleryNext")?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    showImage(currentIndex);
  });

  $("#galleryPrev")?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    showImage(currentIndex);
  });

  $("#toggleBlog")?.addEventListener("click", () => {
    $("#galleryBlogText").classList.toggle("is-open");
  });

  showImage(currentIndex);
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  setTheme(state.theme);
  renderProjects();
  setupGallery();
});