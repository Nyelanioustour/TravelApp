document.addEventListener("DOMContentLoaded",event=>{
    const USERS_URL = "http://localhost:3000/users"
    const PLACES_URL = "http://localhost:3000/places"
    const TRIPS_URL = "http://localhost:3000/trips"
    let userData
    let placeData
    let currentPlace
    let currentUser

    getUserData()
    getPlaceData()
    logInHandler()


    // function addItineraryHandler(){

        document.querySelector('#add-itinerary-button').addEventListener('click', event=>{
            let place_id = currentPlace.id
            let user_id = currentUser.id
            fetch(TRIPS_URL,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({ place_id,user_id })
            })
            .then(response=>response.json())
            .then(renderUser(currentUser))
        })
    // }

    function logInHandler(){
        let loginButton = document.querySelector('#log-in-button')
        let loginSubmit = document.querySelector('#login-submit')
        let form = document.querySelector('#log-in-form')
        let userName = document.querySelector('#user-name')
        loginButton.addEventListener('click', event=>{
            if (loginButton.innerText === "Log In"){
            form.classList = "active"
            loginSubmit.addEventListener('click', event=>{
                form.classList = "hide"
                let userFound = false
                userData.forEach(user=>{
                    if (user.name === userName.value){
                        renderUser(user)
                        currentUser = user
                        userFound = true
                        loginButton.innerHTML = "<strong>Log Out</strong> "
                    }
                })
                if (!userFound){
                    console.log("not found")
                }
                userName.value = ""
            })
            }
            else{
                loginButton.innerHTML = "<strong>Log In</strong> "
                document.querySelector("#user-photo").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                document.querySelector('#user-info').innerHTML = "<h8>Please Log In To View Your Itinerary</h8>"
                document.querySelector('#user-itinerary').innerHTML = "<h5>User Itinerary</h5>"

            }
        })
        
    }

    function getUserData(){
        fetch(USERS_URL).then(response=>response.json()).then(users=>{
            userData = users

        })
    }

    function getPlaceData(){
        fetch(PLACES_URL).then(response=>response.json()).then(places=>{
            renderPlaces(places)
            placeData = places
        })
    }

    function renderUser(user){
        fetch(USERS_URL+`/${user.id}`).then(response=>response.json()).then(user=>{

            document.querySelector('#user-photo').src = `${user.user_image}`
            document.querySelector('#user-info').innerHTML = `<h5>${user.name} is logged in</h5>`
            renderUserItinerary(user)
            currentUser = user

        })
    }

    function renderUserItinerary(user){
        fetch(TRIPS_URL).then(response=>response.json()).then(trips=>{
            trips.forEach(trip=>{
                if (trip.user.name === user.name){
                    let div = document.createElement('div')
                    let hr = document.createElement('hr')
                    document.querySelector('#user-itinerary').append(hr)
                    div.innerText = `${trip.place.name}`
                    document.querySelector('#user-itinerary').append(div)
                    div.addEventListener('click', event=>{
                        renderPlace(trip.place)
                    })
                }
            })

        })
    }
    function renderPlace(loadingPlace){
        let carousel = document.querySelector('#carousel-photos')
        let description = document.querySelector('#location-description') 
        let count = 0
        currentPlace = loadingPlace
        carousel.innerHTML = ""
        document.querySelector('#itinerary-button-div').classList = "buttons"
        placeData.forEach(place =>{
            if(place.name === loadingPlace.name){
                description.innerHTML = `<p>${place.description}</p>`
                place.photos.forEach(photo=>{
                    let div = document.createElement('div')
                    if (count === 0){
                    div.classList = "carousel-item active"
                    }
                    else{
                    div.classList = "carousel-item"
                    }
                    div.innerHTML = `<img class="d-block w-100" src="${photo.img_url}" alt="carousel slide" height="100" width="100">`
                    carousel.append(div)
                    count++
                })
            }
        })
    }

    function renderPlaces(places){
        places.forEach(place => {
            div = document.createElement('div')
            p = document.createElement('p')
            hr = document.createElement('hr')
            p.textContent = `${place.name}`
            div.append(p)
            div.append(hr)
            document.querySelector('#all-location-section').append(div)
            div.addEventListener('click', event=>{
                renderPlace(place)
            })

        });
    }
})
