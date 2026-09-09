// =====================================================
// TESLA.JS - Interface logic and tech animations
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HUD Hotspot Interaction Logic
    const hotspots = document.querySelectorAll('.hotspot');
    const modules = document.querySelectorAll('.module-info');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            // Remove active state from all hotspots
            hotspots.forEach(h => h.classList.remove('active'));
            // Add active state to clicked hotspot
            hotspot.classList.add('active');

            // Get target module ID
            const targetModuleId = 'module-' + hotspot.getAttribute('data-module');

            // Hide all modules, show target
            modules.forEach(mod => {
                if(mod.id === targetModuleId) {
                    mod.classList.add('active');
                } else {
                    mod.classList.remove('active');
                }
            });
        });
    });

    // 2. Bento Grid Animation on Scroll
    gsap.from(".bento-card", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%"
        },
        scale: 0.95,
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // 3. Optional: Hover "Scanline" effect for Bento Cards
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        let scanline;
        
        card.addEventListener('mouseenter', () => {
            scanline = document.createElement('div');
            scanline.style.position = 'absolute';
            scanline.style.top = '0';
            scanline.style.left = '0';
            scanline.style.width = '100%';
            scanline.style.height = '2px';
            scanline.style.background = 'rgba(0, 210, 255, 0.5)';
            scanline.style.boxShadow = '0 0 10px rgba(0, 210, 255, 0.8)';
            scanline.style.zIndex = '10';
            card.appendChild(scanline);

            gsap.to(scanline, {
                y: card.offsetHeight,
                duration: 1.5,
                repeat: -1,
                ease: "linear"
            });
        });

        card.addEventListener('mouseleave', () => {
            if(scanline) {
                scanline.remove();
            }
        });
    });
});