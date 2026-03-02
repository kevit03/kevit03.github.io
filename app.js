/* eslint-disable no-alert */
const STORAGE_KEY = "kt_portfolio_v1";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function nowIso() {
  return new Date().toISOString();
}

function formatDateShort(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);
  } catch {
    return "—";
  }
}

function uid() {
  return crypto?.randomUUID?.() ?? `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-visible");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("is-visible"), 2600);
}

function safeUrl(url) {
  const s = (url ?? "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    return u.toString();
  } catch {
    return "";
  }
}

function parseTags(s) {
  return (s ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function defaultState() {
  const created = nowIso();
  return {
    version: 1,
    updatedAt: created,
    theme: "light",
    githubProfileUrl: "https://github.com/",
    projects: [
      {
        id: uid(),
        title: "Project One",
        description: "Replace this sample with your real project. Add GitHub + (optional) demo links.",
        tags: ["web", "starter"],
        githubUrl: "https://github.com/",
        demoUrl: "",
        createdAt: created,
        updatedAt: created,
      },
      {
        id: uid(),
        title: "Project Two",
        description: "Drag projects to reorder them. Use Export to back up your data.",
        tags: ["systems"],
        githubUrl: "https://github.com/",
        demoUrl: "",
        createdAt: created,
        updatedAt: created,
      },
    ],
    images: [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultState();

    const state = {
      ...defaultState(),
      ...parsed,
    };

    state.projects = Array.isArray(state.projects) ? state.projects : [];
    state.images = Array.isArray(state.images) ? state.images : [];
    state.updatedAt = state.updatedAt || nowIso();
    return state;
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  state.updatedAt = nowIso();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setTheme(theme) {
  const t = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
}

function bytesToHuman(bytes) {
  const b = Number(bytes || 0);
  if (!Number.isFinite(b) || b <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(b) / Math.log(1024)));
  const v = b / 1024 ** i;
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

function estimateLocalStorageSize(state) {
  try {
    return new Blob([JSON.stringify(state)]).size;
  } catch {
    return 0;
  }
}

function renderStats(state) {
  $("#statProjects").textContent = String(state.projects.length);
  $("#statImages").textContent = String(state.images.length);
  $("#statUpdated").textContent = formatDateShort(state.updatedAt);
}

function renderGithubProfile(state) {
  const url = safeUrl(state.githubProfileUrl) || "https://github.com/";
  $("#githubProfileLink").href = url;
  $("#githubProfileInput").value = url === "https://github.com/" ? "" : url;
}

function createProjectCard(project) {
  const el = document.createElement("article");
  el.className = "card project";
  el.dataset.projectId = project.id;
  el.draggable = true;

  const title = document.createElement("h3");
  title.className = "project__title";
  title.textContent = project.title || "Untitled project";

  const desc = document.createElement("p");
  desc.className = "project__desc";
  desc.textContent = (project.description || "").trim() || "—";

  const tags = document.createElement("div");
  tags.className = "tags";
  for (const t of project.tags || []) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t;
    tags.appendChild(tag);
  }

  const links = document.createElement("div");
  links.className = "project__links";

  const github = safeUrl(project.githubUrl);
  if (github) {
    const a = document.createElement("a");
    a.className = "link-pill";
    a.href = github;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `<span class="pill-dot" aria-hidden="true"></span><span>GitHub</span>`;
    links.appendChild(a);
  }

  const demo = safeUrl(project.demoUrl);
  if (demo) {
    const a = document.createElement("a");
    a.className = "link-pill";
    a.href = demo;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `<span class="pill-dot pill-dot--demo" aria-hidden="true"></span><span>Demo</span>`;
    links.appendChild(a);
  }

  const meta = document.createElement("div");
  meta.className = "project__meta";
  meta.innerHTML = `<span>Updated ${formatDateShort(project.updatedAt || project.createdAt)}</span>`;

  const actions = document.createElement("div");
  actions.className = "project__actions";
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "icon-button";
  editBtn.title = "Edit";
  editBtn.setAttribute("aria-label", "Edit project");
  editBtn.textContent = "✎";
  actions.appendChild(editBtn);
  meta.appendChild(actions);

  const top = document.createElement("div");
  top.className = "project__top";
  top.appendChild(title);
  top.appendChild(document.createElement("div")); // spacer

  el.appendChild(top);
  el.appendChild(desc);
  if ((project.tags || []).length) el.appendChild(tags);
  if (github || demo) el.appendChild(links);
  el.appendChild(meta);

  editBtn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("editProject", { detail: { id: project.id } })));
  el.addEventListener("dblclick", () => window.dispatchEvent(new CustomEvent("editProject", { detail: { id: project.id } })));

  return el;
}

function matchesProject(project, q) {
  const query = (q || "").trim().toLowerCase();
  if (!query) return true;
  const hay = [
    project.title,
    project.description,
    (project.tags || []).join(" "),
    project.githubUrl,
    project.demoUrl,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(query);
}

function renderProjects(state, view) {
  const grid = $("#projectGrid");
  grid.innerHTML = "";

  let list = [...state.projects];
  if (view.sort === "title") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  else list.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));

  if (view.query) list = list.filter((p) => matchesProject(p, view.query));

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.style.gridColumn = "1 / -1";
    empty.style.padding = "14px";
    empty.innerHTML = `<strong>No projects found.</strong><div class="muted">Try clearing your search or add a new project.</div>`;
    grid.appendChild(empty);
    return;
  }

  for (const p of list) grid.appendChild(createProjectCard(p));
}

function openProjectModal(state, projectId) {
  const modal = $("#projectModal");
  const form = $("#projectForm");
  const isEdit = Boolean(projectId);
  const project = isEdit ? state.projects.find((p) => p.id === projectId) : null;

  $("#projectModalTitle").textContent = isEdit ? "Edit project" : "Add a project";
  $("#deleteProject").style.visibility = isEdit ? "visible" : "hidden";
  $("#deleteProject").dataset.projectId = projectId || "";

  $("#pTitle").value = project?.title || "";
  $("#pTags").value = (project?.tags || []).join(", ");
  $("#pDesc").value = project?.description || "";
  $("#pGithub").value = project?.githubUrl || "";
  $("#pDemo").value = project?.demoUrl || "";

  form.dataset.mode = isEdit ? "edit" : "create";
  form.dataset.projectId = projectId || "";

  if (typeof modal.showModal === "function") modal.showModal();
  else toast("Your browser doesn’t support <dialog>. Try Chrome/Safari.");
}

function closeDialog(id) {
  const d = $(id);
  if (d && d.open) d.close();
}

function setupProjectModal(stateRef, rerender) {
  $("#openProjectModal").addEventListener("click", () => openProjectModal(stateRef.get(), ""));
  $("#closeProjectModal").addEventListener("click", () => closeDialog("#projectModal"));
  $("#cancelProject").addEventListener("click", () => closeDialog("#projectModal"));

  window.addEventListener("editProject", (e) => {
    openProjectModal(stateRef.get(), e.detail.id);
  });

  $("#deleteProject").addEventListener("click", () => {
    const projectId = $("#deleteProject").dataset.projectId;
    if (!projectId) return;
    const ok = confirm("Delete this project?");
    if (!ok) return;

    const state = stateRef.get();
    state.projects = state.projects.filter((p) => p.id !== projectId);
    saveState(state);
    stateRef.set(state);
    closeDialog("#projectModal");
    toast("Project deleted.");
    rerender();
  });

  $("#projectForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const mode = form.dataset.mode || "create";
    const projectId = form.dataset.projectId || "";

    const title = $("#pTitle").value.trim();
    const tags = parseTags($("#pTags").value);
    const description = $("#pDesc").value.trim();
    const githubUrl = safeUrl($("#pGithub").value);
    const demoUrl = safeUrl($("#pDemo").value);

    if (!title) {
      toast("Title is required.");
      return;
    }

    const state = stateRef.get();
    if (mode === "edit" && projectId) {
      const p = state.projects.find((x) => x.id === projectId);
      if (!p) return;
      p.title = title;
      p.tags = tags;
      p.description = description;
      p.githubUrl = githubUrl;
      p.demoUrl = demoUrl;
      p.updatedAt = nowIso();
      toast("Project updated.");
    } else {
      const t = nowIso();
      state.projects.unshift({
        id: uid(),
        title,
        description,
        tags,
        githubUrl,
        demoUrl,
        createdAt: t,
        updatedAt: t,
      });
      toast("Project added.");
    }

    saveState(state);
    stateRef.set(state);
    closeDialog("#projectModal");
    rerender();
  });
}

function setupProjectSearchAndSort(viewRef, rerender) {
  $("#projectSearch").addEventListener("input", (e) => {
    viewRef.set({ ...viewRef.get(), query: e.target.value });
    rerender();
  });

  $$(".segmented__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".segmented__item").forEach((b) => b.classList.toggle("is-active", b === btn));
      viewRef.set({ ...viewRef.get(), sort: btn.dataset.sort || "updated" });
      rerender();
    });
  });
}

function setupGithubProfile(stateRef, rerender) {
  $("#saveGithubProfile").addEventListener("click", () => {
    const url = safeUrl($("#githubProfileInput").value);
    const state = stateRef.get();
    state.githubProfileUrl = url || "https://github.com/";
    saveState(state);
    stateRef.set(state);
    toast("GitHub link saved.");
    rerender();
  });
}

function setupTheme(stateRef) {
  $("#themeToggle").addEventListener("click", () => {
    const state = stateRef.get();
    state.theme = state.theme === "light" ? "dark" : "light";
    saveState(state);
    stateRef.set(state);
    setTheme(state.theme);
    toast(`Theme: ${state.theme}`);
  });
}

function setupExportImport(stateRef, rerender) {
  $("#exportData").addEventListener("click", () => {
    const state = stateRef.get();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kevin-tang-site-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    toast(`Exported backup (${bytesToHuman(blob.size)}).`);
  });

  $("#importData").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid JSON");

      const merged = {
        ...defaultState(),
        ...parsed,
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        images: Array.isArray(parsed.images) ? parsed.images : [],
      };

      saveState(merged);
      stateRef.set(merged);
      toast("Imported backup.");
      rerender();
    } catch {
      toast("Import failed. Make sure it’s a JSON export from this site.");
    }
  });
}

function setupResets(stateRef, rerender) {
  $("#resetProjects").addEventListener("click", () => {
    const ok = confirm("Reset to the sample projects? (Your gallery stays.)");
    if (!ok) return;
    const state = stateRef.get();
    const d = defaultState();
    state.projects = d.projects;
    saveState(state);
    stateRef.set(state);
    toast("Projects reset.");
    rerender();
  });

  $("#resetAll").addEventListener("click", () => {
    const ok = confirm("Reset all local data (projects + gallery + settings)?");
    if (!ok) return;
    const d = defaultState();
    saveState(d);
    stateRef.set(d);
    setTheme(d.theme);
    toast("All local data reset.");
    rerender();
  });
}

// Drag & drop reorder (projects)
function setupProjectDnD(stateRef, viewRef, rerender) {
  const grid = $("#projectGrid");
  let dragId = null;

  function getCardFromEvent(e) {
    return e.target?.closest?.(".project");
  }

  grid.addEventListener("dragstart", (e) => {
    const card = getCardFromEvent(e);
    if (!card) return;
    dragId = card.dataset.projectId;
    card.classList.add("is-dragging");
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", dragId);
    } catch {
      // ignore
    }
  });

  grid.addEventListener("dragend", (e) => {
    const card = getCardFromEvent(e);
    if (card) card.classList.remove("is-dragging");
    $$(".project", grid).forEach((c) => c.classList.remove("is-over"));
    dragId = null;
  });

  grid.addEventListener("dragover", (e) => {
    const card = getCardFromEvent(e);
    if (!card || !dragId) return;
    e.preventDefault();
    card.classList.add("is-over");
  });

  grid.addEventListener("dragleave", (e) => {
    const card = getCardFromEvent(e);
    if (card) card.classList.remove("is-over");
  });

  grid.addEventListener("drop", (e) => {
    const card = getCardFromEvent(e);
    if (!card || !dragId) return;
    e.preventDefault();
    card.classList.remove("is-over");

    const dropId = card.dataset.projectId;
    if (!dropId || dropId === dragId) return;

    if ((viewRef.get().query || "").trim()) {
      toast("Clear search before reordering.");
      return;
    }
    if (viewRef.get().sort !== "updated") {
      toast("Switch sort to Recently updated before reordering.");
      return;
    }

    const state = stateRef.get();
    const fromIdx = state.projects.findIndex((p) => p.id === dragId);
    const toIdx = state.projects.findIndex((p) => p.id === dropId);
    if (fromIdx < 0 || toIdx < 0) return;
    const [moved] = state.projects.splice(fromIdx, 1);
    state.projects.splice(toIdx, 0, moved);
    saveState(state);
    stateRef.set(state);
    toast("Reordered.");
    rerender();
  });
}

// Gallery
async function fileToJpegDataUrl(file, opts) {
  const maxSide = opts?.maxSide ?? 1600;
  const quality = clamp(opts?.quality ?? 0.85, 0.6, 0.92);
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);

  let dataUrl = canvas.toDataURL("image/jpeg", quality);

  // If it's still too big, step down quality a bit.
  for (const q of [0.8, 0.75, 0.7]) {
    if (dataUrl.length < 1_200_000) break; // heuristic: ~1.2MB string
    dataUrl = canvas.toDataURL("image/jpeg", q);
  }

  bitmap.close?.();
  return { dataUrl, width: w, height: h };
}

function renderGallery(state) {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";

  const images = [...state.images].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  if (!images.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.style.gridColumn = "1 / -1";
    empty.style.padding = "14px";
    empty.innerHTML = `<strong>No images yet.</strong><div class="muted">Upload JPEGs to build a small gallery.</div>`;
    grid.appendChild(empty);
    return;
  }

  for (const img of images) {
    const card = document.createElement("div");
    card.className = "card thumb";
    card.dataset.imageId = img.id;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb__button";
    btn.setAttribute("aria-label", `Edit details for ${img.title || img.name || "image"}`.trim());

    const image = document.createElement("img");
    image.className = "thumb__img";
    image.loading = "lazy";
    image.src = img.dataUrl;
    image.alt = img.title || img.name || "Uploaded JPEG";
    btn.appendChild(image);

    const meta = document.createElement("div");
    meta.className = "thumb__meta";

    const title = document.createElement("div");
    title.className = "thumb__title";
    title.textContent = img.title || img.name || "Untitled photo";
    meta.appendChild(title);

    const row1 = document.createElement("div");
    row1.className = "thumb__metaRow";
    if (img.location) {
      const span = document.createElement("span");
      span.className = "thumb__metaValue";
      span.textContent = img.location;
      row1.appendChild(span);
    }
    if (img.takenAt) {
      const span = document.createElement("span");
      span.className = "thumb__metaValue";
      span.textContent = img.takenAt;
      row1.appendChild(span);
    }
    if (row1.childNodes.length) meta.appendChild(row1);

    const row2 = document.createElement("div");
    row2.className = "thumb__metaRow";
    if (img.camera) {
      const label = document.createElement("span");
      label.className = "thumb__metaLabel";
      label.textContent = "Camera";
      const val = document.createElement("span");
      val.className = "thumb__metaValue";
      val.textContent = img.camera;
      row2.appendChild(label);
      row2.appendChild(val);
    }
    if (img.settings) {
      const label = document.createElement("span");
      label.className = "thumb__metaLabel";
      label.textContent = row2.childNodes.length ? "•" : "Settings";
      const val = document.createElement("span");
      val.className = "thumb__metaValue";
      val.textContent = img.settings;
      row2.appendChild(label);
      row2.appendChild(val);
    }
    if (row2.childNodes.length) meta.appendChild(row2);

    if (img.description) {
      const row3 = document.createElement("div");
      row3.className = "thumb__metaRow";
      const val = document.createElement("span");
      val.className = "thumb__metaValue";
      val.textContent = img.description;
      row3.appendChild(val);
      meta.appendChild(row3);
    }

    btn.addEventListener("click", () => window.dispatchEvent(new CustomEvent("editImage", { detail: { id: img.id } })));

    card.appendChild(btn);
    card.appendChild(meta);
    grid.appendChild(card);
  }
}

function setupGallery(stateRef, rerender) {
  const modal = $("#imageModal");
  const form = $("#imageForm");

  function openImageEditor(imageId) {
    const img = stateRef.get().images.find((x) => x.id === imageId);
    if (!img) return;

    form.dataset.imageId = imageId;
    $("#imagePreview").src = img.dataUrl;
    $("#imagePreview").alt = img.title || img.name || "Uploaded JPEG";
    $("#imgTitle").value = img.title || "";
    $("#imgTakenAt").value = img.takenAt || "";
    $("#imgLocation").value = img.location || "";
    $("#imgCamera").value = img.camera || "";
    $("#imgSettings").value = img.settings || "";
    $("#imgDescription").value = img.description || "";

    if (typeof modal.showModal === "function") modal.showModal();
  }

  $("#closeImageModal").addEventListener("click", () => closeDialog("#imageModal"));
  $("#cancelImage").addEventListener("click", () => closeDialog("#imageModal"));

  window.addEventListener("editImage", (e) => openImageEditor(e.detail.id));

  $("#deleteImage").addEventListener("click", () => {
    const id = form.dataset.imageId;
    if (!id) return;
    const ok = confirm("Delete this image?");
    if (!ok) return;
    const state = stateRef.get();
    state.images = state.images.filter((x) => x.id !== id);
    saveState(state);
    stateRef.set(state);
    closeDialog("#imageModal");
    toast("Image deleted.");
    rerender();
  });

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const jpeg = files.filter((f) => f.type === "image/jpeg" || f.name.toLowerCase().endsWith(".jpg") || f.name.toLowerCase().endsWith(".jpeg"));
    const rejected = files.length - jpeg.length;
    if (rejected) toast(`Skipped ${rejected} non-JPEG file(s).`);

    if (!jpeg.length) return;

    const state = stateRef.get();
    let added = 0;

    for (const f of jpeg) {
      if (f.size > 20 * 1024 * 1024) {
        toast(`Skipped ${f.name}: too large.`);
        continue;
      }

      try {
        const { dataUrl, width, height } = await fileToJpegDataUrl(f, { maxSide: 1600, quality: 0.85 });

        const next = {
          id: uid(),
          name: (f.name || "image.jpg").slice(0, 80),
          dataUrl,
          width,
          height,
          createdAt: nowIso(),
          title: "",
          takenAt: "",
          location: "",
          camera: "",
          settings: "",
          description: "",
        };

        state.images.unshift(next);
        added += 1;

        // Avoid hard failure when localStorage is full: try save each addition.
        try {
          saveState(state);
        } catch {
          state.images.shift();
          toast("Storage full — export a backup, then clear the gallery.");
          break;
        }
      } catch {
        toast(`Couldn’t process ${f.name}.`);
      }
    }

    stateRef.set(state);
    if (added) toast(`Added ${added} image(s).`);
    rerender();
  }

  $("#imagePicker").addEventListener("change", async (e) => {
    const files = e.target.files;
    e.target.value = "";
    await handleFiles(files);
  });

  const dropzone = $("#dropzone");
  const overCls = () => dropzone.classList.add("is-over");
  const outCls = () => dropzone.classList.remove("is-over");

  ["dragenter", "dragover"].forEach((t) =>
    dropzone.addEventListener(t, (e) => {
      e.preventDefault();
      overCls();
    }),
  );
  ["dragleave", "drop"].forEach((t) =>
    dropzone.addEventListener(t, (e) => {
      e.preventDefault();
      outCls();
    }),
  );

  dropzone.addEventListener("drop", async (e) => {
    await handleFiles(e.dataTransfer?.files);
  });

  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $("#imagePicker").click();
    }
  });

  $("#clearGallery").addEventListener("click", () => {
    const ok = confirm("Clear the entire gallery on this device?");
    if (!ok) return;
    const state = stateRef.get();
    state.images = [];
    saveState(state);
    stateRef.set(state);
    toast("Gallery cleared.");
    rerender();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = form.dataset.imageId;
    if (!id) return;
    const state = stateRef.get();
    const img = state.images.find((x) => x.id === id);
    if (!img) return;

    img.title = $("#imgTitle").value.trim();
    img.takenAt = $("#imgTakenAt").value.trim();
    img.location = $("#imgLocation").value.trim();
    img.camera = $("#imgCamera").value.trim();
    img.settings = $("#imgSettings").value.trim();
    img.description = $("#imgDescription").value.trim();

    saveState(state);
    stateRef.set(state);
    toast("Image details saved.");
    closeDialog("#imageModal");
    rerender();
  });
}

function main() {
  $("#year").textContent = String(new Date().getFullYear());

  const stateRef = (() => {
    let state = loadState();
    return {
      get: () => state,
      set: (s) => {
        state = s;
      },
    };
  })();

  const viewRef = (() => {
    let view = { query: "", sort: "updated" };
    return { get: () => view, set: (v) => (view = v) };
  })();

  function rerender() {
    const state = stateRef.get();
    setTheme(state.theme);
    renderGithubProfile(state);
    renderStats(state);
    renderProjects(state, viewRef.get());
    renderGallery(state);

    const approx = estimateLocalStorageSize(state);
    if (approx > 4_500_000) {
      toast(`Heads up: local storage is getting full (~${bytesToHuman(approx)}). Export a backup soon.`);
    }
  }

  const state = stateRef.get();
  setTheme(state.theme);

  setupTheme(stateRef);
  setupGithubProfile(stateRef, rerender);
  setupProjectModal(stateRef, rerender);
  setupProjectSearchAndSort(viewRef, rerender);
  setupExportImport(stateRef, rerender);
  setupResets(stateRef, rerender);
  setupProjectDnD(stateRef, viewRef, rerender);
  setupGallery(stateRef, rerender);

  rerender();
}

// simple gallery slider
const galleryImages = [
  {
    src: "images/photo1.jpg",
    caption: "Sunset over Manhattan • 2025"
  },
  {
    src: "images/photo2.jpg",
    caption: "Brooklyn Bridge • 2025"
  },
  {
    src: "images/photo3.jpg",
    caption: "Street Portrait • 2024"
  }
];

// refined gallery

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
    blog: "The geometry here felt deliberate. I waited until a lone subject entered the frame."
  }
];

let currentIndex = 0;

const imgEl = document.getElementById("galleryImage");
const titleEl = document.getElementById("galleryTitle");
const captionEl = document.getElementById("galleryCaption");
const blogEl = document.getElementById("galleryBlogText");

function showImage(index){
  const item = galleryData[index];

  imgEl.classList.remove("is-visible");

  setTimeout(() => {
    imgEl.src = item.src;
    titleEl.textContent = item.title;
    captionEl.textContent = item.caption;
    blogEl.textContent = item.blog;

    imgEl.classList.add("is-visible");
  }, 200);
}

document.getElementById("galleryNext").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryData.length;
  showImage(currentIndex);
});

document.getElementById("galleryPrev").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryData.length) % galleryData.length;
  showImage(currentIndex);
});

document.getElementById("toggleBlog").addEventListener("click", () => {
  blogEl.classList.toggle("is-open");
});

document.addEventListener("DOMContentLoaded", () => {
  showImage(currentIndex);
});



//many bugs 