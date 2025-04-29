import { getPhotographers } from "../api/data_services.js";

// fonction qui me sert à faire le lien entre l’ID du photographe pour récuperer les data du JSON
export async function getFolderName(photographerId) {  
    const photographers = await getPhotographers();
 
     
    const photographer = photographers.find((photographer) => photographer.id === photographerId);
    const photographerName = photographer.name.split(' ')[0];
    console.log('photographerName', photographerName);
    const nameWithoutTiret = photographerName.replace('-', ' ');

    return nameWithoutTiret;
}