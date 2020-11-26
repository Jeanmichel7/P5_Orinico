const panier = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)

            //récupère les données sauvegardés
            const products = JSON.parse(localStorage.getItem('products'))

            //on récupère les balises HTML
            const produitPanier = document.getElementById('produits')
            const prixTotal = document.getElementById("prix-total")

            // affiche les produits présent dans la liste
            for (let i = 0; i < products.length; i++) {
                let totalPriceProduct = products[i].price * products[i].quantity
                let totalPrice = totalPriceProduct
                totalPrice += totalPriceProduct

                produitPanier.innerHTML +=
                `
                <tr id="contenu-tableau">
                    <th scope="row">
                        <img src="${products[i].imageUrl}" class="vertical-center"></img>  
                    </th>
                    <td class="center">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button id="btn-" class="btn btn-outline-secondary" type="button" disabled>-</button>
                            </div>
                            <input value="${products[i].quantity}" class="quantity" disabled>
                            <div class="input-group-append">
                                <button id="btn+" class="btn btn-outline-secondary" type="button" disabled>+</button>
                            </div>
                        </div>                        
                    </td>
                    <td class="center center-price">${products[i].price} €/u</td>
                    <td class="center">${totalPriceProduct} €</td>
                    <td class="center"><button type="button" id="delete" disabled><i class="fa fa-trash"></i></i></button></td>
                </tr>
                `
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
            <span class="bold">Total :</span><span class="prix">${totalPrice} €</span>
            `

            // évènement click bouton du formulaire
            document.getElementById("btnSubmit").addEventListener('click', e => {

                // Récupère valeur inputs form
                let inputLastName = document.getElementById('inputLastName').value
                let inputFirstName = document.getElementById('inputFirstName').value
                let inputAddress = document.getElementById('inputAddress').value
                let inputCity = document.getElementById('inputCity').value
                let inputEmail = document.getElementById('inputEmail').value

                //regex formulaire
                let regexInputLastName = /^[A-Za-zÀ-ÿ ,.'-]+$/
                let regexInputFirstName = /^[a-zÀ-ÿ ,.'-]+$/i
                let regexInputAdress = /^[a-zA-Z0-9\s,.'-]{3,}$/i
                let regexInputCity = /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/i
                let regexInputMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/

                // fonction verifier les inputs
                function verifInput(regex, input) {
                    if (regex.test(input)) {
                        return true;
                    } else {
                        alert('Formulaire invalid');
                        // ajouter une class en css pour afficher l'erreur
                        const div = document.createElement('div');
                        div.className = 'erreur-formulaire';
                        // on enleve l'écoute
                        document.getElementById("btnSubmit").removeEventListener('click')
                    }
                }

                // Vérifie les inputs
                if (verifInput(regexInputLastName, inputLastName)
                    && verifInput(regexInputFirstName, inputFirstName)
                    && verifInput(regexInputAdress, inputAddress)
                    && verifInput(regexInputCity, inputCity)
                    && verifInput(regexInputMail, inputEmail) ){

                    // récupère les ID du tableau de produits commandé
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
                    }, true)
                        .then(response => response.json())
                        .then(function (response) {
                            //sauvegarde l'orderId
                            console.log(response.orderId)
                            localStorage.setItem('orderId', response.orderId)
                            window.location.href = "confirm.html"
                        })
                        .catch(function (error) {
                            console.error(error)
                        });
                    localStorage.removeItem('products')
                }
            })
        }
        else {
            alert('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.error(e)
    }
}

panier()
console.log(localStorage)