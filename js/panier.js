var getHttpRequest = function () {
    var httpRequest = false;
  
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
      httpRequest = new XMLHttpRequest();
      if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('text/xml');
      }
    }
    else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
      }
    }
  
    if (!httpRequest) {
      alert('Abandon :( Impossible de créer une instance XMLHTTP');
      return false;
    }
  
    return httpRequest
}




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
                localStorage.setItem('montantTotal', totalPrice)               
            }
            
            totalPrice = localStorage.getItem('montantTotal')
            prixTotal.innerHTML +=`
            Total : <span  class="prix">${totalPrice} €</span>
            `

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









//document.getElementById("btnSubmit").addEventListener('click', e => {
//    e.preventDefault()
//
//    let value = document.getElementById("inputName").value;
//    
//    function send() {
//        var request = new XMLHttpRequest();
//        request.open("POST", "http://localhost:3000/api/teddies/order");
//        request.setRequestHeader("Content-Type", "application/json");
//        request.send(value);
//    
//    }
//
//    
//    send()
//    console.log(value)
//})







let form = document.forms.namedItem("form-achat");
form.addEventListener('submit', function (ev) {

    var oOutput = document.getElementById("output");
    var oData = new FormData(document.forms.namedItem("form-achat"));
    console.log(oData)


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/teddies/order", true);
    xhr.onload = function (oEvent) {
        if (xhr.status == 200) {
            oOutput.innerHTML = "Uploaded!";
        } else {
            oOutput.innerHTML = "Erreur " + xhr.status + " occurred uploading your file.<br \/>";
        }
    };

    console.log(JSON.stringify(oData))

    xhr.send(oData);
    ev.preventDefault();
},
    false);









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