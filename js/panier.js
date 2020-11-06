const getUsers = async function() {
    try{
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)


            const produitPanier = document.getElementById('produits')
            let prixTotal = document.getElementById("prix-total")

            const products = JSON.parse(localStorage.getItem('products'))
            console.log(products[0])

            

            for (let i = 0 ; i < products.length ; i++) {

                let totalPriceProduct = products[i].price * products[i].quantity
                let totalPrice = totalPriceProduct

                produitPanier.innerHTML += `
                <tr id="contenu-tableau">
                    <th scope="row">
                        <img src="${products[i].imageUrl}" class="vertical-center"></img>  
                    </th>
                    <td class="center">${products[i].quantity}</td>
                    <td class="center">${products[i].price} €/u</td>
                    <td class="center">${totalPriceProduct} €</td>
                </tr>
                `
                totalPrice += totalPriceProduct
            }
            

            let totalPrice = 0
            for ( let i = 0 ; i < products.length ; i++) {
                let totalPriceUnit = products[i].price * products[i].quantity
                
                totalPrice += totalPriceUnit
                console.log(totalPrice)
                localStorage.setItem('montantTotal', totalPrice)               
            }
            
            totalPrice = localStorage.getItem('montantTotal')
            prixTotal.innerHTML +=`
            Total : <span  class="prix">${totalPrice} €</span>
            `


            


            //data.forEach(function(article) {
            //    let description = article.name
            //    let quantite = localStorage.getItem(article._id)
            //    let prix = article.price
            //    let prixProduits = localStorage.getItem(article._id) * article.price
            //    
            //    if (quantite == null) {
            //        quantite = 0
            //    }
            //    
            //
            //    categorie.innerHTML += `
            //    <tr id="contenu-tableau">
            //    <th scope="row">
            //        <img src="${article.imageUrl}" class="vertical-center"></img>  
            //    </th>
            //    <td>${description}</td>
            //    <td class="center">${quantite}</td>
            //    <td class="center">${prix} €/u</td>
            //    <td class="center">${prixProduits} €</td>
            //</tr>
            //    `
            //    
            //})

        }
        else{
            console.error('Retour du serveur : ', response.status)
        } 
    } catch (e) {
        console.error(e)
    }
}
getUsers()

console.log(localStorage)
