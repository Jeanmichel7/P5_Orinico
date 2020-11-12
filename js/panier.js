//localStorage.clear()
const panier = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)

            //on récupère les balises HTML
            const produitPanier = document.getElementById('produits')
            const prixTotal = document.getElementById("prix-total")

            const products = JSON.parse(localStorage.getItem('products'))
            console.log(products)

            // affiche les produits de la liste
            for (let i = 0; i < products.length; i++) {
                let totalPriceProduct = products[i].price * products[i].quantity
                let totalPrice = totalPriceProduct

                produitPanier.innerHTML +=
                    `
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

            // calcul prix total
            let totalPrice = 0
            for (let i = 0; i < products.length; i++) {
                let totalPriceUnit = products[i].price * products[i].quantity

                totalPrice += totalPriceUnit
                localStorage.setItem('montantTotal', totalPrice)
            }

            //affiche le prix total
            totalPrice = localStorage.getItem('montantTotal')
            prixTotal.innerHTML +=
                `
            Total : <span  class="prix">${totalPrice} €</span>
            `

            // évènement click bouton du formulaire
            document.getElementById("btnSubmit").addEventListener('click', e => {
                //e.preventDefault()

                // récupère le tableau de produits
                const productArray = JSON.parse(localStorage.getItem('products'))
                let products = productArray.map(product => product.id);
                console.log(products)

                // Post les données attendu à l'API
                fetch("http://localhost:3000/api/teddies/order", {
                    method: "POST",
                    body: JSON.stringify({
                        // objet contact tiré du forulaire
                        contact: {
                            lastName: document.getElementById('inputLastName').value,
                            firstName: document.getElementById('inputFirstName').value,
                            address: document.getElementById('inputAddress').value,
                            city: document.getElementById('inputCity').value,
                            email: document.getElementById('inputEmail').value,
                        },
                        // liste des ID des produits
                        products: products
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(function (response) {
                    localStorage.setItem('orderId',response.orderId)
                    console.log(localStorage)
                })
                .catch(function (error) {
                    console.error(error)
                });
            })
        }
        else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.error(e)
    }
}
panier()
console.log(localStorage)




















//document.getElementById("btnSubmit").addEventListener('click', e => {
//    e.preventDefault()//

//    let value = document.getElementById("inputName").value;
//    
//    function send() {
//        var request = new XMLHttpRequest();
//        request.open("POST", "http://localhost:3000/api/teddies/order");
//        request.setRequestHeader("Content-Type", "application/json");
//        request.send(value);
//    
//    }//

//    
//    send()
//    console.log(value)
//})






//let form = document.forms.namedItem("form-achat");
//form.addEventListener('submit', function (ev) {
//
//    var oOutput = document.getElementById("output");
//    var oData = new FormData(document.forms.namedItem("form-achat"));
//    console.log(oData)
//
//
//    var xhr = new XMLHttpRequest();
//    xhr.open("POST", "http://localhost:3000/api/teddies/order", true);
//    xhr.onload = function (oEvent) {
//        if (xhr.status == 200) {
//            oOutput.innerHTML = "Uploaded!";
//        } else {
//            oOutput.innerHTML = "Erreur " + xhr.status + " occurred uploading your file.<br \/>";
//        }
//    };
//
//    console.log(JSON.stringify(oData))
//
//    xhr.send(oData);
//    ev.preventDefault();
//},
//    false);
//
//




//const contact = {
//    firstName: string,
//    lastName: string,
//    address: string,
//    city: string,
//    email: string
//}
//
//products: [string] //<-- array of product _id



