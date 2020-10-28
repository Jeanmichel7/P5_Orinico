// fonctionnalité parametre de requete de l'URL pour récupérer l'ID
let params = (new URL(document.location)).searchParams
let id = params.get('id')
console.log(id)  


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


        // lorsque je clique sur "ajouter au panier"
        // je regarde la valeur de l'input
        // je l'ajoute au localstorage

       
        // récupère le bouton
        let submit = document.getElementById("btn")
        console.log(submit)

        // on écoute quand on click dessus
        submit.addEventListener('click', function (e) {
            //e.preventDefault()

            // on récupère la valeur de l'input
            var valeurInput = document.getElementById("quantite").value
            console.log(valeurInput)

            // on supprime tout le local storage
            //localStorage.clear()

            //on vérifie si il y en a déja avant
                // si oui on rajoute
                // sinon on créé

            if (localStorage.getItem(id) < 1) {
                localStorage.setItem(id, valeurInput)
                console.log(localStorage.getItem(id))
            } else {
                localStorage.setItem(id) = localStorage.setItem(id, valeurInput)
            }

            // on créer une liste et on push ?


            // on l'envoie sur le localstorage
            //localStorage.setItem(id, valeurInput);
            
        })
        console.log(localStorage)
    })

