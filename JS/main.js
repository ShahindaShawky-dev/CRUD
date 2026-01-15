

var saveBtn = document.querySelector("#saveContact");
var cards = document.querySelector("#contactsContainer");
var emptyState = document.querySelector("#emptyState");

var photoInput = document.querySelector("#contactPhoto");
var nameInput = document.querySelector("#contactName");
var emailInput = document.querySelector("#contactEmail");
var phoneInput = document.querySelector("#contactPhone");
var addressInput = document.querySelector("#contactAddress");
var groupInput = document.querySelector("#contactType");
var notesInput = document.querySelector("#contactNotes");
var searchInput = document.querySelector("#searchBtn")

var emergencyBtn = document.querySelector("#checkDefault");
var favoriteBtn = document.querySelector("#checkChecked");

var favBox = document.querySelector("#favBox");
var emergencyBox = document.querySelector("#emergencyBox");
var totalCount = document.querySelector("#totalCount");
var favCount = document.querySelector("#favCount");
var emergencyCount = document.querySelector("#emergencyCount");


console.log(
    document.getElementById("totalCount"),
    document.getElementById("favCount"),
    document.getElementById("emergencyCount")
);

var allInfo = []

if (localStorage.getItem("all") != null) {
    allInfo = JSON.parse(localStorage.getItem("all"))
    display()
    displayFav()
    displayEmergency()
    statCount()
    emptyState.style.display = "none"

}

function validPhone() {
    var regexPhoneNumber = /^01[0-9]{9}$/;
    if (regexPhoneNumber.test(phoneInput.value)) {
        document.querySelector("#validNum").classList.replace("d-block", "d-none");
        return true;
    }
    document.querySelector("#validNum").classList.replace("d-none", "d-block");
    return false;
}
function validName() {
    var regexUserName = /^[A-Z][a-z]{2,4}/;
    if (regexUserName.test(nameInput.value)) {
        document.querySelector("#validName").classList.replace("d-block", "d-none");
        return true;
    }
    document.querySelector("#validName").classList.replace("d-none", "d-block");
    return false;
}
function validEmail() {
    var regexEmai = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmai.test(emailInput.value)) {
        document.querySelector("#validEmail").classList.replace("d-block", "d-none");
        return true;
    }
    document.querySelector("#validEmail").classList.replace("d-none", "d-block");
    return false;
}

function statCount() {
    totalCount.innerHTML = allInfo.length;

    var favCounter = 0;
    var emergencyCounter = 0;
    for (var i = 0; i < allInfo.length; i++) {
        if (allInfo[i].fav === true) {
            favCounter++;
        }
        if (allInfo[i].emergency === true) {
            emergencyCounter++;
        }
    }
    favCount.innerHTML = favCounter;
    emergencyCount.innerHTML = emergencyCounter;
    console.log(totalCount, favCount, emergencyCount)
}

function addCard() {
    if (nameInput.value === "" || phoneInput.value === "") return;

    if (validPhone() == true && validName() == true && validEmail() == true) {

        var test = null;
        for (var i = 0; i < allInfo.length; i++) {
            if (allInfo[i].phone == Number(phoneInput.value)) {
                test = allInfo[i];
                break;
            }
        }

        if (test) {
            Swal.fire({
                icon: "error",
                title: "Duplicate Phone Number",
                text: "A contact with this phone number already exists:!" + test.userName,

            });
        } else {
            var info = {
                userName: nameInput.value,
                email: emailInput.value,
                phone: Number(phoneInput.value),
                address: addressInput.value,
                group: groupInput.value,
                notes: notesInput.value,
                fav: favoriteBtn.checked,
                emergency: emergencyBtn.checked,
            }
           
            allInfo.push(info);

            localStorage.setItem("all", JSON.stringify(allInfo))

            emptyState.style.display = "none"

            Swal.fire({
                title: "Added!",
                text: "Contact has been added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1000
            });
            var modal = bootstrap.Modal.getInstance(document.querySelector("#AddItemModal"));
            modal.hide();
            display()
            displayFav()
            displayEmergency()
            statCount()
            clearInputs()

        }
    }



}

function display() {
    var cratoona = ""
    for (var i = 0; i < allInfo.length; i++) {
        var firstTowLetter = allInfo[i].userName.slice(0, 2).toUpperCase();

        cratoona += `
      <div class="col-md-5 mb-2 me-4 rounded-4 bg-white containerCard ">
        <div class="contact-details-card rounded-4 p-4">

            <div class="d-flex align-items-start gap-3 mb-4">
                <div class="avatar-lg position-relative bg-blue text-white d-flex justify-content-center align-items-center rounded-3 p-2">
                    ${firstTowLetter}
                    ${allInfo[i].emergency ? `
                    <div class="emergencyDot position-absolute text-white d-flex justify-content-center align-items-center rounded-circle p-2">
                        <i class="fa-solid fa-heart-pulse"></i>
                    </div>` : ""}
                </div>

                <div class="d-flex flex-column align-items-start justify-content-center">
                    <h4 class="fw-semibold fs-6 mb-2">${allInfo[i].userName}</h4>

                    <div class="info-line d-flex align-items-center justify-content-between">
                        <div class="icon-box rounded-2 d-flex align-items-center justify-content-center me-2 phone">
                            <i class="fa-solid fa-phone fs-6 p-1 w-auto rounded-2"
                                style="color: #464cfe;"></i>
                        </div>
                        <span>${allInfo[i].phone}</span>
                    </div>
                </div>
            </div>

            <div class="info-line d-flex align-items-center mb-3">
                <div class="icon-box mail rounded-2 d-flex align-items-center justify-content-center me-3">
                    <i class="fa-solid fa-envelope fs-6 p-1 w-auto rounded-2"
                        style="color: #b746fe;"></i>

                </div>
                <span>${allInfo[i].email}</span>
            </div>

            <div class="info-line d-flex align-items-center mb-3 mb-3">
                <div class="icon-box location me-3 rounded-2 d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-location-dot fs-6 p-1 w-auto rounded-2"
                        style="color: #249141ff;"></i>

                </div>
                <span>${allInfo[i].address}</span>
            </div>

            ${allInfo[i].emergency ? `<span class="badge emergency-badge text-danger fw-midum bg-danger-subtle"><i class="fa-solid fa-heart-pulse" style="color: #ff0000;"></i>
                Emergency</span>` : ""}

            <div class="actions pt-3 mt-4 d-flex align-items-center  justify-content-between">
               
                <div class="d-flex align-items-center justify-content-between">
                    <div class="action call"><a href="tel:${allInfo[i].phone}"><i class="fa-solid fa-phone me-3" style="color: #37a210;"></i></a></div>
                    <div class="action mail bg-transparent">
                    <a href="sms:${allInfo[i].phone}"><i class="fa-solid fa-envelope fs-6 p-1 w-auto rounded-2"style="color: #b746fe;"></i></a>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                    <div class="divider"></div>
                    <button onclick="addEmergency(${i})" class="addEmergency ms-2"><i class="fa-regular fa-heart" style="color: #566581;"></i></button>
                   <button onclick="addFav(${i})" class="addFav ms-2"><i class="fa-regular fa-star" style="color: #566581;"></i></button>
                    <button onclick="preUpdate(${i})" class="updateBtn ms-2"><i class="fa-solid fa-pencil" style="color: #566581;"></i></button>
                   <button onclick="deletCard(${i})" class="deletBtn ms-2"><i class="fa-solid fa-trash" style="color: #566581;"></i></button>
                </div>

            </div>

        </div>
    </div>

    `;
    }
    if (cratoona == "") {
        cratoona = `<div class="text-center empty-state" id="emptyState">
                    <div class="empty-icon d-flex justify-content-center align-items-center mx-auto rounded-4 mb-3">
                        <i class="fa-solid fa-address-book fs-1" style="color: #d1d5dc;"></i>
                    </div>
                    <h5>No contacts found</h5>
                    <p>
                        Click "Add Contact" to get started
                    </p>
                </div>`
    }

    cards.innerHTML = cratoona;
}

function clearInputs() {
    nameInput.value = ""
    emailInput.value = ""
    phoneInput.value = ""
    addressInput.value = ""
    groupInput.value = ""
    notesInput.value = ""
}


/*****************Delet-Card*******************/

function deletCard(index) {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            allInfo.splice(index, 1);
            localStorage.setItem("all", JSON.stringify(allInfo));
            display()
            displayFav()
            displayEmergency()
            statCount()

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

/*****************************************************/

/****************Update-Card******************/
var mainIndex;
function preUpdate(index) {
    nameInput.value = allInfo[index].userName;
    emailInput.value = allInfo[index].email;
    phoneInput.value = allInfo[index].phone;
    addressInput.value = allInfo[index].address;
    groupInput.value = allInfo[index].group;
    notesInput.value = allInfo[index].notes;

    var modal = new bootstrap.Modal(document.querySelector("#AddItemModal"));
    modal.show();
    console.log(index);
    console.log(allInfo[index]);
    mainIndex = index
}
saveBtn.addEventListener("click", function () {
    if (mainIndex === undefined || mainIndex === null) {
        addCard();
    } else {
        update();
        mainIndex = undefined;
    }
});
function update() {
    var info = {
        userName: nameInput.value,
        email: emailInput.value,
        phone: Number(phoneInput.value),
        address: addressInput.value,
        group: groupInput.value,
        notes: notesInput.value,
        fav: favoriteBtn.checked,
        emergency: emergencyBtn.checked,
    }
    allInfo.splice(mainIndex, 1, info)

    localStorage.setItem("all", JSON.stringify(allInfo));
    display()
    displayFav()
    displayEmergency()
    clearInputs()

    Swal.fire({
        title: "Updated!",
        text: "Contact has been updated successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
    });
    var modal = bootstrap.Modal.getInstance(document.querySelector("#AddItemModal"));
    modal.hide();
}

/****************Search-Contact*************/

function SearchByname(e) {
    e = e.toLowerCase();
    var cratoona = ""
    for (var i = 0; i < allInfo.length; i++) {
        var name = allInfo[i].userName.toLowerCase();
        var email = allInfo[i].email.toLowerCase();
        var phone = allInfo[i].phone.toString();
        if (name.includes(e) || email.includes(e) || phone.includes(e)) {

            var firstTowLetter = allInfo[i].userName.slice(0, 2).toUpperCase();
            cratoona += `
      <div class="col-md-4 mb-4 rounded-4 bg-white containerCard">
        <div class="contact-details-card rounded-4 p-4">

            <div class="d-flex align-items-start gap-3 mb-4">
                <div class="avatar-lg position-relative bg-blue text-white d-flex justify-content-center align-items-center rounded-3 p-2">
                    ${firstTowLetter}
                    ${allInfo[i].emergency ? `
                    <div class="emergencyDot position-absolute text-white d-flex justify-content-center align-items-center rounded-circle p-2">
                        <i class="fa-solid fa-heart-pulse"></i>
                    </div>` : ""}
                </div>

                <div class="d-flex flex-column align-items-start justify-content-center">
                    <h4 class="fw-semibold fs-6 mb-2">${allInfo[i].userName}</h4>

                    <div class="info-line d-flex align-items-center justify-content-between">
                        <div class="icon-box rounded-2 d-flex align-items-center justify-content-center me-2 phone">
                            <i class="fa-solid fa-phone fs-6 p-1 w-auto rounded-2"
                                style="color: #464cfe;"></i>
                        </div>
                        <span>${allInfo[i].phone}</span>
                    </div>
                </div>
            </div>

            <div class="info-line d-flex align-items-center mb-3">
                <div class="icon-box mail rounded-2 d-flex align-items-center justify-content-center me-3">
                    <i class="fa-solid fa-envelope fs-6 p-1 w-auto rounded-2"
                        style="color: #b746fe;"></i>

                </div>
                <span>${allInfo[i].email}</span>
            </div>

            <div class="info-line d-flex align-items-center mb-3 mb-3">
                <div class="icon-box location me-3 rounded-2 d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-location-dot fs-6 p-1 w-auto rounded-2"
                        style="color: #249141ff;"></i>

                </div>
                <span>${allInfo[i].address}</span>
            </div>

            ${allInfo[i].emergency ? `<span class="badge emergency-badge"><i class="fa-solid fa-heart-pulse" style="color: #ff0000;"></i>
                Emergency</span>` : ""}

            <div class="actions pt-3 mt-4 d-flex align-items-center  justify-content-between">
               
                <div class="d-flex align-items-center justify-content-between">
                    <div class="action call"><i class="fa-solid fa-phone me-3" style="color: #37a210;"></i></div>
                    <div class="action mail bg-transparent"><i class="fa-solid fa-envelope fs-6 p-1 w-auto rounded-2"
                     style="color: #b746fe;"></i>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                    <div class="divider"></div>
                     <button onclick="addEmergency(${i})" class="addEmergency ms-2"><i class="fa-regular fa-heart" style="color: #566581;"></i></button>
                    <button onclick="addFav(${i})" class="addFav ms-2"><i class="fa-regular fa-star" style="color: #566581;"></i></button>
                    <button onclick="preUpdate(${i})" class="updateBtn ms-2"><i class="fa-solid fa-pencil" style="color: #566581;"></i></button>
                   <button onclick="deletCard(${i})" class="deletBtn ms-2"><i class="fa-solid fa-trash" style="color: #566581;"></i></button>
                </div>

            </div>

        </div>
    </div>

    `;
        }
    }
    cards.innerHTML = cratoona;
}

searchBtn.addEventListener("input", function (e) {
    SearchByname(e.target.value)
})

/****************** Status Cards *********************/


// console.log(favBox,emergencyBox)

function displayFav() {
    var cratoonaFav = "";
    for (var i = 0; i < allInfo.length; i++) {
        if (allInfo[i].fav == true) {
            var firstTowLetter = allInfo[i].userName.slice(0, 2).toUpperCase();
            cratoonaFav += ` <div class="fav-header ms-3 d-flex align-items-center justify-content-between p-3 mt-3 fav mt-3 ">
           <div class="d-flex">
         <div class="first-litter-box bg-blue me-3 rounded-3 d-flex align-items-center justify-content-center">
            <p class="text-white"> ${firstTowLetter}</p>
         </div>
         <div>
            <h6>${allInfo[i].userName}</h6>
            <span>${allInfo[i].phone}</span>
         </div>
         </div>
          <a href="tel:${allInfo[i].phone}" class="text-decoration-none">
             <span class="fav-phone rounded-1 d-flex justify-content-center align-items-center"><i
                class="fa-solid fa-phone"></i></span>
          </a>

        </div>`
        }
    }
    if (cratoonaFav == "") {
        cratoonaFav = `<p class="text-center">No favorites yet</p>`
    }
    favBox.innerHTML = cratoonaFav;
}

function displayEmergency() {
    var cratoonaEmergency = "";
    for (var i = 0; i < allInfo.length; i++) {
        if (allInfo[i].emergency == true) {
            var firstTowLetter = allInfo[i].userName.slice(0, 2).toUpperCase();
            cratoonaEmergency += ` <div class="fav-header ms-3 d-flex align-items-center justify-content-between p-3 mt-3  fav">
           <div class="d-flex">
        <div class="first-litter-box bg-blue me-3 rounded-3 d-flex align-items-center justify-content-center">
            <p class="text-white"> ${firstTowLetter}</p>
        </div>
        <div>
            <h6>${allInfo[i].userName}</h6>
            <span>${allInfo[i].phone}</span>
        </div>
         </div>
         <a href="tel:${allInfo[i].phone}" class="text-decoration-none">
        <span class="fav-phone rounded-1 d-flex justify-content-center align-items-center"><i
                class="fa-solid fa-phone"></i></span>
    </a>

        </div>`
        }
    }
    if (cratoonaEmergency == "") {
        cratoonaEmergency = `<p class="text-center">No emergency contacts</p>`
    }
    emergencyBox.innerHTML = cratoonaEmergency;
}
/**************Add Fav-Card****************/


function addFav(index) {
    allInfo[index].fav = !allInfo[index].fav;
    localStorage.setItem("all", JSON.stringify(allInfo));
    display()
    displayFav()
    statCount()
}
function addEmergency(index) {
    allInfo[index].emergency = !allInfo[index].emergency;
    localStorage.setItem("all", JSON.stringify(allInfo));
    display()
    displayEmergency()
    statCount()
}

