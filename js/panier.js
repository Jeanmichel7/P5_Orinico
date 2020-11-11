const panier = async function() {
    try{
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)


            const produitPanier = document.getElementById('produits')
            let prixTotal = document.getElementById("prix-total")

            const products = JSON.parse(localStorage.getItem('products'))
            console.log(products)

            // affiche les produits de la liste
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
            
            // calcul prix total
            let totalPrice = 0
            for ( let i = 0 ; i < products.length ; i++) {
                let totalPriceUnit = products[i].price * products[i].quantity
                
                totalPrice += totalPriceUnit
                localStorage.setItem('montantTotal', totalPrice)               
            }
            
            totalPrice = localStorage.getItem('montantTotal')
            prixTotal.innerHTML +=`
            Total : <span  class="prix">${totalPrice} €</span>
            `


            // POST data
            function sendData(products) {
                var XHR = new XMLHttpRequest();
                var urlEncodedData = "";
                var urlEncodedDataPairs = [];
                
                // Transformez l'objet data en un tableau de paires clé/valeur codées URL.
                for(product in products) {
                  urlEncodedDataPairs.push(encodeURIComponent(product) + '=' + encodeURIComponent(products[product]));
                }
                console.log(urlEncodedDataPairs)
            
                // Combinez les paires en une seule chaîne de caractères et remplacez tous
                // les espaces codés en % par le caractère'+' ; cela correspond au comportement
                // des soumissions de formulaires de navigateur.
                urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
                console.log(urlEncodedData)
                // Définissez ce qui se passe en cas de succès de soumission de données
                XHR.addEventListener('load', function(event) {
                  alert('Ouais ! Données envoyées et réponse chargée.');
                });
              
                // Définissez ce qui arrive en cas d'erreur
                XHR.addEventListener('error', function(event) {
                  alert('Oups! Quelque chose s\'est mal passé.');
                });
              
                // Configurez la requête
                XHR.open('POST', 'http://localhost:3000/api/teddies/order');
              
                // Ajoutez l'en-tête HTTP requise pour requêtes POST de données de formulaire 
                XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              
                // Finalement, envoyez les données.
                XHR.send(urlEncodedData);
            }



            document.getElementById("btnSubmit").addEventListener('click', e => {
    
                sendData(products)
                
            })


        }
        else{
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







//// POSTER l'objet "contact" 
//    // prénom - nom - adresse - ville et adresse électronique
//const contact = {
//    prop1 : "valeur_1",
//    prop2 : "valeur_2",
//    prop3 : "valeur_3" 
//};
//    
//const PanierPost = async function (data) {
//    let response = await fetch('http://localhost:3000/api/teddies/order', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'text/plain' 
//        },
//        body: FormData()
//    })
//    let responseData = await response.json()
//    console.log(responseData)
//    if (response.ok) {
//        console.log("ok")
//    } else {
//        console.log("ok")
//
//    }
//}
//
//PanierPost(contact)