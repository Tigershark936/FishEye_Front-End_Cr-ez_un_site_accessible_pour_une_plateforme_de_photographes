//Mettre le code JavaScript lié à la page photographer.html
import { dropdownOpenList } from '../utils/selectFilter.js';

async function getPhotographers(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json()
    
    //Retourne le tableau photographers 
    return data.photographers;
}

async function getMedias(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json();
    
    //Retourne le tableau des médias des photographers
    return data.media;
}

// permet de retrouver un photographe spécifique à partir de son id, en consultant le fichier photographers.json.
async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    return photographers.find((photographer) => photographer.id === parseInt(id, 10));
}


async function constructPhotographerPage(photograph){

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

    //Appele ici le selecteur de trie
    dropdownOpenList(photograph);

    const totalLikesAndPrice = document.createElement('div');
    totalLikesAndPrice.classList.add('boxLikeAndPrice');
    document.body.appendChild(totalLikesAndPrice);

    // Nouvelle récupération des médias du photographeId
    const medias = await getMedias();
    const photographerMedias = medias.filter(media => media.photographerId === photograph.id);

    // Compteur du calcul total des likes des médias d'une galery photographer
    let totalLikesCount = 0;
    photographerMedias.forEach(media => {
    totalLikesCount += media.likes;
});

    const totalLikes = document.createElement('div');
    totalLikes.classList.add('totalLike');
    totalLikes.textContent = `${totalLikesCount}`;
    totalLikesAndPrice.appendChild(totalLikes);

    const heart = document.createElement('div');
    heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    totalLikes.appendChild(heart);

    const priceForDay = document.createElement('div');
    priceForDay.classList.add('priceForDay')
    priceForDay.innerHTML = `300/jours`;
    totalLikesAndPrice.appendChild(priceForDay);
}

export function updateTotalLikes(newValue){
    const totalLikesElement = document.querySelector('.totalLike');
    if (totalLikesElement) {
        totalLikesElement.innerHTML = `${newValue}`;
    }
}


async function initPhotographerPage() {
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");

    try {
        const photographer = await getPhotographerById(photographerId);
        if (photographer) {
            constructPhotographerPage(photographer);
        } else {
            console.error("Photographe non trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page du photographe :", error);
    }
}

initPhotographerPage();