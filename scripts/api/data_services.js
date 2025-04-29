export async function getPhotographers(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json()
    
    //Retourne le tableau photographers 
    return data.photographers;
}

export async function getMedias(){
    const request = await fetch("../data/photographers.json");
    const data = await request.json();
    
    //Retourne le tableau des médias des photographers
    return data.media;
}

// permet de retrouver un photographe spécifique à partir de son    , en consultant le fichier photographers.json.
export async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    return photographers.find((photographer) => photographer.id === parseInt(id, 10));
}

