/* Your JS here. */
document.addEventListener('DOMContentLoaded', function() {
    // --- Part 1: Nav Bar Logic ---
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // --- Logic for shrinking nav bar ---
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // --- Logic for highlighting active nav link ---
        let currentSectionId = '';
        // Iterate backwards from the last section to the first
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;

            // A good trigger point is when the top of the section is in the top third of the viewport
            if (window.scrollY >= sectionTop - window.innerHeight / 3) {
                currentSectionId = section.getAttribute('id');
                break;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // --- Part 2: Background Carousel Logic ---
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const slider = aboutSection.querySelector('.carousel-slider');
        const slides = aboutSection.querySelectorAll('.carousel-slider img');
        const prevBtn = aboutSection.querySelector('.prev');
        const nextBtn = aboutSection.querySelector('.next');

        let currentIndex = 0;

        const goToSlide = (index) => {
            const slideWidth = aboutSection.clientWidth;
            slider.style.transform = `translateX(${-index * slideWidth}px)`;
        };

        goToSlide(0);

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });

        window.addEventListener('resize', () => goToSlide(currentIndex));
    }

    // --- Part 3: Modal/Pop-up Logic ---
    const modal = document.getElementById('popup-modal');
    const openBtn = document.getElementById('modal-trigger');
    const closeBtn = document.querySelector('.modal-close');

    const openModal = () => {
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    };

    if (modal && openBtn && closeBtn) {
        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);

        // Close modal if user clicks on the backdrop
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
