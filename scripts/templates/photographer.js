function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price} = data;
    console.log(data);
    

    const picture = `assets/photographers/Sample-photos/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a')
        a.setAttribute("href", `http://127.0.0.1:5500/photographer.html?id=${id}`)
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2Name = document.createElement('h2');
        h2Name.textContent = name;
        const h3Location = document.createElement('h3');
        h3Location.textContent = `${city}, ${country}`;
        const h4Tagline = document.createElement('h4');
        h4Tagline.textContent = `${tagline}`;
        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2Name);
        article.appendChild(h3Location);
        article.appendChild(h4Tagline);
        article.appendChild(pPrice);

        // Ici on met l'article DANS le lien car a est le parent de acticle afin de click sur la page du photographe
        a.appendChild(article);

        return(a);
    }
    return { name, picture, getUserCardDOM }
}