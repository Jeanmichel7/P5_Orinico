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






                //let btnDel = document.getElementById('delete')
                //
                //btnDel.addEventListener('click', function(e) {
                //    localStorage.removeItem('products', products[i])
                //    console.log(localStorage)
                //})




                //let valeurDansStorage = JSON.parse(localStorage.getItem('products'))[0].quantity
                //let btnLess = document.getElementById('btn-')
                //let btnMore = document.getElementById('btn+')
                //
                //btnLess.addEventListener('click', function (e) {
                //    let newQuantity = products[i].quantity--
                //
                //    console.log('Nouvelle quantité : '+ newQuantity + '       ','Valeur dans le localStorage : ' + valeurDansStorage)
                //
                //    // modifier le tableau products
                //        // récupérer l'objet du tableau
                //        let testProducts = JSON.parse(localStorage.getItem('products'))[0]
                //        console.log(testProducts)
                //        // modifier la valeur
                //        let newValeur = testProducts.quantity -= 1
                //        console.log(newValeur)
                //        console.log(testProducts)
                //
                //        //ajouter la nouvelle valeur au tableau
                //
                //        localStorage.setItem('products',[newValeur])
                //        console.log(localStorage)
                //        
                //    // renvoyer le tableau au localStorage (format ?)
                //
                //
                //    
                //})
                //
                //btnMore.addEventListener('click', function (e) {
                //    let newQuantity = products[i].quantity++
                //    //localStorage.setItem('products')
                //    
                //})

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





            //Validation formulaire en temps réel

            //let trucmachin = document.querySelectorAll('form input')
            //console.log(trucmachin)
//
            //trucmachin.forEach(element => {
            //    console.log(element)
            //});
            //console.log(document.forms[0])
//
//
//
            //let inputLastName = document.getElementById("inputLastName").value;
            //let inputLastNameValid = false;
            //document.getElementById("inputLastName").addEventListener("keyup", function (e) {
//
            //    if (inputLastName=="") {
            //        alert("Tapez qqchose");
            //    }
            //    else {
            //        inputLastNameValid = true;
            //    }
//
            //});



            // je récupère chaque formulaire

            // je vérfie qu'ils sont tous bon

            // je lance l'écoute



            // évènement click bouton du formulaire
            document.getElementById("btnSubmit").addEventListener('click', e => {
                //e.preventDefault()

                // récupère le tableau de produits
                const productArray = JSON.parse(localStorage.getItem('products'))
                let products = productArray.map(product => product.id);
                console.log(products)

                // Récupère valeur inputs form
                let inputLastName = document.getElementById('inputLastName').value
                let inputFirstName = document.getElementById('inputFirstName').value
                let inputAddress = document.getElementById('inputAddress').value
                let inputCity = document.getElementById('inputCity').value
                let inputEmail = document.getElementById('inputEmail').value

                //regex form
                let regexInputLastName = /^[A-Za-zÀ-ÿ ,.'-]+$/
                let regexInputFirstName = /^[a-zÀ-ÿ ,.'-]+$/i
                let regexInputAdress = /^[a-zA-Z0-9\s,.'-]{3,}$/i
                let regexInputCity = /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/i
                let regexInputMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/
                
                // fonction verifierInput
                function verifInput(regex,input) {
                    if (regex.test(input)) {
                        return true;
                    }else {
                        alert('Formulaire invalid');
                        // ajouter une class en css pour afficher l'erreur
                        const div = document.createElement('div');
                        div.className = 'erreur-formulaire';

                        document.getElementById("btnSubmit").removeEventListener('click')
                    }
                }


                // Vérifie les inputs
                if (verifInput(regexInputLastName,inputLastName) 
                    && verifInput(regexInputFirstName,inputFirstName) 
                    && verifInput(regexInputAdress,inputAddress)   
                    && verifInput(regexInputCity,inputCity)
                    && verifInput(regexInputMail,inputEmail) ){
                    

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






//class Product {
//    constructor (imageUrl, quantity) {
//        this.imageUrl = imageUrl;
//        this.quantity = quantity;
//    }
//}//

//                               //
//
//

//const getUsers = async function () {
//    try {
//        let response = await fetch('http://localhost:3000/api/teddies')
//        if (response.ok) {
//            let data = await response.json()
//            console.log(data)
//            let confirmArray = new Product(response.imageUrl, response.quantity)
//            console.log(confirmArray)//

//            let confirmArrayParse = JSON.stringify(confirmArray)
//            console.log(confirmArrayParse)//

//            localStorage.setItem('orderConfirm', confirmArray)
//            console.log(localStorage)//
//
//
//

//        }
//        else {
//            console.error('Retour du serveur : ', response.status)
//        }
//    } catch (e) {
//        console.error(e)
//    }
//}
//getUsers()//




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



