// Creation de la section galery

export function galeryPhotographer(main){
    const sectionGalery = document.createElement('section');
    sectionGalery.classList.add('galery');
    

    // // Encode le nom du photographe pour l’URL (ex : "Ellie Rose" => "Ellie%20Rose")
    // const folderNamePhotographer = encodeURIComponent(photograph.name);

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

    // Rajout du title de elementGalery
    const txtElement = document.createElement('h3');
    txtElement.textContent = `ARC-EN-CIEL`
    txtElement.classList.add('info-img','h3')
    elementGalery.appendChild(txtElement)

    // Rajout du heart de elementGalery
    const heart = document.createElement('div')
    heart.classList.add('like')
    elementGalery.appendChild(heart)
    });


    // On ajoute dans le main la section de la galerie
    main.appendChild(sectionGalery);
    
}


const fetchGaleryPhotographer = (id) =>{
    fetch("../../data/photographers.json").then((data) =>{
        
    }
)}