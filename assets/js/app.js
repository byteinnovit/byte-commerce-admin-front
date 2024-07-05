document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.product-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const items = carousel.querySelectorAll('.product-item');
    let itemWidth;
    let currentIndex = 0;
    let itemsPerView;

    function updateItemWidth() {
        itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(items[0]).marginRight);
        itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
    }

    function updateCarousel() {
        const maxIndex = items.length - itemsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Mise à jour de la visibilité des boutons
        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < maxIndex ? 'block' : 'none';
    }

    prevButton.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleResize = debounce(() => {
        updateItemWidth();
        updateCarousel();
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initialisation
    updateItemWidth();
    updateCarousel();
});