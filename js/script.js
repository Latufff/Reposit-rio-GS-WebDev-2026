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

})();
