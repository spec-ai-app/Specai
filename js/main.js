document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar - efekt przy scrollu
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scroll - płynne przewijanie do sekcji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer - animacje pojawiania się (Fade-In)
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    document.querySelectorAll('.fade-in').forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Obsługa formularza PHP (przez Fetch API)
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.innerText;
            
            // Wizualny feedback - start
            button.innerText = 'Wysyłanie...';
            button.disabled = true;

            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json();

                if (response.ok) {
                    // Sukces wysyłki
                    button.innerText = 'Wysłano pomyślnie!';
                    button.style.background = '#10b981'; // Zielony mechanik
                    form.reset();
                    alert(result.message); 
                } else {
                    // Błąd po stronie serwera/PHP
                    throw new Error(result.message || 'Błąd wysyłki');
                }
            } catch (error) {
                // Błąd połączenia lub krytyczny błąd PHP
                button.innerText = 'Błąd!';
                button.style.background = '#ef4444'; // Czerwony alert
                alert(error.message);
            } finally {
                // Powrót przycisku do normy po 3 sekundach
                setTimeout(() => {
                    button.innerText = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }
        });
    });

    // 5. Obsługa Galerii Demo (Sekcja w telefonie)
    const images = document.querySelectorAll('.gallery-img');
    const counter = document.getElementById('gallery-counter');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    // Sprawdzamy czy galeria istnieje na stronie, żeby nie wywaliło błędu
    if (images.length > 0 && nextBtn && prevBtn) {
        
        const updateGallery = (index) => {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
            if (counter) {
                counter.innerText = `${index + 1} / ${images.length}`;
            }
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery(currentIndex);
        });
    }
});
