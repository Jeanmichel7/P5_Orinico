//récupère les produits acheté et orderId
let products = JSON.parse(localStorage.getItem('confirmOrder'))
let montantTotal = localStorage.getItem('montantTotal')
let orderId = localStorage.getItem('orderId')

//affiche l'orderId
let commandeId = document.getElementById('orderId')
commandeId.innerHTML +=
    `
    <h2>Résumé de la commande n° : <span class="normalSize">${orderId}</span></h2>
    
    `

//affiche le prix total
let prixTotal = document.getElementById('prixTotalCommande')
prixTotal.innerHTML +=
    `
    <p>Total : <span class="bold">${montantTotal} €</span></p>
    `

//affiche un récapitulatif de la commande
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



