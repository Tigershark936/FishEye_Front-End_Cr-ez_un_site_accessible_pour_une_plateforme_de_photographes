import { displayLightBox, handleCloseLightBox } from "../utils/lightBox.js";
import { getFolderName } from "../utils/getFolderName.js";
import { getTotalLikesForPhotographer } from "../utils/getTotalLikesForPhotographer.js";

export function constructPhotographerPage(photograph, medias) {

  function getcardHeaderProtograph() {
    const photographHeader = document.createElement("div");
    photographHeader.classList.add("photograph");
    photographHeader.setAttribute("aria-label", "En-tête du profil du photographe");

    // Création de la description du photographe
    const photographDescription = document.createElement("div");
    photographDescription.classList.add("photograph__description");
    photographDescription.setAttribute("aria-label", `Description de ${photograph.name}`);
    photographHeader.appendChild(photographDescription);

    // Création du firstname et surname("name") du photographe
    const photographName = document.createElement("h1");
    photographName.classList.add("photograph__description__name");
    photographName.textContent = `${photograph.name}`;
    photographName.setAttribute("aria-label", `Nom du photographe : ${photograph.name}`);
    photographDescription.appendChild(photographName);

    // Création de la localisation du photographe
    const photographLocation = document.createElement("h2");
    photographLocation.classList.add("photograph__description__location");
    photographLocation.textContent = `${photograph.city}, ${photograph.country}`;
    photographLocation.setAttribute("aria-label", `Localisation du photographe : ${photograph.city}, ${photograph.country}`);
    photographDescription.appendChild(photographLocation);

    // Création de la citation du photographe
    const photographCitation = document.createElement("p");
    photographCitation.classList.add("photograph__description__citation");
    photographCitation.textContent = `${photograph.tagline}`;
    photographCitation.setAttribute("aria-label", `Citation du photographe : ${photograph.tagline}`);
    photographDescription.appendChild(photographCitation);

    // Création du bonton pour contacter le photographe
    const photographContactButton = document.createElement("button");
    photographContactButton.textContent = "Contactez-moi";
    photographContactButton.setAttribute("aria-label", `Bouton pour contacter le photographe`);
    photographHeader.appendChild(photographContactButton);

    // Ajout de l'écouteur d'événement pour ouvrir la modale afin de contacter
    photographContactButton.addEventListener("click", displayModal);

    // Création de l'emplacement pour la photo du photographe
    const photographPicture = document.createElement("div");
    photographPicture.classList.add("photograph__picture");
    photographPicture.setAttribute("aria-label", `Portrait du photographe ${photograph.name}`);
    photographHeader.appendChild(photographPicture);

    // Création de l'ajout de la photo du photographe dans la div 'photograph__picture'
    const photographPictureImage = document.createElement("img");
    photographPictureImage.src = `assets/photographers/Sample-photos/Photographers-ID-Photos/${photograph.portrait}`;
    photographPictureImage.alt = `Portrait du photographe ${photograph.name}`;
    photographPicture.appendChild(photographPictureImage);

    const totalLikesAndPrice = document.createElement("div");
    totalLikesAndPrice.classList.add("boxLikeAndPrice");
    totalLikesAndPrice.setAttribute("aria-label", "Encadré contenant du total de likes et le tarif journalier par jour");
    document.body.appendChild(totalLikesAndPrice);

    // Nouvelle récupération des médias du photographeId
    const params = new URLSearchParams(window.location.search);
    const photographerId = parseInt(params.get("id"), 10);

    // Calcul du total des likes via fonction utilitaire
    const totalLikesCount = getTotalLikesForPhotographer(medias, photographerId);

    console.log("Photographer ID depuis l'URL :", photographerId);
    console.log("Médias pour ce photographe :", medias.filter(m => m.photographerId === photographerId));
    console.log("Total des likes calculés :", totalLikesCount);

    // Création du compteur total des likes du photographe
    const totalLikes = document.createElement("div");
    totalLikes.classList.add("totalLike");
    totalLikes.setAttribute("aria-label", `Nombre total de likes sur toute la galerie du photgraphe : ${totalLikesCount}`);

    // === Ajout du compteur à rouleau pour totalLikes ===
    const digitTrackTotal = document.createElement("div");
    digitTrackTotal.classList.add("digital-Track");
    totalLikes.appendChild(digitTrackTotal);

    // Crée les lignes jusqu'à une valeur max pour totalLikes
    const maxTotal = totalLikesCount + 1000;
    for (let i = 0; i <= maxTotal; i++) {
      const line = document.createElement("div");
      line.textContent = i;
      digitTrackTotal.appendChild(line);
    }

    // Position initiale du compteur
    digitTrackTotal.style.transform = `translateY(-${totalLikesCount * 40}px)`;

    // Stockage global pour mise à jour depuis displayMediasTemplate
    window.totalLikesTrack = digitTrackTotal;
    window.totalLikesValue = totalLikesCount;

    // Ajout de l'icône cœur au compteur total
    const heart = document.createElement("div");
    heart.innerHTML = `<i class="fa-solid fa-heart" aria-hidden="true"></i>`;
    totalLikes.appendChild(heart);

    // Ajout du compteur total dans le conteneur
    totalLikesAndPrice.appendChild(totalLikes);

    // Création de la tarification journalière
    const priceForDay = document.createElement("div");
    priceForDay.classList.add("priceForDay");
    priceForDay.innerHTML = `${photograph.price}€ / jour`;
    priceForDay.setAttribute("aria-label", `Tarif journalier du photographe : ${photograph.price}`);
    totalLikesAndPrice.appendChild(priceForDay);

    return photographHeader;
  }

  // Fonction qui récupère les médias du bon photographe et les affiche
  function displayMediasTemplate() {
    try {
      const params = new URLSearchParams(window.location.search);
      const photographerId = parseInt(params.get("id"), 10);

      const sectionGalery = document.createElement("section");
      sectionGalery.classList.add("galery");
      sectionGalery.setAttribute("aria-label", `Galerie des médias du photographe ${photograph.name}`);

      // AJOUT : filtrage des médias pour le bon photographe grâce a son id
      const mediasData = medias.filter(
        (item) => item.photographerId === photographerId
      );

      mediasData.forEach(async (media) => {
        const { title, image, video, likes, date, price } = media;

        // Création du conteneur de galerie pour chaque média
        const galeryPhotograph = document.createElement("div");
        galeryPhotograph.classList.add("galery");
        galeryPhotograph.setAttribute("aria-label", `Média : ${title}`);
        sectionGalery.appendChild(galeryPhotograph);

        // Création d'un élément individuel de la galerie
        const elementGalery = document.createElement("div");
        elementGalery.classList.add("element_galery");
        elementGalery.setAttribute("aria-label", `Conteneur du média ${title}`);
        elementGalery.setAttribute("tabindex", "0");
        galeryPhotograph.appendChild(elementGalery);

        const folderName = await getFolderName(photographerId);

        // Lien entre le bouton "X" et la fonction
        const closeLightBoxBtn = document.querySelector(".closeLightBox");
        closeLightBoxBtn.addEventListener("click", handleCloseLightBox);
        closeLightBoxBtn.setAttribute("role", "button");
        closeLightBoxBtn.setAttribute("aria-label", "Fermer la visionneuse de médias");

        if (image) {
          const img = document.createElement("img");
          img.setAttribute("src", `assets/photographers/Sample-photos/${folderName}/${image}`);
          img.setAttribute("alt", title);
          img.classList.add("element_galery", "img");
          img.setAttribute("aria-label", `Image : ${title}`);
          img.setAttribute("tabindex", "0");
          elementGalery.appendChild(img);

          // Ajout d'événement pour ouvrir la lightbox afin d'agrandir les médias
          img.addEventListener("click", () =>
            displayLightBox(img.src, title, "image")
          );

          //Ajout de l'évènement pour ouvrir la lightbox mais avec la touche "Enter"
          img.addEventListener("keyup", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              displayLightBox(img.src, title, "image");
            }
          });

        } else if (video) {
          const vid = document.createElement("video");
          vid.setAttribute("controls", true);
          vid.setAttribute("aria-label", `Vidéo : ${title}`);
          const source = document.createElement("source");
          source.setAttribute("src", `assets/photographers/Sample-photos/${folderName}/${video}`);
          source.setAttribute("type", "video/mp4");
          vid.appendChild(source);
          elementGalery.appendChild(vid);

          // Ajout d'événement pour ouvrir la lightbox afin d''agrandir les médias
          vid.addEventListener("click", () =>
            displayLightBox(source.src, title, "video")
          );
        }

        // Titre de l'élément photo ou vidéo
        const txtElement = document.createElement("div");
        txtElement.classList.add("info-img");
        txtElement.setAttribute("aria-label", `Informations sur le média : ${title}`);
        elementGalery.appendChild(txtElement);

        // Titre de l'élément photo ou vidéo
        const titleMedia = document.createElement("h3");
        titleMedia.textContent = `${title}`;
        titleMedia.classList.add("h3");
        titleMedia.setAttribute("aria-label", `Titre : ${title}`);
        titleMedia.setAttribute("tabindex", "0");
        txtElement.appendChild(titleMedia);

        // Compteur de likes à rouleau unique et le heart ===
        const boxLike = document.createElement("div");
        boxLike.classList.add("boxlike");
        boxLike.setAttribute("tabindex", "0");
        boxLike.setAttribute("role", "button");
        boxLike.setAttribute("aria-label", `Liker ou disliker le média ${title}`);
        txtElement.appendChild(boxLike);

        //Permet à l'utilisateur de liker le média si il like.
        boxLike.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            boxLike.click();
          }
        });

        // Nombre de like du média
        const numberLikes = document.createElement("div");
        numberLikes.classList.add("numberLikes-counter");
        numberLikes.setAttribute("aria-label", `Compteur de likes ${likes}`);
        boxLike.appendChild(numberLikes);

        const digitTrack = document.createElement("div");
        digitTrack.classList.add("digital-Track");
        numberLikes.appendChild(digitTrack);

        let currentLikeValue = likes;
        // Crée les lignes jusqu'à une valeur max
        const maxValue = currentLikeValue + 1000;
        for (let i = 0; i <= maxValue; i++) {
          const line = document.createElement("div");
          line.textContent = i;
          digitTrack.appendChild(line);
        }

        // Position initiale
        digitTrack.style.transform = `translateY(-${currentLikeValue * 40}px)`;

        // variable qui me permet de rajouter ou enlever 1 like par utilisateur / par media
        let isLiked = false;
        // Clic pour incrémenter ou décrémenter les likes des datas avec les utilisateurs
        boxLike.addEventListener("click", () => {
          if (!isLiked) {
            currentLikeValue += 1;
            isLiked = true;
            // Ajout +1 au compteur total pour totalLikes de la galery du photograph
            window.totalLikesValue += 1;
          } else {
            currentLikeValue --;
            isLiked = false;
            // Retrait -1 au compteur total pour totalLikes de la galery du photograph
            window.totalLikesValue -= 1;
          }

          // Ajoute plus de lignes si on dépasse pour le compteur individuel
          if (currentLikeValue >= digitTrack.children.length) {
            const line = document.createElement("div");
            line.textContent = currentLikeValue;
            digitTrack.appendChild(line);
          }

          // Applique l'animation de rouleau sur le compteur individuel
          digitTrack.style.transform = `translateY(-${
            currentLikeValue * 40
          }px)`;

          // Ajoute plus de lignes si on dépasse pour le compteur total
          if (window.totalLikesValue >= window.totalLikesTrack.children.length) {
            const line = document.createElement("div");
            line.textContent = window.totalLikesValue;
            window.totalLikesTrack.appendChild(line);
          }

          // Applique l'animation de rouleau sur le compteur total
          window.totalLikesTrack.style.transform = `translateY(-${
            window.totalLikesValue * 40}px)`;
        });
        
        const heart = document.createElement("div");
        heart.innerHTML = `<i class="fa-solid fa-heart" aria-hidden="true"></i>`;
        boxLike.appendChild(heart);
      });

      return sectionGalery;

    } catch (error) {
      console.error(
        "Erreur lors du chargement de la galerie dynamique :",
        error
      );
    }
  }

  return { getcardHeaderProtograph, displayMediasTemplate };
}
