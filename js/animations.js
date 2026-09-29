// =====================================================
// ANIMATIONS.JS - Shared GSAP utilities
// =====================================================

// Global Preloader
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    tl.to('.preloader-progress', { width: '100%', duration: isMobile ? 0.6 : 1.5, ease: 'power3.inOut' })
      .to('.preloader-text', { opacity: 0, duration: 0.4 }, "-=0.3")
      .to('.preloader', { yPercent: -100, duration: isMobile ? 0.6 : 1, ease: 'power4.inOut' });

    if (!isMobile) {
        tl.from('.hero-content h1', { y: 100, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, "-=0.5")
          .from('.hero-content .btn-primary', { y: 20, opacity: 0, duration: 0.5 }, "-=0.8");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
});