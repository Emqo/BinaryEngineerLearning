/**
 * Language Switcher for mdBook
 * Adds language toggle links in the sidebar
 */

(function() {
    'use strict';
    
    function addLanguageSwitcher() {
        // Remove existing switcher if any
        const existing = document.querySelector('.language-switcher');
        if (existing) {
            existing.remove();
        }
        
        // Get current path to determine language
        const currentPath = window.location.pathname;
        const host = window.location.host;
        const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host.startsWith('localhost:') || host.startsWith('127.0.0.1:');
        
        // Determine if currently on English version
        const isEnglish = currentPath.includes('/en/') || currentPath.match(/^\/en(\/|$)/);
        
        // Determine base path based on environment
        // For GitHub Pages: /BinaryEngineerLearning
        // For localhost: empty (root)
        let basePath = '';
        if (!isLocalhost && currentPath.includes('/BinaryEngineerLearning')) {
            basePath = '/BinaryEngineerLearning';
        }
        
        // Get current page path (relative to base)
        let currentPage = currentPath;
        if (basePath && currentPage.startsWith(basePath)) {
            currentPage = currentPage.substring(basePath.length);
        }
        // Remove leading and trailing slashes, but preserve internal structure
        currentPage = currentPage.replace(/^\/+/, '').replace(/\/+$/, '');
        
        // Handle root/index page
        if (!currentPage || currentPage === 'index.html' || currentPage === '') {
            currentPage = 'index.html';
        }
        
        // Determine paths for language switching
        let zhPath, enPath;
        
        if (isEnglish) {
            // Currently on English page - remove /en/ prefix
            // Handle patterns like: en/, en/index.html, en/c-language/...
            zhPath = currentPage.replace(/^en\//, '').replace(/^en$/, '').replace(/^en\.html$/, 'index.html');
            if (!zhPath || zhPath === '') {
                zhPath = 'index.html';
            }
            enPath = currentPage; // Keep current English path
        } else {
            // Currently on Chinese page - add /en/ prefix
            zhPath = currentPage;
            if (currentPage === 'index.html' || currentPage === '') {
                enPath = 'en/index.html';
            } else {
                enPath = 'en/' + currentPage;
            }
        }
        
        // Build full URLs
        const zhUrl = basePath ? `${basePath}/${zhPath}` : `/${zhPath}`;
        const enUrl = basePath ? `${basePath}/${enPath}` : `/${enPath}`;
        
        // Create language switcher container
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        
        switcher.innerHTML = `
            <div class="lang-switcher-title">Language / 语言</div>
            <div class="lang-switcher-links">
                <a href="${zhUrl}" class="lang-link ${!isEnglish ? 'active' : ''}">中文</a>
                <a href="${enUrl}" class="lang-link ${isEnglish ? 'active' : ''}">English</a>
            </div>
        `;
        
        // Try to insert into sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const sidebarScrollbox = sidebar.querySelector('.sidebar-scrollbox');
            if (sidebarScrollbox) {
                // Insert at the top
                sidebarScrollbox.insertBefore(switcher, sidebarScrollbox.firstChild);
            } else {
                sidebar.insertBefore(switcher, sidebar.firstChild);
            }
        }
    }
    
    // Initialize
    function init() {
        addLanguageSwitcher();
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Handle mdBook page changes
    window.addEventListener('mdbook-page-changed', init);
})();

