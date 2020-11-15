const getUsers = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()

            //aide
            console.log(data)
            console.log(localStorage)

            //récupère numéro de commande
            let orderId = localStorage.getItem('orderId')
            console.log(orderId)

            //récupère les produits acheté
            let products = JSON.parse(localStorage.getItem('confirmOrder'))
            console.log(products)

            let montantTotal = localStorage.getItem('montantTotal')


            //cible balise orderId
            let commandeId = document.getElementById('orderId')
            commandeId.innerHTML +=
            `
            <h2>Résumé de la commande n° : <span class="normalSize">${orderId}</span></h2>
            
            `

            //cible balise prix
            let prixTotal = document.getElementById('prixTotalCommande')
            prixTotal.innerHTML +=
            `
            <p>Total : <span class="bold">${montantTotal} €</span></p>
            `

            let recapitulatifProduits = document.getElementById('commande')

            products.forEach(element => {
                recapitulatifProduits.innerHTML +=
                `
                <div class="row">
                    <div id="image-produit" class="col-md-2 col-sm-3 col-xs-4">
                        <img src="${element.imageUrl}" class="img-thumbnail" class="vertical-center"></img>
                    </div>

                    <div id="quantity-produit" class="col-sm-1 offset-sm-5 mt-3">
                        <p class="quantity"> x${element.quantity}</p>
                    </div>
                </div>
                `
            });
        }
        else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.error(e)
    }
}
getUsers()




