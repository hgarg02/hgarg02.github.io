/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🎨 SKILL BADGE CONTROLLER
 * Handles SVG injection and dynamic styling for Square and Wide badges.
 * ═══════════════════════════════════════════════════════════════════════
 */

(function () {
    // 1. INJECT SVG DEFINITIONS
    function injectSvgs() {
        if (document.getElementById('skill-badge-svgs')) return;

        const svgContainer = document.createElement('div');
        svgContainer.id = 'skill-badge-svgs';
        svgContainer.style.position = 'absolute';
        svgContainer.style.width = '0';
        svgContainer.style.height = '0';
        svgContainer.style.overflow = 'hidden';
        svgContainer.setAttribute('aria-hidden', 'true');

        svgContainer.innerHTML = `
            <svg width="0" height="0">
                <defs>
                    <!-- Square Squircle Clip -->
                    <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                        <path d="M 0.5,0 C 0.1,0 0,0.1 0,0.5 S 0.1,1 0.5,1 1,0.9 1,0.5 1,0 0.5,0" />
                    </clipPath>
                    
                    <!-- Wide Squircle Clip -->
                    <clipPath id="dynamicSquircle" clipPathUnits="objectBoundingBox">
                        <path d="M 0.5,0 C 0.1,0 0,0.1 0,0.5 C 0,0.9 0.1,1 0.5,1 C 0.9,1 1,0.9 1,0.5 C 1,0.1 0.9,0 0.5,0 Z" />
                    </clipPath>
                </defs>
            </svg>
        `;
        document.body.appendChild(svgContainer);
    }

    // 2. TECH CONFIGURATION
    // Maps tech_id to its Brand Color
    const techColors = {
        // Languages
        "java": "#EA2D2E",
        "python": "#FFD845",
        "javascript": "#F0DB4F",
        "html5": "#E54D26",
        "css3": "#3D8FC6",

        // Frameworks & Libs
        "spring": "#5FB832",
        "react": "#61DAFB",
        "micro": "#231f20",
        "vue": "#41B883",
        "express": "#444946",
        "node": "#5FA04E",
        "websockets": "#010101", // Generic black for now
        "angular": "#C4473A",

        // Databases & Cloud
        "mysql": "#00618A",
        "mongodb": "#4FAA41",
        "postgresql": "#336791",
        "hibernate": "#BCAE79",
        "redis": "#D82C20",
        "sql": "#005BA1",
        "aws": "#FF9900",

        // DevOps & Tools
        "docker": "#019BC6",
        "jenkins": "#D33833",
        "git": "#F34F29",
        "kafka": "#231F20",
        "kubernetes": "#326CE5",
    };

    const defaultColor = "#333333";

    // 3. APPLY STYLES LOGIC
    function applyStyles(element) {
        // Find which tech class matches
        const classes = Array.from(element.classList);
        const tech = classes.find(c => techColors[c]);
        const color = techColors[tech] || defaultColor;

        // Apply CSS Variables
        // --skill-badge-theme-color is the single source of truth for the component CSS
        element.style.setProperty('--skill-badge-theme-color', color);
    }

    function initBadges() {
        injectSvgs();

        const badges = document.querySelectorAll('.skill-badge-square, .skill-badge-wide');

        badges.forEach(badge => {
            applyStyles(badge);
        });
    }

    // Initialize on DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBadges);
    } else {
        initBadges();
    }

})();
