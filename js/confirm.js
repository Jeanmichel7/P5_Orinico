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

            //récupère les produits acheté
            let products = localStorage.getItem('products')

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
        }
        else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.error(e)
    }
}
getUsers()




