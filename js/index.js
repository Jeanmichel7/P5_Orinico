const getUsers = async function() {
    try{
        let response = await fetch('http://localhost:3000/api/teddies')
        if (response.ok) {
            let data = await response.json()
            console.log(data)


            // On récupère le parcour du lien de l'image cliqué
            let liens = document.querySelectorAll('.article')
            for (let i=0 ; i<liens.length ; i++) {
                let lien = liens[i]

                lien.addEventListener('click' , function(e) {
                    e.preventDefault
                    //let imgLink = lien.getAttribute("src")
                    let idProduit = data[i]._id
                    console.log(idProduit)
                })


                

                router.get('/:id', teddyCtrl.getOneTeddy); // donner l'id de l'article qu'on veut et renvoi un article
                //URL search parameter URLSearchParams()

                // ajouter a l'url l'id du produit !!!!!!!





            }

            // on envoie au serveur imgLink??
            

            const insertPost = async function (data) {
                let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                })
            
                if (response.ok) {
                    let responseData = await response.json()
                    console.log(responseData)
                }
            }
            
            insertPost({
                name:'Jean',
                age:29
            })










        }
        else{
            console.error('Retour du serveur : ', response.status)
        } 
    } catch (e) {
        console.error(e)
    }
}
getUsers()





// lorsque je clique sur un des liens,
    // j'envoie au serveur l'id du lien

