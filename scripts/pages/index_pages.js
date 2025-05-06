import { getPhotographers } from "../api/data_services.js";
import { photographerTemplate } from "../templates/index_templates.js";

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
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
