// =====================================================
// HOME.JS - Home page specific animations
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

// 2. Services Stagger Reveal (Forced End States)
gsap.fromTo(".service-card", 
    { 
        y: 100, 
        opacity: 0 
    }, 
    {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }
);

// 3. Why Us List Reveal (Forced End States)
const benefits = document.querySelectorAll(".benefit-item");
benefits.forEach((item) => {
    gsap.fromTo(item, 
        { 
            x: -50, 
            opacity: 0 
        },
        {
            scrollTrigger: {
                trigger: item,
                start: "top 90%"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );
});

// 4. Force Recalculation
// This tells GSAP to recalculate all scroll triggers AFTER the pinned canvas is fully established
window.addEventListener("load", () => {
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});
});