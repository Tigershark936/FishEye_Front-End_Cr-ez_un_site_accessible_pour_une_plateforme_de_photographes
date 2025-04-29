// Création de la section selected-filter
export function dropdownOpenList() {

    const main = document.getElementById('main');
    
    // Création du conteneur principal (section)
    const sectionOrderBy = document.createElement("section");
    sectionOrderBy.classList.add("section");

    // Ajout du label "Trier par"
    const labelOrderby = document.createElement("label");
    labelOrderby.textContent = `Trier par`;
    sectionOrderBy.appendChild(labelOrderby);

    // Création du composant dropdown
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.tabIndex = 0;
    dropdown.setAttribute('tabindex', '0');
    dropdown.setAttribute('role', 'button');
    dropdown.setAttribute('aria-label', `Trier par`);
    sectionOrderBy.appendChild(dropdown);

    // Élément affiché par défaut (sélection actuelle)
    const selected = document.createElement("div");
    selected.classList.add("dropdown__selected");
    let currentSelected = 'popularity';
    selected.innerHTML = `Popularité <i class="fa-solid fa-angle-down"></i>`;
    dropdown.appendChild(selected);
    

    // Liste déroulante
    const list = document.createElement("ul");
    list.classList.add("dropdown__list", "hidden");
    dropdown.appendChild(list);

    // Options disponibles
    const options = [
        { value: 'popularity', text: 'Popularité' },
        { value: 'date', text: 'Date' },
        { value: 'title', text: 'Titre' }
    ];

    // Fonction pour rendre les options sélectionnées (en cachant l'actuelle)
    function renderList(selectedValue) {
        list.innerHTML = '';
        options.forEach(opt => {
            if (opt.value !== selectedValue) {
                const li = document.createElement("li");
                li.dataset.value = opt.value;
                li.textContent = opt.text;


                li.addEventListener("click", () => {
                    currentSelected = opt.value;
                    selected.innerHTML = `${opt.text} <i class="chevron fa-solid fa-angle-up"></i>`;
                    renderList(currentSelected);
                    list.classList.toggle("hidden");
                });
                list.appendChild(li);
            }
        });
    }

    // Appel initial
    renderList(currentSelected);

    // Gestion de l'ouverture/fermeture du menu
    selected.addEventListener("click", () => {
        list.classList.toggle("hidden");
        const isOpen = list.classList.includes("hidden");
        const currentText = selected.textContent.trim().split(" ")[0];
        let chevronClass;
            if (isOpen) {
            chevronClass = 'fa-angle-up';
            } else {
            chevronClass = 'fa-angle-down';
            }
        selected.innerHTML = `${currentText} <i class="chevron fa-solid ${chevronClass}"></i>`;
    });

    dropdown.addEventListener("blur", () => {
        list.classList.add("hidden");
        const currentText = selected.textContent.trim().split(" ")[0];
        selected.innerHTML = `${currentText} <i class="chevron fa-solid fa-angle-down"></i>`;
    });

    main.appendChild(sectionOrderBy);
}
