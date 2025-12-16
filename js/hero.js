/**
 * Hero Section Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Typewriter effect for rotating job titles
 * - Code window theme toggle (light/dark)
 * - Control button interactions
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════

    const CONFIG = {
        typewriter: {
            elementId: 'hero-section-left-column-subtitle-typewriter-text',
            phrases: [
                'Full Stack Developer',
                'React Enthusiast',
                'UI/UX Designer',
                'Problem Solver',
                'Tech Explorer'
            ],
            typingSpeed: 100,
            deletingSpeed: 50,
            pauseBeforeDelete: 1000,
            pauseBeforeType: 500
        },
        codeWindow: {
            toggleId: 'themeToggle',
            windowId: 'code-window',
            controlButtonsSelector: '.code-window-header-control-btn'
        }
    };

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSection);
    } else {
        initHeroSection();
    }

    function initHeroSection() {
        initTypewriter();
        initCodeWindowTheme();
        initControlButtons();
        console.log('✅ Hero section initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // TYPEWRITER EFFECT
    // ═══════════════════════════════════════════════════════════════════

    function initTypewriter() {
        const typewriterElement = document.getElementById(CONFIG.typewriter.elementId);

        if (!typewriterElement) {
            console.warn('⚠️ Typewriter element not found');
            return;
        }

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = CONFIG.typewriter.typingSpeed;

        function typeEffect() {
            const currentPhrase = CONFIG.typewriter.phrases[phraseIndex];

            // Typing mode
            if (!isDeleting && charIndex < currentPhrase.length) {
                typewriterElement.textContent += currentPhrase.charAt(charIndex);
                charIndex++;
                typingSpeed = CONFIG.typewriter.typingSpeed;
            }
            // Deleting mode
            else if (isDeleting && charIndex > 0) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = CONFIG.typewriter.deletingSpeed;
            }
            // Switch between typing and deleting
            else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    phraseIndex = (phraseIndex + 1) % CONFIG.typewriter.phrases.length;
                }
                typingSpeed = isDeleting
                    ? CONFIG.typewriter.pauseBeforeDelete
                    : CONFIG.typewriter.pauseBeforeType;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start the typewriter effect
        typeEffect();
        console.log('✅ Typewriter effect initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // CODE WINDOW THEME TOGGLE
    // ═══════════════════════════════════════════════════════════════════

    function initCodeWindowTheme() {
        const themeToggle = document.getElementById(CONFIG.codeWindow.toggleId);
        const codeWindow = document.getElementById(CONFIG.codeWindow.windowId);

        if (!themeToggle || !codeWindow) {
            console.warn('⚠️ Code window elements not found');
            return;
        }

        themeToggle.addEventListener('click', () => {
            codeWindow.classList.toggle('dark-theme');
        });

        console.log('✅ Code window theme toggle initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // CONTROL BUTTON INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════

    function initControlButtons() {
        const controlButtons = document.querySelectorAll(CONFIG.codeWindow.controlButtonsSelector);

        if (controlButtons.length === 0) {
            console.warn('⚠️ Control buttons not found');
            return;
        }

        controlButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Scale animation on click
                e.currentTarget.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    e.currentTarget.style.transform = '';
                }, 100);
            });
        });

        console.log('✅ Control buttons initialized');
    }

})();