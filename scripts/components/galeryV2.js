// Creation de la section galery

export function mediaFactory(mediaData){
    const { title, image, video, likes, date, photographerId } = mediaData;

    // Création du conteneur de galerie pour chaque média
    const galeryPhotograph = document.createElement('div');
    galeryPhotograph.classList.add('galery');
    sectionGalery.appendChild(galeryPhotograph);

    // Création d'un élément individuel de la galerie
    const elementGalery = document.createElement('div');
    elementGalery.classList.add('element_galery');
    galeryPhotograph.appendChild(elementGalery);

    // stocke les médias globaux pour le tri de la galerie
    let allMedias;

    if (image){
        allMedias = document.createElement('img');
        allMedias.setAttribute("src", `assets/photographers/Sample-photos/${getFolderName(photographerId)}/${image}`);
        allMedias.setAttribute("alt", `${title}`);
        allMedias.classList.add('element_galery', 'img');
    } else if (video){
        allMedias = document.createElement('video');
        allMedias.setAttribute("src", `assets/photographers/Sample-photos/${getFolderName(photographerId)}/${video}`);
        allMedias.classList.add('element_galery', 'video');
    }

    // Titre de l'élément photo ou vidéo
    const txtElement = document.createElement('h3');
    txtElement.textContent = `${title}`;
    txtElement.classList.add('info-img', 'h3');
    elementGalery.appendChild(txtElement);

    // Boite à like de l'élémentGalery
    const boxLike = document.createElement('div');
    boxLike.classList.add('boxlike')
    txtElement.appendChild(boxLike)

    // Affichage du nombre de likes 
    const numberLikes = document.createElement('p')
    numberLikes.textContent = `${likes}`;
    boxLike.appendChild(numberLikes)

    // affichage du cœur (likes statique pour l’instant)
    const heart = document.createElement('div');
    heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    boxLike.appendChild(heart);

    elementGalery.appendChild(allMedias);

    // On ajoute la galerie au main
    main.appendChild(sectionGalery);

}