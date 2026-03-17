const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const githubProfileFallback = {
  name: "Kevin Tang",
  bio: "Sophomore CS and DS @ New York University",
  avatarUrl: "https://avatars.githubusercontent.com/u/74779238?v=4",
  publicRepos: 8,
  followers: 1,
  following: 8
};

const pinnedProjectFallbacks = [
  {
    slug: "kevit03/kevit03.github.io",
    title: "kevit03.github.io",
    description:
      "This portfolio site: a clean static build that blends work, photography, and contact details in one place.",
    language: "CSS",
    liveUrl: "https://kevit03.github.io",
    ownerLabel: "Personal site"
  },
  {
    slug: "aarithundi9/NYCF_BioKind",
    title: "NYCF_BioKind",
    description:
      "Analytics and data-cleaning work tied to BioKind and Riverkeeper, including donation data processing and dashboard-driven reporting.",
    language: "Python",
    ownerLabel: "Collaboration"
  },
  {
    slug: "aliabbaskhalfan/Indra-MVP",
    title: "Indra-MVP",
    description:
      "Indra — AI-powered SOP execution verification for regulated manufacturing. Cornell Health AI Hackathon MVP.",
    language: "TypeScript",
    ownerLabel: "Collaboration"
  },
  {
    slug: "kevit03/Atlas---RoCathon",
    title: "Atlas---RoCathon",
    description: "Atlas Brief - AI-guided creator screening for RoCathon.",
    language: "JavaScript",
    ownerLabel: "Pinned repo"
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
    layout: details.layout || "standard",
    preview: Boolean(details.preview)
  };
}

// To add a new photo later:
// 1. Drop the original file into /images
// 2. Run ./scripts/optimize-images.sh
// 3. Add one new photo(...) entry below
const galleryData = [
  photo("image1.JPG", {
    title: "Desert Welcome",
    caption: "Las Vegas, Nevada • 2025",
    description:
      "A tighter frame on the Las Vegas sign that lets the palms and storefronts do some of the scene-setting instead of treating it like a postcard.",
    location: "Las Vegas, NV",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "The Welcome to Fabulous Las Vegas sign framed by palm trees and storefronts.",
    layout: "tall"
  }),
  photo("image2.JPG", {
    title: "After Rain",
    caption: "Zion National Park, Utah • 2025",
    description:
      "Cloud cover hangs low over the canyon walls and softens the whole landscape, which makes the red earth feel quieter than usual.",
    location: "Zion National Park, UT",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "Mist settling over Zion canyon cliffs after rain.",
    layout: "feature",
    preview: true
  }),
  photo("image3.JPG", {
    title: "Bowling Night",
    caption: "Hackensack, New Jersey • 2026",
    description:
      "More about the pause than the throw itself, with everyone locked on the lane under the glow of the scoreboards.",
    location: "Hackensack, NJ",
    camera: "Fujifilm 100VI",
    alt: "Friends standing beside bowling lanes and watching a turn in progress.",
    layout: "wide"
  }),
  photo("image4.JPG", {
    title: "Rosetta Table",
    caption: "Manhattan, New York • 2026",
    description:
      "A close food frame that keeps the light warm and the tabletop simple, so the pastries feel like the whole story.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "Pastries from Rosetta Bakery on a tray over a wooden table.",
    layout: "standard"
  }),
  photo("image5.JPG", {
    title: "Waterfront Pause",
    caption: "Secaucus, New Jersey • 2026",
    description:
      "A quiet portrait from behind, with the skyline pushed into soft distance and the subject carrying the whole frame.",
    location: "Secaucus, NJ",
    camera: "Fujifilm 100VI",
    alt: "A person looking out over a waterfront at night while holding a phone.",
    layout: "wide"
  }),
  photo("image6.JPG", {
    title: "Snow Session",
    caption: "Manhattan, New York • 2026",
    description:
      "The pianist in Washington Square Park turns into a winter scene more than a performance shot, with the snow doing as much work as the subject.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "A pianist playing an upright piano outdoors in a snowy park.",
    layout: "large"
  }),
  photo("image7.JPG", {
    title: "Canyon Light",
    caption: "Grand Canyon, Arizona • 2025",
    description:
      "This frame leans into the scale of the canyon and the open sky, keeping the horizon broad and the texture layered.",
    location: "Grand Canyon, AZ",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "A wide view of the Grand Canyon under streaked clouds.",
    layout: "feature",
    preview: true
  }),
  photo("image8.JPG", {
    title: "Strip Garden",
    caption: "Las Vegas, Nevada • 2025",
    description:
      "Vegas can feel overwhelming, so this one works better by catching the softer side of it: water, flowers, palms, and one bold structure.",
    location: "Las Vegas, NV",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "A futuristic building and garden pond on the Las Vegas Strip.",
    layout: "wide"
  }),
  photo("image9.JPG", {
    title: "Gorilla Study",
    caption: "Bronx, New York • 2026",
    description:
      "The image lands because the gorilla feels almost contemplative, with the eye contact doing most of the work.",
    location: "Bronx, NY",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "Close-up of a gorilla looking toward the camera in an enclosure.",
    layout: "tall"
  }),
  photo("image10.JPG", {
    title: "White Manna",
    caption: "Hackensack, New Jersey • 2026",
    description:
      "Neon signage, overcast dusk, and a slightly tilted composition that keeps the retro feeling intact.",
    location: "Hackensack, NJ",
    camera: "Fujifilm 100VI",
    alt: "The White Manna Hamburgers neon sign glowing at dusk.",
    layout: "standard"
  }),
  photo("image11.JPG", {
    title: "River Sunset",
    caption: "Chicago, Illinois • 2026",
    description:
      "A vertical city frame where the sunset becomes a thin column of light between buildings and the river carries it downward.",
    location: "Chicago, IL",
    camera: "iPhone 14 Pro",
    alt: "Sunset light reflecting on the Chicago River between downtown buildings.",
    layout: "tall",
    preview: true
  }),
  photo("image12.JPG", {
    title: "Chicago Glow",
    caption: "Chicago, Illinois • 2026",
    description:
      "Street-level skyline light, held a little darker so the sky keeps its warmth and the towers stay crisp.",
    location: "Chicago, IL",
    camera: "iPhone 14 Pro",
    alt: "Chicago street and skyline at sunset with warm light behind the buildings.",
    layout: "large"
  }),
  photo("image13.jpg", {
    title: "Cue Up",
    caption: "Manhattan, New York • 2026",
    description:
      "A portrait that feels like it belongs to the room as much as the player, with the blue table pulling focus upward.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "A person lining up a shot at a pool table in a dim billiards hall.",
    layout: "tall",
    preview: true
  }),
  photo("image14.jpg", {
    title: "Rack Room",
    caption: "Manhattan, New York • 2026",
    description:
      "Minimal, graphic, and a little cinematic. The crossed cues make it feel more composed than casual.",
    location: "Manhattan, NY",
    camera: "Fujifilm 100VI",
    alt: "Crossed pool cues on a blue billiards table with a racked set of balls in the background.",
    layout: "standard"
  }),
  photo("image15.JPG", {
    title: "Blue Hour Blizzard",
    caption: "Plainview, New York • 2026",
    description:
      "Snow at the quiet point of the evening, when the whole neighborhood goes still and the light turns almost monochrome.",
    location: "Plainview, NY",
    camera: "Sony A6400 • 18-105 mm F4 G OSS",
    alt: "A snowy suburban street at blue hour with a lamp post in the foreground.",
    layout: "wide",
    preview: true
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
  } catch (error) {
    return "";
  }
}

function normalizeProfileBio(value) {
  return (value || "")
    .replace(/\bSophmore\b/g, "Sophomore")
    .replace(/\s+/g, " ")
    .trim();
}

function activateTab(tabId, { scroll = true } = {}) {
  $$(".nav-link").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabId);
  });

  $$(".tab-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === tabId);
  });

  if (tabId === "projects") {
    history.replaceState(null, "", window.location.pathname);
  } else {
    history.replaceState(null, "", `#${tabId}`);
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderProjects(projects) {
  const grid = $("#projectGrid");

  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project";

    const top = document.createElement("div");
    top.className = "project__top";

    const label = document.createElement("span");
    label.className = "project__eyebrow";
    label.textContent = project.ownerLabel || "Pinned repo";

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

    [language, owner !== "kevit03" ? `Owner: ${owner}` : "Owner: kevit03", updated]
      .filter(Boolean)
      .forEach((value) => {
        const pill = document.createElement("span");
        pill.textContent = value;
        meta.appendChild(pill);
      });

    const links = document.createElement("div");
    links.className = "project__links";

    const githubLink = document.createElement("a");
    githubLink.className = "button button--secondary";
    githubLink.href = project.githubUrl;
    githubLink.target = "_blank";
    githubLink.rel = "noreferrer";
    githubLink.textContent = "Repository";
    links.appendChild(githubLink);

    if (project.liveUrl) {
      const liveLink = document.createElement("a");
      liveLink.className = "button button--secondary";
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
        ownerLabel: data.owner?.login === "kevit03" ? "Pinned repo" : "Collaboration"
      };
    })
  );

  const hydratedProjects = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }

    return fallbackProjects[index];
  });

  renderProjects(hydratedProjects);
}

function renderWorkPhotos() {
  const grid = $("#workPhotoGrid");

  if (!grid) {
    return;
  }

  const previewPhotos = galleryData.filter((photoItem) => photoItem.preview).slice(0, 4);
  const fragment = document.createDocumentFragment();

  previewPhotos.forEach((photoItem) => {
    const figure = document.createElement("figure");
    figure.className = "work-photo";

    const image = document.createElement("img");
    image.src = photoItem.thumb;
    image.alt = photoItem.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = photoItem.caption;

    figure.append(image, caption);
    fragment.appendChild(figure);
  });

  grid.replaceChildren(fragment);
}

function updateGalleryTileState(index) {
  $$(".photo-tile").forEach((tile, tileIndex) => {
    const isActive = tileIndex === index;
    tile.classList.toggle("is-active", isActive);
    tile.setAttribute("aria-pressed", String(isActive));
  });
}

function preloadNearbyImages(index) {
  const neighborIndexes = [
    (index + 1) % galleryData.length,
    (index - 1 + galleryData.length) % galleryData.length
  ];

  neighborIndexes.forEach((neighborIndex) => {
    const preloadImage = new Image();
    preloadImage.src = galleryData[neighborIndex].src;
  });
}

function showImage(index) {
  const item = galleryData[index];

  if (!item) {
    return;
  }

  currentIndex = index;

  const galleryImage = $("#galleryImage");
  const galleryTitle = $("#galleryTitle");
  const galleryCaption = $("#galleryCaption");
  const galleryDescription = $("#galleryDescription");
  const galleryLocation = $("#galleryLocation");
  const galleryCamera = $("#galleryCamera");

  if (!galleryImage || !galleryTitle || !galleryCaption || !galleryDescription) {
    return;
  }

  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryTitle.textContent = item.title;
  galleryCaption.textContent = item.caption;
  galleryDescription.textContent = item.description;
  galleryLocation.textContent = item.location;
  galleryCamera.textContent = item.camera;

  updateGalleryTileState(index);

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => preloadNearbyImages(index));
  } else {
    setTimeout(() => preloadNearbyImages(index), 0);
  }
}

function renderGalleryGrid() {
  const grid = $("#galleryGrid");

  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  galleryData.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `photo-tile photo-tile--${item.layout}`;
    button.setAttribute("aria-label", `${item.title} — ${item.caption}`);
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

    button.addEventListener("click", () => {
      showImage(index);
    });

    fragment.appendChild(button);
  });

  grid.replaceChildren(fragment);
}

async function hydrateGitHubProfile() {
  const name = $("#profileName");
  const bio = $("#profileBio");
  const avatar = $("#profileAvatar");
  const repos = $("#profileRepos");
  const followers = $("#profileFollowers");
  const following = $("#profileFollowing");

  if (name) name.textContent = githubProfileFallback.name;
  if (bio) bio.textContent = githubProfileFallback.bio;
  if (avatar) avatar.src = githubProfileFallback.avatarUrl;
  if (repos) repos.textContent = String(githubProfileFallback.publicRepos);
  if (followers) followers.textContent = String(githubProfileFallback.followers);
  if (following) following.textContent = String(githubProfileFallback.following);

  try {
    const response = await fetch("https://api.github.com/users/kevit03");

    if (!response.ok) {
      throw new Error("GitHub profile request failed");
    }

    const data = await response.json();

    if (name) name.textContent = (data.name || githubProfileFallback.name).trim();
    if (bio) bio.textContent = normalizeProfileBio(data.bio) || githubProfileFallback.bio;
    if (avatar) avatar.src = data.avatar_url || githubProfileFallback.avatarUrl;
    if (repos) repos.textContent = String(data.public_repos ?? githubProfileFallback.publicRepos);
    if (followers) followers.textContent = String(data.followers ?? githubProfileFallback.followers);
    if (following) following.textContent = String(data.following ?? githubProfileFallback.following);
  } catch (error) {
    // Keep the fallback values when the API is unavailable.
  }
}

function setupNavigation() {
  $$(".nav-link").forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab);
    });
  });

  $$("[data-open-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.openTab);
    });
  });

  $("#siteLogo")?.addEventListener("click", () => activateTab("projects"));

  const initialHash = window.location.hash.replace("#", "");
  const validTabs = new Set(["projects", "gallery", "contact"]);

  if (validTabs.has(initialHash)) {
    activateTab(initialHash, { scroll: false });
  }
}

function setupGalleryControls() {
  $("#galleryPrev")?.addEventListener("click", () => {
    showImage((currentIndex - 1 + galleryData.length) % galleryData.length);
  });

  $("#galleryNext")?.addEventListener("click", () => {
    showImage((currentIndex + 1) % galleryData.length);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupGalleryControls();
  renderGalleryGrid();
  renderWorkPhotos();
  showImage(7);
  hydrateGitHubProfile();
  hydratePinnedProjects();
});
