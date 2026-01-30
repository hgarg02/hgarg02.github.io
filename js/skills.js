/**
 * Skills Section Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Pauses carousel animation on hover
 * - Resumes carousel animation on mouse leave
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkillsSection);
    } else {
        initSkillsSection();
    }

    // ═══════════════════════════════════════════════════════════════════
    // MAIN INITIALIZATION FUNCTION
    // ═══════════════════════════════════════════════════════════════════

    function initSkillsSection() {
        initCarouselHoverPause();
        Logger.info('✅ Skills section component initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // CAROUSEL HOVER PAUSE/RESUME
    // ═══════════════════════════════════════════════════════════════════

    function initCarouselHoverPause() {
        // Get all carousel wrappers
        const carouselWrappers = document.querySelectorAll('.category-card-skills-carousel-wrapper');

        if (carouselWrappers.length === 0) {
            console.warn('⚠️ Skills: No carousel wrappers found');
            return;
        }

        carouselWrappers.forEach(wrapper => {
            const carousel = wrapper.querySelector('.category-card-skills-carousel');

            if (!carousel) {
                return;
            }

            // Pause animation on hover
            wrapper.addEventListener('mouseenter', () => {
                carousel.style.animationPlayState = 'paused';
            });

            // Resume animation on mouse leave
            wrapper.addEventListener('mouseleave', () => {
                carousel.style.animationPlayState = 'running';
            });
        });

        Logger.info(`✅ Skills: Initialized ${carouselWrappers.length} carousels`);
    }

})();