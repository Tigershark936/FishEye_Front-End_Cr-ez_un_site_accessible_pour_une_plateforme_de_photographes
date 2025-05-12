// === Fichier : selectFilter.js ===

import { constructPhotographerPage } from "../templates/photographer_template.js";

export function dropdownOpenList(medias, photograph) {
  const main = document.getElementById("main");

  // Création du conteneur principal (section)
  const sectionOrderBy = document.createElement("section");
  sectionOrderBy.classList.add("section");

  // Ajout du label "Trier par"
  const labelOrderby = document.createElement("label");
  labelOrderby.textContent = `Trier par`;
  labelOrderby.setAttribute("for", "dropdownButton");
  sectionOrderBy.appendChild(labelOrderby);

  // Création du composant dropdown
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.tabIndex = 0;
  dropdown.setAttribute("role", "button");
  dropdown.setAttribute("aria-label", `Trier par`);
  sectionOrderBy.appendChild(dropdown);

  // Élément affiché par défaut (sélection actuelle)
  const selected = document.createElement("div");
  selected.classList.add("dropdown__selected");
  selected.tabIndex = 0;
  let currentSelected = "popularity";
  selected.innerHTML = `Popularité <i class="fa-solid fa-angle-down"></i>`;
  dropdown.appendChild(selected);

  // Liste déroulante des options
  const list = document.createElement("ul");
  list.classList.add("dropdown__list", "hidden");
  list.setAttribute("role", "listbox");
  dropdown.appendChild(list);

  // Options disponibles dans la liste
  const options = [
    { value: "popularity", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
  ];

  // Détection du mode d'interaction pour l'action du style hover ou focus(clavier ou souris)
  let interactionMode = "mouse";
  window.addEventListener("keydown", () => {
    interactionMode = "keyboard";
  });
  window.addEventListener("mousedown", () => {
    interactionMode = "mouse";
  });

  // Fonction de tri et d'affichage des médias
  function sortAndDisplayMedia(sortBy) {
    const params = new URLSearchParams(window.location.search);
    const photographerId = parseInt(params.get("id"), 10);
    const photographerMedias = medias.filter(
      (m) => m.photographerId === photographerId
    );
    const sortedMedia = [...photographerMedias];

    switch (sortBy) {
      case "popularity":
        sortedMedia.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title":
        sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Supprime l'ancienne galerie avant d'afficher la nouvelle triée,
    // puis régénère dynamiquement la galerie avec les médias triés
    // et l'insère dans le DOM principal.
    const galerySection = document.querySelector(".galery");
    if (galerySection) galerySection.remove();

    const { displayMediasTemplate } = constructPhotographerPage(
      photograph,
      medias
    );
    const newGallery = displayMediasTemplate(sortedMedia);
    main.appendChild(newGallery);
  }

  // Fonction pour rendre les options sélectionnées (en cachant l'actuelle)
  function renderList(selectedValue) {
    list.innerHTML = "";
    options.forEach((opt) => {
      if (opt.value !== selectedValue) {
        const li = document.createElement("li");
        li.dataset.value = opt.value;
        li.textContent = opt.text;
        li.setAttribute("role", "option");
        li.tabIndex = 0;

        // Gestion du clic sur une option
        li.addEventListener("click", () => {
          currentSelected = opt.value;
          selected.innerHTML = `${opt.text} <i class="chevron fa-solid fa-angle-up"></i>`;
          renderList(currentSelected);
          list.classList.add("hidden");
          sortAndDisplayMedia(currentSelected);
          selected.focus(); // revient sur le bouton
        });
        list.appendChild(li);
      }
    });
  }

  // Appel initial
  renderList(currentSelected);

  // Gestion de l'ouverture/fermeture du menu
  selected.addEventListener("click", () => {
    const isHidden = list.classList.contains("hidden");
    list.classList.toggle("hidden");

    const currentText = selected.textContent.trim().split(" ")[0];
    let chevronClass = isHidden ? "fa-angle-up" : "fa-angle-down";
    selected.innerHTML = `${currentText} <i class="chevron fa-solid ${chevronClass}"></i>`;

    // Focus uniquement si ouvert au clavier
    if (isHidden && interactionMode === "keyboard") {
      const firstItem = list.querySelector("li");
      if (firstItem) firstItem.focus();
    }
  });

  // Support clavier pour ouvrir le menu pour trier et le manipuler
  selected.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selected.click();
    }
  });

  list.addEventListener("keydown", (e) => {
    const items = Array.from(list.querySelectorAll("li"));
    const index = items.indexOf(document.activeElement);

    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault(); // bloque le scroll du body
    }

    if (e.key === "ArrowDown") {
      items[(index + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      items[(index - 1 + items.length) % items.length].focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const li = document.activeElement;
      if (li.tagName === "LI") {
        const value = li.dataset.value;
        const text = li.textContent;

        currentSelected = value;
        selected.innerHTML = `${text} <i class="chevron fa-solid fa-angle-up"></i>`;
        renderList(currentSelected);
        list.classList.add("hidden");
        sortAndDisplayMedia(currentSelected);
        selected.focus(); // revient sur le bouton
      }
    }
  });

  // Ferme le menu uniquement si on sort totalement du dropdown
  dropdown.addEventListener("focusout", (e) => {
    if (!dropdown.contains(e.relatedTarget)) {
      list.classList.add("hidden");
      const currentText = selected.textContent.trim().split(" ")[0];
      selected.innerHTML = `${currentText} <i class="chevron fa-solid fa-angle-down"></i>`;
    }
  });

  main.appendChild(sectionOrderBy);
}
