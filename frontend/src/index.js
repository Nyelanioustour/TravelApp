document.addEventListener("DOMContentLoaded",event=>{
    const USERS_URL = "http://localhost:3000/users"
    const PLACES_URL = "http://localhost:3000/places"

    getUserData()
    getPlaceData()




    function getUserData(){
        fetch(USERS_URL).then(response=>response.json()).then(users=>{
            renderUser(users[0])
        })
    }

    function getPlaceData(){
        fetch(PLACES_URL).then(response=>response.json()).then(console.log)
    }

    function renderUser(user){
        fetch(USERS_URL+`/${user.id}`).then(response=>response.json()).then(user=>{
            console.log(user.user_image)
            document.querySelector('#user-photo').innerHTML = `<img src="${user.user_image}" width="100" height="100">`
            document.querySelector('#user-info').innerHTML = `<h5>${user.name} is logged in</h5>`
        })
    }
})
