/* Sliders en JavaScript plano — sin dependencias */
(function () {
  function iniciarSlider(selectorGrupo, opciones) {
    var elementos = document.querySelectorAll(selectorGrupo);
    if (!elementos.length) return;
    var indice = 0;
    var puntos = opciones.puntos ? document.querySelectorAll(opciones.puntos + " .punto") : [];

    function mostrar(nuevo) {
      var previo = indice;
      indice = (nuevo + elementos.length) % elementos.length;
      if (previo === indice) return;
      for (var i = 0; i < elementos.length; i++) {
        elementos[i].classList.remove("saliendo");
        elementos[i].classList.toggle("activa", i === indice);
      }
      if (opciones.animar) {
        (function (saliente) {
          saliente.classList.add("saliendo");
          setTimeout(function () { saliente.classList.remove("saliendo"); }, 650);
        })(elementos[previo]);
      }
      for (var j = 0; j < puntos.length; j++) {
        puntos[j].classList.toggle("activo", j === indice);
      }
    }


    var anterior = document.querySelector(opciones.anterior);
    var siguiente = document.querySelector(opciones.siguiente);
    if (anterior) anterior.addEventListener("click", function () { mostrar(indice - 1); });
    if (siguiente) siguiente.addEventListener("click", function () { mostrar(indice + 1); });
    for (var k = 0; k < puntos.length; k++) {
      (function (n) {
        puntos[n].addEventListener("click", function () { mostrar(n); });
      })(k);
    }

    if (opciones.intervalo) {
      setInterval(function () { mostrar(indice + 1); }, opciones.intervalo);
    }
  }

  function iniciar() {
    iniciarSlider(".diapositiva", {
      anterior: "[data-slider-anterior]",
      siguiente: "[data-slider-siguiente]",
      puntos: "[data-slider-puntos]",
      intervalo: 8000,
      animar: true,
    });
    iniciarSlider(".testimonios__grupo", {
      anterior: "[data-testimonios-anterior]",
      siguiente: "[data-testimonios-siguiente]",
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
