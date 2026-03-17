const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const projectData = [
  {
    title: "Indra",
    meta: "Cornell AI Hackathon · Mar 2026",
    summary: "AI SOP compliance monitoring system for regulated manufacturing workflows.",
    points: [
      "Processed production video with Python, YOLOv8, and GPT-4o to detect operational steps.",
      "Built a rule-based validation engine against structured SOP dependency graphs.",
      "Generated compliance logs and evidence artifacts for audit workflows."
    ],
    githubUrl: "https://github.com/aliabbaskhalfan/Indra-MVP"
  },
  {
    title: "Riverkeepers Donor Intelligence Platform",
    meta: "Sep 2025 - Dec 2025",
    summary: "Geospatial analytics platform for donor and engagement data.",
    points: [
      "Built interactive donor analysis with Python, Leaflet.js, and JavaScript.",
      "Designed CSV ingestion and data-normalization workflows for clustered donor distributions.",
      "Deployed the platform with Streamlit for nonprofit reporting and outreach."
    ],
    githubUrl: "https://github.com/aarithundi9/NYCF_BioKind"
  },
  {
    title: "kevit03.github.io",
    meta: "Personal site",
    summary: "Portfolio site built for GitHub Pages with separate work, photo, and contact views.",
    points: [
      "Structured as a static multi-page frontend.",
      "Uses a dedicated photo mosaic page and a separate contact page.",
      "Written to keep copy simple and presentation direct."
    ],
    githubUrl: "https://github.com/kevit03/kevit03.github.io",
    liveUrl: "https://kevit03.github.io"
  }
];

function photo(fileName, details) {
  const stem = fileName.replace(/\.[^.]+$/, "");

  return {
    id: stem,
    src: `images/web/${stem}.jpg`,
    thumb: `images/thumbs/${stem}.jpg`,
    title: details.title,
    caption: details.caption,
    description: details.description,
    location: details.location,
    camera: details.camera,
    alt: details.alt,
    layout: details.layout || "standard"
  };
}

const galleryData = [
  photo("image1.JPG", {
    title: "Desert Welcome",
    caption: "Las Vegas, Nevada · 2025",
    description: "Las Vegas sign study.",
    location: "Las Vegas, NV",
    camera: "Sony A6400 · 18-105 mm",
    alt: "The Welcome to Fabulous Las Vegas sign framed by palm trees and storefronts.",
    layout: "tall"
  }),
  photo("image2.JPG", {
    title: "After Rain",
    caption: "Zion National Park, Utah · 2025",
    description: "Cloud cover over the canyon after rain.",
    location: "Zion National Park, UT",
    camera: "Sony A6400 · 18-105 mm",
    alt: "Mist settling over Zion canyon cliffs after rain.",
    layout: "feature"
  }),
  photo("image3.JPG", {
    title: "Bowling Night",
    caption: "Hackensack, New Jersey · 2026",
    description: "Friends at the lane.",
    location: "Hackensack, NJ",
    camera: "Fujifilm 100VI",
    alt: "Friends standing beside bowling lanes and watching a turn in progress.",
    layout: "wide"
  }),
  photo("image4.JPG", {
    title: "Rosetta Table",
    caption: "Manhattan, New York · 2026",
    description: "Rosetta Bakery tabletop frame.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "Pastries from Rosetta Bakery on a tray over a wooden table.",
    layout: "standard"
  }),
  photo("image5.JPG", {
    title: "Waterfront Pause",
    caption: "Secaucus, New Jersey · 2026",
    description: "Night portrait by the water.",
    location: "Secaucus, NJ",
    camera: "Fujifilm 100VI",
    alt: "A person looking out over a waterfront at night while holding a phone.",
    layout: "wide"
  }),
  photo("image6.JPG", {
    title: "Snow Session",
    caption: "Manhattan, New York · 2026",
    description: "Piano in Washington Square Park.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "A pianist playing an upright piano outdoors in a snowy park.",
    layout: "large"
  }),
  photo("image7.JPG", {
    title: "Canyon Light",
    caption: "Grand Canyon, Arizona · 2025",
    description: "Grand Canyon landscape.",
    location: "Grand Canyon, AZ",
    camera: "Sony A6400 · 18-105 mm",
    alt: "A wide view of the Grand Canyon under streaked clouds.",
    layout: "feature"
  }),
  photo("image8.JPG", {
    title: "Strip Garden",
    caption: "Las Vegas, Nevada · 2025",
    description: "Las Vegas Strip garden frame.",
    location: "Las Vegas, NV",
    camera: "Sony A6400 · 18-105 mm",
    alt: "A futuristic building and garden pond on the Las Vegas Strip.",
    layout: "wide"
  }),
  photo("image9.JPG", {
    title: "Gorilla Study",
    caption: "Bronx, New York · 2026",
    description: "Bronx Zoo portrait.",
    location: "Bronx, NY",
    camera: "Sony A6400 · 18-105 mm",
    alt: "Close-up of a gorilla looking toward the camera in an enclosure.",
    layout: "tall"
  }),
  photo("image10.JPG", {
    title: "White Manna",
    caption: "Hackensack, New Jersey · 2026",
    description: "Neon sign at dusk.",
    location: "Hackensack, NJ",
    camera: "Fujifilm 100VI",
    alt: "The White Manna Hamburgers neon sign glowing at dusk.",
    layout: "standard"
  }),
  photo("image11.JPG", {
    title: "River Sunset",
    caption: "Chicago, Illinois · 2026",
    description: "Chicago River at sunset.",
    location: "Chicago, IL",
    camera: "iPhone 14 Pro",
    alt: "Sunset light reflecting on the Chicago River between downtown buildings.",
    layout: "tall"
  }),
  photo("image12.JPG", {
    title: "Chicago Glow",
    caption: "Chicago, Illinois · 2026",
    description: "Street-level skyline light.",
    location: "Chicago, IL",
    camera: "iPhone 14 Pro",
    alt: "Chicago street and skyline at sunset with warm light behind the buildings.",
    layout: "large"
  }),
  photo("image13.jpg", {
    title: "Cue Up",
    caption: "Manhattan, New York · 2026",
    description: "Pool hall portrait.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "A person lining up a shot at a pool table in a dim billiards hall.",
    layout: "tall"
  }),
  photo("image14.jpg", {
    title: "Rack Room",
    caption: "Manhattan, New York · 2026",
    description: "Billiards still life.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "Crossed pool cues on a blue billiards table with a racked set of balls in the background.",
    layout: "standard"
  }),
  photo("image15.JPG", {
    title: "Blue Hour Blizzard",
    caption: "Plainview, New York · 2026",
    description: "Snow at blue hour.",
    location: "Plainview, NY",
    camera: "Sony A6400 · 18-105 mm",
    alt: "A snowy suburban street at blue hour with a lamp post in the foreground.",
    layout: "wide"
  })
];

let currentIndex = 0;

function renderProjects() {
  const list = $("#projectList");

  if (!list) return;

  const fragment = document.createDocumentFragment();

  projectData.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-row";

    const meta = document.createElement("div");
    meta.className = "project-row__meta";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = project.title;
    const info = document.createElement("p");
    info.textContent = project.meta;

    titleWrap.append(title, info);
    meta.append(titleWrap);

    const summary = document.createElement("p");
    summary.className = "project-row__summary";
    summary.textContent = project.summary;

    const points = document.createElement("ul");
    points.className = "project-row__points";

    project.points.forEach((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      points.appendChild(item);
    });

    const links = document.createElement("div");
    links.className = "project-row__links";

    const github = document.createElement("a");
    github.href = project.githubUrl;
    github.target = "_blank";
    github.rel = "noreferrer";
    github.textContent = "Repository";
    links.appendChild(github);

    if (project.liveUrl) {
      const live = document.createElement("a");
      live.href = project.liveUrl;
      live.target = "_blank";
      live.rel = "noreferrer";
      live.textContent = "Live site";
      links.appendChild(live);
    }

    article.append(meta, summary, points, links);
    fragment.appendChild(article);
  });

  list.replaceChildren(fragment);
}

function updateGalleryTileState(index) {
  $$(".photo-tile").forEach((tile, tileIndex) => {
    const isActive = tileIndex === index;
    tile.classList.toggle("is-active", isActive);
    tile.setAttribute("aria-pressed", String(isActive));
  });
}

function showImage(index) {
  const item = galleryData[index];

  if (!item) return;

  currentIndex = index;

  $("#galleryImage").src = item.src;
  $("#galleryImage").alt = item.alt;
  $("#galleryTitle").textContent = item.title;
  $("#galleryCaption").textContent = item.caption;
  $("#galleryLocation").textContent = item.location;
  $("#galleryCamera").textContent = item.camera;
  $("#galleryDescription").textContent = item.description;

  updateGalleryTileState(index);
}

function renderGalleryGrid() {
  const grid = $("#galleryGrid");

  if (!grid) return;

  const fragment = document.createDocumentFragment();

  galleryData.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `photo-tile photo-tile--${item.layout}`;
    button.setAttribute("aria-label", `${item.title} ${item.caption}`);
    button.setAttribute("aria-pressed", "false");

    const image = document.createElement("img");
    image.src = item.thumb;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const meta = document.createElement("span");
    meta.className = "photo-tile__meta";

    const title = document.createElement("span");
    title.className = "photo-tile__title";
    title.textContent = item.title;

    const caption = document.createElement("span");
    caption.className = "photo-tile__caption";
    caption.textContent = item.location;

    meta.append(title, caption);
    button.append(image, meta);
    button.addEventListener("click", () => showImage(index));

    fragment.appendChild(button);
  });

  grid.replaceChildren(fragment);
}

function setupGalleryControls() {
  $("#galleryPrev")?.addEventListener("click", () => {
    showImage((currentIndex - 1 + galleryData.length) % galleryData.length);
  });

  $("#galleryNext")?.addEventListener("click", () => {
    showImage((currentIndex + 1) % galleryData.length);
  });
}

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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const context = canvas.getContext("2d");

  if (!context) return;

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
  renderProjects();
  renderGalleryGrid();
  setupGalleryControls();

  if ($("#galleryImage")) {
    showImage(6);
  }
});
