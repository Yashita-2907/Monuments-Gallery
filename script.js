document.addEventListener("DOMContentLoaded", loadMonuments);

let monuments = JSON.parse(localStorage.getItem("monuments")) || [];

function loadMonuments() {
    const grid = document.getElementById("monumentGrid");
    grid.innerHTML = "";
    monuments.forEach((monument, index) => {
        grid.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${monument.image}" class="card-img-top" onclick="editMonument(${index})">
                    <div class="card-body">
                        <h5 class="card-title">${monument.name}</h5>
                        <p class="card-text">${monument.description}</p>
                        <p class="text-muted"><strong>City:</strong> ${monument.city}</p>
                        <button class="btn btn-danger" onclick="deleteMonument(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Open Add Modal
function openAddModal() {
    document.getElementById("monumentIndex").value = "";
    document.getElementById("monumentName").value = "";
    document.getElementById("monumentDescription").value = "";
    document.getElementById("monumentCity").value = "";
    document.getElementById("monumentImage").value = "";
    new bootstrap.Modal(document.getElementById("monumentModal")).show();
}

// Save Monument (Add/Edit)
function saveMonument() {
    const index = document.getElementById("monumentIndex").value;
    const name = document.getElementById("monumentName").value;
    const description = document.getElementById("monumentDescription").value;
    const city = document.getElementById("monumentCity").value;
    const image = document.getElementById("monumentImage").value;

    if (name.trim() === "" || image.trim() === "") {
        alert("Name and image are required!");
        return;
    }

    const monumentData = { name, description, city, image };

    if (index === "") {
        monuments.push(monumentData);
    } else {
        monuments[index] = monumentData;
    }

    localStorage.setItem("monuments", JSON.stringify(monuments));
    loadMonuments();
    bootstrap.Modal.getInstance(document.getElementById("monumentModal")).hide();
}

// Edit Monument
function editMonument(index) {
    document.getElementById("monumentIndex").value = index;
    document.getElementById("monumentName").value = monuments[index].name;
    document.getElementById("monumentDescription").value = monuments[index].description;
    document.getElementById("monumentCity").value = monuments[index].city;
    document.getElementById("monumentImage").value = monuments[index].image;
    new bootstrap.Modal(document.getElementById("monumentModal")).show();
}

// Delete Monument
function deleteMonument(index) {
    if (confirm("Are you sure you want to delete this monument?")) {
        monuments.splice(index, 1);
        localStorage.setItem("monuments", JSON.stringify(monuments));
        loadMonuments();
    }
}

// Search Monument
function searchMonuments() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    document.querySelectorAll(".card-title").forEach((title, index) => {
        const card = title.closest(".col-md-4");
        card.style.display = title.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
}
