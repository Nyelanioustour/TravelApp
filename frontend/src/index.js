document.addEventListener("DOMContentLoaded",event=>{
    const USERS_URL = "http://localhost:3000/users"
    const PLACES_URL = "http://localhost:3000/places"
    const TRIPS_URL = "http://localhost:3000/trips"
    let userData

    getUserData()
    getPlaceData()
    logInHandler()

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
                document.querySelector('#user-info').innerHTML= "<h8>Please Log In To View Your Itinerary</h8>"
            }
        })
        
    }


    function getUserData(){
        fetch(USERS_URL).then(response=>response.json()).then(users=>{
            userData = users

        })
    }

    function getPlaceData(){
        fetch(PLACES_URL).then(response=>response.json()).then(places=>renderPlaces(places))
    }

    function renderUser(user){
        fetch(USERS_URL+`/${user.id}`).then(response=>response.json()).then(user=>{

            document.querySelector('#user-photo').src = `${user.user_image}`
            document.querySelector('#user-info').innerHTML = `<h5>${user.name} is logged in</h5>`
            renderUserItinerary(user)
        })
    }

    function renderUserItinerary(user){
        fetch(TRIPS_URL).then(response=>response.json()).then(trips=>{
            trips.forEach(trip=>{
                if (trip.user.name === user.name){
                    let div = document.createElement('div')
                    let hr = document.createElement('hr')
                    console.log(hr)
                    document.querySelector('#user-section').append(hr)
                    div.innerText = `${trip.place.name}`
                    document.querySelector('#user-section').append(div)
                }
                console.log(trip)
            })

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

        });
    }
})
