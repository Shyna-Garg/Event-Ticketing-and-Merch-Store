function form() {
    let btns = document.querySelectorAll(".register");
    let form = document.querySelector("#formPage");
    let events = document.querySelector(".page2");
    let bck = document.querySelector("#back");
    let eventTitle = document.querySelector("#eventTitle");

    btns.forEach(button => {
        button.addEventListener("click", function () {
            let eventName = this.parentElement.querySelector("h1").textContent;
            events.style.display = "none";
            form.style.display = "block";
            eventTitle.textContent = eventName;
        });
    });

    bck.addEventListener("click", function () {
        events.style.display = "block";
        form.style.display = "none";
    });
}
form();

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItemsContainer = document.querySelector("#cartItems");
let shop = document.querySelector(".page3");
let orderpage = document.querySelector("#orderPage");
let addcartbtn = document.querySelectorAll(".add-to-cart");
let bckshopbtn = document.querySelector("#bckshop");
let orderPage = document.querySelector("#page4");
let orderSummaryCard = document.querySelector(".card:first-child");
let cartSummaryContainer = document.querySelector(".cart-summary");
let totalAmountElement = document.querySelector(".total strong");


// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <span class="cart-name">${item.name}</span>
            <span class="cart-price">₹${item.price}</span>
            <span class="cart-quantity">Qty: ${item.quantity}</span>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Use event delegation to handle remove button clicks
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            updateCart();
            updateOrderSummary();
        }
    });
}

// Function to update the order summary
function updateOrderSummary() {
    cartSummaryContainer.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        orderSummaryCard.style.display = "none";
        return;
    }

    orderSummaryCard.style.display = "block";

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
            <span class="price">₹${item.price * item.quantity}</span>
            <button class="remove" data-index="${index}">❌</button>
        `;
        cartSummaryContainer.appendChild(cartItem);
        totalAmount += item.price * item.quantity;
    });

    totalAmountElement.innerHTML = `Total: ₹${totalAmount}`;
}
let checkoutButton = document.querySelector("#checkoutButton"); // Select by ID

checkoutButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent bubbling
    alert("🎉 Order Placed Successfully!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateOrderSummary();
    orderPage.style.display = "none";
    shop.style.display = "block";
});

// ✅ Event Delegation for remove buttons in the order summary
cartSummaryContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        let index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        saveCart();
        updateOrderSummary();
    }
});

// ✅ Event Delegation for quantity input updates
cartSummaryContainer.addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        let index = event.target.getAttribute("data-index");
        let newQuantity = parseInt(event.target.value);
        cart[index].quantity = !isNaN(newQuantity) && newQuantity > 0 ? newQuantity : 1;
        saveCart();
        updateOrderSummary();
    }
});

// Add to cart functionality
addcartbtn.forEach(button => {
    button.addEventListener("click", function () {
        let itemName = this.getAttribute("data-name");
        let itemPrice = parseInt(this.getAttribute("data-price"));
        let itemImage = this.getAttribute("data-image");

        let existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
        }

        saveCart();
        updateCart();
        updateOrderSummary();

        shop.style.display = "none";
        orderpage.style.display = "block";
    });
});

// Go back to shop
bckshopbtn.addEventListener("click", function () {
    shop.style.display = "block";
    orderpage.style.display = "none";
});



// Load initial cart on page load
document.addEventListener("DOMContentLoaded", function () {
    updateCart();
    updateOrderSummary();
});
