/* =====================================================================
   AURA INTERIORS — Client script
   Renders all dynamic content from data/site-data.js (window.SITE_DATA)
   ===================================================================== */

(function () {
  const D = window.SITE_DATA;
  if (!D) { console.error("SITE_DATA missing"); return; }

  /* ---------- helpers ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const waHref = (msg) =>
    `https://wa.me/${D.contact.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
  const telHref = () => `tel:${D.contact.phone.replace(/\s+/g, "")}`;
  const mailHref = () => `mailto:${D.contact.email}`;

  /* ---------- SVG icons ---------- */
  const icons = {
    arrow: '<svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowUpRight: '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  };

  /* ---------- title/meta helpers (per-page) ---------- */
  document.querySelectorAll("[data-brand-name]").forEach(el => el.textContent = D.brand.name);

  /* ---------- NAVBAR ---------- */
  function renderNav() {
    const host = $("#nav");
    if (!host) return;
    const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = D.nav.map(n => {
      const active = n.href.toLowerCase() === currentPage ? "active" : "";
      return `<a href="${n.href}" class="${active}">${n.label}</a>`;
    }).join("");
    const mobileLinks = D.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

    host.innerHTML = `
      <div class="nav" id="navBar">
        <div class="container nav-inner">
          <a href="index.html" class="logo" aria-label="${D.brand.name} home">
            <span class="logo-mark">${D.brand.logoText}</span>
            <span class="logo-accent">${D.brand.logoAccent}</span>
          </a>
          <nav class="nav-links" aria-label="Primary">${links}</nav>
          <a href="contact.html" class="btn btn-primary nav-cta">Book a Consultation</a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">${icons.menu}</button>
        </div>
        <div class="mobile-menu" id="mobileMenu">
          <div class="container">
            <nav>
              ${mobileLinks}
              <a href="contact.html" class="btn btn-primary">Book a Consultation</a>
            </nav>
          </div>
        </div>
      </div>
    `;

    const bar = $("#navBar");
    const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#navToggle");
    const menu = $("#mobileMenu");
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? icons.close : icons.menu;
    });
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    const host = $("#footer");
    if (!host) return;
    const navLinks = D.nav.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join("");
    const serviceLinks = D.services.slice(0, 6).map(s => `<li><a href="services.html">${s.name}</a></li>`).join("");
    host.innerHTML = `
      <footer>
        <div class="container footer-grid">
          <div>
            <div class="logo">
              <span class="logo-mark" style="color:var(--cream); font-size:1.9rem">${D.brand.logoText}</span>
              <span class="logo-accent" style="color:rgba(246,241,234,0.6)">${D.brand.logoAccent}</span>
            </div>
            <p class="footer-blurb">${D.footer.blurb}</p>
          </div>
          <div class="footer-col">
            <h5>Explore</h5>
            <ul>${navLinks}</ul>
          </div>
          <div class="footer-col">
            <h5>Services</h5>
            <ul>${serviceLinks}</ul>
          </div>
          <div class="footer-col">
            <h5>Contact</h5>
            <div class="footer-contact">
              <div>${icons.phone}<a href="${telHref()}">${D.contact.phone}</a></div>
              <div>${icons.mail}<a href="${mailHref()}">${D.contact.email}</a></div>
              <div>${icons.pin}<span>${D.contact.address}</span></div>
            </div>
            <div class="footer-social">
              <a href="${D.contact.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">${icons.ig}</a>
              <a href="${waHref("Hi, I'd like to know more about your services.")}" target="_blank" rel="noreferrer" aria-label="WhatsApp">${icons.wa}</a>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid rgba(246,241,234,0.1)">
          <div class="container footer-bottom">
            <span>© ${new Date().getFullYear()} ${D.brand.name}. All rights reserved.</span>
            <span>Designed with intention · ${D.brand.city}</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---------- WHATSAPP FLOAT ---------- */
  function renderWA() {
    const el = document.createElement("a");
    el.href = waHref("Hi, I'd like to enquire about interior design.");
    el.target = "_blank"; el.rel = "noreferrer";
    el.className = "wa-float";
    el.setAttribute("aria-label", "Chat on WhatsApp");
    el.innerHTML = icons.wa;
    document.body.appendChild(el);
  }

  /* ---------- HERO ---------- */
  function renderHero() {
    const host = $("#hero");
    if (!host) return;
    host.innerHTML = `
      <section class="hero">
        <img src="${D.hero.image}" alt="Interior by ${D.brand.name}" />
        <div class="hero-overlay"></div>
        <div class="container hero-inner">
          <p class="eyebrow">${D.hero.eyebrow}</p>
          <h1>${D.hero.headline}</h1>
          <p class="hero-sub">${D.hero.subheadline}</p>
          <div class="hero-ctas">
            <a href="contact.html" class="btn btn-light">${D.hero.primaryCta} ${icons.arrow}</a>
            <a href="projects.html" class="btn btn-outline">${D.hero.secondaryCta}</a>
          </div>
        </div>
        <div class="scroll-hint"><span>Scroll</span><span class="line"></span></div>
      </section>`;
  }

  /* ---------- STATS ---------- */
  function renderStats() {
    const host = $("#stats");
    if (!host) return;
    host.innerHTML = `
      <section class="stats">
        <div class="container stats-grid">
          ${D.stats.map(s => `
            <div>
              <div class="stat-value">${s.value}</div>
              <div class="stat-label">${s.label}</div>
            </div>`).join("")}
        </div>
      </section>`;
  }

  /* ---------- ABOUT ---------- */
  function renderAbout() {
    const host = $("#about");
    if (!host) return;
    host.innerHTML = `
      <section class="section">
        <div class="container about-grid">
          <div class="about-image reveal"><img src="${D.about.image}" alt="Inside the ${D.brand.name} studio" /></div>
          <div class="about-body reveal">
            <p class="eyebrow">${D.about.eyebrow}</p>
            <h2 style="margin-top:16px; font-size:clamp(2rem,3.6vw,3rem); margin-bottom:28px">${D.about.heading}</h2>
            ${D.about.body.map(p => `<p>${p}</p>`).join("")}
            <div class="pillars">
              ${D.about.pillars.map(p => `<div class="pillar"><h4>${p.title}</h4><p>${p.text}</p></div>`).join("")}
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ---------- SERVICES ---------- */
  function renderServices(limit) {
    const host = $("#services");
    if (!host) return;
    const list = limit ? D.services.slice(0, limit) : D.services;
    host.innerHTML = `
      <section class="services-bg section">
        <div class="container">
          <div class="projects-head">
            <div class="section-head" style="margin-bottom:0">
              <p class="eyebrow">Services</p>
              <h2>End-to-end interior design, delivered with care.</h2>
            </div>
            <a href="contact.html" class="btn btn-outline-dark">Start a project ${icons.arrow}</a>
          </div>
          <div class="services-grid">
            ${list.map(s => `
              <article class="service-card reveal">
                <div class="img"><img src="${s.image}" alt="${s.name}" loading="lazy"/></div>
                <div class="service-body">
                  <h3>${s.name}</h3>
                  <p>${s.description}</p>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ---------- PROJECTS ---------- */
  function renderProjects(limit) {
    const host = $("#projects");
    if (!host) return;
    const list = limit ? D.projects.slice(0, limit) : D.projects;
    host.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="projects-head">
            <div class="section-head" style="margin-bottom:0">
              <p class="eyebrow">Featured Projects</p>
              <h2>A portfolio of considered interiors.</h2>
            </div>
            ${limit ? `<a href="projects.html" class="btn btn-outline-dark">View all projects ${icons.arrow}</a>` : ""}
          </div>
          <div class="projects-grid">
            ${list.map(p => `
              <a href="#" class="project-card reveal" data-project="${p.slug}">
                <div class="img"><img src="${p.cover}" alt="${p.name}" loading="lazy"/></div>
                <div class="project-meta">
                  <div>
                    <p class="cat">${p.category} · ${p.location}</p>
                    <h3>${p.name}</h3>
                  </div>
                  ${icons.arrowUpRight}
                </div>
              </a>`).join("")}
          </div>
        </div>
      </section>`;

    $$("[data-project]").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        openProject(a.getAttribute("data-project"));
      });
    });
  }

  /* ---------- PROJECT MODAL ---------- */
  function ensureProjectModal() {
    if ($("#pdOverlay")) return;
    const wrap = document.createElement("div");
    wrap.id = "pdOverlay";
    wrap.className = "pd-overlay";
    wrap.innerHTML = `<div class="pd-modal" id="pdModal" role="dialog" aria-modal="true"></div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) closeProject(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProject(); });
  }
  function openProject(slug) {
    const p = D.projects.find(x => x.slug === slug);
    if (!p) return;
    ensureProjectModal();
    const modal = $("#pdModal");
    modal.innerHTML = `
      <div class="pd-head">
        <div>
          <p class="eyebrow">${p.category} · ${p.location}</p>
        </div>
        <button class="pd-close" aria-label="Close" id="pdClose">${icons.close}</button>
      </div>
      <div class="pd-cover"><img src="${p.cover}" alt="${p.name}"/></div>
      <div class="pd-body">
        <h2>${p.name}</h2>
        <p style="color:var(--muted); max-width:640px; margin-top:12px">${p.description}</p>
        <div class="pd-info">
          <div>
            <h4>Design Concept</h4>
            <p>${p.concept}</p>
          </div>
          <div>
            <h4>Materials</h4>
            <div class="pd-materials">${p.materials.map(m => `<span>${m}</span>`).join("")}</div>
          </div>
        </div>
        <div class="pd-gallery">
          ${p.gallery.map(g => `<img src="${g}" alt="${p.name} interior"/>`).join("")}
        </div>
        <div style="margin-top:40px; display:flex; gap:12px; flex-wrap:wrap">
          <a href="contact.html" class="btn btn-primary">Start a similar project ${icons.arrow}</a>
          <a href="${waHref('Hi! I loved the ' + p.name + ' project. Can we talk?')}" target="_blank" rel="noreferrer" class="btn btn-outline-dark">Chat on WhatsApp</a>
        </div>
      </div>`;
    $("#pdOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
    $("#pdClose").addEventListener("click", closeProject);
  }
  function closeProject() {
    const o = $("#pdOverlay");
    if (!o) return;
    o.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- BEFORE / AFTER ---------- */
  function renderBeforeAfter() {
    const host = $("#beforeAfter");
    if (!host) return;
    const b = D.beforeAfter;
    host.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">${b.eyebrow}</p>
            <h2>${b.heading}</h2>
            <p style="margin-top:20px; color:var(--muted); max-width:560px">${b.body}</p>
          </div>
          <div class="ba-grid">
            <div class="ba-card"><span class="ba-label">Before</span><img src="${b.before}" alt="Before"/></div>
            <div class="ba-card"><span class="ba-label">After</span><img src="${b.after}" alt="After"/></div>
          </div>
        </div>
      </section>`;
  }

  /* ---------- PROCESS ---------- */
  function renderProcess() {
    const host = $("#process");
    if (!host) return;
    host.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Our Process</p>
            <h2>Five steps, from first idea to final handover.</h2>
          </div>
          <ol class="process-list" style="list-style:none; padding:0; margin:0">
            ${D.process.map(p => `
              <li class="process-item reveal">
                <div class="process-step">${p.step}</div>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
              </li>`).join("")}
          </ol>
        </div>
      </section>`;
  }

  /* ---------- TESTIMONIALS ---------- */
  function renderTestimonials() {
    const host = $("#testimonials");
    if (!host) return;
    host.innerHTML = `
      <section class="testi-bg section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Client Voices</p>
            <h2>Trusted by families and businesses.</h2>
          </div>
          <div class="testi-grid">
            ${D.testimonials.map(t => `
              <figure class="testi-card reveal">
                <span class="testi-quote-mark">"</span>
                <blockquote>${t.quote}</blockquote>
                <figcaption>
                  <div class="testi-name">${t.name}</div>
                  <div class="testi-project">${t.projectType}${t.location ? ` · ${t.location}` : ""}</div>
                </figcaption>
              </figure>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ---------- LEAD CTA ---------- */
  function renderLeadCta() {
    const host = $("#leadCta");
    if (!host) return;
    host.innerHTML = `
      <section class="lead">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80&auto=format&fit=crop" alt="" aria-hidden="true"/>
        <div class="lead-overlay"></div>
        <div class="container">
          <p class="eyebrow" style="color:rgba(246,241,234,0.7)">Let's create together</p>
          <h2>${D.leadCta.heading}</h2>
          <p>${D.leadCta.body}</p>
          <div class="lead-ctas">
            <a href="contact.html" class="btn btn-light">Book a Consultation ${icons.arrow}</a>
            <a href="${waHref("Hi, I'd like to book a consultation.")}" target="_blank" rel="noreferrer" class="btn btn-outline">Chat on WhatsApp</a>
          </div>
        </div>
      </section>`;
  }

  /* ---------- CONTACT ---------- */
  function renderContact() {
    const host = $("#contact");
    if (!host) return;
    host.innerHTML = `
      <section class="section">
        <div class="container contact-grid">
          <div>
            <p class="eyebrow">Get in touch</p>
            <h2 style="margin-top:16px; font-size:clamp(2rem,3.6vw,2.8rem)">Studio &amp; contact.</h2>
            <p style="margin-top:20px; color:var(--muted); max-width:440px">We reply within one working day. For quick questions, WhatsApp is the fastest way to reach us.</p>

            <div style="margin-top:32px">
              <div class="contact-info-item">${icons.phone}<div><h4>Phone</h4><a href="${telHref()}">${D.contact.phone}</a></div></div>
              <div class="contact-info-item">${icons.wa}<div><h4>WhatsApp</h4><a href="${waHref('Hi, I would like to enquire about interior design.')}" target="_blank" rel="noreferrer">${D.contact.phone}</a></div></div>
              <div class="contact-info-item">${icons.mail}<div><h4>Email</h4><a href="${mailHref()}">${D.contact.email}</a></div></div>
              <div class="contact-info-item">${icons.pin}<div><h4>Studio</h4><p>${D.contact.address}</p><a href="${D.contact.mapsUrl}" target="_blank" rel="noreferrer" style="font-size:0.82rem; color:var(--accent-2)">Open in Google Maps →</a></div></div>
              <div class="contact-info-item">${icons.clock}<div><h4>Hours</h4><p>${D.contact.hours}</p></div></div>
            </div>
          </div>

          <div>
            <form class="form" id="leadForm" novalidate>
              <div class="form-row">
                <div class="field"><label for="fName">Name</label><input id="fName" name="name" type="text" required autocomplete="name"/></div>
                <div class="field"><label for="fPhone">Phone</label><input id="fPhone" name="phone" type="tel" required autocomplete="tel"/></div>
              </div>
              <div class="field"><label for="fEmail">Email</label><input id="fEmail" name="email" type="email" required autocomplete="email"/></div>
              <div class="field">
                <label for="fType">Project Type</label>
                <select id="fType" name="type" required>
                  <option value="">Select…</option>
                  <option>Residential — Full Home</option>
                  <option>Modular Kitchen</option>
                  <option>Living Room</option>
                  <option>Bedroom</option>
                  <option>Commercial / Workspace</option>
                  <option>Turnkey Project</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="field"><label for="fMsg">Message</label><textarea id="fMsg" name="message" placeholder="Tell us a little about your space, timeline and budget…"></textarea></div>

              <div style="display:flex; gap:12px; flex-wrap:wrap">
                <button type="submit" class="btn btn-primary">Send Enquiry ${icons.arrow}</button>
                <button type="button" id="waSubmit" class="btn btn-outline-dark">Send via WhatsApp</button>
              </div>
              <p class="form-note">Submitting opens your email app with the enquiry pre-filled. See the README for connecting a form service like Formspree.</p>
            </form>

            <div class="map-wrap">
              <iframe src="${D.contact.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${D.brand.name} on Google Maps"></iframe>
            </div>
          </div>
        </div>
      </section>`;

    const form = $("#leadForm");
    const buildBody = () => {
      const data = new FormData(form);
      return [
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Project Type: ${data.get("type") || ""}`,
        ``,
        `${data.get("message") || ""}`,
      ].join("\n");
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const subject = `New enquiry — ${form.name.value || "Website"}`;
      window.location.href = `mailto:${D.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    });
    $("#waSubmit").addEventListener("click", () => {
      window.open(waHref("New enquiry from your website:\n\n" + buildBody()), "_blank");
    });
  }

  /* ---------- PAGE HEADER ---------- */
  function renderPageHeader() {
    const host = $("#pageHeader");
    if (!host) return;
    const eyebrow = host.getAttribute("data-eyebrow") || "";
    const title = host.getAttribute("data-title") || "";
    const intro = host.getAttribute("data-intro") || "";
    host.innerHTML = `
      <header class="page-header">
        <div class="container">
          <p class="eyebrow">${eyebrow}</p>
          <h1>${title}</h1>
          ${intro ? `<p>${intro}</p>` : ""}
        </div>
      </header>`;
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(el => el.classList.add("in")); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---------- BOOT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderPageHeader();
    renderHero();
    renderStats();
    renderAbout();
    renderServices(window.__servicesLimit);
    renderProjects(window.__projectsLimit);
    renderBeforeAfter();
    renderProcess();
    renderTestimonials();
    renderLeadCta();
    renderContact();
    renderFooter();
    renderWA();
    initReveal();
  });
})();
