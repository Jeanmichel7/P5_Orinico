// fonctionnalité parametre de requete de l'URL pour récupérer l'ID

let params = (new URL(document.location)).searchParams
let id = params.get('id')
console.log(id)     // ID du produit dans l'url


// fetch les propriétés
fetch('http://localhost:3000/api/teddies/' + id)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)

        //const article = document.getElementById('article')
        const image = document.getElementById('image')
        const name = document.getElementById("name")
        const description = document.getElementById("description")
        const colors = document.getElementById("inlineFormCustomSelectPref")

        
       
        image.innerHTML += `<img src="${data.imageUrl}" class="img-thumbnail">`    
        name.innerHTML += `${data.name}`    
        description.innerHTML += `${data.description}`  
             
        //data.colors.array.forEach(element => index {
        //    colors.innerHTML += `${data.colors[index]}` 
        //});


        for (let i=0 ; i< data.colors.length; i++) {
            console.log(i)
        }
                
                /*
                boucle pour afficher la couleur  : foreach

                local storage pour la quantité de nounours 
                */


                    // lorsque je clique sur "ajouter au panier"
                    // je regarde la valeur de l'input
                    // je l'ajoute au localstorage


               let btnEnvoyer = document.querySelector("#btn")

               btnEnvoyer.addEventListener('click', function(e){
                    localStorage.setItem('quantité', '1');
                    console.log(localStorage)
               })

    })




    // var input = document.getElementById("quantite").value;
    // console.log(input)
