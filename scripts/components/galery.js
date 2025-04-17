// Creation de la section galery

export function galeryPhotographer(main) {
    mediaGalery(main); // on appelle la fonction dynamique ici
}

// fonction qui me sert à faire le lien entre l’ID du photographe pour récuperer les data du JSON
function getFolderName(photographerId) {
    switch (photographerId) {
        case 243: return 'Mimi';
        case 930: return 'Ellie Rose';
        case 82:  return 'Tracy';
        case 527: return 'Nabeel';
        case 925: return 'Rhode';
        case 195: return 'Marcel';
        default: return '';
    }
}

// Fonction qui récupère les médias du bon photographe et les affiche
async function mediaGalery(main) {
    try {
        // On va chercher les données dans le fichier JSON
        const response = await fetch('../../data/photographers.json');
        const data = await response.json();

        const params = new URLSearchParams(window.location.search);
        const photographerId = parseInt(params.get('id'), 10);

        const sectionGalery = document.createElement('section');
        sectionGalery.classList.add('galery');

        // AJOUT : filtrage des médias pour le bon photographe grâce a son id
        const medias = data.media.filter((item) => item.photographerId === photographerId);

        medias.forEach((media) => {
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
            if (image) {
                const img = document.createElement('img');
                img.setAttribute("src", `assets/photographers/Sample-photos/${getFolderName(photographerId)}/${image}`);
                img.setAttribute("alt", title);
                img.classList.add('element_galery', 'img');
                elementGalery.appendChild(img);
            } else if (video) {
                const vid = document.createElement('video');
                vid.setAttribute("controls", true);
                const source = document.createElement('source');
                source.setAttribute("src", `assets/photographers/Sample-photos/${getFolderName(photographerId)}/${video}`);
                source.setAttribute('type', 'video/mp4');
                vid.appendChild(source);
                elementGalery.appendChild(vid);
            }

            // Titre de l'élément photo ou vidéo
            const txtElement = document.createElement('h3');
            txtElement.textContent = `${title}`;
            txtElement.classList.add('info-img', 'h3');
            elementGalery.appendChild(txtElement);

            // affichage du cœur (likes statique pour l’instant)
            const heart = document.createElement('div');
            heart.innerHTML = `${likes}<i class="fa-solid fa-heart"></i>`;
            txtElement.appendChild(heart);
        });

        // On ajoute la galerie au main
        main.appendChild(sectionGalery);
    } catch (error) {
        console.error('Erreur lors du chargement de la galerie dynamique :', error);
    }
}
