document.addEventListener("DOMContentLoaded", function () {

  // QR Code
  new QRCode(document.getElementById("qrcode"), {
    text: "https://acesse.one/cvgarciar",
    width: 120,
    height: 120,
    colorDark: "#f9a8d4",
    colorLight: "#000000",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Formulario
  const formulario = document.getElementById("formulario-contacto");
  const mensajeExito = document.getElementById("mensaje-exito");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    mensajeExito.style.display = "block";
    formulario.reset();
    setTimeout(() => mensajeExito.style.display = "none", 4000);
  });

  // Texto animado
  const textLines = [
    "¡Hola!, ¿que tal?\n\n",
    "Soy Rafael García Ávila \n\n",
    "y, como puede apreciarse, Desarrollador Web,  \n\n",
    "¡BIENVENID@!"
  ];

  const textElement = document.getElementById("text");
  let lineIndex = 0;
  let charIndex = 0;
  let displayedText = "";

  function typeLine() {
    if (lineIndex >= textLines.length) {
      showProfileAndConfetti();
      return;
    }
    const currentLine = textLines[lineIndex];
    const isLastLine = (lineIndex === textLines.length - 1);

    if (!isLastLine) {
      displayedText += currentLine[charIndex] || "";
      textElement.textContent = displayedText;
      charIndex++;
      if (charIndex < currentLine.length) setTimeout(typeLine, 70);
      else { lineIndex++; charIndex = 0; setTimeout(typeLine, 500); }
    } else {
      let partial = currentLine.slice(0, charIndex + 1);
      textElement.innerHTML = displayedText + `<span class="bienvenido-gradient">${partial}</span>`;
      charIndex++;
      if (charIndex < currentLine.length) setTimeout(typeLine, 70);
      else { displayedText += currentLine; lineIndex++; charIndex = 0; setTimeout(typeLine, 500); }
    }
  }

  function showProfileAndConfetti() {
    const profile = document.getElementById("profile-pic");
    profile.style.display = "block";
    setTimeout(() => profile.classList.add("mostrar"), 50);
    launchConfettiRain();
  }

  function launchConfettiRain() {
    const duration = 5000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 45,
        origin: { x: Math.random(), y: 0 },
        gravity: 1,
        scalar: 0.8,
        drift: (Math.random() - 0.5) * 1.5,
        ticks: 500
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  typeLine();

  // Cohete animado
  const cohete = document.querySelector(".cohete");
  const seccionSobreMi = document.querySelector("#sobre-mi");

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cohete.classList.add("animar");
          observer.unobserve(seccionSobreMi);
        }
      });
    }, { threshold: 0.5 }
  );

  observer.observe(seccionSobreMi);

  // Ajuste altura real en móviles (para evitar barra del navegador)
  function ajustarAltura() {
    const altoPantalla = window.innerHeight;
    document.querySelector(".container").style.height = altoPantalla + "px";
  }

  window.addEventListener("load", ajustarAltura);
  window.addEventListener("resize", ajustarAltura);
});
