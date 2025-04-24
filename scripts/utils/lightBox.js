const controlButtons = document.querySelectorAll(".control-btn")
const previousBtn = document.querySelector(".previous-btn")
const nextBtn = document.querySelector(".next-btn")
const closeLightBox = document.querySelector('.closeLightBox')

previousBtn.addEventListener("click", handleMediaIndex);
nextBtn.addEventListener("click", handleMediaIndex);

let MediaIndex = 0;
let currentMediaList = [];

function handleMediaIndex(e){
    const action = Number(e.currentTarget.getAttribute('data-action'));
    MediaIndex += action;

    if(MediaIndex < 0){
        MediaIndex = currentMediaList.lenght - 1
    } else if(MediaIndex > currentMediaList.lenght - 1){
        MediaIndex = 0
    }
}

export function displayLightBox(src, title, type) {
    const lightBox = document.querySelector(".lightBox");
    const contentLightBox = lightBox.querySelector(".lightbox-content");

    //On enleve l'élement 
    contentLightBox.innerHTML = '';
    // On affiche la lightbox
    lightBox.style.display = 'block';

    let mediaELement;
    if (type === 'image') {
        mediaELement = document.createElement('img');
        mediaELement.src = src;
        mediaELement.alt = title;
      } else if (type === 'video') {
        mediaELement = document.createElement('video');
        mediaELement.controls = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        mediaELement.appendChild(source);
      }

    contentLightBox.appendChild(mediaELement);
    console.log('Clicked', src, title, type);

}

export function handleCloseLightBox() {
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "none";
}
