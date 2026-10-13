



let products = [
    {id: 1, name: "Shoes", price: 999},
    {id: 2, name: "Watch", price: 799},
    {id: 3, name: "Bag", price: 499},
    {id: 4, name: "Headphones", price: 599}
];

let cart = [];

function signup() {
    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
        alert("Please enter username and password!");
        return;
    }

    if (localStorage.getItem("user_" + user) !== null) {
        alert("Username already exists!");
        return;
    }

    localStorage.setItem("user_" + user, pass);
    alert("Signup Successful!");
}

function login() {
    let user = document.getElementById("user").value.trim();
    let pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
        alert("Please enter username and password!");
        return;
    }

    let savedPass = localStorage.getItem("user_" + user);

    if (savedPass !== null && savedPass === pass) {
        alert("Login Successful!");
    } else {
        alert("Invalid Username or Password!");
    }
}

function displayProducts(list = products) {
    document.getElementById("products").innerHTML =
        list.map(p => `
            <div class="product">
                <h3>${p.name}</h3>
                <p>Price: ₹${p.price}</p>
                <button onclick="addToCart(${p.id})">
                    Add to Cart
                </button>
            </div>
        `).join("");
}

function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    showCart();
}

function showCart() {
    document.getElementById("cart").innerHTML =
        cart.map(p =>
            `<p>${p.name} - ₹${p.price}</p>`
        ).join("");

    let total = cart.reduce((sum, p) => sum + p.price, 0);

    document.getElementById("total").textContent =
        "Total: ₹" + total;
}

function searchProducts() {
    let value = document.getElementById("search")
        .value.toLowerCase();

    let result = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(result);
}

displayProducts();
showCart();
