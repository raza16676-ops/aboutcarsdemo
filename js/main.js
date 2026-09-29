// =====================================================
// MAIN.JS - Global Functionality (Lenis, Cursor, Nav)
// =====================================================

const isMobileLayout = () => window.matchMedia('(max-width: 900px)').matches
    || window.matchMedia('(pointer: coarse)').matches;

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

if (!isMobileLayout()) {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
}

const cursor = document.querySelector('.custom-cursor');
if (cursor && !isMobileLayout()) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const hoverElements = document.querySelectorAll('a, button, .interactive');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        document.body.classList.toggle('nav-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.body.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}