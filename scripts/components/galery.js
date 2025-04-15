// Creation de la section galery

export function galeryPhotographer(main){
    const sectionGalery = document.createElement('section');
    sectionGalery.classList.add('galery');


    // Créer un tableau contenant tous les chemins d'images à afficher
    const slideshow = [
        `assets/photographers/Sample-photos/Ellie%20Rose/Architecture_Connected_Curves.jpg`,
        `assets/photographers/Sample-photos/Ellie%20Rose/Architecture_Cross_Bar.jpg`,
        `assets/photographers/Sample-photos/Ellie%20Rose/Architecture_Horseshoe.jpg`,
        `assets/photographers/Sample-photos/Ellie%20Rose/Architecture_Water_on_Modern.jpg`,
        `assets/photographers/Sample-photos/Ellie%20Rose/Architecture_White_Light.jpg`,
        `assets/photographers/Sample-photos/Ellie%20Rose/Sport_Jump.jpg`
    ];

    slideshow.forEach(slides => {

    // Création de la galerie photographe
    const galeryPhotograph = document.createElement('div');
    galeryPhotograph.classList.add('galery');
    sectionGalery.appendChild(galeryPhotograph);

    // Création d 'un élément de la galerie
    const elementGalery = document.createElement('div');
    elementGalery.classList.add('element_galery');
    galeryPhotograph.appendChild(elementGalery)

    // Rajout de l'image ou de la vidéo dans la div elementGalery
    const pictureVideoGalery = document.createElement('img');
    pictureVideoGalery.setAttribute("src", slides);
    pictureVideoGalery.classList.add('element_galery','img');
    elementGalery.appendChild(pictureVideoGalery);

     // Fonction pour agrandir les slides de la galerie (en cliquant dessus)
     function clickSlides(slideElement) {
        slideElement.addEventListener('click', () => {
            slideElement.classList.add('active');
        });
    }

    // Rajout du title de elementGalery
    const txtElement = document.createElement('h3');
    txtElement.textContent = `ARC-EN-CIEL`
    txtElement.classList.add('info-img','h3')
    elementGalery.appendChild(txtElement)

    // Rajout du heart de txtElement
    const heart = document.createElement('div')
    heart.innerHTML = `11 <i class="fa-solid fa-heart"></i>`;
    txtElement.appendChild(heart)
    });


    // On ajoute dans le main la section de la galerie
    main.appendChild(sectionGalery);
    
}


const fetchGaleryPhotographer = (id) =>{
    fetch("../../data/photographers.json").then((data) =>{
        
    }
)}