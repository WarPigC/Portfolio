document.addEventListener('DOMContentLoaded', () => {
    // ===== Card 3D Tilt & Spotlight =====
    const cards = document.querySelectorAll('.card');
    if (window.innerWidth > 768) {
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Set Spotlight position
                card.style.setProperty('--spotlight-x', `${x}px`);
                card.style.setProperty('--spotlight-y', `${y}px`);

                // 3D Tilt calculations
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5; // max 5deg tilt
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // ===== Mobile Menu =====
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== Navbar Scroll =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ===== Scroll Reveal =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // ===== Typewriter =====
    const typedEl = document.getElementById('typedRole');
    if (typedEl) {
        const phrases = [
            'Software Engineer',
            'IoT Developer',
            'MERN Stack Developer',
            'Systems Programming Enthusiast'
        ];
        let pi = 0, ci = 0, deleting = false, wait = 0;

        function type() {
            const now = Date.now();
            if (now < wait) { requestAnimationFrame(type); return; }

            const phrase = phrases[pi];
            if (!deleting) {
                typedEl.textContent = phrase.slice(0, ++ci);
                if (ci === phrase.length) { deleting = true; wait = now + 2200; }
            } else {
                typedEl.textContent = phrase.slice(0, --ci);
                if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
            }
            setTimeout(() => requestAnimationFrame(type), deleting ? 25 : 55);
        }

        typedEl.textContent = '';
        setTimeout(() => requestAnimationFrame(type), 600);
    }

    // ===== Active Nav Highlighting =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    const activeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(a => {
                    a.classList.toggle('active-link',
                        a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.35 });
    sections.forEach(s => activeObserver.observe(s));
});
