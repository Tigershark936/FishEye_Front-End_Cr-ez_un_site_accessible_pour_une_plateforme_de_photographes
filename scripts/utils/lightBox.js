const titleMediaLightBox = document.querySelector(".titleMedia");

let MediaIndex = 0;
let currentMediaList = [];

// Gère le système du carrousel pour la lightBox
function handleMediaIndex(e) {
  const action = Number(e.currentTarget.getAttribute("data-action"));
  MediaIndex += action;

  // Si on dépasse le premier média (index < 0), on revient au dernier (effet boucle)
  if (MediaIndex < 0) {
    MediaIndex = currentMediaList.length - 1;

    // Si on dépasse le dernier média, on revient au premier (effet boucle)
  } else if (MediaIndex > currentMediaList.length - 1) {
    MediaIndex = 0;
  }

  // Récupère le média correspondant au nouvel index
  const currentMedia = currentMediaList[MediaIndex];
  console.log(currentMediaList);

  // Affiche ce média dans la lightbox avec ses infos (src, titre, type)
  displayLightBox(
    currentMedia.src,
    currentMedia.title,
    currentMedia.type,
    currentMediaList,
    MediaIndex
  );
}

export function displayLightBox(src, title, type, mediaList = [], index = 0) {
  const lightBox = document.querySelector(".lightBox");
  lightBox.setAttribute("role", "dialog");
  lightBox.setAttribute("aria-modal", "true");
  lightBox.setAttribute("aria-hidden", "false");
  const contentLightBox = lightBox.querySelector(".lightbox-content");

  // On vide le contenu précédent
  lightBox.style.display = "block";
  contentLightBox.innerHTML = "";

  // Rendre le fond inaccessible pour le Tab quand la lightBox est en block
  main.setAttribute("inert", "");

  let mediaElement;
  if (type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = src;
    mediaElement.alt = title;
  } else if (type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.controls = true;
    mediaElement.setAttribute("aria-label", title);
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    mediaElement.appendChild(source);
  }

  contentLightBox.appendChild(mediaElement);
  titleMediaLightBox.textContent = title;

  // Si mediaList est fourni, on met à jour les variables globales
  if (mediaList.length > 0) {
    currentMediaList = mediaList;
    MediaIndex = index;
  }

  const previousBtn = document.querySelector(".previous-btn");
  const nextBtn = document.querySelector(".next-btn");

  previousBtn.addEventListener("click", handleMediaIndex);
  nextBtn.addEventListener("click", handleMediaIndex);

  document.addEventListener("keydown", handleKeydownLightBox);

  console.log("Clicked", src, title, type);
}

export function handleCloseLightBox() {
  const lightBox = document.querySelector(".lightBox");
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.display = "none";

  // Rendre le fond à nouveau accessible
  main.removeAttribute("inert");
}

//Gère les interactions clavier dans la lightbox.
function handleKeydownLightBox(e) {
  //Flèche gauche (←) : affiche le média précédent
  if (e.key === "ArrowLeft") {
    document.querySelector(".previous-btn").click();
    //Flèche droite (→) : affiche le média suivant
  } else if (e.key === "ArrowRight") {
    document.querySelector(".next-btn").click();
  } else if (e.key === "Escape") {
    //Touche Échap (Escape) : ferme la lightbox.
    handleCloseLightBox();
    document.removeEventListener("keydown", handleKeydownLightBox);
  }
  document.addEventListener("keydown", handleKeydownLightBox);
}
