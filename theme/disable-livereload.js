/**
 * 阻止 mdbook livereload 在编辑代码时触发页面刷新
 */

// WebSocket 拦截
(function() {
    'use strict';
    const OrigWS = window.WebSocket;
    
    window.WebSocket = function(...args) {
        const ws = new OrigWS(...args);
        
        if (args[0]?.includes?.('__livereload')) {
            const noop = () => {};
            Object.defineProperty(ws, 'onmessage', { set: noop, get: () => noop, configurable: true });
            
            const orig = ws.addEventListener.bind(ws);
            ws.addEventListener = (type, fn, opts) => type !== 'message' && orig(type, fn, opts);
            
            setTimeout(() => { try { ws.close(); } catch (e) {} }, 0);
        }
        
        return ws;
    };
    
    Object.setPrototypeOf(window.WebSocket, OrigWS);
    Object.setPrototypeOf(window.WebSocket.prototype, OrigWS.prototype);
})();

// 主逻辑
(function() {
    'use strict';
    
    let currentUrl = location.href;
    let editing = false;
    let restoring = false;
    
    const isEditing = () => editing || document.activeElement?.closest('.editable-code-container');
    
    // 移除 livereload 脚本
    const removeScripts = () => document.querySelectorAll('script').forEach(s => 
        (s.textContent || '').includes('livereload') && s.remove()
    );
    
    removeScripts();
    document.addEventListener('DOMContentLoaded', removeScripts);
    
    // 监听新脚本
    const target = document.documentElement || document.body;
    const observe = el => new MutationObserver(m => m.forEach(x => x.addedNodes.forEach(n => 
        n.nodeName === 'SCRIPT' && (n.textContent || '').includes('livereload') && n.remove()
    ))).observe(el, { childList: true, subtree: true });
    
    target ? observe(target) : document.addEventListener('DOMContentLoaded', () => observe(document.documentElement));
    
    // 拦截 location.reload
    try { window.location.reload = function() { if (!isEditing()) location.reload.call(location); }; } catch (e) {}
    
    // 拦截 History API
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    
    const shouldBlock = args => {
        if (!isEditing()) return false;
        if (args.length < 3 || !args[2]) return true;
        try { return new URL(args[2], location.origin).pathname !== location.pathname; } catch (e) { return true; }
    };
    
    history.pushState = function(...args) { if (!shouldBlock(args)) origPush.apply(history, args); };
    history.replaceState = function(...args) { if (!shouldBlock(args)) origReplace.apply(history, args); };
    
    // 拦截 popstate
    window.addEventListener('popstate', function(e) {
        if (isEditing()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            try { history.replaceState(null, '', currentUrl); } catch (e) {}
            return false;
        }
        currentUrl = location.href;
    }, true);
    
    // 拦截 location.assign/replace
    ['assign', 'replace'].forEach(m => {
        const orig = location[m];
        if (orig) try { location[m] = function(...args) { if (!isEditing()) orig.apply(location, args); }; } catch (e) {}
    });
    
    // 跟踪编辑状态
    document.addEventListener('focusin', () => { if (isEditing()) { editing = true; currentUrl = location.href; } }, true);
    document.addEventListener('focusout', () => setTimeout(() => { if (!isEditing()) { editing = false; currentUrl = location.href; } }, 100), true);
    
    // 拦截键盘导航
    window.addEventListener('keydown', function(e) {
        const container = document.activeElement?.closest('.editable-code-container');
        if (!container) return;
        
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.stopImmediatePropagation();
            const cm = (document.activeElement.closest('.CodeMirror') || container.querySelector('.CodeMirror'))?.CodeMirror;
            if (cm) cm.execCommand(e.key === 'ArrowLeft' ? 'goCharLeft' : 'goCharRight');
            return;
        }
        
        if (['Home', 'End', 'PageUp', 'PageDown'].includes(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, true);
    
    // URL 监控
    setInterval(() => {
        if (restoring) return;
        const newUrl = location.href;
        if (newUrl !== currentUrl && isEditing()) {
            restoring = true;
            try {
                history.replaceState(null, '', currentUrl);
                if (location.href !== currentUrl) history.pushState(null, '', currentUrl);
            } catch (e) {}
            restoring = false;
        } else if (newUrl !== currentUrl && !editing) {
            currentUrl = newUrl;
        }
    }, 10);
})();
