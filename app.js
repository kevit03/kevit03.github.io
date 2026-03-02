const $ = (sel) => document.querySelector(sel);

function defaultState() {
  return {
    projects: [
      {
        id: "1",
        title: "Project One",
        description: "Replace this sample with your real project."
      }
    ]
  };
}

let state = defaultState();

function renderProjects() {
  const grid = $("#projectGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const fragment = document.createDocumentFragment();
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
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

const galleryData = [
  {
    src: "images/image1.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Las Vegas, NV • 2025",
    blog: "testing"
  },
  {
    src: "images/image2.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Zion National Park, UT • 2025",
    blog: "testing"

  },
  {
    src: "images/image3.JPG",
    title: "Fujifilm 100VI",
    caption: "Hackensack, NJ• 2026",
    blog: "testing"

  },
  {
    src: "images/image4.JPG",
    title: "Fujifilm 100VI",
    caption: "New York City, NY • 2026",
    blog: "testing"

  }
];

let currentIndex = 0;
let galleryElements = {};

function showImage(index) {
  const item = galleryData[index];

  galleryElements.img.classList.remove("is-visible");
  
  galleryElements.img.addEventListener("transitionend", () => {
    galleryElements.img.src = item.src;
    galleryElements.img.classList.add("is-visible");
  }, { once: true });

  galleryElements.title.textContent = item.title;
  galleryElements.caption.textContent = item.caption;
  galleryElements.blog.textContent = item.blog;
}

function setupGallery() {
  galleryElements = {
    img: $("#galleryImage"),
    title: $("#galleryTitle"),
    caption: $("#galleryCaption"),
    blog: $("#galleryBlogText"),
    next: $("#galleryNext"),
    prev: $("#galleryPrev"),
    toggleBlog: $("#toggleBlog")
  };

  galleryElements.next?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    showImage(currentIndex);
  });

  galleryElements.prev?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    showImage(currentIndex);
  });

  galleryElements.toggleBlog?.addEventListener("click", () => {
    galleryElements.blog.classList.toggle("is-open");
  });

  showImage(currentIndex);
}


document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupGallery();
});