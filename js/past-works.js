// =====================================================
// PAST-WORKS.JS - Gallery filtering and animations
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Stagger Reveal for Gallery Items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    gsap.fromTo(galleryItems, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".portfolio-grid",
                start: "top 85%"
            }
        }
    );

    // 2. Stagger Reveal for Review Cards
    const reviewCards = document.querySelectorAll('.review-card');
    
    gsap.fromTo(reviewCards,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".reviews-grid",
                start: "top 85%"
            }
        }
    );
// 4. Lightbox Modal Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

// Attach click event to every gallery item
galleryItems.forEach(item => {
    item.style.cursor = 'pointer'; // Ensure users know it's clickable
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        // Inject the clicked image and text into the modal
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        
        // Display the modal and trigger fade-in
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    });
});

// Function to close the modal
const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300); // Wait for the CSS fade-out transition to finish
};

// Close when clicking the 'X'
closeBtn.addEventListener('click', closeLightbox);

// Close when clicking anywhere on the dark background
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});


    // 3. Category Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide-item');
                    // Small pop-in animation for filtered items
                    gsap.fromTo(item, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
                } else {
                    item.classList.add('hide-item');
                }
            });
            
            // Refresh ScrollTrigger after filtering alters page height
            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });
});

