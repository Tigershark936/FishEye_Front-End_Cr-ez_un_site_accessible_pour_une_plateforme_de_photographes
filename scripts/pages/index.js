    async function getPhotographers(){
        let request = await fetch("../data/photographers.json");
        let data = await request.json()

        console.log(data);
        console.log(data.photographers); // les profils
        console.log(data.media);         // les médias
        
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        // let photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"
        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     },
        // ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [data.photographers, data.photographers, data.photographers, data.photographers, data.photographers, data.photographers], 
            // media: [data.media]
            })
    }
    

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            console.log(photographer.portrait)
            
            userCardDOM.innerHTML = `
            <img src="assets/photographers/Sample-photos/Photographers-ID-Photos/${photographer.portrait}" alt="${photographer.name}">
            <h1>${photographer.name}</h1>
            <p>${photographer.city}, ${photographer.country}</p>
            <p>${photographer.tagline}</p>
            <p>${photographer.price}€/jour</p>
            `
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const response = await fetch("../data/photographers.json");
        const data = await response.json();

        console.log(data.photographers); // affiche un tableau de photographes
        

        const { photographers } = await getPhotographers();
        displayData(data.photographers); //Le tableau s'active ici
    }
    
    init();
    
