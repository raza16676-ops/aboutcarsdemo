// =====================================================
// DETAILING.JS - Animations for the detailing process
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    if (!isMobile) {
    gsap.from(".package-card", {
        scrollTrigger: {
            trigger: ".packages-grid",
            start: "top 80%"
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
    }

    // 2. Package Hover Glow Effect (Follows Mouse)
    const cards = document.querySelectorAll('.package-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Apply a subtle radial gradient based on mouse position
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 40%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to original CSS background
            card.style.background = '';
        });
    });
});