// =====================================================
// ABOUT.JS - Story reveals and Number Counting
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Story Image Clip-Path Reveal
    const storyImages = document.querySelectorAll('.reveal-img');
    
    storyImages.forEach(img => {
        // Initial state: image is hidden behind a clip-path
        gsap.set(img, { clipPath: 'inset(100% 0 0 0)' });
        
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
            },
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.5,
            ease: "power3.inOut"
        });
    });

    // 2. Animated Counter for Stats
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target'); // Get the target number
        
        ScrollTrigger.create({
            trigger: ".stats-section",
            start: "top 80%",
            onEnter: () => {
                // Object to hold the temporary value
                let countObj = { val: 0 }; 
                
                gsap.to(countObj, {
                    val: target,
                    duration: 2.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        // Round the value and update HTML
                        counter.innerHTML = Math.floor(countObj.val);
                    }
                });
            },
            once: true // Ensure it only animates once
        });
    });

    // 3. Workshop Grid Stagger
    gsap.from(".workshop-img", {
        scrollTrigger: {
            trigger: ".workshop-grid",
            start: "top 85%"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

});