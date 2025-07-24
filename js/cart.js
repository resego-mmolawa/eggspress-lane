document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            updateCartTotal();
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity">
                        <label for="cart-qty-${item.id}">Qty:</label>
                        <input type="number" id="cart-qty-${item.id}" value="${item.quantity}" min="1" data-id="${item.id}">
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        updateCartTotal();
        addEventListeners();
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPriceEl.textContent = total.toFixed(2);
    }

    function addEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                window.dispatchEvent(new Event('storage'));
            });
        });

        const quantityInputs = document.querySelectorAll('.cart-item input[type="number"]');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const newQuantity = parseInt(e.target.value);
                const itemInCart = cart.find(item => item.id === id);
                if (itemInCart) {
                    itemInCart.quantity = newQuantity;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartTotal();
                window.dispatchEvent(new Event('storage'));
            });
        });
    }

    displayCartItems();
});
