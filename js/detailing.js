// =====================================================
// DETAILING.JS - Animations for the detailing process
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Process Section Scroll Logic
    const steps = document.querySelectorAll(".step");
    const visuals = document.querySelectorAll(".process-img");

    // Loop through each text step and create a ScrollTrigger
    steps.forEach((step, index) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top center", // When the top of the text hits the center of screen
            end: "bottom center",
            onEnter: () => activateStep(index),
            onEnterBack: () => activateStep(index),
        });
    });

    function activateStep(index) {
        // Remove active class from all text steps
        steps.forEach(s => s.classList.remove("active"));
        // Remove active class from all images
        visuals.forEach(v => v.classList.remove("active"));

        // Add active class to current
        if (steps[index]) steps[index].classList.add("active");
        if (visuals[index]) visuals[index].classList.add("active");
    }

    // Initialize first step as active immediately
    activateStep(0);

    // 2. Package Cards Entrance Animation
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

    // 3. Package Hover Glow Effect (Follows Mouse)
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