// Edit only PORTFOLIO_CONFIG to update the portfolio content.
const PORTFOLIO_CONFIG = {
  site: {
    name: "Kevin Tang",
    title: "Software Engineer and Technical Builder",
    description:
      "Software engineer focused on data products, internal tools, fast prototypes, and photography with a clear point of view.",
    email: "tk032606@gmail.com",
    resumeUrl: "./assets/kevin-tang-software-resume.pdf"
  },
  hero: {
    eyebrow: "Software Engineer / Data Systems / Product-Minded Builder",
    headline: "Studio-energy software work with an engineering core.",
    intro: "",
    note:
      "Everything on this page is controlled by the config object at the top of the file, so updating content stays simple.",
    badges: [
      { label: "Now", value: "NYU · Computer Science / Data Science" },
      { label: "Base", value: "New York" },
      { label: "Focus", value: "Data, product, engineering" },
      { label: "Extra", value: "Photography" }
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
  photography: [
    {
      title: "Cue Up",
      location: "Manhattan, NY",
      year: "2026",
      camera: "Fujifilm 100VI",
      src: "./images/web/image13.jpg",
      alt: "A person lining up a shot at a pool table in a dim billiards hall.",
      accent: "coral"
    },
    {
      title: "Canyon Light",
      location: "Grand Canyon, AZ",
      year: "2025",
      camera: "Sony A6400",
      src: "./images/web/image7.jpg",
      alt: "A wide view of the Grand Canyon under streaked clouds.",
      accent: "sun"
    },
    {
      title: "River Sunset",
      location: "Chicago, IL",
      year: "2026",
      camera: "iPhone 14 Pro",
      src: "./images/web/image11.jpg",
      alt: "Sunset light reflecting on the Chicago River between downtown buildings.",
      accent: "sky"
    },
    {
      title: "Rosetta Table",
      location: "Manhattan, NY",
      year: "2026",
      camera: "Fujifilm 100VI",
      src: "./images/web/image4.jpg",
      alt: "Pastries from Rosetta Bakery on a tray over a wooden table.",
      accent: "mint"
    },
    {
      title: "White Manna",
      location: "Hackensack, NJ",
      year: "2026",
      camera: "Fujifilm 100VI",
      src: "./images/web/image10.jpg",
      alt: "The White Manna Hamburgers neon sign glowing at dusk.",
      accent: "lilac"
    },
    {
      title: "Blue Hour Blizzard",
      location: "Plainview, NY",
      year: "2026",
      camera: "Sony A6400",
      src: "./images/web/image15.jpg",
      alt: "A snowy suburban street at blue hour with a lamp post in the foreground.",
      accent: "sky"
    }
  ],
  workExperience: [
    {
      company: "Biokind",
      role: "Tech Lead",
      date: "Sep 2025 - Present",
      summary:
        "Built data workflows and analytics tooling for donor and environmental reporting.",
      bullets: [
        "Architected a Python ETL pipeline to ingest, clean, and normalize 14k+ donor records.",
        "Developed a Streamlit analytics platform with GeoPy and Matplotlib for map-based donor analysis.",
        "Containerized the platform with Docker to reduce setup time and support reproducible deployments."
      ],
      accent: "mint"
    },
    {
      company: "Purdue Undergraduate Research",
      role: "Robotics Research Assistant",
      date: "Sep 2024 - Jul 2025",
      summary:
        "Worked on mobile manipulation, perception, and command processing for robotics research.",
      bullets: [
        "Implemented mobile manipulation capabilities for a Mobile ALOHA robot using ROS, Python, and Gazebo.",
        "Designed a perception and command pipeline combining voice command parsing with R-CNN object detection."
      ],
      accent: "sky"
    },
    {
      company: "Purdue Hackers (Indianapolis)",
      role: "Chief Social Officer / CSO",
      date: "Sep 2024 - May 2025",
      summary:
        "Led frontend and website work for a public-facing organization site.",
      bullets: [
        "Led a four-engineer team to launch a responsive website using HTML, CSS, BEM, Flexbox, and media queries.",
        "Implemented a Django backend for dynamic content delivery and server-side functionality."
      ],
      accent: "coral"
    }
  ],
  resume: {
    title: "Resume",
    body: "",
    ctaLabel: "Open Resume"
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
  .list-card,
  .resume-frame,
  .photo-frame,
  .photo-thumb {
    position: relative;
    overflow: hidden;
  }

  .hero-panel::after,
  .section-card::after,
  .list-card::after,
  .resume-frame::after,
  .photo-frame::after,
  .photo-thumb::after {
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

  .photo-feature {
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .photo-feature:hover {
    transform: translateY(-6px) rotate(-0.6deg);
    box-shadow: 0 22px 48px rgba(23, 23, 23, 0.18);
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
    soft: "bg-[#ffe0d7]"
  },
  sky: {
    card: "bg-sky text-white",
    soft: "bg-[#dbe7ff]"
  },
  sun: {
    card: "bg-sun text-ink",
    soft: "bg-[#fff1bf]"
  },
  mint: {
    card: "bg-mint text-ink",
    soft: "bg-[#dbf4e3]"
  },
  lilac: {
    card: "bg-lilac text-white",
    soft: "bg-[#eee6ff]"
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

function ExperienceCard({ item, index }) {
  const accent = accentMap[item.accent] || accentMap.sky;
  const rotation = index % 2 === 0 ? "sticker" : "sticker-alt";

  return (
    <article className={`list-card fade-up fade-up-delay-${(index % 4) + 1} rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-floaty`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">{item.date}</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-ink">
            {item.role}
          </h3>
          <p className="mt-1 text-base font-semibold text-ink/70">{item.company}</p>
        </div>
        <span className={`${rotation} rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] ${accent.card}`}>
          Work
        </span>
      </div>
      <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70">{item.summary}</p>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-ink/72">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PhotographyGallery({ items }) {
  return (
    <section id="photography" className="scroll-mt-24 py-24">
      <div className="mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Photography Gallery</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
            Photography
          </h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((photo, index) => {
          const accent = accentMap[photo.accent] || accentMap.sky;

          return (
            <article
              key={`${photo.title}-${photo.src}`}
              className={`photo-feature photo-thumb fade-up fade-up-delay-${(index % 4) + 1} rounded-[2rem] border-2 border-ink/10 bg-white p-4 shadow-floaty`}
            >
              <div className="mb-4 overflow-hidden rounded-[1.5rem] bg-paper">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-[320px] w-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-ink">
                    {photo.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65">{photo.location}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    {photo.camera}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${accent.card}`}>
                  {photo.year}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function App() {
  const config = PORTFOLIO_CONFIG;
  const year = new Date().getFullYear();

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
      "Photography",
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
                ["Photography", "#photography"],
                ["Experience", "#experience"],
                ["Resume", "#resume"]
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

              {config.hero.intro ? (
                <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72">
                  {config.hero.intro}
                </p>
              ) : null}

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
                  Projects
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {config.projects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </section>

          <PhotographyGallery items={config.photography} />

          <section id="experience" className="scroll-mt-24 py-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">Work Experience</p>
                <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.06em] text-ink md:text-5xl">
                  Experience
                </h2>
              </div>
              <span className="sticker rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white">
                List view
              </span>
            </div>

            <div className="grid gap-5">
              {config.workExperience.map((item, index) => (
                <ExperienceCard key={`${item.company}-${item.role}`} item={item} index={index} />
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
                {config.resume.body ? (
                  <p className="mt-4 text-base leading-7 text-ink/70">{config.resume.body}</p>
                ) : null}
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
