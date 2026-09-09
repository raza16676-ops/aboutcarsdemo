// =====================================================
// ADDONS.JS - Card spotlight animations and grid reveals
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Mouse Spotlight Effect for Cards
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for the radial gradient center
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Staggered Entrance Animation
    gsap.from(".addon-card", {
        scrollTrigger: {
            trigger: ".addons-grid",
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
    });

});