let $ = document;
let userCart = [];

const addToCartButtons = $.querySelectorAll(".addToCart-btn");
const cartContainer = $.querySelector(".right-content");
const cartItemsContainer = $.createElement("div");
cartItemsContainer.classList.add("cart-items");
cartContainer.appendChild(cartItemsContainer);

const itemCount = $.querySelector("#items-counts");
const cartTotal = $.createElement("h6");
cartTotal.innerText = "Total: $0.00";
cartContainer.appendChild(cartTotal);

// افزودن کلیک به همه دکمه‌ها
addToCartButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        let parentCard = btn.closest(".items-card");  // والد دکمه که اطلاعات محصول را دارد
        let imgSrc = btn.getAttribute("data-image");
        let name = parentCard.querySelector(".dessert-title").innerText;
        let price = parseFloat(parentCard.querySelector(".dessert-price").innerText.replace("$", ""));

        addToCart({ name, price, imgSrc });
    });
});

function addToCart(item) {
    userCart.push(item);
    updateCart();
}

function updateCart() {
    // پاک کردن لیست قبلی
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    userCart.forEach((item, index) => {
        totalPrice += item.price;

        let cartItem = $.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" width="50">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-index="${index}">❌</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    //updating itemsCount and totalPrice

    itemCount.innerHTML = `(${userCart.length})`;
    cartTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;


    //deleting items

    const removeBtns = $.querySelectorAll(".remove-btn");

    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            let index = parseInt(btn.getAttribute("data-index"));
            userCart.splice(index , 1);
            updateCart();
        });
    });
};