let cart = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout");
const totalElement = document.getElementById("total");
const purchaseModal = document.getElementById("purchase-modal");
const closePurchase = document.getElementById("close-purchase");

// Agregar productos al carrito
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const productCard = button.closest(".card-product");
        const productName = productCard.querySelector("h3").textContent;

        // Asegúrate de reemplazar correctamente símbolos y separadores de miles
        const productPrice = parseFloat(
            event.target.dataset.price
        );

        // Validar que el precio sea un número válido
        if (isNaN(productPrice)) {
            console.error("Error al procesar el precio del producto:", productCard);
            return;
        }

        const product = { name: productName, price: productPrice };
        cart.push(product);
        updateCartCount();
        saveCart();
        updateTotal();
    });
});

// Actualizar cantidad de productos en el carrito
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Mostrar productos en el carrito
function displayCart() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${new Intl.NumberFormat('es-ES').format(item.price)}`;
        cartItems.appendChild(li);
    });
}

// Calcular y mostrar el total del carrito
function updateTotal() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalElement.textContent = `Total: $${new Intl.NumberFormat('es-ES').format(total)}`;
}

// Abrir el carrito
document.getElementById("cart-icon").addEventListener("click", function () {
    cartModal.style.display = "flex";
    displayCart();
    updateTotal();
});

// Cerrar el carrito
closeCart.addEventListener("click", function () {
    cartModal.style.display = "none";
});

// Finalizar compra
checkoutButton.addEventListener("click", function () {
    purchaseModal.style.display = "flex";
    cart = [];
    updateCartCount();
    saveCart();
    cartItems.innerHTML = ""; // Limpiar el contenido mostrado del carrito
    updateTotal();
    cartModal.style.display = "none";
});

// Cerrar mensaje de compra completada
closePurchase.addEventListener("click", function () {
    purchaseModal.style.display = "none";
});

// Cargar carrito desde localStorage al iniciar
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        displayCart(); // Mostrar elementos guardados en el carrito
        updateTotal();
    }
}

loadCart();
