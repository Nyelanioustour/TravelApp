document.addEventListener("DOMContentLoaded",event=>{
    const USERS_URL = "http://localhost:3000/users"
    const PLACES_URL = "http://localhost:3000/places"
    const TRIPS_URL = "http://localhost:3000/trips"
    const PHOTOS_URL = "http://localhost:3000/photos"
    const ALBUMS_URL = "http://localhost:3000/albums"
    let DC = "Washington, DC"
    let VA = "Alexandria, VA"
    let userData
    let placeData
    let currentPlace
    let currentUser

    getUserData()
    getPlaceData(DC)
    logInHandler()
    signupHandler()
    setDefaultSelection()
    addPlaceHandler()
        
        document.querySelector('#add-itinerary-button').addEventListener('click', event=>{
            let place_id = currentPlace.id
            let user_id = currentUser.id
            let trip = {place_id:place_id, user_id:user_id}
            console.log(trip)
            fetch('http://localhost:3000/trips',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ trip })
            })
            .then(response=>response.json())
            .then(updateItinerary(currentPlace))

        })

        document.querySelector('#DC').addEventListener('click', event=>{
            getPlaceData(DC)
        })
        document.querySelector('#VA').addEventListener('click', event=>{
            getPlaceData(VA)
        })

        function addPlaceHandler(){
            document.querySelector('#add-place-button').addEventListener('click',event=>{
                let name = document.querySelector('#place-name-field').value
                let city = document.querySelector('#place-city-field').value
                let description = document.querySelector('#place-description-field').value
                let img_url = document.querySelector('#place-photo-field').value
                let place
                let photo
                fetch(PLACES_URL,{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ places:{name:name, city:city, description:description}})
                })
                .then(response=>response.json())
                .then(place=>{
                    place=place
                    fetch(PHOTOS_URL, {
                        method: 'POST',
                        headers:{
                            "Content-Type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({ img_url })
                    })
                    .then(response=>response.json())
                    .then(photo=>{
                        photo = photo
                        fetch(ALBUMS_URL,{
                            method: 'POST',
                            headers:{
                                "Content-Type": "application/json",
                                "accept": "application/json"
                            },
                            body: JSON.stringify({ albums:{place_id:place.id,photo_id:photo.id}})
                        })
                        .then(response=>response.json())
                        .then(getPlaceData(city))
                    })
                    name.value = ""
                    city.value = ""
                    description.value = ""
                    img_url.value = ""
                })
                
            })
            
        }
        
        function setDefaultSelection(){
            fetch(PLACES_URL).then(response=>response.json()).then(places=>renderPlace(places[0]))
        }

        function signupHandler(){
            let signupButton = document.querySelector('#sign-up-button')
            let form = document.querySelector('#sign-up-form')
            let createAccountButton = document.querySelector('#create-account-submit')
            let userName = document.querySelector('#new-user-name')
            let userEmail = document.querySelector('#new-user-email')
            signupButton.addEventListener('click', event=>{
                form.classList = "active"
            })
            createAccountButton.addEventListener('click', event=>{
                name = userName.value
                email = userEmail.value
                fetch(USERS_URL,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email })
                })
                .then(response=>response.json())
                .then(
                    console.log
                )
                form.classList = 'hide'
                location.reload()
            })
            document.querySelector('#cancel-account-submit').addEventListener('click', event=>{
                form.classList = 'hide'

            })
                
        }
            
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
                    location.reload()
                }
             })
        
        }

    function getUserData(){
        fetch(USERS_URL).then(response=>response.json()).then(users=>{
            userData = users

        })
    }

    function getPlaceData(city){
        fetch(PLACES_URL).then(response=>response.json()).then(places=>{
            renderPlaces(places,city)
            placeData = places
        })
    }

    function renderUser(user){
        fetch(USERS_URL+`/${user.id}`).then(response=>response.json()).then(user=>{

            document.querySelector('#user-photo').src = `${user.user_image}`
            document.querySelector('#user-info').innerHTML = `<h5>${user.name}</h5><h7>Email: ${user.email}</h7>`
            renderUserItinerary(user)
        })
    }

    function renderUserItinerary(user){
        document.querySelector('#user-itinerary').innerHTML=""
        fetch(TRIPS_URL).then(response=>response.json()).then(trips=>{
            trips.forEach(trip=>{
                if (trip.user.name === user.name){
                    let div = document.createElement('div')
                    let p = document.createElement('p')
                    let hr = document.createElement('hr')
                    p.innerText = `${trip.place.name}`
                    div.append(p)
                    div.classList = 'hoverable'
                    document.querySelector('#user-itinerary').append(div)
                    document.querySelector('#user-itinerary').append(hr)
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
        let div = document.createElement('div')
        div.classList = "carousel-item view overlay"
        div.id = 'add-photo'
        div.innerHTML = `<img class="d-block w-100 img-fluid" src="data:image/png;base64,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" alt="carousel slide" height="100" width="100">`
        carousel.append(div)
        div.addEventListener('click',event=>{
            document.querySelector('#add-photo-form').classList='active'
            let addPhotoButton = document.querySelector('#add-photo-button')
            console.log(addPhotoButton)
            addPhotoButton.addEventListener('click',event=>{
                img_url = document.querySelector('#new-photo-url').value
                console.log(img_url)
                place_id = loadingPlace.id

                fetch(PHOTOS_URL,{
                    method:'POST',
                    headers:{
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ img_url })
                })
                .then(response=>response.json())
                .then(photo=>createAlbum(photo,loadingPlace))
            })
        })
        placeData.forEach(place =>{
            if(place.name === loadingPlace.name){
                console.log(place.photos)
                description.innerHTML = `<p>${place.description}</p>`
                place.photos.forEach(photo=>{
                    let div = document.createElement('div')
                    console.log(photo)
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

    function createAlbum(photo,loadingPlace){
        fetch(ALBUMS_URL,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ albums:{photo_id:photo.id, place_id:loadingPlace.id}  })
        })
        .then(response=>response.json())
        .then(console.log)

    }

    function renderPlaces(places, city){
        document.querySelector('#all-location-section').innerHTML = '<div><strong><h8>Select Location:</h8></strong><hr></div>'
        places.forEach(place => {
            if (place.city === city){
                div = document.createElement('div')
                div.classList = 'hoverable'
                p = document.createElement('p')
                hr = document.createElement('hr')
                p.textContent = `${place.name}`
                div.append(p)
                div.append(hr)
                document.querySelector('#all-location-section').append(div)
                div.addEventListener('click', event=>{
                    renderPlace(place)
                })
            }
                
        });
    }
    
    function updateItinerary(place){
        let div = document.createElement('div')
        let p = document.createElement('p')
        let hr = document.createElement('hr')
        p.textContent = `${place.name}`
        div.append(p)
        div.append(hr)
        document.querySelector('#user-itinerary').append(div)
        div.addEventListener('click', event=>{
            renderPlace(place)
        })


    }
})
