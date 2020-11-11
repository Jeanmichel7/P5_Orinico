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
      
        // on écoute quand on click sur le bouton
        submit.addEventListener('click', function (e) {

            // on récupère la valeur de l'input
            var valeurInput = parseInt(document.getElementById("quantite").value)
            // je créer l'objet a partir de la classe Product
            let product = new Product(id ,data.name, data.price, data.imageUrl, valeurInput) // creation d'un nouvel objet Product
 
         

            //on vérifie que products existe dans le local sotrage
            if ( localStorage.getItem('products') === null ) {
                localStorage.setItem('products', JSON.stringify([product]))
            } else {
                // si c'est le mm produit => on ajoute la valeur de l'input a la quantité
                const products = JSON.parse(localStorage.getItem('products'))
                const produitFiltre = products.filter((test) => test.id == product.id)

                if (produitFiltre.length > 0) {
                    produitFiltre[0].quantity += valeurInput
                } else {
                    products.push(product)
                }

                localStorage.setItem('products', JSON.stringify(products))

            }
        })  
    })



