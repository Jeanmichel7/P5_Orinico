const getUsers = async function() {
    try{
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)
            const articles = document.getElementById('articles')

            for (article of data) {
                articles.innerHTML += `
                    <article class="text-center col-sm-6 col-md-4 col-lg-3 mtb">
                    <div id="ours1" class="article">
                        <a href="produit.html?id=${article._id}">
                            <img src="${article.imageUrl}"></img>
                            <h3 class="mt-3">${article.name}</h3>
                            <p>${article.price} €</p>
                        </a>
                    </div>
                </article>
                `
            }

            // On récupère l'ID du lien cliqué
            let liens = document.querySelectorAll('.article')
            for (let i=0 ; i<liens.length ; i++) {
                let lien = liens[i]

                lien.addEventListener('click' , function(e) {
                    e.preventDefault
                    let idProduit = data[i]._id
                    console.log(idProduit)
                })
            }
        }
        else{
            console.error('Retour du serveur : ', response.status)
        } 
    } catch (e) {
        console.error(e)
    }
}
getUsers()

