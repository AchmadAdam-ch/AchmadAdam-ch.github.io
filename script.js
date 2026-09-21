/* ==========================================================================
   SCRIPT — Portofolio Achmad Adam
   Tanpa library eksternal (tidak perlu Bootstrap JS, AOS, atau Typed.js).
   Dipakai bersama oleh index.html dan magang.html.
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tahun otomatis di footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: beri garis saat halaman di-scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      toggle.firstElementChild.className = open ? "bi bi-x-lg" : "bi bi-list";
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------- Sorot menu sesuai section yang sedang dilihat ---------- */
  function trackSections(linkSelector) {
    const pairs = [...document.querySelectorAll(linkSelector)]
      .filter((a) => a.hash && document.querySelector(a.hash))
      .map((a) => ({ link: a, section: document.querySelector(a.hash) }));
    if (!pairs.length) return;

    const LINE = 150; // garis "baca": 150px dari atas layar
    let ticking = false;

    const update = () => {
      ticking = false;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = null;
      pairs.forEach((p) => {
        const r = p.section.getBoundingClientRect();
        if (r.top <= LINE && r.bottom > LINE) current = p;
      });
      if (atBottom) current = pairs[pairs.length - 1];
      pairs.forEach((p) => p.link.classList.toggle("is-active", p === current));
    };

    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
  // Di index: menu utama. Di magang: daftar isi halaman.
  trackSections(".nav__menu a[href^='#']");
  trackSections(".toc__list a");

  /* ---------- Animasi muncul saat scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target); // animasi sekali saja
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 70}ms`; // efek bertahap untuk kartu sebaris
        io.observe(el);
      });
    }
  }

  /* ---------- Efek mengetik di hero ---------- */
  const typedEl = document.getElementById("typed");
  if (typedEl && !prefersReducedMotion) {
    const words = ["Web Developer", "Front-End Enthusiast", "Siswa RPL"];
    // Mulai dari kata pertama yang sudah tampil penuh, lalu dihapus & diganti (tanpa kedip)
    let w = 0, c = words[0].length, deleting = true;

    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, c);

      let delay = deleting ? 35 : 75;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1800);
  }

  /* ---------- Form kontak → Google Apps Script ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    // URL Apps Script milikmu (sama seperti sebelumnya). Nama field: nama, email, pesan.
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVbxEzcKiblN6j5rYq8PQ3u5OTB_fs-JcyqfTsyUjw7VliBtK4maB_GuhPEuMEVWWHxg/exec";

    const btn = document.getElementById("form-submit");
    const ok = document.getElementById("form-ok");
    const err = document.getElementById("form-err");
    const btnHTML = btn.innerHTML;

    const setLoading = (loading) => {
      btn.disabled = loading;
      btn.innerHTML = loading ? "Mengirim…" : btnHTML;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      ok.hidden = true;
      err.hidden = true;

      if (!form.checkValidity()) { form.reportValidity(); return; }

      const data = new FormData(form);
      // Kolom jebakan bot terisi = kemungkinan spam → pura-pura sukses, jangan kirim.
      if (data.get("website")) { ok.hidden = false; form.reset(); return; }
      data.delete("website");

      setLoading(true);
      try {
        const res = await fetch(SCRIPT_URL, { method: "POST", body: data });
        if (!res.ok) throw new Error("HTTP " + res.status);
        ok.hidden = false;
        form.reset();
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
        err.hidden = false;
      } finally {
        setLoading(false);
      }
    });
  }
})();
