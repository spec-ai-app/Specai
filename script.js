/**
 * SPEC-AI - Script v1.0
 * Obsługa interakcji i animacji
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Płynne przewijanie dla linków nawigacyjnych
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Obliczamy pozycję z uwzględnieniem wysokości headera (ok. 70px)
                const offsetPosition = targetElement.offsetTop - 70;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Prosta animacja pojawiania się sekcji (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Dodajemy klasy początkowe do kart korzyści, żeby animacja zadziałała
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(card);
    });

    // 3. Efekt zmiany tła headera przy przewijaniu
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg', 'py-2');
            header.classList.add('py-4');
        }
    });

    console.log("Spec AI: System diagnostyczny gotowy do pracy. 🚗💨");
});
