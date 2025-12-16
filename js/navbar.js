/**
 * Navbar Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES (no jQuery, no Bootstrap JS)
 * 
 * Features:
 * - Mobile overlay toggle
 * - Desktop/mobile marker animation following active link
 * - Scroll spy with IntersectionObserver
 * - Smooth scrolling
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════

    let currentSection = null;
    const sections = [];

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }

    function initNavbar() {
        initMobileOverlay();
        initMarkerAnimations();
        initScrollSpy();
        initSmoothScroll();
        initNavbarScrollReveal();
        console.log('✅ Navbar component initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // NAVBAR SCROLL REVEAL (Hide on hero section)
    // ═══════════════════════════════════════════════════════════════════

    function initNavbarScrollReveal() {
        const navbar = document.querySelector('.navbar-component-wrapper');
        const heroSection = document.querySelector('#section_1');

        if (!navbar || !heroSection) {
            // If no hero section, show navbar immediately
            if (navbar) navbar.classList.add('visible');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When hero is NOT in view, show navbar
                if (!entry.isIntersecting) {
                    navbar.classList.add('visible');
                } else {
                    // When hero IS in view, hide navbar
                    navbar.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(heroSection);
    }

    // ═══════════════════════════════════════════════════════════════════
    // MOBILE OVERLAY TOGGLE
    // ═══════════════════════════════════════════════════════════════════

    function initMobileOverlay() {
        const overlay = document.getElementById('navbar-component-mobile-overlay');
        const openBtn = document.getElementById('navbar-component-hamburger-btn');
        const closeBtn = document.getElementById('navbar-component-mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.navbar-component-mobile-nav-item');

        if (!overlay || !openBtn || !closeBtn) return;

        // Open overlay
        openBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close overlay
        const closeOverlay = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeOverlay);

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeOverlay);
        });

        // Close on overlay background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeOverlay();
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // MARKER ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════

    function initMarkerAnimations() {
        // Desktop marker
        const desktopLinks = document.querySelectorAll('.navbar-component-nav-link');
        const desktopMarker = document.querySelector('.navbar-component-desktop-marker');

        if (desktopLinks.length > 0 && desktopMarker) {
            desktopLinks.forEach(link => {
                // Only update marker on click, not hover
                link.addEventListener('click', (e) => {
                    updateMarker(e.target, desktopMarker);
                    setActiveLink(e.target, desktopLinks);
                });
            });

            // Set initial active link
            const firstActive = Array.from(desktopLinks).find(link => link.classList.contains('active'));
            if (firstActive) {
                updateMarker(firstActive, desktopMarker);
            }
        }

        // Mobile marker
        const mobileLinks = document.querySelectorAll('.navbar-component-mobile-nav-item');
        const mobileMarker = document.querySelector('.navbar-component-mobile-marker');

        if (mobileLinks.length > 0 && mobileMarker) {
            mobileLinks.forEach(link => {
                // Only update marker on click, not hover
                link.addEventListener('click', (e) => {
                    updateMobileMarker(e.target, mobileMarker);
                    setActiveLink(e.target, mobileLinks);
                });
            });

            // Set initial active link
            const firstActiveMobile = Array.from(mobileLinks).find(link => link.classList.contains('active'));
            if (firstActiveMobile) {
                updateMobileMarker(firstActiveMobile, mobileMarker);
            }
        }
    }

    function updateMarker(link, marker) {
        const linkRect = link.getBoundingClientRect();
        const parentRect = link.parentElement.parentElement.getBoundingClientRect();

        marker.style.width = linkRect.width + 'px';
        marker.style.left = (linkRect.left - parentRect.left) + 'px';
        marker.classList.add('visible');
    }

    function updateMobileMarker(link, marker) {
        const linkRect = link.getBoundingClientRect();
        const parentRect = link.parentElement.getBoundingClientRect();

        marker.style.height = linkRect.height + 'px';
        marker.style.top = (linkRect.top - parentRect.top) + 'px';
        marker.classList.add('visible');
    }

    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    // ═══════════════════════════════════════════════════════════════════
    // SCROLL SPY
    // ═══════════════════════════════════════════════════════════════════

    function initScrollSpy() {
        const navLinks = document.querySelectorAll('.navbar-component-scroll-link');
        const sectionIds = Array.from(navLinks)
            .map(link => link.getAttribute('href'))
            .filter(href => href && href.startsWith('#'));

        sectionIds.forEach(id => {
            const section = document.querySelector(id);
            if (section) {
                sections.push(section);
            }
        });

        if (sections.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentSection = entry.target;
                    updateActiveLinks(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    function updateActiveLinks(sectionId) {
        const allLinks = document.querySelectorAll('.navbar-component-scroll-link');
        const desktopMarker = document.querySelector('.navbar-component-desktop-marker');
        const mobileMarker = document.querySelector('.navbar-component-mobile-marker');

        allLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;

            if (isActive) {
                link.classList.add('active');

                // Update desktop marker
                if (link.classList.contains('navbar-component-nav-link') && desktopMarker) {
                    updateMarker(link, desktopMarker);
                }

                // Update mobile marker
                if (link.classList.contains('navbar-component-mobile-nav-item') && mobileMarker) {
                    updateMobileMarker(link, mobileMarker);
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════════════════════════════════

    function initSmoothScroll() {
        const scrollLinks = document.querySelectorAll('.navbar-component-scroll-link');

        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const navbarHeight = document.querySelector('.navbar-component-wrapper').offsetHeight;
                        const targetPosition = target.offsetTop - navbarHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

})();