async function getPhotographers(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json()
    
    //Retourne le tableau photographers seulement une fois récupéré
    return ({
        photographers:data.photographers, 
        media: data.media
        })
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer, index) => {
        const photographerModel = photographerTemplate(photographer, index);
        const userCardDOM = photographerModel.getUserCardDOM();

        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
const { photographers } = await getPhotographers();
displayData(photographers);
}

init();

