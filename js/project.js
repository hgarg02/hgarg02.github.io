/**
 * Project Section JavaScript
 * - Cursor-following glow effect on cards
 * - Splide carousel initialization
 * - Project filtering system
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════════════════
    // CURSOR-FOLLOWING GLOW EFFECT
    // Tracks mouse position and updates CSS custom properties
    // ═══════════════════════════════════════════════════════════════════

    const projectCards = document.querySelectorAll('.project-section-card');

    projectCards.forEach(card => {
        // Throttle mousemove for better performance
        let ticking = false;

        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    ticking = false;
                });
                ticking = true;
            }
        });

        // Reset glow on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // ═══════════════════════════════════════════════════════════════════
    // SPLIDE CAROUSEL INITIALIZATION
    // Auto-detect all carousels and apply consistent settings
    // ═══════════════════════════════════════════════════════════════════

    const carousels = document.querySelectorAll('.splide');

    if (typeof Splide !== 'undefined' && carousels.length > 0) {
        carousels.forEach(carousel => {
            new Splide(carousel, {
                type: 'loop',
                perPage: 1,
                autoplay: true,
                interval: 4000,
                speed: 800,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                pauseOnHover: true,
                pauseOnFocus: true,
                arrows: true,
                pagination: true,
                gap: 0,
                drag: true,
                lazyLoad: 'nearby',
                keyboard: 'global',
                // Accessibility
                i18n: {
                    prev: 'Previous slide',
                    next: 'Next slide',
                    first: 'Go to first slide',
                    last: 'Go to last slide',
                    slideX: 'Go to slide %s',
                    pageX: 'Go to page %s',
                }
            }).mount();
        });

        Logger.info(`✅ Initialized ${carousels.length} project carousel(s)`);
    } else if (carousels.length > 0) {
        Logger.warn('⚠️ Splide library not loaded');
    }

    // ═══════════════════════════════════════════════════════════════════
    // PROJECT FILTERING SYSTEM
    // Filter projects by category
    // ═══════════════════════════════════════════════════════════════════

    const filterBtns = document.querySelectorAll(".project-section-filter-btn");
    const cards = document.querySelectorAll(".project-section-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                cards.forEach(card => {
                    const categories = card.dataset.category.split(" ");

                    if (filter === "all" || categories.includes(filter)) {
                        // Show card
                        card.style.display = "block";
                        requestAnimationFrame(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        });
                    } else {
                        // Hide card
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";
                        setTimeout(() => (card.style.display = "none"), 300);
                    }
                });
            });
        });

        Logger.info(`✅ Project filters initialized (${filterBtns.length} filters)`);
    }

    Logger.info('✅ Project section initialized');
});