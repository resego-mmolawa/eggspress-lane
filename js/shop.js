function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');

    if (countElement) {
        if (totalItems > 0) {
            countElement.textContent = totalItems;
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }
}

function addToCart(button) {
    alert('Add to Cart button clicked!');
}

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    updateCartCount();
});
