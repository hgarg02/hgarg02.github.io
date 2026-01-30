/**
 * Experience Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Scroll reveal animations for timeline items and sections
 * - Accessibility support (prefers-reduced-motion)
 * - Intersection Observer for performance
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════

    const CONFIG = {
        selector: '.experience-section-scroll-reveal',
        activeClass: 'experience-section-scroll-reveal-active',
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExperienceComponent);
    } else {
        initExperienceComponent();
    }

    function initExperienceComponent() {
        initScrollReveal();
        Logger.info('✅ Experience component initialized - Scroll Reveal active');
    }

    // ═══════════════════════════════════════════════════════════════════
    // SCROLL REVEAL ANIMATION
    // ═══════════════════════════════════════════════════════════════════

    function initScrollReveal() {
        // Check for reduced motion preference (accessibility)
        if (prefersReducedMotion()) {
            Logger.info('ℹ️ Reduced motion detected: Scroll animations disabled');
            makeAllVisible();
            return;
        }

        const elements = document.querySelectorAll(CONFIG.selector);

        if (elements.length === 0) {
            console.warn('⚠️ No scroll reveal elements found');
            return;
        }

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(CONFIG.activeClass);
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: CONFIG.threshold,
            rootMargin: CONFIG.rootMargin
        });

        // Observe all elements
        elements.forEach(el => observer.observe(el));

        Logger.info(`✅ Scroll reveal initialized (${elements.length} elements)`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // UTILITY FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Check if user prefers reduced motion (accessibility)
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Make all elements visible immediately (for reduced motion)
     */
    function makeAllVisible() {
        const elements = document.querySelectorAll(CONFIG.selector);
        elements.forEach(el => el.classList.add(CONFIG.activeClass));
    }

})();
