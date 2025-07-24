document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Slideshow
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.querySelectorAll('.slide');
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 4000); // Change image every 4 seconds
    }

    // Cart Icon Update
    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartIcon = document.querySelector('.nav-icons a[href="cart.html"]');
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });

        if (totalItems > 0) {
            let count = cartIcon.querySelector('.cart-count');
            if (!count) {
                count = document.createElement('span');
                count.classList.add('cart-count');
                cartIcon.appendChild(count);
            }
            count.textContent = totalItems;
        } else {
            const count = cartIcon.querySelector('.cart-count');
            if (count) {
                count.remove();
            }
        }
    }

    updateCartIcon();
    window.addEventListener('storage', updateCartIcon);
});
