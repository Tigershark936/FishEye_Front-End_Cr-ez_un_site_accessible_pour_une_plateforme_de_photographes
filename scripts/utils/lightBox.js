const controlButtons = document.querySelectorAll(".control-btn")
const previousBtn = document.querySelector(".previous-btn")
const nextBtn = document.querySelector(".next-btn")
const closeLightBox = document.querySelector('.closeLightBox')

export function displayLightBox(src, title, type) {
    const lightBox = document.querySelector(".lightBox");
    const contentLightBox = lightBox.querySelector(".lightbox-content");

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
