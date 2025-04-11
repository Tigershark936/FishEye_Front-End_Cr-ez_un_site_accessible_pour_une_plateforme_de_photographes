function photographerTemplate(data) {
    const { name, portrait, id} = data;

    const picture = `assets/photographers/Sample-photos/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        // l'événement qui permet d'allez sur la page du photographe concerné en utilisant sa data.id "?id${id}"
        article.addEventListener("click", () => {
            window.location.href = `http://127.0.0.1:5500/photographer.html?id=${id}`
        })

        return (article);
    }
    return { name, picture, getUserCardDOM }
}