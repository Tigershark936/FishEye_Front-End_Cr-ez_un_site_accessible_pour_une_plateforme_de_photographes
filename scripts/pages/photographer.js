//Mettre le code JavaScript lié à la page photographer.html
import { galeryPhotographer } from '../components/galery.js';
import { mediaFactory } from '../components/galeryV2.js';
import { dropdownOpenList } from '../utils/selectFilter.js';


//Crée un objet pour lire les paramètres de l’URL
const params = new URLSearchParams(window.location.search);
// Récupère la valeur du paramètre dans l'URL pour le stocker
const photographerId = params.get("id");


function constructPhotographerPage(photograph){

    const main = document.getElementById('main');


    // Création du header du photographe
    const photographHeader = document.createElement('div');
    photographHeader.classList.add('photograph');
    main.appendChild(photographHeader);

    // Création de la description du photographe
    const photographDescription = document.createElement('div');
    photographDescription.classList.add('photograph__description');
    photographHeader.appendChild(photographDescription);

    // Création du firstname et surname("name") du photographe
    const photographName = document.createElement('h1');
    photographName.classList.add('photograph__description__name');
    photographName.textContent = `${photograph.name}`;
    photographDescription.appendChild(photographName);

    // Création de la localisation du photographe
    const photographLocation = document.createElement('h2');
    photographLocation.classList.add('photograph__description__location');
    photographLocation.textContent = `${photograph.city}, ${photograph.country}`;
    photographDescription.appendChild(photographLocation);

    // Création de la citation du photographe
    const photographCitation = document.createElement('p');
    photographCitation.classList.add('photograph__description__citation');
    photographCitation.textContent = `${photograph.tagline}`;
    photographDescription.appendChild(photographCitation);

    // Création du bonton pour contacter le photographe
    const photographContactButton = document.createElement('button');
    photographContactButton.textContent = 'Contactez-moi';
    photographContactButton.setAttribute("aria-label", `Contact Me`);
    photographHeader.appendChild(photographContactButton);

    // Ajout de l'écouteur d'événement pour ouvrir la modale afin de contacter 
    photographContactButton.addEventListener('click', displayModal);


    // Création de l'emplacement pour la photo du photographe
    const photographPicture = document.createElement('div');
    photographPicture.classList.add('photograph__picture');
    photographDescription.setAttribute("alt", `Portrait du photographe ${name}`);
    photographHeader.appendChild(photographPicture);

    // Création de l'ajout de la photo du photographe dans la div 'photograph__picture'
    const photographPictureImage = document.createElement('img');
    photographPictureImage.src = `assets/photographers/Sample-photos/Photographers-ID-Photos/${photograph.portrait}`;
    photographPicture.appendChild(photographPictureImage);

    const totalLikesAndPrice = document.createElement('div');
    totalLikesAndPrice.classList.add('boxLikeAndPrice');
    document.body.appendChild(totalLikesAndPrice)

    //Appele ici le selecteur de trie
    dropdownOpenList(main, photograph);
    // Appelle ici la galerie
    galeryPhotographer(main, photograph);
    
    mediaFactory(main, photograph)

}



const fetchPhotographer = (id) => {
    fetch("../../data/photographers.json").then((data) => {
    
        console.log('data', data);
        data.json().then((json) => {
            let photographData = json;
            console.log('json', json);
            const photograph = photographData.photographers.find((photographer) => photographer.id == id);
            console.log('photograph', photograph);
            constructPhotographerPage(photograph);
        });
    }).catch((error) => {
        console.error('Error fetching photographer:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPhotographer(photographerId);
});