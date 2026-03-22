const BASE_URL = "http://localhost:3000";
let currentEndpoint = "products";

function loadData(endpoint) {
    currentEndpoint = endpoint;

    fetch(`${BASE_URL}/${endpoint}`)
        .then(res => res.json())
        .then(data => renderCards(data));
}
function renderCards(data) {
    let container = document.getElementById("container");
    container.innerHTML = "";

    data.forEach(item => {
        let image = "";
        if (item.thumbnail) image = item.thumbnail;
        else if (item.image) image = item.image;
        else if (item.images && item.images.length > 0) image = item.images[0];

        let card = `
            <div class="col-md-4 mb-4">
                <div class="card shadow h-100">

                    ${image ? `<img src="${image}" class="card-img-top img-card">` : ""}

                    <div class="card-body">
                        ${Object.entries(item).map(([key, value]) => {
                            if (typeof value === "object") return "";
                            return `<p><strong>${key}:</strong> ${value}</p>`;
                        }).join("")}
                    </div>

                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Eliminar</button>
                        <button class="btn btn-info btn-sm" onclick="fillForm(${item.id})">Editar</button>
                    </div>

                </div>
            </div>
        `;

        container.innerHTML += card;
    });
}

function createItem() {

    let val1 = document.getElementById("input1").value;
    let val2 = document.getElementById("input2").value;

    let newItem = {};

    if (currentEndpoint === "products") {
        newItem = { title: val1, price: parseFloat(val2) };
    }

    if (currentEndpoint === "users") {
        newItem = { firstName: val1, email: val2 };
    }

    if (currentEndpoint === "posts") {
        newItem = { title: val1, body: val2 };
    }

    if (currentEndpoint === "carts") {
        newItem = { userId: parseInt(val1), total: parseFloat(val2) };
    }

    fetch(`${BASE_URL}/${currentEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
    })
    .then(() => {
    loadData(currentEndpoint);
    showAlert("Operación exitosa");
});
}

function deleteItem(id) {
    fetch(`${BASE_URL}/${currentEndpoint}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadData(currentEndpoint));
}

function fillForm(id) {
    fetch(`${BASE_URL}/${currentEndpoint}/${id}`)
        .then(res => res.json())
        .then(item => {
            document.getElementById("idUpdate").value = item.id;

            if (currentEndpoint === "products") {
                input1.value = item.title;
                input2.value = item.price;
            }

            if (currentEndpoint === "users") {
                input1.value = item.firstName;
                input2.value = item.email;
            }

            if (currentEndpoint === "posts") {
                input1.value = item.title;
                input2.value = item.body;
            }

            if (currentEndpoint === "carts") {
                input1.value = item.userId;
                input2.value = item.total;
            }
        });
}

function updateItem() {
    let id = document.getElementById("idUpdate").value;

    let val1 = document.getElementById("input1").value;
    let val2 = document.getElementById("input2").value;

    let updatedItem = {};

    if (currentEndpoint === "products") {
        updatedItem = { title: val1, price: parseFloat(val2) };
    }

    if (currentEndpoint === "users") {
        updatedItem = { firstName: val1, email: val2 };
    }

    if (currentEndpoint === "posts") {
        updatedItem = { title: val1, body: val2 };
    }

    if (currentEndpoint === "carts") {
        updatedItem = { userId: parseInt(val1), total: parseFloat(val2) };
    }

    fetch(`${BASE_URL}/${currentEndpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem)
    })
    .then(() => loadData(currentEndpoint));
    
}

loadData("products");
function showAlert(msg) {
    let alert = document.getElementById("alert");
    alert.innerText = msg;
    alert.classList.remove("d-none");

    setTimeout(() => {
        alert.classList.add("d-none");
    }, 2000);

    
}