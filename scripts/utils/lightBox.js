//Fichier pour l'action de la Lightbox 
const main = document.getElementById("main");

// Variables globales pour gérer l'index courant et la liste de médias
let MediaIndex = 0;
let currentMediaList = [];

// Gère le système du carrousel pour la lightBox
function handleMediaIndex(e) {
  const action = Number(e.currentTarget.getAttribute("data-action"));
  MediaIndex += action;

  if (MediaIndex < 0) {
    MediaIndex = currentMediaList.length - 1;
  } else if (MediaIndex > currentMediaList.length - 1) {
    MediaIndex = 0;
  }

  const currentMedia = currentMediaList[MediaIndex];

  // Réaffiche le média à l'index actuel
  displayLightBox(
    currentMedia.src,
    currentMedia.title,
    currentMedia.type,
    currentMediaList,
    MediaIndex
  );
}

// Fonction qui affiche la lightbox avec un média donné
export function displayLightBox(src, title, type, mediaList = [], index = 0) {
  const lightBox = document.querySelector(".lightBox");
  const contentLightBox = lightBox.querySelector(".lightbox-content");
  const containerLightBox = document.querySelector(".mediaLightBox");

  // Affichage de la lightbox
  lightBox.setAttribute("role", "dialog");
  lightBox.setAttribute("aria-modal", "true");
  lightBox.setAttribute("aria-labelledby", "lightbox-media-title");
  lightBox.style.display = "block";

  // Empêche le focus sur le reste de la page
  main.setAttribute("inert", "");

  // Vide l'ancien média
  contentLightBox.innerHTML = "";

  // Crée et Affiche l'image ou la vidéo
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

  // Supprime le titre précédent pour éviter l’empilement des titres
  const oldTitle = containerLightBox.querySelector(".titleMedia");
  if (oldTitle) oldTitle.remove();

  // Ajoute le nouveau titre
  const titleElement = document.createElement("h4");
  titleElement.classList.add("titleMedia");
  titleElement.setAttribute("id", "lightbox-media-title");
  titleElement.setAttribute("aria-label", "Titre du média en cours");
  titleElement.setAttribute("tabindex", "0");
  titleElement.textContent = title;
  containerLightBox.appendChild(titleElement);

  // Focus initial sur le titre du média lors de l'ouverture de la lightBox
  titleElement.focus();

  // Met à jour la liste de médias et l’index si fournis
  if (mediaList.length > 0) {
    currentMediaList = mediaList;
    MediaIndex = index;
  }

  // Ajout des écouteurs de navigation (flèches)
  const previousBtn = document.querySelector(".previous-btn");
  const nextBtn = document.querySelector(".next-btn");

  previousBtn.onclick = handleMediaIndex;
  nextBtn.onclick = handleMediaIndex;

  // Ajout unique de l'écouteur clavier
  document.removeEventListener("keydown", handleKeydownLightBox);
  document.addEventListener("keydown", handleKeydownLightBox);
}

// Gère les raccourcis clavier dans la lightbox
function handleKeydownLightBox(e) {
  if (e.key === "ArrowLeft") {
    document.querySelector(".previous-btn").click();
  } else if (e.key === "ArrowRight") {
    document.querySelector(".next-btn").click();
  } else if (e.key === "Escape") {
    handleCloseLightBox();
  }
}

// Bouton pour fermer la lightbox
const closeLightBoxBtn = document.querySelector(".closeLightBox");
closeLightBoxBtn.addEventListener("click", handleCloseLightBox);
closeLightBoxBtn.setAttribute("role", "button");
closeLightBoxBtn.setAttribute("aria-label", "Fermer la visionneuse de médias");

// Ferme la lightbox proprement 
export function handleCloseLightBox() {
  const lightBox = document.querySelector(".lightBox");
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.display = "none";

  // Rendre à nouveau le fond accessible
  main.removeAttribute("inert");

  // Supprime l'écouteur clavier pour éviter doublons
  document.removeEventListener("keydown", handleKeydownLightBox);
}
