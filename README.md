# 🛰️ OrbitLink Predict — Landing Page

Landing page do *OrbitLink Predict*, desenvolvida para as disciplinas Front-End Design e Web Development da Global Solution FIAP.

## 🚀 Como executar

Não há build nem dependências. Basta:

1. Abrir a pasta do projeto.
2. Dar duplo clique em **`index.html`** (ou abrir com o navegador).

> Dica: para uma experiência ideal com fontes do Google, mantenha a conexão ativa na primeira abertura.

## 📁 Organização dos arquivos

```
Web/
├── index.html              # Estrutura (HTML5 semântico) — 10 seções
├── css/
│   ├── style.css           # Estilos, 3 temas, glassmorphism, animações
│   └── responsive.css      # Breakpoints e menu mobile
├── js/
│   └── script.js           # Temas, slideshow, quiz, validação, menu
└── assets/
    └── images/             # Imagens SVG (hero, slides, favicon)
```

## 🧩 Estrutura das seções (wireframe textual)

1. **Hero** — título, subtítulo, dois CTAs, estatísticas e imagem espacial flutuante.
2. **Problema** — 2 parágrafos sobre os desafios das operações remotas.
3. **Tecnologias** — 4 cards (GPS, Satélite, Sensoriamento Remoto, Edge Computing).
4. **Objetivos** — texto + lista de objetivos + indicador circular (98%).
5. **Público-Alvo** — 4 cards (Mineração, Agronegócio, Energia, Logística).
6. **Benefícios** — grade de 6 benefícios em cards de vidro.
7. **Aplicação** — fluxo visual de 4 passos + **slideshow** de 3 imagens.
8. **Quiz** — 10 perguntas dinâmicas → resultado **Baixo / Médio / Alto Risco**.
9. **Formulário** — Nome, Empresa, E-mail, Mensagem com **validação em JS**.
10. **Rodapé** — marca + todos os integrantes com seus RMs.

## 🏗️ Hierarquia HTML (resumo)

```
header.header > nav
main
 ├─ section#hero
 ├─ section#problema
 ├─ section#tecnologias  > .cards-grid > article.card ×4
 ├─ section#objetivos
 ├─ section#publico      > .cards-grid > article.card ×4
 ├─ section#beneficios   > .benefits-grid > .benefit ×6
 ├─ section#aplicacao    > ol.flow + .slideshow
 ├─ section#quiz         > .quiz (stage / nav / result)
 └─ section#contato      > form#contactForm
footer.footer
```

## 🎨 Requisitos de Front-End atendidos

- HTML5 **semântico** (`header`, `nav`, `main`, `section`, `article`, `footer`, `figure`).
- **Header fixo** com navegação suave (`scroll-behavior: smooth` + `scroll-padding`).
- **Flexbox** e **CSS Grid** em todo o layout.
- **Variáveis CSS** (`:root` / `[data-theme]`) para temas e tokens de design.
- **Reset CSS** no topo do `style.css`.
- **Responsividade completa** (breakpoints em 1024 / 860 / 560 / 380px).
- **Google Fonts** (Orbitron + Inter).
- Todas as **imagens com `alt`** (e `aria-label` nos SVGs).
- Estrutura de pastas organizada.

## ⚙️ Requisitos de Web Development atendidos

1. **Slideshow** com 3 imagens — autoplay, setas, dots e pausa no hover.
2. **Quiz dinâmico** com 10 perguntas, barra de progresso e resultado por faixa de risco.
3. **Validação completa do formulário** — impede envio de campos vazios, valida e-mail por regex e exibe erros inline.
4. **Sistema de temas** — Claro, Escuro e Orbit (azul espacial), com persistência via `localStorage`.
5. **Menu responsivo** (hambúrguer) para mobile.

## 📐 Estratégia de responsividade

- **Mobile-friendly** com breakpoints progressivos: `≤1024px` (grids 2 colunas), `≤860px` (ativa menu hambúrguer, hero/objetivos/formulário em coluna única, fluxo vertical), `≤560px` (tudo em 1 coluna), `≤380px` (ajustes finos de tipografia).
- Unidades fluidas (`clamp()`, `min()`, `%`, `aspect-ratio`) para escalar suavemente.
- `prefers-reduced-motion` respeitado (desliga animações para acessibilidade).

## 🧠 Planejamento das funcionalidades JavaScript

- `initThemes()` — aplica e persiste o tema selecionado.
- `initMobileMenu()` — abre/fecha o menu e fecha ao navegar.
- `initActiveNav()` — destaca o link da seção visível (IntersectionObserver).
- `initReveal()` — animações de entrada ao rolar.
- `initSlideshow()` — carrossel automático com controles.
- `initQuiz()` — fluxo de 10 perguntas e cálculo do nível de risco (0–20 pontos).
- `initForm()` — validação campo a campo e no envio.

## 🖼️ Sugestões de imagens por seção

As imagens entregues são **SVGs próprios** (vetoriais, leves e offline). Caso queira substituir por fotos reais, sugestões de tema:

- **Hero:** Terra vista do espaço / satélite em órbita.
- **Slideshow:** (1) satélite de comunicação, (2) imagem de sensoriamento/observação da Terra, (3) data center / rede de borda.
- **Tecnologias/Público:** ícones já usados via emoji; podem virar ícones SVG personalizados.

## 👥 Integrantes

| Nome | RM |
|------|----|
| Lucas Latuf | 570068 |
| Lucas Cardoso | 571430 |
| Cristian Schmidt | 570183 |
| Arthur Canzian | 569828 |
| Rodrigo Cocka | 573364 |
