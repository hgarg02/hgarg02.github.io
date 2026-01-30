/**
 * About Section Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Counter animations for metric values
 * - Image height synchronization on desktop
 * - Intersection Observer for scroll-triggered animations
 * - Debounced resize handling for performance
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAboutSection);
    } else {
        initAboutSection();
    }

    // ═══════════════════════════════════════════════════════════════════
    // MAIN INITIALIZATION FUNCTION
    // ═══════════════════════════════════════════════════════════════════

    function initAboutSection() {
        // Find the main section using the updated class name
        const section = document.querySelector('.about-section');

        if (!section) {
            // Fallback or exit if not found
            return;
        }

        initCounterAnimation(section);
        // initImageHeightSync(section); // Handled by CSS Grid
        Logger.info('✅ About section component initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // COUNTER ANIMATION FOR METRICS
    // ═══════════════════════════════════════════════════════════════════

    function initCounterAnimation(context) {
        const counters = context.querySelectorAll(".about-section-metric-value");

        if (counters.length === 0) {
            console.warn('⚠️ About section: No metric counters found');
            return;
        }

        const speed = 200; // Lower = faster animation

        const animateCount = (counter) => {
            const target = +counter.innerText.replace("+", "");
            let count = 0;

            const updateCount = () => {
                const increment = target / speed;

                if (count < target) {
                    count += increment;
                    const displayValue = Math.min(Math.ceil(count), target);
                    counter.innerText = displayValue + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        };

        // Run animation only when metrics become visible
        const observer = new IntersectionObserver(
            (entries, observerRef) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        observerRef.unobserve(entry.target); // Run animation once
                    }
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach(counter => observer.observe(counter));
    }

    // ═══════════════════════════════════════════════════════════════════
    // IMAGE HEIGHT SYNCHRONIZATION (Desktop only)
    // ═══════════════════════════════════════════════════════════════════

    // Removed: Image height sync is now handled by CSS Grid in about.css
    // using align-items: stretch and min-height rules.

})();