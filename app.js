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

const galleryData = [
  {
    src: "images/image1.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Las Vegas, NV • 2025",
  },
  {
    src: "images/image2.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Zion National Park, UT • 2025",
  },
  {
    src: "images/image3.JPG",
    title: "Fujifilm 100VI",
    caption: "Hackensack, NJ• 2026",
  },
  {
    src: "images/image4.JPG",
    title: "Fujifilm 100VI",
    caption: "New York City, NY • 2026",
  }
];

let currentIndex = 0;

function showImage(index) {
  const img = $("#galleryImage");
  const title = $("#galleryTitle");
  const caption = $("#galleryCaption");
  const blog = $("#galleryBlogText");

  const item = galleryData[index];

  const newImg = img.cloneNode();
  newImg.src = item.src;
  newImg.classList.remove("is-visible");

  img.parentNode.appendChild(newImg);

  requestAnimationFrame(() => {
    newImg.classList.add("is-visible");
  });

  setTimeout(() => {
    img.remove();
    newImg.id = "galleryImage";
  }, 800);

  title.textContent = item.title;
  caption.textContent = item.caption;
  blog.textContent = item.blog;
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


document.addEventListener("DOMContentLoaded", () => {
  setTheme(state.theme);
  renderProjects();
  setupGallery();
});