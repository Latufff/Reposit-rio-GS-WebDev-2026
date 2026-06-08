/* ============================================================
   OrbitLink Predict — script.js
   FIAP · GS · Web Development · 2026
   Integrantes:
     - Lucas Latuf RM 570068
     - Arthur Canzian Freitas Teodoro RM 569828
     - Lucas Cardoso Franco RM 571430
     - Cristian Schmidt de Araujo Filho RM 570183
     - Rodrigo Cocka Poccinelli RM 573364
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initThemes();
    initMobileMenu();
    initActiveNav();
    initReveal();
  });

  // Alterna entre os temas Orbit/Dark/Light e salva a preferencia no localStorage
  function initThemes() {
    var html = document.documentElement;
    var botoes = document.querySelectorAll(".theme-btn");
    var temaSalvo = localStorage.getItem("orbitlink-theme") || "orbit";

    aplicarTema(temaSalvo);

    botoes.forEach(function (btn) {
      btn.addEventListener("click", function () {
        aplicarTema(btn.getAttribute("data-theme-value"));
      });
    });

    function aplicarTema(tema) {
      html.setAttribute("data-theme", tema);
      localStorage.setItem("orbitlink-theme", tema);
      botoes.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-theme-value") === tema);
      });
    }
  }

  // Abre e fecha o menu mobile (e fecha ao clicar em um link)
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var aberto = menu.classList.toggle("open");
      toggle.classList.toggle("open", aberto);
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Destaca no menu a secao que esta visivel na tela
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var secoes = links
      .map(function (l) { return document.querySelector(l.getAttribute("href")); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !secoes.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    secoes.forEach(function (s) { observer.observe(s); });
  }

  // Anima a entrada dos elementos conforme eles aparecem ao rolar a pagina
  function initReveal() {
    var alvos = document.querySelectorAll(
      ".section-head, .card, .benefit, .flow-step, .objetivos-metric, .objetivos-text, .problema-text, .slideshow, .quiz, .form, .form-intro"
    );
    alvos.forEach(function (el) { el.classList.add("reveal"); });

    if (!("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    alvos.forEach(function (el) { observer.observe(el); });
  }

})();
