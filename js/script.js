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
    initScrollProgress();
    initCounters();
    initSlideshow();
    initQuiz();
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

  // Atualiza a barra de progresso de leitura conforme o scroll da pagina
  function initScrollProgress() {
    var bar = document.getElementById("scrollProgress");
    if (!bar) return;
    function atualizar() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", atualizar, { passive: true });
    atualizar();
  }

  // Anima os numeros das estatisticas do hero ate o valor final
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    function animar(el) {
      var alvo = parseInt(el.getAttribute("data-count"), 10);
      var sufixo = el.getAttribute("data-suffix") || "";
      var inicio = null;
      var duracao = 1400;
      function passo(ts) {
        if (!inicio) inicio = ts;
        var p = Math.min((ts - inicio) / duracao, 1);
        var valor = Math.round(p * alvo);
        el.textContent = valor + sufixo;
        if (p < 1) requestAnimationFrame(passo);
      }
      requestAnimationFrame(passo);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animar);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animar(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  // Controla o slideshow: autoplay, setas, dots e pausa ao passar o mouse
  function initSlideshow() {
    var root = document.getElementById("slideshow");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".slide"));
    var btnPrev = document.getElementById("slidePrev");
    var btnNext = document.getElementById("slideNext");
    var dotsBox = document.getElementById("slideDots");
    var atual = 0;
    var timer = null;
    var INTERVALO = 5000;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Imagem " + (i + 1));
      dot.addEventListener("click", function () { irPara(i); reiniciar(); });
      dotsBox.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsBox.children);

    function irPara(i) {
      atual = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle("is-active", idx === atual); });
      dots.forEach(function (d, idx) { d.classList.toggle("active", idx === atual); });
    }
    function avancar() { irPara(atual + 1); }
    function iniciar() { timer = setInterval(avancar, INTERVALO); }
    function reiniciar() { clearInterval(timer); iniciar(); }

    btnNext.addEventListener("click", function () { avancar(); reiniciar(); });
    btnPrev.addEventListener("click", function () { irPara(atual - 1); reiniciar(); });

    root.addEventListener("mouseenter", function () { clearInterval(timer); });
    root.addEventListener("mouseleave", iniciar);

    irPara(0);
    iniciar();
  }

  // Banco de perguntas usado pelo quiz de risco operacional
  var PERGUNTAS = [
    { q: "A operacao fica a quantas horas do centro urbano mais proximo?",
      o: [["Menos de 1h", 0], ["1h a 4h", 1], ["Mais de 4h", 2]] },
    { q: "Como e a cobertura de comunicacao no local?",
      o: [["Estavel (celular/fibra)", 0], ["Intermitente", 1], ["Inexistente", 2]] },
    { q: "Existe redundancia de conectividade (ex.: satelite de backup)?",
      o: [["Sim, redundancia completa", 0], ["Parcial", 1], ["Nenhuma", 2]] },
    { q: "Com que frequencia ocorrem eventos climaticos severos?",
      o: [["Raramente", 0], ["Ocasionalmente", 1], ["Frequentemente", 2]] },
    { q: "Ha monitoramento em tempo real dos equipamentos?",
      o: [["Sim, continuo", 0], ["Apenas periodico", 1], ["Nao ha", 2]] },
    { q: "Como e o acesso fisico a operacao em uma emergencia?",
      o: [["Rapido e facil", 0], ["Demorado", 1], ["Muito dificil", 2]] },
    { q: "A equipe possui protocolos de contingencia definidos?",
      o: [["Sim, testados", 0], ["Existem, mas nao testados", 1], ["Nao existem", 2]] },
    { q: "Os dados operacionais sao processados localmente (edge)?",
      o: [["Sim, na borda", 0], ["Parcialmente", 1], ["Tudo depende da nuvem", 2]] },
    { q: "Qual o impacto financeiro de 1 hora de operacao parada?",
      o: [["Baixo", 0], ["Moderado", 1], ["Critico", 2]] },
    { q: "Ha historico de incidentes por falta de informacao em campo?",
      o: [["Nenhum", 0], ["Poucos", 1], ["Varios", 2]] }
  ];

  // Conduz o quiz pelas perguntas e calcula o nivel de risco (Baixo/Medio/Alto)
  function initQuiz() {
    var stage = document.getElementById("quizStage");
    if (!stage) return;

    var elCount = document.getElementById("quizCount");
    var elQuestion = document.getElementById("quizQuestion");
    var elOptions = document.getElementById("quizOptions");
    var btnPrev = document.getElementById("quizPrev");
    var btnNext = document.getElementById("quizNext");
    var bar = document.getElementById("quizBar");
    var nav = document.querySelector(".quiz-nav");
    var result = document.getElementById("quizResult");
    var badge = document.getElementById("resultBadge");
    var rTitle = document.getElementById("resultTitle");
    var rText = document.getElementById("resultText");
    var btnRestart = document.getElementById("quizRestart");

    var indice = 0;
    var respostas = new Array(PERGUNTAS.length).fill(null);

    function render() {
      var p = PERGUNTAS[indice];
      elCount.textContent = "Pergunta " + (indice + 1) + " de " + PERGUNTAS.length;
      elQuestion.textContent = p.q;
      elOptions.innerHTML = "";

      p.o.forEach(function (opcao, i) {
        var btn = document.createElement("button");
        btn.className = "quiz-option" + (respostas[indice] === i ? " selected" : "");
        btn.textContent = opcao[0];
        btn.addEventListener("click", function () {
          respostas[indice] = i;
          render();
          btnNext.disabled = false;
        });
        elOptions.appendChild(btn);
      });

      bar.style.width = (indice / PERGUNTAS.length * 100) + "%";
      btnPrev.disabled = indice === 0;
      btnNext.disabled = respostas[indice] === null;
      btnNext.textContent = indice === PERGUNTAS.length - 1 ? "Ver resultado" : "Proxima";
    }

    btnNext.addEventListener("click", function () {
      if (respostas[indice] === null) return;
      if (indice < PERGUNTAS.length - 1) {
        indice++;
        render();
      } else {
        mostrarResultado();
      }
    });

    btnPrev.addEventListener("click", function () {
      if (indice > 0) { indice--; render(); }
    });

    function mostrarResultado() {
      var total = respostas.reduce(function (acc, v) { return acc + (v || 0); }, 0);
      bar.style.width = "100%";
      stage.hidden = true;
      if (nav) nav.hidden = true;
      result.hidden = false;

      var nivel;
      if (total <= 6) {
        nivel = { cls: "low", icon: "🟢", titulo: "Baixo Risco",
          texto: "Sua operacao tem boa resiliencia. O OrbitLink Predict mantem o monitoramento continuo e antecipa imprevistos." };
      } else if (total <= 13) {
        nivel = { cls: "mid", icon: "🟡", titulo: "Medio Risco",
          texto: "Ha pontos de atencao relevantes. O OrbitLink Predict reduz paralisacoes e reforca a previsibilidade." };
      } else {
        nivel = { cls: "high", icon: "🔴", titulo: "Alto Risco",
          texto: "Sua operacao esta bastante exposta. O OrbitLink Predict e altamente recomendado para antecipar riscos." };
      }

      badge.className = "result-badge " + nivel.cls;
      badge.textContent = nivel.icon;
      rTitle.textContent = nivel.titulo + " (" + total + "/20 pontos)";
      rText.textContent = nivel.texto;
    }

    btnRestart.addEventListener("click", function () {
      indice = 0;
      respostas = new Array(PERGUNTAS.length).fill(null);
      result.hidden = true;
      stage.hidden = false;
      if (nav) nav.hidden = false;
      render();
    });

    render();
  }

})();
