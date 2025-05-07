//Mettre le code JavaScript lié à la page photographer.html
import { getMedias, getPhotographerById } from "../api/data_services.js";
import { constructPhotographerPage } from "../templates/photographer_template.js";
import { dropdownOpenList } from "../utils/selectFilter.js";

// Fonction d'affichage principale des données du photographe et de ses médias
async function displayPhotographerData(photographer, medias) {
  const main = document.getElementById("main");

  try {
    console.debug("photographer", photographer);
    if (photographer) {
      // On construit la page photographe via le template principal
      const photographerPageObj = constructPhotographerPage(photographer, medias);
      const photographerHeader = photographerPageObj.getcardHeaderProtograph();

      // Ajout du header au DOM
      main.appendChild(photographerHeader);

      //AJOUT et Activation du menu de tri avec les bons paramètres
      dropdownOpenList(medias, photographer);

      // AJOUT et Affichage initial des médias non triés
      const mediasData = photographerPageObj.displayMediasTemplate();
      main.appendChild(mediasData);

    } else {
      console.error("Photographe non trouvé.");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la page du photographe :", error);
  }
}

// Fonction d'initialisation appelée au chargement
async function init() {
  // Récupère les données depuis l'URL (id du photographe)
  const params = new URLSearchParams(window.location.search);
  const photographerId = params.get("id");

  // Chargement des données via les services
  const photographer = await getPhotographerById(photographerId);
  const medias = await getMedias();

  // Lancement de l'affichage
  displayPhotographerData(photographer, medias);
}

init();
