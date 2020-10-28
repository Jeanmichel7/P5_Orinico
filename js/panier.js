const getUsers = async function() {
    try{
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)


            const categorie = document.getElementById('produits')
            
            /*for (article of data) {
                let description = article.name
                let quantite = localStorage.getItem(article._id)
                let prix = article.price
                let prixProduits = localStorage.getItem(article._id) * article.price
                

                categorie.innerHTML += `
                <tr id="contenu-tableau">
                <th scope="row">
                    <img src="${article.imageUrl}" class="vertical-center"></img>  
                </th>
                <td>${description}</td>
                <td class="center">${quantite}</td>
                <td class="center">${prix} €/u</td>
                <td class="center">${prixProduits} €</td>
            </tr>`
            }*/

            let prixTotal = document.getElementById("prix-total")
            prixTotal.innerHTML +=`
                Total : <span  class="prix">a faire</span>

            `

            data.forEach(function(article) {
                let description = article.name
                let quantite = localStorage.getItem(article._id)
                let prix = article.price
                let prixProduits = localStorage.getItem(article._id) * article.price
                
                if (quantite == null) {
                    quantite = 0
                }
                

                categorie.innerHTML += `
                <tr id="contenu-tableau">
                <th scope="row">
                    <img src="${article.imageUrl}" class="vertical-center"></img>  
                </th>
                <td>${description}</td>
                <td class="center">${quantite}</td>
                <td class="center">${prix} €/u</td>
                <td class="center">${prixProduits} €</td>
            </tr>
                `
                
            })

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
