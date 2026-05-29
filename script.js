document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Menu =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('ph-list');
        menuIcon.classList.toggle('ph-x');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ===== Scroll Reveal with IntersectionObserver =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // ===== Typewriter Effect =====
    const typeEl = document.querySelector('.typewriter');
    if (typeEl) {
        const phrases = [
            'Software Engineer & IoT Developer',
            'Systems Programming Enthusiast',
            'MERN Stack Developer',
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let deleting = false;
        let pauseEnd = 0;

        function tick() {
            const now = Date.now();
            if (now < pauseEnd) {
                requestAnimationFrame(tick);
                return;
            }

            const current = phrases[phraseIdx];

            if (!deleting) {
                typeEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    deleting = true;
                    pauseEnd = now + 2000;
                }
            } else {
                typeEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                }
            }

            const speed = deleting ? 30 : 60;
            setTimeout(() => requestAnimationFrame(tick), speed);
        }

        typeEl.textContent = '';
        setTimeout(() => requestAnimationFrame(tick), 800);
    }

    // ===== Active Nav Link Highlighting =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === '#' + entry.target.id) {
                        a.style.color = 'var(--text-primary)';
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // ===== Smooth Parallax on Hero Image =====
    const heroImage = document.querySelector('.image-wrapper');
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroImage.style.transform = `translate(${x}px, ${y}px)`;
        }, { passive: true });
    }
});
