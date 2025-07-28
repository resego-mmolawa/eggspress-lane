document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlides();
    }

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
        setTimeout(showSlides, 4000);
    }
});
