const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function defaultState() {
  return {
    projects: [
      {
        id: "geospatial-heatmap",
        title: "Geospatial Density Heatmap",
        description:
          "Interactive geospatial visualization overlaying clustered donor locations on a dynamic map using Python, Leaflet, and JavaScript. Centralized CSV pipeline and automated file-path handling for scalable data.",
        githubUrl: "https://github.com/kevit03"
      },
      {
        id: "stock-ml-model",
        title: "ML Model for Stock Predictions",
        description:
          "Machine learning model served via an API using RSI, rolling volatility, and moving averages to predict equity movements (e.g., TSLA, GOOG), with a RAG-enhanced pipeline for more robust inference.",
        githubUrl: "https://github.com/kevit03"
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

    const links = document.createElement("div");
    links.className = "project__links";

    if (p.githubUrl) {
      const githubLink = document.createElement("a");
      githubLink.href = p.githubUrl;
      githubLink.target = "_blank";
      githubLink.textContent = "View on GitHub";
      links.appendChild(githubLink);
    }

    if (p.liveUrl) {
      const liveLink = document.createElement("a");
      liveLink.href = p.liveUrl;
      liveLink.target = "_blank";
      liveLink.textContent = "Live demo";
      links.appendChild(liveLink);
    }

    card.appendChild(title);
    card.appendChild(desc);
    if (links.children.length > 0) {
      card.appendChild(links);
    }
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

const galleryData = [
  {
    src: "images/image1.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Las Vegas, NV • 2025",
    blog: "Las Vegas Sign"
  },
  {
    src: "images/image2.JPG",
    title: "Sony A6400 E PZ 18–105 mm F4 G OSS",
    caption: "Zion National Park, UT • 2025",
    blog: "Byproduct of the early morning rain"

  },
  {
    src: "images/image3.JPG",
    title: "Fujifilm 100VI",
    caption: "Hackensack, NJ• 2026",
    blog: "Bowling w/ NYU Soon guys "

  },
  {
    src: "images/image4.JPG",
    title: "Fujifilm 100VI",
    caption: "New York City, NY • 2026",
    blog: "Rosetta Bakery"

    
  },
    {
    src: "images/image5.JPG",
    title: "Fujifilm 100VI",
    caption: "Secaucus, NJ• 2026",
    blog: "S/O Chris Kim for being the subject"

  }
];

let currentIndex = 0;
let galleryElements = {};

function showImage(index) {
  const item = galleryData[index];

  galleryElements.img.src = item.src;
  galleryElements.img.classList.remove("is-visible");
  
  requestAnimationFrame(() => {
    galleryElements.img.classList.add("is-visible");
  });

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
    toggleBlog: $("#toggleBlog"),
    grid: $("#galleryGrid"),
    gridView: $("#galleryGridView"),
    slideshowView: $("#gallerySlideshowView"),
    modeSelect: $("#galleryModeSelect"),
    detail: $("#photoDetail"),
    detailImage: $("#photoDetailImage"),
    detailTitle: $("#photoDetailTitle"),
    detailCaption: $("#photoDetailCaption"),
    detailNotes: $("#photoDetailNotes"),
    detailClose: $("#photoDetailClose")
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

  setupGalleryGrid();
  setupGalleryModeSwitch();
}

function setupGalleryGrid() {
  if (!galleryElements.grid) return;

  const fragment = document.createDocumentFragment();
  galleryData.forEach((item, index) => {
    const tile = document.createElement("button");
    tile.className = "photo-tile";
    tile.type = "button";
    tile.setAttribute("data-index", String(index));

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title || "Photo";

    const overlay = document.createElement("div");
    overlay.className = "photo-tile-overlay";

    const overlayInner = document.createElement("div");
    const title = document.createElement("div");
    title.className = "photo-tile-title";
    title.textContent = item.title;

    const caption = document.createElement("div");
    caption.className = "photo-tile-caption";
    caption.textContent = item.caption;

    overlayInner.appendChild(title);
    overlayInner.appendChild(caption);
    overlay.appendChild(overlayInner);

    tile.appendChild(img);
    tile.appendChild(overlay);

    tile.addEventListener("click", () => {
      openPhotoDetail(index);
    });

    fragment.appendChild(tile);
  });

  galleryElements.grid.innerHTML = "";
  galleryElements.grid.appendChild(fragment);

  if (galleryElements.detailClose) {
    galleryElements.detailClose.addEventListener("click", () => {
      galleryElements.detail?.classList.remove("is-open");
      galleryElements.detail?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function openPhotoDetail(index) {
  const item = galleryData[index];
  if (!item || !galleryElements.detail) return;

  galleryElements.detailImage.src = item.src;
  galleryElements.detailTitle.textContent = item.title;
  galleryElements.detailCaption.textContent = item.caption;
  galleryElements.detailNotes.textContent = item.blog;

  galleryElements.detail.classList.add("is-open");
  galleryElements.detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupGalleryModeSwitch() {
  if (!galleryElements.modeSelect) return;

  const { modeSelect, slideshowView, gridView } = galleryElements;

  const applyMode = (mode) => {
    const isGrid = mode === "grid";
    slideshowView?.classList.toggle("is-active", !isGrid);
    gridView?.classList.toggle("is-active", isGrid);
  };

  applyMode(modeSelect.value || "slideshow");

  modeSelect.addEventListener("change", () => {
    applyMode(modeSelect.value);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupGallery();
});