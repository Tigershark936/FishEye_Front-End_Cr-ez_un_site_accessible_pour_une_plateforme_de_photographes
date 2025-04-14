// Création de la section selected-filter


export function dropdownOpenList(main) {
    const sectionLabel = document.createElement("section");
    sectionLabel.classList.add('section');

     // Création du label pour trier
    const labelSortBy = document.createElement("label");
    labelSortBy.textContent = `Trier par`;
    sectionLabel.appendChild(labelSortBy);

     // Création du select
    const selectLabelSortBy = document.createElement('select');
    selectLabelSortBy.name = 'filters';
    selectLabelSortBy.id = 'filter-select';
    selectLabelSortBy.className = 'container-filter-select';
    selectLabelSortBy.classList.add('section__select');
    sectionLabel.appendChild(selectLabelSortBy);

    // Liste des options à ajouter au selectLabelSortBy
    const options = [
        { className: 'filter-by-popularity', value: 'popularity', text: 'Popularité' },
        { className: 'filter-by-date', value: 'date', text: 'Date' },
        { className: 'filter-by-title', value: 'title', text: 'Titre' }
    ];

    // Boucle pour créer et ajouter les options
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        option.className = opt.className;
        selectLabelSortBy.appendChild(option);
    });

    // // On ajoute dans le main la section label
    main.appendChild(sectionLabel);
}


