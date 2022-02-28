const loadData =() =>{
    const searchField = document.getElementById("search-field");
    const searchValue = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(response => response.json())
    .then(data => displayData(data.data))
    searchField.value = ""
}

const displayData =(data)=>{
    let phoneCount=0
    const displayPhone = document.getElementById("display-phone");
    displayPhone.innerHTML = "";
    for(const phone of data){
        if(phoneCount<20){
            const div = document.createElement("div");
        div.classList.add("col")
        div.innerHTML = `
                <div class="card h-100 "w-50">
                    <img src="${phone.image}" class="card-img-top p-4 w-75 m-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">Model: ${phone.phone_name}</h5>
                        <h5 class="card-title">Model: ${phone.brand}</h5>
                    </div>
                    <div class="card-footer">
                        <div class="d-grid gap-2">
                            <button class="btn btn-danger fw-bolder" type="button" onclick = "loadDetails('${phone.slug}')">Details</button>
                        </div>
                    </div>
                </div>    
        `;

        displayPhone.appendChild(div);
        phoneCount++;

        }
        // else{
        //     return;
        // }
    }
}

const loadDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
}


const displayDetails = (data) =>{
    console.log(data)
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add("row", "border", "rounded", "g-0", "mb-5");
    div.innerHTML = `
        <div class="col-md-4 col-sm-12 p-4 text-center">
            <img class="w-75" src="${data.image}" alt="">
        </div>
        <div class="col-md-8 col-sm-12">
            <h4>${data.name}</h4>
            <small>${data.releaseDate}</small>
            <p class="fw-bold my-2">Main Feature:</p>
            <ul>
            <li><small>${data.mainFeatures.chipSet}</small></li>
            <li><small>${data.mainFeatures.displaySize}</small></li>
            <li><small>${data.mainFeatures.memory}</small></li>
            <li><small>${data.mainFeatures.storage}</small></li>
            </ul>
        </div>
    `;
    phoneDetails.appendChild(div);
}