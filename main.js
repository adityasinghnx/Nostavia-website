// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect (Optimized)
    const navbar = document.getElementById('navbar');
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 0) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 3. Simple scroll reveal animation for segments (Optional but premium)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.segment-card, .pricing-card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // 4. Modal Logic
    const modal = document.getElementById('demo-modal');
    const openBtns = document.querySelectorAll('.open-demo-modal');
    const closeBtn = document.getElementById('close-modal');

    if (modal && closeBtn) {
        // Open modal
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // 5. FormSubmit & Success Modal Logic
    const nextUrlInput = document.getElementById('next-url');
    if (nextUrlInput) {
        // Dynamically set the return URL for FormSubmit
        nextUrlInput.value = window.location.origin + window.location.pathname + "?submitted=true";
    }

    const successModal = document.getElementById('success-modal');
    if (successModal) {
        // Check if we just returned from FormSubmit
        if (window.location.search.includes('submitted=true')) {
            successModal.classList.add('active');
            document.body.classList.add('modal-open');
            
            // Clean up the URL so it doesn't show "?submitted=true" if they refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const closeSuccessBtn = document.getElementById('close-success-modal');
        const closeSuccessBtn2 = document.getElementById('close-success-modal-btn');
        
        const closeSuccess = () => {
            successModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccess);
        if (closeSuccessBtn2) closeSuccessBtn2.addEventListener('click', closeSuccess);
        
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeSuccess();
        });
    }

    // 6. Dynamic Pricing Currency Conversion
    async function convertPricing() {
        try {
            // 1. Get User Location & Currency
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            const userCurrency = ipData.currency;
            
            // If they are in India or we couldn't get currency, keep INR
            if (!userCurrency || userCurrency === 'INR') return;

            // 2. Get Exchange Rate from INR
            const rateResponse = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
            const rateData = await rateResponse.json();
            const rate = rateData.rates[userCurrency];
            
            if (!rate) return;

            // 3. Formatter for local currency
            const formatter = new Intl.NumberFormat(navigator.language || 'en-US', {
                style: 'currency',
                currency: userCurrency,
                notation: 'compact',
                maximumFractionDigits: 1
            });

            // 4. Update all dynamic prices
            document.querySelectorAll('.dynamic-price').forEach(el => {
                const inrBase = parseFloat(el.getAttribute('data-inr'));
                const inrMax = el.getAttribute('data-inr-max');
                
                if (inrBase) {
                    const convertedBase = inrBase * rate;
                    let formattedText = formatter.format(convertedBase);
                    
                    // Handle ranges (e.g. 5-8L)
                    if (inrMax) {
                        const convertedMax = parseFloat(inrMax) * rate;
                        formattedText += ' - ' + formatter.format(convertedMax);
                    }
                    
                    el.innerText = formattedText;
                }
            });
        } catch (error) {
            console.log('Dynamic pricing conversion failed or was blocked by adblocker, defaulting to INR:', error);
        }
    }
    
    // Only run if we are on the page with pricing
    if (document.querySelector('.dynamic-price')) {
        convertPricing();
    }

    // 7. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            });
        });
    }
});
