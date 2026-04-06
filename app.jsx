// Edit only PORTFOLIO_CONFIG to update the portfolio content.
const PORTFOLIO_CONFIG = {
  site: {
    name: "Kevin Tang",
    title: "Software Engineer and Data Scientist",
    description:
      "Software engineer focused on data products, tools, and prototypes ",
    email: "tk032606@gmail.com",
    resumeUrl: "./assets/kevin-tang-software-resume.pdf"
  },
  hero: {
    eyebrow: "Software Engineer / Data Systems / Product-Minded Builder",
    headline: "Studio-energy software work with an engineering core.",
    intro:
      "",
    note: "Built to be easy to edit. Every bit of personal content on this page lives in one config object.",
    badges: [
      { label: "Now", value: "NYU · Computer Science / Data Science" },
      { label: "Base", value: "New York" },
      { label: "Focus", value: "Data, product, engineering" },
      { label: "Mode", value: "Fast shipping, clean execution" }
    ]
  },
  socials: [
    { label: "GitHub", href: "https://github.com/kevit03", color: "sky" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-tang1/", color: "coral" },
    { label: "Email", href: "mailto:tk032606@gmail.com", color: "mint" }
  ],
  projects: [
    {
      name: "Indra",
      kicker: "Compliance AI",
      description:
        "AI SOP compliance monitoring for regulated manufacturing workflows.",
      stack: ["Python", "YOLOv8", "GPT-4o", "Computer Vision"],
      links: [
        { label: "Repo", href: "https://github.com/aliabbaskhalfan/Indra-MVP" }
      ],
      accent: "coral"
    },
    {
      name: "Riverkeepers Donor Intelligence Platform",
      kicker: "Geospatial Analytics",
      description:
        "Interactive donor analysis platform for nonprofit engagement and reporting.",
      stack: ["Python", "Leaflet.js", "Streamlit", "JavaScript"],
      links: [
        { label: "Repo", href: "https://github.com/aarithundi9/NYCF_BioKind" }
      ],
      accent: "sky"
    },
    {
      name: "Atlas",
      kicker: "Creator Screening",
      description:
        "Creator screening and matching workflow built for RoCathon.",
      stack: ["JavaScript", "Product Design", "Workflow Tools"],
      links: [
        { label: "Repo", href: "https://github.com/kevit03/Atlas---RoCathon" }
      ],
      accent: "sun"
    },
    {
      name: "Portfolio System",
      kicker: "Personal Brand",
      description:
        "A playful single-page portfolio built to keep content updates simple and fast.",
      stack: ["React", "Tailwind", "Static Frontend"],
      links: [
        { label: "Repo", href: "https://github.com/kevit03/kevit03.github.io" },
        { label: "Resume", href: "./assets/kevin-tang-software-resume.pdf" }
      ],
      accent: "lilac"
    }
  ],
  posts: [
    {
      title: "What Shipping Fast Actually Looks Like",
      date: "April 2, 2026",
      preview:
        "A short note on building MVPs without letting the architecture collapse under the demo.",
      href: "#"
    },
    {
      title: "Designing ETL Workflows That Survive Real Data",
      date: "March 18, 2026",
      preview:
        "Thoughts from building donor ingestion pipelines where the edge cases matter more than the happy path.",
      href: "#"
    },
    {
      title: "How I Think About Technical Portfolios",
      date: "March 5, 2026",
      preview:
        "A good portfolio should feel like a designed artifact, not a default template with repos pasted into it.",
      href: "#"
    }
  ],
  resume: {
    title: "Resume",
    body:
      "Open the PDF directly or preview it below. Swap the file path here when you update your resume.",
    ctaLabel: "Open Resume"
  },
  dropZone: {
    title: "Image Drop Zone",
    body:
      "Drop a PNG here and it will preview inline in the browser. No upload, no backend, no storage."
  }
};

const { useEffect, useMemo, useState } = React;

const customStyles = `
  :root {
    color-scheme: light;
  }

  html {
    scroll-behavior: smooth;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 10% 12%, rgba(255, 122, 89, 0.18), transparent 18%),
      radial-gradient(circle at 86% 14%, rgba(112, 165, 255, 0.18), transparent 20%),
      radial-gradient(circle at 78% 76%, rgba(182, 156, 255, 0.16), transparent 20%);
    z-index: 0;
  }

  .page-noise {
    background-image:
      linear-gradient(rgba(23, 23, 23, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23, 23, 23, 0.03) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .hero-panel,
  .section-card,
  .post-card,
  .drop-card,
  .resume-frame {
    position: relative;
    overflow: hidden;
  }

  .hero-panel::after,
  .section-card::after,
  .post-card::after,
  .drop-card::after,
  .resume-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(255,255,255,0.28), transparent 40%);
    opacity: 0.65;
  }

  .card-wobble {
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .card-wobble:hover {
    transform: translateY(-6px) rotate(-0.8deg);
  }

  .sticker {
    transform: rotate(-3deg);
  }

  .sticker-alt {
    transform: rotate(2.5deg);
  }

  .fade-up {
    opacity: 0;
    animation: fadeUp 680ms ease forwards;
  }

  .fade-up-delay-1 { animation-delay: 90ms; }
  .fade-up-delay-2 { animation-delay: 180ms; }
  .fade-up-delay-3 { animation-delay: 270ms; }
  .fade-up-delay-4 { animation-delay: 360ms; }

  .ticker-track {
    animation: ticker 22s linear infinite;
  }

  .ticker-wrap:hover .ticker-track {
    animation-play-state: paused;
  }

  .dash-glow {
    border-style: dashed;
    transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease;
  }

  .dash-glow.is-active {
    border-color: #171717;
    background-color: rgba(104, 211, 145, 0.18);
    transform: scale(1.01);
  }

  .preview-shadow {
    box-shadow: 0 16px 40px rgba(23, 23, 23, 0.14);
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const accentMap = {
  coral: {
    card: "bg-coral text-white",
    soft: "bg-[#ffe0d7]",
    border: "border-coral"
  },
  sky: {
    card: "bg-sky text-white",
    soft: "bg-[#dbe7ff]",
    border: "border-sky"
  },
  sun: {
    card: "bg-sun text-ink",
    soft: "bg-[#fff1bf]",
    border: "border-sun"
  },
  mint: {
    card: "bg-mint text-ink",
    soft: "bg-[#dbf4e3]",
    border: "border-mint"
  },
  lilac: {
    card: "bg-lilac text-white",
    soft: "bg-[#eee6ff]",
    border: "border-lilac"
  }
};

function ProjectCard({ project, index }) {
  const accent = accentMap[project.accent] || accentMap.sky;

  return (
    <article
      className={`section-card card-wobble fade-up fade-up-delay-${(index % 4) + 1} rounded-[2rem] border-2 border-ink/10 bg-white p-5 shadow-floaty`}
    >
      <div className={`mb-5 rounded-[1.5rem] ${accent.soft} px-4 py-4`}>
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/70">
            {project.kicker}
          </span>
          <span
            className={`sticker rounded-full border-2 border-ink/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] ${accent.card}`}
          >
            0{index + 1}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {project.stack.slice(0, 3).map((tag) => (
            <div
              key={tag}
              className="rounded-2xl border border-ink/10 bg-white/70 px-3 py-3 text-center text-xs font-mono uppercase tracking-[0.16em] text-ink/75"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-ink">{project.name}</h3>
      <p className="mt-3 text-base leading-7 text-ink/70">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-ink/75"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${accent.card}`}
          >
            <span>{link.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </article>
  );
}

function BlogCard({ post, index }) {
  const rotation = index % 2 === 0 ? "sticker" : "sticker-alt";

  return (
    <article className={`post-card fade-up fade-up-delay-${(index % 4) + 1} rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-floaty`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">{post.date}</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-ink">{post.title}</h3>
        </div>
        <span className={`${rotation} rounded-full bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white`}>
          Note
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">{post.preview}</p>
      <a
        href={post.href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4"
      >
        Read preview
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

function DropZone({ config }) {
  const [isOver, setIsOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFile(file) {
    if (!file) return;

    if (file.type !== "image/png") {
      setError("PNG files only.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setError("");
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsOver(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleChange(event) {
    handleFile(event.target.files?.[0]);
  }

  return (
    <section id="dropzone" className="scroll-mt-24 py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Image Drop Zone</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
            {config.title}
          </h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-ink/70">{config.body}</p>
      </div>

      <label
        onDragEnter={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsOver(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDrop={handleDrop}
        className={`drop-card dash-glow flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-[2.25rem] border-[3px] border-ink/20 bg-white p-8 text-center shadow-floaty ${isOver ? "is-active" : ""}`}
      >
        <input type="file" accept="image/png" onChange={handleChange} className="hidden" />

        {!previewUrl ? (
          <div className="fade-up">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-coral text-3xl text-white shadow-floaty">
              PNG
            </div>
            <p className="font-display text-3xl font-extrabold tracking-[-0.05em] text-ink">
              Drop a PNG here
            </p>
            <p className="mt-3 text-base text-ink/65">or click to browse from your computer</p>
            {error ? <p className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-coral">{error}</p> : null}
          </div>
        ) : (
          <div className="w-full max-w-3xl fade-up">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">Loaded locally</p>
                <p className="mt-2 text-lg font-bold text-ink">{fileName}</p>
              </div>
              <span className="rounded-full bg-mint px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink">
                Client-side only
              </span>
            </div>
            <img
              src={previewUrl}
              alt={fileName}
              className="preview-shadow max-h-[520px] w-full rounded-[2rem] border-2 border-ink/10 object-contain bg-paper p-4"
            />
          </div>
        )}
      </label>
    </section>
  );
}

function App() {
  const config = PORTFOLIO_CONFIG;
  const [year] = useState(() => new Date().getFullYear());

  useEffect(() => {
    document.title = config.site.name;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", config.site.description);
    }
  }, [config.site.description, config.site.name]);

  const tickerItems = useMemo(() => {
    const labels = [
      "ETL workflows",
      "Internal tools",
      "Analytics products",
      "Hackathon prototypes",
      "Studio-energy UI",
      "Systems with personality"
    ];

    return [...labels, ...labels];
  }, []);

  return (
    <>
      <style>{customStyles}</style>

      <div className="page-noise relative z-10 min-h-screen overflow-x-hidden">
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
            <a href="#top" className="font-mono text-xs uppercase tracking-[0.28em] text-ink">
              {config.site.name}
            </a>
            <nav className="hidden items-center gap-4 md:flex">
              {[
                ["Projects", "#projects"],
                ["Blog", "#blog"],
                ["Resume", "#resume"],
                ["Drop Zone", "#dropzone"]
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/75 transition hover:-translate-y-0.5 hover:text-ink"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main id="top" className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 md:px-8 md:pt-12">
          <section className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div className="fade-up">
              <div className="mb-5 inline-flex rounded-full border border-ink/10 bg-white px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-ink/60 shadow-floaty">
                {config.hero.eyebrow}
              </div>

              <h1 className="max-w-4xl font-display text-[3.4rem] font-extrabold leading-[0.92] tracking-[-0.08em] text-ink md:text-[5.6rem]">
                {config.site.name}
                <span className="mt-3 block text-coral">{config.hero.headline}</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72">
                {config.hero.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {config.socials.map((social, index) => {
                  const accent = accentMap[social.color] || accentMap.sky;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`fade-up fade-up-delay-${(index % 4) + 1} inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-3 font-bold shadow-floaty transition hover:-translate-y-1 ${accent.card}`}
                    >
                      <span>{social.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="relative grid gap-4">
              <div className="hero-panel fade-up fade-up-delay-2 rounded-[2.2rem] border-2 border-ink/10 bg-white p-6 shadow-floaty">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">
                    Quick Notes
                  </p>
                  <span className="sticker-alt rounded-full bg-sky px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                    Live
                  </span>
                </div>
                <p className="max-w-sm text-lg leading-8 text-ink/75">{config.hero.note}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {config.hero.badges.map((badge, index) => {
                  const accentKeys = ["coral", "sun", "mint", "lilac"];
                  const accent = accentMap[accentKeys[index % accentKeys.length]];
                  return (
                    <div
                      key={badge.label}
                      className={`section-card card-wobble fade-up fade-up-delay-${(index % 4) + 1} rounded-[1.8rem] border-2 border-ink/10 bg-white p-5 shadow-floaty`}
                    >
                      <div className={`mb-4 inline-flex rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] ${accent.card}`}>
                        {badge.label}
                      </div>
                      <p className="text-lg font-bold leading-7 text-ink">{badge.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="ticker-wrap mt-10 overflow-hidden rounded-[2rem] border-2 border-ink/10 bg-white py-4 shadow-floaty">
            <div className="ticker-track flex w-[200%] gap-4">
              {tickerItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="shrink-0 rounded-full border border-ink/10 bg-paper px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/65"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-24 py-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Projects Gallery</p>
                <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
                  Card-based work, built to feel designed.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-ink/70">
                Each card pulls from the same content config, so updating project details is just data entry.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {config.projects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </section>

          <section id="blog" className="scroll-mt-24 py-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Blog</p>
                <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
                  Posts, notes, and build logs.
                </h2>
              </div>
              <span className="sticker rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white">
                List view
              </span>
            </div>

            <div className="grid gap-5">
              {config.posts.map((post, index) => (
                <BlogCard key={post.title} post={post} index={index} />
              ))}
            </div>
          </section>

          <section id="resume" className="scroll-mt-24 py-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Resume</p>
                <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
                  Resume, embedded and linked.
                </h2>
              </div>
              <a
                href={config.site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-3 font-bold text-white shadow-floaty transition hover:-translate-y-1"
              >
                {config.resume.ctaLabel}
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
              <div className="section-card rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-floaty">
                <span className="sticker inline-flex rounded-full bg-sun px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink">
                  PDF Source
                </span>
                <h3 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.05em] text-ink">
                  {config.resume.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{config.resume.body}</p>
                <div className="mt-8 space-y-3">
                  <a
                    href={config.site.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-coral px-5 py-3 font-bold text-white transition hover:-translate-y-1"
                  >
                    Open PDF
                    <span aria-hidden="true">↗</span>
                  </a>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/55">
                    File path lives in the config object.
                  </p>
                </div>
              </div>

              <div className="resume-frame rounded-[2rem] border-2 border-ink/10 bg-white p-3 shadow-floaty">
                <iframe
                  src={config.site.resumeUrl}
                  title={`${config.site.name} resume`}
                  className="h-[620px] w-full rounded-[1.4rem] border-0 bg-paper"
                />
              </div>
            </div>
          </section>

          <DropZone config={config.dropZone} />
        </main>

        <footer className="border-t border-ink/10 bg-white/70">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="font-display text-xl font-extrabold tracking-[-0.04em] text-ink">
                {config.site.name}
              </p>
              <p className="mt-1 text-sm text-ink/65">
                {config.site.title} · {year}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {config.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-semibold text-ink/75 transition hover:-translate-y-0.5 hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
