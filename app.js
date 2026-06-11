document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     Mobile navigation
     ============================================================ */
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (menuToggle && siteNav) {
    const toggleMenu = (forceOpen) => {
      const open = typeof forceOpen === "boolean"
        ? forceOpen
        : menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Cerrar navegación principal" : "Abrir navegación principal");
      siteNav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    menuToggle.addEventListener("click", () => toggleMenu());
    navLinks.forEach(link => link.addEventListener("click", () => toggleMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 600) toggleMenu(false); });
  }

  /* ============================================================
     Header scroll state
     ============================================================ */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     Counter animation
     ============================================================ */
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (prefersReducedMotion || Number.isNaN(target)) {
      el.textContent = String(target || el.textContent);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };

  /* ============================================================
     Liquid reveal on scroll + counters + build-complete
     ============================================================ */
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const buildCard = document.getElementById("build-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");

        entry.target.querySelectorAll(".counter:not(.counted)").forEach(c => {
          c.classList.add("counted");
          animateCounter(c);
        });

        if (entry.target === buildCard) {
          setTimeout(() => buildCard.classList.add("is-built"), prefersReducedMotion ? 0 : 70);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
    counters.forEach(c => { c.textContent = c.dataset.target; });
    if (buildCard) buildCard.classList.add("is-built");
  }

  /* ============================================================
     UI parallax (scroll-linked, transform only, rAF-throttled)
     ============================================================ */
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
  if (parallaxItems.length && !prefersReducedMotion) {
    let ticking = false;
    const apply = () => {
      const vh = window.innerHeight;
      parallaxItems.forEach(el => {
        const factor = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2) * -factor;
        el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
  }

  /* ============================================================
     Smooth anchor scroll
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });

  /* ============================================================
     Contact form
     // TODO: conectar al backend Python -> POST /api/contact
     ============================================================ */
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (form && formMessage) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        formMessage.textContent = "Por favor, completa todos los campos.";
        formMessage.className = "form-message error";
        return;
      }
      if (!email.checkValidity()) {
        formMessage.textContent = "Introduce un email válido.";
        formMessage.className = "form-message error";
        email.focus();
        return;
      }
      formMessage.textContent = `Gracias, ${name.value.trim()}. Te responderemos en menos de 24 horas.`;
      formMessage.className = "form-message success";
      form.reset();
    });
  }
});
