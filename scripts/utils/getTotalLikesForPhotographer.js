/**
 * Calcule le nombre total de likes pour un photographe donné
 * en filtrant ses médias à partir de l'identifiant fourni.
 *
 * @param {Array} medias - Tous les médias disponibles
 * @param {number} photographerId - L'ID du photographe ciblé
 * @returns {number} Le total des likes pour ce photographe
 */
export function getTotalLikesForPhotographer(medias, photographerId) {
return medias
    .filter((media) => media.photographerId === photographerId)
    .reduce((total, media) => total + media.likes, 0);
}