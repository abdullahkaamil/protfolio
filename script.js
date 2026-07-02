/* ===========================================================
   akaamil.com : interactions
   =========================================================== */
(function () {
  "use strict";

  /* ---- Sticky nav shadow + scroll progress ---- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    if (progress) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Theme toggle ---- */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      if (next === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");
  const closeMenu = () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  /* ---- Rotating role typewriter ---- */
  const typed = document.getElementById("typed");
  const roles = [
    "PHP Tech Lead",
    "Fintech & Payments",
    "AWS Cloud Solutions",
    "Open Banking",
    "API Development",
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typed && !reduceMotion) {
    let r = 0, c = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      typed.textContent = word.slice(0, c);
      if (!deleting && c < word.length) {
        c++; setTimeout(tick, 70);
      } else if (!deleting && c === word.length) {
        deleting = true; setTimeout(tick, 1600);
      } else if (deleting && c > 0) {
        c--; setTimeout(tick, 35);
      } else {
        deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 260);
      }
    };
    tick();
  } else if (typed) {
    typed.textContent = roles[0];
  }

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    ".about, .tl, .proj, .skills__group, .contact"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("in"));
  }

  /* ---- Contact form (Formspree-ready with graceful fallback) ---- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      const action = form.getAttribute("action") || "";
      const notConfigured = action.includes("your-form-id");

      // Fallback: no backend wired up yet → open the user's mail client.
      if (notConfigured) {
        e.preventDefault();
        const data = new FormData(form);
        const subject = encodeURIComponent(`Website enquiry from ${data.get("name") || "visitor"}`);
        const body = encodeURIComponent(
          `${data.get("message") || ""}\n\nFrom: ${data.get("name") || ""} (${data.get("email") || ""})`
        );
        window.location.href = `mailto:akaamil@outlook.com?subject=${subject}&body=${body}`;
        setStatus("Opening your email client…", "ok");
        return;
      }

      // Formspree AJAX submit
      e.preventDefault();
      setStatus("Sending…", "");
      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          setStatus("Thanks! I'll get back to you soon.", "ok");
        } else {
          setStatus("Something went wrong. Email me directly instead.", "err");
        }
      } catch {
        setStatus("Network error. Email me directly instead.", "err");
      }
    });
  }

  function setStatus(msg, cls) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form__status" + (cls ? " " + cls : "");
  }

  /* ---- Scroll-spy: highlight the current section in the nav ---- */
  const navAnchors = [...document.querySelectorAll(".nav__links a")];
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Footer year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
