// Spinner Toggel Function
const toggleSpinner = (displayStyle) =>{
    document.getElementById("spinner").style.display = displayStyle;
} 

// Load Data after Clicking Search Button
const loadData =() =>{
    const searchField = document.getElementById("search-field");
    document.getElementById("show-all-button").style.display = "none";
    toggleSpinner("block"); //Toggle the spinner while loading
    const searchValue = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(response => response.json())
    .then(data => displayData(data.data))
    searchField.value = ""
}

// Function to display Loaded Data
const displayData =(data)=>{
    const displayPhone = document.getElementById("display-phone");
    const phoneError = document.getElementById("phone-error");
    phoneError.innerHTML = "";
    displayPhone.innerHTML = "";

    // if search value not matched
    if(data.length == 0){
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card">
        <div class="card-body text-center fw-bolder bg-danger rounded text-white">
          <h2>No Phone Found!</h2>
          <small>Please Search Again With Valid Phone Name, Model or Brand</small>
        </div>
      </div>
        `
        document.getElementById('phone-details').innerHTML = "";
        document.getElementById("show-all-button").style.display="none"
        phoneError.appendChild(div);
        toggleSpinner("none");

    }
    //if search value matched
    else{
        let phoneCount=0 //count how many data displayed
        const displayPhone = document.getElementById("display-phone");
        displayPhone.innerHTML = "";
        phoneError.innerHTML = "";

        //fucntion to display phone cards
        const showPhones = (phone) => {
            const div = document.createElement("div");
            div.classList.add("col")
            div.innerHTML = `
                    <div class="card">
                        <img src="${phone.image}" class="card-img-top p-4 w-75 m-auto">
                        <div class="card-body">
                            <h5 class="card-title fw-bolder">${phone.phone_name}</h5>
                            <h6 class="card-title fw-bold">Brand: <span class="text-white fw-bolder p-1" id="brand-name">${phone.brand}</span></h6>
                        </div>
                        <div class="card-footer bg-white">
                            <div class="d-grid gap-2">
                                <a class="btn fw-bolder" id="details-button" onclick = "loadDetails('${phone.slug}')" href="#phone-details">Details</a>
                            </div>
                        </div>
                    </div>    
            `;
            displayPhone.appendChild(div);
        }
        //if searchvalue matched 
        for(const phone of data){
            //display phone untill phone count is 20
            if(phoneCount<20){
                showPhones(phone)
            document.getElementById('phone-details').innerHTML = "";
            // increment phonecount by 1
            phoneCount++;
    
            }
            //if 20 phones displayed then show more button will appear
            if(phoneCount>=20){
                document.getElementById("show-all-button").style.display="block"
            }
        }
        //if Show All Button is Clicked
        document.getElementById("show-all-button").addEventListener("click", function(){
            const displayPhone = document.getElementById("display-phone");
            displayPhone.innerHTML = "";
            phoneError.innerHTML = "";
            // loop thorough all the phones and display all
            for(const phone of data){
                showPhones(phone)
                document.getElementById('phone-details').innerHTML = "";

                // hide show all button
                document.getElementById("show-all-button").style.display="none"       
            }                

        })
        toggleSpinner("none")
    }
}

// load phone details
const loadDetails = (id) =>{
    toggleSpinner("block")
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}

//function to display details
const displayDetails = (data) =>{
    const phoneDetails = document.getElementById('phone-details');
    toggleSpinner("none")
    phoneDetails.innerHTML = ""
    const divMainFeatures = document.createElement('div');
    divMainFeatures.classList.add("row", "g-0", "mb-5");
    divMainFeatures.innerHTML = `
    <div class="container mb-2" id = "details-title">
            <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center my-2">
            <h4 class="fw-bolder">${data.brand} ${data.name}</h4>
            <small class="fw-bold">${data.releaseDate ? data.releaseDate : "No Release Date Found"}</small>
            </div>
            <button class= "btn btn-primary" id="close-button" onclick="toggleDetails()">Close</button>
            </div>
            </div>           
        <div class="container bg-white" id="all-details"> 
        <div class="row details-info">
            <div class="col-md-3 col-lg-3 col-sm-12 p-4 text-center" id="details-image">
            <img class="w-100" src="${data.image}" alt="">
        </div>
        <div class="col-md-9 col-lg-9 col-sm-12">
            <div class = "row" id="display-info">
            <div class="col-md-4 col-lg-4 col-sm-12 details-info p-4">
            <p class="fw-bold my-2">Main Feature:</p>
            <ul>
            <li><small>${data.mainFeatures.chipSet}</small></li>
            <li><small>${data.mainFeatures.displaySize}</small></li>
            <li><small>${data.mainFeatures.memory}</small></li>
            <li><small>${data.mainFeatures.storage}</small></li>
            </ul>
            </div>
        <div class="col-md-3 col-lg-3 col-sm-12 details-info p-4">
            <p class="fw-bold my-2">Sensors:</p>
            <ul id="sensor-details">
            </ul>
        </div>
        <div id="display-other" class="col-md-5 col-lg-5 col-sm-12 details-info p-4">   
        </div>
        </div>
        </div>
        </div>
        </div>
    `;

    phoneDetails.appendChild(divMainFeatures);
    document.getElementById('sensor-details').innerHTML = "";

    //display sensor informations
    for(const sensor of data.mainFeatures.sensors){
        const sensorDetails = document.getElementById('sensor-details');
        const sensorLi = document.createElement("li");
        sensorLi.innerHTML = `
        <small>${sensor}</small>
        `;
        sensorDetails.appendChild(sensorLi);
    }

    //display others information if available
    if(data.others!=undefined){
        document.getElementById('display-other').innerHTML = "";
        const displayOther = document.getElementById("display-other");
        displayOther.innerHTML = `<p class="fw-bold my-2 id="other-feature">Other Feature:</p>
        <ul id="other-details">
        </ul>`

        const others = data.others;
        for (key in others) {
            const otherDetails = document.getElementById('other-details');
            const otherLi = document.createElement("li");
    
            otherLi.innerHTML = `
            <small><span class = "fw-bold">${key}:</span> ${others[key]}</small>
            `;
            otherDetails.appendChild(otherLi);
        }

    }
    
}


//toggle the phone details
const toggleDetails = () =>{
    document.getElementById("phone-details").innerHTML = "";
}