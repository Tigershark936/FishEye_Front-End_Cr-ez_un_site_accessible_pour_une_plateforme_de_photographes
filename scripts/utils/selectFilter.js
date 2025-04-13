// Création de la section selected-filter


function dropdownOpenList() {
    const section = document.createElement("section");
    section.classList.add('section');

     // Création du label pour trier
    const labelSortBy = document.createElement("label");
    labelSortBy.textContent = `Trier par`;
    section.appendChild(labelSortBy);

     // Création du select
    const selectLabelSortBy = document.createElement('select');
    selectLabelSortBy.name = 'filters';
    selectLabelSortBy.id = 'filter-select';
    selectLabelSortBy.className = 'container-filter-select';
    selectLabelSortBy.classList.add('section__select');
    section.appendChild(selectLabelSortBy);

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

    // On ajoute tout dans le body
    document.body.appendChild(section);
}

dropdownOpenList();
