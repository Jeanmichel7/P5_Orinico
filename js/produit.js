// fonctionnalité parametre de requete de l'URL pour récupérer l'ID
let params = (new URL(document.location)).searchParams
let id = params.get('id')
console.log(id)  


class Product {
    constructor (id, name, price, imageUrl, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}


// fetch les propriétés
fetch('http://localhost:3000/api/teddies/' + id)
    .then(function (response) {
        return response.json()
    }).then(function (data) {

        console.log(data)

        // on récupère le lien des éléments à afficher
        const image = document.getElementById('image')
        const name = document.getElementById("name")
        const description = document.getElementById("description")
        const selectColor = document.getElementById("color")


        //on affiche les élements dynamiquement
        image.innerHTML += `<img src="${data.imageUrl}" class="img-thumbnail">`
        name.innerHTML += `${data.name}`
        description.innerHTML += `${data.description}`


        // Afficher les couleurs dispo
        for (let i=0 ; i< data.colors.length; i++) {
            selectColor.innerHTML += `<option>${data.colors[i]}</option>`
        }

       
        // récupère le bouton
        let submit = document.getElementById("btn")
        console.log(submit)


        // on écoute quand on click dessus
        submit.addEventListener('click', function (e) {
            e.preventDefault()

            // on récupère la valeur de l'input
            var valeurInput = parseInt(document.getElementById("quantite").value)

            // je créer l'objet a partir de la classe
            let product = new Product(id ,data.name, data.price, data.imageUrl, valeurInput)
            console.log(product)
            
            if ( )

            let products = localStorage.getItem('products')
/*
let product = '' //;
let productArray = [product];
let productString = JSON.parse(productArray);
localStorage.setItem('products', productString) 
*/




            // si le produit est dans le local storage
                // je rajoute la valeur de l'input à l'ancienne valeur

            // sinon je rajoute le produit dans le tableau de produits du localstorage 
           

            // on supprime tout le local storage
            //localStorage.clear()

            //on vérifie si il y en a déja avant
                // si oui on rajoute
                // sinon on créé

            /*if (localStorage.getItem(id) < 1) {
                localStorage.setItem(id, valeurInput)
                
            } else {
                localStorage.setItem(id) = localStorage.setItem(id, valeurInput)
            }*/


            // on l'envoie sur le localstorage
            //localStorage.setItem(id, valeurInput);
            
        })
        console.log(localStorage)
    })





// on écoute le click
// on créer l'objet product 
    // si le produit est aps dans le local sotrage
    // on l'ajoute

    // sinon on incrémente la valeur de quantity par la valeurinput

