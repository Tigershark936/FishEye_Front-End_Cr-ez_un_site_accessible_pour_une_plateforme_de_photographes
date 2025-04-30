const controlButtons = document.querySelectorAll(".control-btn")
const previousBtn = document.querySelector(".previous-btn")
const nextBtn = document.querySelector(".next-btn")
const closeLightBox = document.querySelector('.closeLightBox')
const titleMediaLightBox = document.querySelector('.titleMedia')

previousBtn.addEventListener("click", handleMediaIndex);
nextBtn.addEventListener("click", handleMediaIndex);

let MediaIndex = 0;
let currentMediaList = [];

function handleMediaIndex(e){
    const action = Number(e.currentTarget.getAttribute('data-action'));
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

    // Affiche ce média dans la lightbox avec ses infos (src, titre, type)
    displayLightBox(currentMedia.src, currentMedia.title, currentMedia.type);
}

export function displayLightBox(src, title, type, mediaList = [], index = 0) {
    const lightBox = document.querySelector(".lightBox");
    const contentLightBox = lightBox.querySelector(".lightbox-content");

    // On vide le contenu précédent
    contentLightBox.innerHTML = '';
    lightBox.style.display = 'block';

    let mediaElement;
    if (type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = src;
        mediaElement.alt = title;
    } else if (type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        mediaElement.appendChild(source);
    }

    contentLightBox.appendChild(mediaElement);
    titleMediaLightBox.textContent = title;

    // Si mediaList est fourni, on met à jour les variables globales
    if (mediaList.length > 0) {
        currentMediaList = mediaList;
        MediaIndex = index;
    }

    console.log('Clicked', src, title, type);
}

export function handleCloseLightBox() {
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "none";
}
