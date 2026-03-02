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

function showImage(index) {
  const img = $("#galleryImage");
  const title = $("#galleryTitle");
  const caption = $("#galleryCaption");
  const blog = $("#galleryBlogText");

  const item = galleryData[index];

  img.classList.remove("is-visible");

  setTimeout(() => {
    img.src = item.src;
    img.classList.add("is-visible");
  }, 300);

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
  renderProjects();
  setupGallery();
});