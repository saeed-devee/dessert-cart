let $ = document;
let userCart = [];

const addToCartButtons = $.querySelectorAll(".addToCart-btn");
const cartContainer = $.querySelector(".right-content");
const cartIcon = $.querySelector(".cart-icon");
const cartBadge = $.querySelector("#cart-badge");
const cartModalContent = $.querySelector("#cart-modal-content")

function updateBadge() {
    if(userCart.length > 0){
        cartBadge.innerText = userCart.length;
        cartBadge.style.display = "block";
    }
    else{
        cartBadge.style.display = "none"
    }
}

const cartItemsContainer = $.createElement("div");
cartItemsContainer.classList.add("cart-items");
cartContainer.appendChild(cartItemsContainer);

const itemCount = $.querySelector("#items-counts");
const cartTotal = $.createElement("h6");
cartTotal.classList.add("cart-total")
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

    if (userCart.length === 1) {
        let fakeImage = $.getElementById("fake-cake__image");
        let cartSubtext = $.getElementById("right-content__subtext");
        if (fakeImage && cartSubtext) {
            fakeImage.remove();
            cartSubtext.remove();
        };
    };

    updateCart();
    updateBadge();
}

function updateCart() {
    // پاک کردن لیست قبلی
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    userCart.forEach(item => {
        totalPrice += item.price;

        let cartItem = $.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-name="${item.name}">❌</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // بروزرسانی تعداد و قیمت کل
    itemCount.innerText = `(${userCart.length})`;
    cartTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;

    // حذف آیتم‌ها
    const removeButtons = $.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", function (event) {
            let index = parseInt(event.target.getAttribute("data-index")); // ایندکس درست را بگیر
            userCart.splice(index, 1);  // حذف آیتم از آرایه

            updateCart();  // بروزرسانی نمایش سبد خرید
        });
    });


    // گرفتن عناصر عکس و متن راهنما
    let fakeImage = $.getElementById("fake-cake__image");
    let cartSubtext = $.getElementById("right-content__subtext");

    if (userCart.length === 0) {
        // نمایش مجدد عکس فیک و متن راهنما
        if (fakeImage) {
            fakeImage.style.display = "block";
            fakeImage.style.filter = "grayscale(0.9)";
        }
        if (cartSubtext) cartSubtext.style.display = "block";
    } else {
        // مخفی کردن عکس فیک و متن راهنما
        if (fakeImage) fakeImage.style.display = "none";
        if (cartSubtext) cartSubtext.style.display = "none";
    }
}

cartIcon.addEventListener("click" , function () {
    updateModalCart()
    let cartModal = new bootstrap.Modal($.getElementById("cartModal"));
    cartModal.show();
})

function updateModalCart() {
    cartModalContent.innerHTML = "";

    if(userCart.length === 0){
        cartModalContent.innerHTML = "<p>Your cart is empty.</p>"
        return;
    }
    userCart.forEach(item => {
        let cartItem = $.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" style="width: 40px;" height:"40px">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartModalContent.appendChild(cartItem);
    });
}