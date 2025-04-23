// Creation de la section galery
import { updateTotalLikes } from '../pages/photographer.js';
import { displayLightBox, handleCloseLightBox } from '../utils/lightBox.js';

async function getMedias(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json();
    
    //Retourne le tableau des médias des photographers
    return data.media;
}

async function getPhotographers(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json();
    
    //Retourne le tableau photographers 
    return data.photographers;
}

// fonction qui me sert à faire le lien entre l’ID du photographe pour récuperer les data du JSON
async function getFolderName(photographerId) {
    const photographers = await getPhotographers();
 
     
    const photographer = photographers.find((photographer) => photographer.id === photographerId);
    const photographerName = photographer.name.split(' ')[0];
    console.log('photographerName', photographerName);
    const nameWithoutTiret = photographerName.replace('-', ' ');

    return nameWithoutTiret;
}

// Fonction qui récupère les médias du bon photographe et les affiche
async function displayMedias(data) {
    try {
        const main = document.getElementById('main');
        
        const params = new URLSearchParams(window.location.search);
        const photographerId = parseInt(params.get('id'), 10);

        const sectionGalery = document.createElement('section');
        sectionGalery.classList.add('galery');

        // AJOUT : filtrage des médias pour le bon photographe grâce a son id
        const medias = data.filter((item) => item.photographerId === photographerId);

        medias.forEach(async(media) => {
            const { title, image, video, likes, date, price} = media;

            // Création du conteneur de galerie pour chaque média
            const galeryPhotograph = document.createElement('div');
            galeryPhotograph.classList.add('galery');
            sectionGalery.appendChild(galeryPhotograph);

            // Création d'un élément individuel de la galerie
            const elementGalery = document.createElement('div');
            elementGalery.classList.add('element_galery');
            galeryPhotograph.appendChild(elementGalery);


            // Image ou vidéo dans la galerie du photographe grâce à cette condition
            const folderName = await getFolderName(photographerId);

            // Lien entre le bouton "X" et la fonction
            const closeLightBoxBtn = document.querySelector(".closeLightBox");
            closeLightBoxBtn.addEventListener("click", handleCloseLightBox);
            closeLightBoxBtn.setAttribute('role', 'button');

            if (image) {
                const img = document.createElement('img');
                img.setAttribute("src", `assets/photographers/Sample-photos/${folderName}/${image}`);
                img.setAttribute("alt", title);
                img.classList.add('element_galery', 'img');
                elementGalery.appendChild(img);

                // Ajout d'événement pour ouvrir la lightbox afin d''agrandir les médias
                img.addEventListener('click', () => displayLightBox(img.src, title));

            } else if (video) {
                const vid = document.createElement('video');
                vid.setAttribute("controls", true);
                const source = document.createElement('source');
                source.setAttribute("src", `assets/photographers/Sample-photos/${folderName}/${video}`);
                source.setAttribute('type', 'video/mp4');
                vid.appendChild(source);
                elementGalery.appendChild(vid);

                // Ajout d'événement pour ouvrir la lightbox afin d''agrandir les médias
                vid.addEventListener('click', () => displayLightBox(source.src, title));
            }

           // Titre de l'élément photo ou vidéo
           const txtElement = document.createElement('h3');
           txtElement.textContent = `${title}`;
           txtElement.classList.add('info-img', 'h3');
           elementGalery.appendChild(txtElement);

           // Compteur de likes à rouleau unique et le heart ===
           const boxLike = document.createElement('div');
           boxLike.classList.add('boxlike');
           boxLike.setAttribute('tabindex', '0');
           boxLike.setAttribute('role', 'button');
           boxLike.setAttribute('aria-label', `Liker le média ${title}`);
           txtElement.appendChild(boxLike);

           //Permet à l'utilisateur de liker le média si il like.
           boxLike.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                boxLike.click();
                }
            });

           // Nombre de like du média
           const numberLikes = document.createElement('div');
           numberLikes.classList.add('numberLikes-counter');
           boxLike.appendChild(numberLikes);

           const digitTrack = document.createElement('div');
           digitTrack.classList.add('digital-Track');
           numberLikes.appendChild(digitTrack);

           let currentLikeValue = likes;

           // Crée les lignes jusqu'à une valeur max
           const maxValue = currentLikeValue + 1000; 
           for (let i = 0; i <= maxValue; i++) {
               const line = document.createElement('div');
               line.textContent = i;
               digitTrack.appendChild(line);
           }

           // Position initiale
           digitTrack.style.transform = `translateY(-${currentLikeValue * 40}px)`;

           // Clic pour incrémenter les likes des datas avec les utilisateurs
           boxLike.addEventListener('click', () => {
               currentLikeValue += 1;

               // Ajoute plus de lignes si on dépasse
               if (currentLikeValue >= digitTrack.children.length) {
                   const line = document.createElement('div');
                   line.textContent = currentLikeValue;
                   digitTrack.appendChild(line);
               }

            digitTrack.style.transform = `translateY(-${currentLikeValue * 40}px)`;

            // Permet de mettre à jour le total global par rapport a un like sur la galery
            totalLikesCount++;
            updateTotalLikes(totalLikesCount);
            console.log(totalLikesCount);  
        });

           const heart = document.createElement('div');
           heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;
           boxLike.appendChild(heart);
       });

        // On ajoute la galerie au main
        main.appendChild(sectionGalery);
    } catch (error) {
        console.error('Erreur lors du chargement de la galerie dynamique :', error);
    }
}

async function init() {
    // Récupère les médias des photographes
    const medias = await getMedias();
    displayMedias(medias);
}

init();