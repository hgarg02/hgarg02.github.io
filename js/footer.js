/**
 * Footer Section Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Auto-updates copyright year
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterSection);
    } else {
        initFooterSection();
    }

    // ═══════════════════════════════════════════════════════════════════
    // MAIN INITIALIZATION FUNCTION
    // ═══════════════════════════════════════════════════════════════════

    function initFooterSection() {
        updateCopyrightYear();
        Logger.info('✅ Footer section component initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // AUTO-UPDATE COPYRIGHT YEAR
    // ═══════════════════════════════════════════════════════════════════

    function updateCopyrightYear() {
        const yearElement = document.getElementById('footer-current-year');

        if (!yearElement) {
            console.warn('⚠️ Footer: Year element not found');
            return;
        }

        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }

})();