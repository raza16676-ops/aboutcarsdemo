// =====================================================
// PPF-WRAPS.JS - Interactions for Visualizer & Galleries
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Reveal Animations for Pillars
    gsap.from(".reveal-up", {
        scrollTrigger: {
            trigger: ".pillars-section",
            start: "top 80%"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // 2. Interactive Finish Visualizer Logic
    const buttons = document.querySelectorAll('.finish-btn');
    const layers = document.querySelectorAll('.car-layer');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            // Get target layer ID
            const targetId = button.getAttribute('data-target');

            // Switch layers
            layers.forEach(layer => {
                if (layer.id === targetId) {
                    layer.classList.add('active');
                    // Optional: Add a subtle scale effect to the newly active layer
                    gsap.fromTo(layer, 
                        { scale: 1.05 }, 
                        { scale: 1, duration: 1.5, ease: "power2.out" }
                    );
                } else {
                    layer.classList.remove('active');
                }
            });
        });
    });

    // 3. Gallery Grid Stagger Reveal
    gsap.from(".gallery-item", {
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 85%"
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15
    });

});