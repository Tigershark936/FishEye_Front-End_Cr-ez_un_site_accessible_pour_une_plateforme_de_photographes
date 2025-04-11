const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");


function constructPhotographerPage(photograph) {

    const main = document.getElementById('main');

    const photographDiv = document.createElement('div');
    photographDiv.classList.add('photograph');
    main.appendChild(photographDiv);

    const photographInfosDiv = document.createElement('div');
    photographInfosDiv.classList.add('photograph__infos');
    photographDiv.appendChild(photographInfosDiv);

    const photographName = document.createElement('h1');
    photographName.classList.add('photograph__infos__name');
    photographName.textContent = photograph.name;
    photographInfosDiv.appendChild(photographName);

    const photographLocation = document.createElement('h2');
    photographLocation.classList.add('photograph__infos__location');
    photographLocation.textContent = `${photograph.city}, ${photograph.country}`;
    photographInfosDiv.appendChild(photographLocation);

    const photographCitation = document.createElement('p');
    photographCitation.classList.add('photograph__infos__citation');
    photographCitation.textContent = photograph.tagline;
    photographInfosDiv.appendChild(photographCitation);

    const photographContactButton = document.createElement('button');
    photographContactButton.textContent = 'Contactez-moi';
    photographDiv.appendChild(photographContactButton);

    const photographPicture = document.createElement('div');
    photographPicture.classList.add('photograph__picture');

    photographDiv.appendChild(photographPicture);

    const photographPictureImage = document.createElement('img');
    photographPictureImage.src = `assets/photographers/Sample-photos/Photographers-ID-Photos/${photograph.portrait}`;
    photographPicture.appendChild(photographPictureImage);
    
}

const fetchPhotographer = (id) => {
    fetch("../../data/photographers.json").then((data) => {
    
        console.log('data', data);
        data.json().then((json) => {
            let photographData = json;
            console.log('json', json);
            const photograph = photographData.photographers.find((photographer) => photographer.id == id);
            console.log('photograph', photograph);
            constructPhotographerPage(photograph);
        });
    }).catch((error) => {
        console.error('Error fetching photographer:', error);
    });
}

fetchPhotographer(photographerId);

