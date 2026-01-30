/**
 * Global Utilities & Shared Functions
 * 
 * Contains:
 * - Logger: Centralized logging with toggle support
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // LOGGER UTILITY
    // ═══════════════════════════════════════════════════════════════════

    class Logger {
        constructor() {
            this.enabled = true; // Set to false in production
            this.prefix = ' [Portfolio] ';
            this.styles = {
                info: 'color: #06b6d4; font-weight: bold;',
                warn: 'color: #f59e0b; font-weight: bold;',
                error: 'color: #ef4444; font-weight: bold; font-size: 1.1em;'
            };
        }

        info(message, ...args) {
            if (!this.enabled) return;
            console.log(`%cℹ️${this.prefix}${message}`, this.styles.info, ...args);
        }

        warn(message, ...args) {
            if (!this.enabled) return;
            console.warn(`%c⚠️${this.prefix}${message}`, this.styles.warn, ...args);
        }

        error(message, ...args) {
            if (!this.enabled) return;
            console.error(`%c❌${this.prefix}${message}`, this.styles.error, ...args);
        }

        // Group logs for cleaner console
        group(label) {
            if (!this.enabled) return;
            console.group(`%c${this.prefix}${label}`, this.styles.info);
        }

        groupEnd() {
            if (!this.enabled) return;
            console.groupEnd();
        }
    }

    // Expose to global scope
    window.Logger = new Logger();

    // Logger.info('Utils initialized');

})();
