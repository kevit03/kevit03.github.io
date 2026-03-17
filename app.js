const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const githubProfileFallback = {
  publicRepos: 8,
  followers: 1,
  following: 8
};

const pinnedProjectFallbacks = [
  {
    slug: "kevit03/kevit03.github.io",
    title: "kevit03.github.io",
    description: "This portfolio rebuild. Real photos, sharper art direction, and cleaner personal storytelling.",
    language: "CSS",
    liveUrl: "https://kevit03.github.io",
    ownerLabel: "Personal site"
  },
  {
    slug: "aarithundi9/NYCF_BioKind",
    title: "NYCF_BioKind",
    description: "Donation-data cleanup, ETL work, and reporting tools tied to BioKind and Riverkeeper.",
    language: "Python",
    ownerLabel: "Client work"
  },
  {
    slug: "aliabbaskhalfan/Indra-MVP",
    title: "Indra-MVP",
    description: "AI-powered SOP verification for regulated manufacturing. Built for a health AI hackathon.",
    language: "TypeScript",
    ownerLabel: "Hackathon"
  },
  {
    slug: "kevit03/Atlas---RoCathon",
    title: "Atlas---RoCathon",
    description: "AI-guided creator screening for RoCathon with product-minded MVP execution.",
    language: "JavaScript",
    ownerLabel: "MVP"
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
    alt: details.alt
  };
}

const galleryData = [
  photo("image13.jpg", {
    title: "Cue Up",
    caption: "Manhattan, New York",
    description: "A portrait built around the room, the blue felt, and the pause right before the shot.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "A person lining up a shot at a pool table in a dim billiards hall."
  }),
  photo("image7.JPG", {
    title: "Canyon Light",
    caption: "Grand Canyon, Arizona",
    description: "Big scale, broad sky, and enough space for the landscape to feel slow.",
    location: "Grand Canyon, AZ",
    camera: "Sony A6400",
    alt: "A wide view of the Grand Canyon under streaked clouds."
  }),
  photo("image11.JPG", {
    title: "River Sunset",
    caption: "Chicago, Illinois",
    description: "A vertical city frame where the light drops between buildings and stretches down the river.",
    location: "Chicago, IL",
    camera: "iPhone 14 Pro",
    alt: "Sunset light reflecting on the Chicago River between downtown buildings."
  }),
  photo("image15.JPG", {
    title: "Blue Hour Blizzard",
    caption: "Plainview, New York",
    description: "Everything gets quiet when the snow settles and the color drains down to blue.",
    location: "Plainview, NY",
    camera: "Sony A6400",
    alt: "A snowy suburban street at blue hour with a lamp post in the foreground."
  }),
  photo("image2.JPG", {
    title: "After Rain",
    caption: "Zion National Park, Utah",
    description: "Cloud cover turns the canyon softer and quieter than expected.",
    location: "Zion National Park, UT",
    camera: "Sony A6400",
    alt: "Mist settling over Zion canyon cliffs after rain."
  }),
  photo("image10.JPG", {
    title: "White Manna",
    caption: "Hackensack, New Jersey",
    description: "Retro neon, overcast dusk, and a frame that stays a little loose on purpose.",
    location: "Hackensack, NJ",
    camera: "Fujifilm 100VI",
    alt: "The White Manna Hamburgers neon sign glowing at dusk."
  })
];

let currentIndex = 0;

function formatDate(dateValue) {
  if (!dateValue) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateValue));
  } catch {
    return "";
  }
}

function renderProjects(projects) {
  const grid = $("#projectGrid");

  if (!grid) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project";

    const top = document.createElement("div");
    top.className = "project__top";

    const label = document.createElement("span");
    label.className = "project__eyebrow";
    label.textContent = project.ownerLabel || "Project";

    const body = document.createElement("div");

    const title = document.createElement("h3");
    title.className = "project__title";
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.className = "project__desc";
    desc.textContent = project.description;

    body.append(title, desc);
    top.append(label);
    card.append(top, body);

    const meta = document.createElement("div");
    meta.className = "project__meta";

    const language = project.language || "Repository";
    const owner = project.slug.split("/")[0];
    const updated = project.updatedAt ? `Updated ${formatDate(project.updatedAt)}` : "";

    [language, owner !== "kevit03" ? `Owner ${owner}` : "Owner kevit03", updated]
      .filter(Boolean)
      .forEach((value) => {
        const pill = document.createElement("span");
        pill.textContent = value;
        meta.appendChild(pill);
      });

    const links = document.createElement("div");
    links.className = "project__links";

    const githubLink = document.createElement("a");
    githubLink.className = "action";
    githubLink.href = project.githubUrl;
    githubLink.target = "_blank";
    githubLink.rel = "noreferrer";
    githubLink.textContent = "Repository";
    links.appendChild(githubLink);

    if (project.liveUrl) {
      const liveLink = document.createElement("a");
      liveLink.className = "action";
      liveLink.href = project.liveUrl;
      liveLink.target = "_blank";
      liveLink.rel = "noreferrer";
      liveLink.textContent = "Live site";
      links.appendChild(liveLink);
    }

    card.append(meta, links);
    fragment.appendChild(card);
  });

  grid.replaceChildren(fragment);
}

async function hydratePinnedProjects() {
  const fallbackProjects = pinnedProjectFallbacks.map((project) => ({
    ...project,
    githubUrl: `https://github.com/${project.slug}`
  }));

  renderProjects(fallbackProjects);

  const results = await Promise.allSettled(
    pinnedProjectFallbacks.map(async (project) => {
      const response = await fetch(`https://api.github.com/repos/${project.slug}`);

      if (!response.ok) {
        throw new Error(`GitHub request failed for ${project.slug}`);
      }

      const data = await response.json();

      return {
        ...project,
        title: data.name || project.title,
        description: data.description || project.description,
        language: data.language || project.language,
        githubUrl: data.html_url || `https://github.com/${project.slug}`,
        liveUrl: project.liveUrl || data.homepage || "",
        updatedAt: data.pushed_at || data.updated_at || "",
        ownerLabel: data.owner?.login === "kevit03" ? project.ownerLabel : "Collaboration"
      };
    })
  );

  const hydratedProjects = results.map((result, index) =>
    result.status === "fulfilled" ? result.value : fallbackProjects[index]
  );

  renderProjects(hydratedProjects);
}

function updateGalleryTileState(index) {
  $$(".photo-tile").forEach((tile, tileIndex) => {
    tile.classList.toggle("is-active", tileIndex === index);
    tile.setAttribute("aria-pressed", String(tileIndex === index));
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
  $("#galleryDescription").textContent = item.description;
  $("#galleryLocation").textContent = item.location;
  $("#galleryCamera").textContent = item.camera;

  updateGalleryTileState(index);
}

function renderGalleryGrid() {
  const grid = $("#galleryGrid");

  if (!grid) return;

  const fragment = document.createDocumentFragment();

  galleryData.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-tile";
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

function setupScrollSpy() {
  const links = $$(".site-nav__link");
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible?.target?.id) return;

      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-30% 0px -50% 0px",
      threshold: [0.2, 0.4, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupIntro() {
  const intro = $("#introScreen");
  const canvas = $("#introCanvas");
  const skip = $("#skipIntro");

  if (!intro || !canvas) return;

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
    context.fillStyle = "rgba(4, 7, 12, 0.14)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px "IBM Plex Mono"`;

    columns.forEach((y, index) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = index * fontSize;

      context.fillStyle = index % 11 === 0 ? "#ff6f4d" : "#92ff48";
      context.fillText(text, x, y);
      columns[index] = y > canvas.height + Math.random() * 150 ? 0 : y + fontSize;
    });

    animationId = window.requestAnimationFrame(drawRain);
  }

  function dismissIntro() {
    intro.classList.add("is-hidden");
    window.cancelAnimationFrame(animationId);
  }

  resizeCanvas();
  drawRain();

  window.addEventListener("resize", resizeCanvas);
  skip?.addEventListener("click", dismissIntro);
  window.setTimeout(dismissIntro, 2800);
}

async function hydrateGitHubSignals() {
  const baseText = $(".quick-facts__item:nth-child(2) strong");

  if (baseText) {
    baseText.textContent = "Products, data, robotics";
  }

  try {
    const response = await fetch("https://api.github.com/users/kevit03");

    if (!response.ok) {
      throw new Error("GitHub profile request failed");
    }

    const data = await response.json();
    const repos = data.public_repos ?? githubProfileFallback.publicRepos;
    const followers = data.followers ?? githubProfileFallback.followers;
    const following = data.following ?? githubProfileFallback.following;

    if (baseText) {
      baseText.textContent = `${repos} repos / ${followers} followers / ${following} following`;
    }
  } catch {
    if (baseText) {
      baseText.textContent = `${githubProfileFallback.publicRepos} repos / ${githubProfileFallback.followers} followers / ${githubProfileFallback.following} following`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupIntro();
  setupScrollSpy();
  renderGalleryGrid();
  showImage(currentIndex);
  hydrateGitHubSignals();
  hydratePinnedProjects();
});
