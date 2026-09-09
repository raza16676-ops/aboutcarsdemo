// =====================================================
// HOME.JS - Home page specific animations
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Canvas Image Sequence Scrubbing
    const canvas = document.getElementById("sequence-canvas");
    
    // SAFETY CHECK: Prevents the entire script from crashing if the canvas is missing
    if (canvas) {
        const context = canvas.getContext("2d");
        canvas.width = 1920;
        canvas.height = 1080;

        const frameCount = 150; 
        const currentFrame = index => (
            `assets/images/home/sequence/frame_${(index + 1).toString().padStart(4, '0')}.jpg`
        );

        const images = [];
        const seq = { frame: 0 }; 

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        images[0].onload = render;

        function render() {
            // FIX: GSAP outputs decimals (e.g., 1.5) during scrub. We MUST round it to find a valid array index.
            const frameIndex = Math.round(seq.frame);
            
            // FIX: Only draw if the image actually exists and has finished downloading
            if (images[frameIndex] && images[frameIndex].complete) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
            }
        }

        gsap.to(seq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#sequence",
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 0.5,
                anticipatePin: 1
            },
            onUpdate: render
        });
    }

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