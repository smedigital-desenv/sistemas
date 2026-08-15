/* ============================================================
   sme-ceu.js — campo de pontos do fundo, PARADO.

   A versão anterior tinha riscos de luz atravessando a tela. Foi
   retirada a pedido: mesmo numa tela de entrada, o movimento contínuo
   disputa a atenção com a leitura. O campo agora é desenhado uma vez e
   só se refaz quando a janela muda de tamanho — sem laço de animação e
   sem consumo contínuo de processador.
   ============================================================ */
(function () {
  "use strict";
  var cv = document.getElementById("ceu");
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext("2d");

  function desenhar() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var L = cv.clientWidth, A = cv.clientHeight;
    if (!L || !A) return;
    cv.width = Math.round(L * dpr);
    cv.height = Math.round(A * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, L, A);
    var n = Math.max(30, Math.min(90, Math.round(L * A / 20000)));
    for (var i = 0; i < n; i++) {
      var r = 0.4 + Math.random() * 1.0;
      var a = 0.08 + Math.random() * 0.20;
      ctx.beginPath();
      ctx.arc(Math.random() * L, Math.random() * A, r, 0, 6.283);
      ctx.fillStyle = "rgba(206,236,255," + a.toFixed(3) + ")";
      ctx.fill();
    }
  }

  desenhar();
  var espera = null;
  window.addEventListener("resize", function () {
    clearTimeout(espera);
    espera = setTimeout(desenhar, 200);
  });
})();
