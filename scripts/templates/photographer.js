function photographerTemplate(data, index) {
    const { name, portrait, id, city, country, tagline, price} = data;
    console.log(data);
    

    const picture = `assets/photographers/Sample-photos/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a')
        // permet d'allez sur la page du photographe concerné en utilisant sa data.id "?id${id}"
        a.setAttribute("href", `http://127.0.0.1:5500/photographer.html?id=${id}`)
        //On utilise aria-labelledby pour avoir une structure claire et sémantique
        const nameId = `photographer-name-${id}`;
        a.setAttribute("aria-labelledby", nameId); // Le lien sera nommé par le h2

        // article = groupe logique d'infos sur un photographe
        const article = document.createElement('article');
        article.setAttribute("role", "group");
        article.setAttribute("aria-label", `Fiche du photographe ${name}`);

        const containerPicture = document.createElement('div');
        containerPicture.classList.add('container_img');

        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Portrait du photographe ${name}`);
        img.classList.add(`img-style-${index}`);// class unique selon l’index
        

        // Création du texte pour l'article
        const h2Name = document.createElement('h2');
        h2Name.setAttribute('id', nameId); // ID pour aria-labelledby
        h2Name.textContent = name;

        const h3Location = document.createElement('h3');
        h3Location.textContent = `${city}, ${country}`;

        const h4Tagline = document.createElement('h4');
        h4Tagline.textContent = `${tagline}`;

        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;

        // Organisation parents/enfants
        article.appendChild(containerPicture)
        article.appendChild(h2Name);
        article.appendChild(h3Location);                
        article.appendChild(h4Tagline);
        article.appendChild(pPrice);
        containerPicture.appendChild(img);
        // Ici on met l'article DANS le lien car a est le parent de acticle afin de click sur la page du photographe
        a.appendChild(article);

        return(a);
    }
    return { name, picture, getUserCardDOM}
}