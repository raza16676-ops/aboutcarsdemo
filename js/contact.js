// =====================================================
// CONTACT.JS - Form Validation and Submit Animations
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Panel Reveal Animation
    gsap.from(".panel-reveal", {
        scrollTrigger: {
            trigger: ".contact-container",
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 2. Form Validation & Submission Logic
    const form = document.getElementById('bookingForm');
    const submitBtn = document.querySelector('.form-submit');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const successMsg = document.querySelector('.form-success-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        let isValid = true;
        const requiredInputs = form.querySelectorAll('input[required], select[required]');

        // Simple Validation Check
        requiredInputs.forEach(input => {
            const group = input.closest('.input-group');
            if (!input.value.trim()) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
            }

            // specific email check
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    group.classList.add('error');
                    isValid = false;
                }
            }
        });

        // Remove error class on user typing
        requiredInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.closest('.input-group').classList.remove('error');
            });
        });

        // If valid, simulate an API call submission
        if (isValid) {
            // UI State: Loading
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            submitBtn.style.pointerEvents = 'none';

            // Simulate network request (2 seconds)
            setTimeout(() => {
                // UI State: Success
                btnLoader.style.display = 'none';
                btnText.style.display = 'block';
                submitBtn.style.pointerEvents = 'auto';
                
                // Show success message and fade out form inputs
                form.reset();
                
                // GSAP animation for success state
                gsap.to(submitBtn, { display: 'none', duration: 0.2 });
                gsap.fadeIn(successMsg);
                successMsg.style.display = 'block';
                gsap.fromTo(successMsg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                
            }, 2000);
        }
    });
});