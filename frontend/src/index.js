document.addEventListener("DOMContentLoaded",event=>{
    const USERS_URL = "http://localhost:3000/users"
    const PLACES_URL = "http://localhost:3000/places"

    getUserData()
    getPlaceData()
    console.log(document.querySelector('#log-in-button'))
    document.querySelector('#log-in-button').addEventListener('click', event=>{
        console.log(event.target)
    })


    function getUserData(){
        fetch(USERS_URL).then(response=>response.json()).then(users=>{
            renderUser(users[0])
            console.log(users)
        })
    }

    function getPlaceData(){
        fetch(PLACES_URL).then(response=>response.json()).then(places=>renderPlaces(places))
    }

    function renderUser(user){
        fetch(USERS_URL+`/${user.id}`).then(response=>response.json()).then(user=>{
            console.log(user.user_image)
            document.querySelector('#user-photo').innerHTML = `<img src="${user.user_image}" width="100" height="100">`
            document.querySelector('#user-info').innerHTML = `<h5>${user.name} is logged in</h5>`
        })
    }

    function renderPlaces(places){
        places.forEach(place => {
            div = document.createElement('div')
            h5 = document.createElement('h5')
            hr = document.createElement('hr')
            h5.textContent = `${place.name}`
            div.append(h5)
            div.append(hr)
            document.querySelector('#location-section').append(div)
            console.log(place)
        });
    }
})
