//Mettre le code JavaScript lié à la page photographer.html
import { getMedias, getPhotographerById } from '../api/data_services.js';
import { constructPhotographerPage } from '../templates/photographer_template.js';
import { dropdownOpenList } from '../utils/selectFilter.js';


async function displayPhotographerData(photographer, medias) {
    
    const main = document.getElementById('main');
    
    try {
        console.debug('photographer', photographer);
        if (photographer) {
            const photographerPageObj = constructPhotographerPage(photographer, medias);
            const photographerHeader = photographerPageObj.getcardHeaderProtograph();

            main.appendChild(photographerHeader);

            dropdownOpenList(photographer);

            const mediasData = photographerPageObj.displayMediasTemplate();

            main.appendChild(mediasData);
        } else {
            console.error("Photographe non trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page du photographe :", error);
    }
}


async function init() {
    // Récupère les datas des photographes
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");
    const photographer = await getPhotographerById(photographerId);
    const medias = await getMedias();

    displayPhotographerData(photographer, medias);
}

init();

