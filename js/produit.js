// fonctionnalité parametre de requete de l'URL pour récupérer l'ID
let params = (new URL(document.location)).searchParams
let id = params.get('id')
console.log(id)  

// structure de l'objet produit
class Product {
    constructor (id, name, price, imageUrl, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}

// récupérer les données du produit choisi
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
       
        // on écoute quand on click sur le bouton
        let submit = document.getElementById("btn")
        submit.addEventListener('click', function (e) {

            // on récupère la valeur de l'input
            let valeurInput = parseInt(document.getElementById("quantite").value)

            // créer l'objet a partir de la classe Product
            let product = new Product(id ,data.name, data.price, data.imageUrl, valeurInput)
            
            localStorage.setItem('confirmOrder',"")
                 
            //si le produit n'est pas défini dans le localStorage on le créé
            if (localStorage.getItem('products') === null ) {
                localStorage.setItem('products', JSON.stringify([product]))
                localStorage.setItem('confirmOrder', JSON.stringify([product]))
            } 
            //sinon on l'ajoute
            else {
                const products = JSON.parse(localStorage.getItem('products'))
                const produitFiltre = products.filter((test) => test.id == product.id)

                //si c'est le meme produit on additionne
                if (produitFiltre.length > 0) {
                    produitFiltre[0].quantity += valeurInput
                } 
                // sinon on rajoute le produit au tableau
                else {
                    products.push(product)
                }

                // on sauvegarde les données
                localStorage.setItem('products', JSON.stringify(products))
                localStorage.setItem('confirmOrder', JSON.stringify(products))
                console.log(localStorage)
            }
        })  
    })

   



