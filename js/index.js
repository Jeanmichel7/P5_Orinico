const getUsers = async function() {
    try{
        // On récupère les données du serveur
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)
            const articles = document.getElementById('articles')

            // boucle qui affiche la liste des produits
            for (article of data) {
                articles.innerHTML += `
                    <article class="text-center col-sm-6 col-md-4 col-lg-3 mtb">
                    <div class="article">
                        <a href="produit.html?id=${article._id}">
                            <img src="${article.imageUrl}"></img>
                            <h3 class="mt-3">${article.name}</h3>
                            <p>${article.price} €</p>
                        </a>
                    </div>
                </article> `
            }
        }
        else{
            console.error('Retour du serveur : ', response.status)
        } 
    } catch (e) {
        console.error(e)
    }
    console.log(localStorage)
}

getUsers()

