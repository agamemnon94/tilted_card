window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("clean__transition");
});

// On récupère le conteneur qui va donner les dimensions du "terrain de jeu" de l'animation
const tiltedSection = document.querySelector(".tilted-section");

// On récupère l'élément à animer
const tiltedCard = document.querySelector(".tilted-section__card");

if (window.matchMedia("(pointer:fine)").matches) {
  tiltedSection.addEventListener("mousemove", handelTiltEffect);

  function handelTiltEffect(e) {
    const tiltedSectionDimensions = tiltedSection.getBoundingClientRect();

    // e.clientX donne la position de lévènement par rapport à la taille du viewport. S'il ya du contenu avant, après ou sur les côtés, l'animation s'effectura en dehors de la zone souhaitée c'est à dire "tiltedSection".
    const mouseXInSection = e.clientX - tiltedSectionDimensions.left,
      mouseYInSection = e.clientY - tiltedSectionDimensions.top;

    const elementMiddleX = tiltedSectionDimensions.width / 2,
      elementMiddleY = tiltedSectionDimensions.height / 2;

    const maxTiltX = 30,
      maxTiltY = 30;

    const tiltAngleY =
        ((mouseXInSection - elementMiddleX) / elementMiddleX) * maxTiltX,
      tiltAngleX =
        ((mouseYInSection - elementMiddleY) / elementMiddleY) * maxTiltY;

    tiltedCard.style.transform = `rotateY(${tiltAngleY}deg) rotateX(${-tiltAngleX}deg)`;
  }
  tiltedSection.addEventListener("mouseout", resetTiltOnMouseOut);

  function resetTiltOnMouseOut() {
    tiltedCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
  }
}
