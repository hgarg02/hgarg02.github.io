/**
 * Background & Custom Cursor Component - Standalone JavaScript
 * NO EXTERNAL DEPENDENCIES
 * 
 * Features:
 * - Custom cursor with contextual states
 * - Trail particles
 * - Click ripple effects
 * - Animated grid background
 * - 3D particle network system
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════

    const CONFIG = {
        cursor: {
            enabled: window.innerWidth > 768, // Disable on mobile
            trailInterval: 50, // ms between trail particles
            rippleOnClick: true
        },
        particles: {
            count: 50,
            speed: 0.5,
            connectionDistance: 150,
            dotSize: 3
        },
        grid: {
            cellSize: 60,
            lineWidth: 1,
            speed: 0.1
        }
    };

    // ═══════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundComponent);
    } else {
        initBackgroundComponent();
    }

    function initBackgroundComponent() {
        if (CONFIG.cursor.enabled) {
            initCustomCursor();
        }
        initCanvasBackgrounds();
        console.log('✅ Background & Cursor component initialized');
    }

    // ═══════════════════════════════════════════════════════════════════
    // CUSTOM CURSOR
    // ═══════════════════════════════════════════════════════════════════

    let cursorX = 0, cursorY = 0;
    let lastTrailTime = 0;

    function initCustomCursor() {
        const cursor = document.getElementById('background-component-cursor');
        if (!cursor) return;

        cursor.style.display = 'block';

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Create trail particles
            const now = Date.now();
            if (now - lastTrailTime > CONFIG.cursor.trailInterval) {
                createTrailParticle(cursorX, cursorY);
                lastTrailTime = now;
            }
        });

        // Cursor states for different elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, .background-component-demo-btn')) {
                cursor.classList.add('hover-button');
            } else if (e.target.matches('a, .background-component-demo-link')) {
                cursor.classList.add('hover-link');
            } else if (e.target.matches('img, .background-component-demo-image')) {
                cursor.classList.add('hover-image');
            } else if (e.target.matches('h1, h2, h3, p, div')) {
                cursor.classList.add('active');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('button, a, img, h1, h2, h3, p, div')) {
                cursor.classList.remove('hover-button', 'hover-link', 'hover-image', 'active');
            }
        });

        // Click ripple
        if (CONFIG.cursor.rippleOnClick) {
            document.addEventListener('click', (e) => {
                createRipple(e.clientX, e.clientY);
            });
        }
    }

    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'background-component-trail-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const container = document.getElementById('background-component-trail-container');
        if (container) {
            container.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'background-component-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ═══════════════════════════════════════════════════════════════════
    // CANVAS BACKGROUNDS
    // ═══════════════════════════════════════════════════════════════════

    function initCanvasBackgrounds() {
        initGridCanvas();
        initParticlesCanvas();
    }

    // ───────────────────────────────────────────────────────────────────
    // ANIMATED GRID
    // ───────────────────────────────────────────────────────────────────

    function initGridCanvas() {
        const canvas = document.getElementById('background-component-grid-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let offset = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
            ctx.lineWidth = CONFIG.grid.lineWidth;

            // Vertical lines
            for (let

                x = -offset; x < canvas.width; x += CONFIG.grid.cellSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = -offset; y < canvas.height; y += CONFIG.grid.cellSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            offset = (offset + CONFIG.grid.speed) % CONFIG.grid.cellSize;
            requestAnimationFrame(drawGrid);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        drawGrid();
    }

    // ───────────────────────────────────────────────────────────────────
    // 3D PARTICLE SYSTEM
    // ───────────────────────────────────────────────────────────────────

    function initParticlesCanvas() {
        const canvas = document.getElementById('background-component-particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < CONFIG.particles.count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                    vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                    radius: CONFIG.particles.dotSize
                });
            }
        }

        function updateParticles() {
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Keep within bounds
                p.x = Math.max(0, Math.min(canvas.width, p.x));
                p.y = Math.max(0, Math.min(canvas.height, p.y));
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connecting lines
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONFIG.particles.connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = 1 - (dist / CONFIG.particles.connectionDistance);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();
    }

})();