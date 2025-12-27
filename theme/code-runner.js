/**
 * 代码运行器 - 使用 Piston API
 */

const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

const CONFIG = {
    MIN_HEIGHT: 60,
    PADDING: 20,
    LINE_HEIGHT: 22,
    FONT: '"Fira Code", Consolas, Monaco, monospace'
};

const LANGUAGES = {
    c: { piston: 'c', mode: 'text/x-csrc', name: 'C' },
    cpp: { piston: 'cpp', mode: 'text/x-c++src', name: 'C++' },
    python: { piston: 'python3', mode: 'python', name: 'Python 3' },
    asm: { piston: 'nasm', mode: 'gas', name: 'x86-64 Assembly' }
};

const ALIASES = { 'c++': 'cpp', 'py': 'python', 'assembly': 'asm', 'x86': 'asm' };

const getLang = lang => LANGUAGES[ALIASES[lang] || lang] || null;

const escapeHtml = text => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// C 标准库函数
const C_FUNCS = ['printf','scanf','malloc','free','calloc','realloc','strlen','strcpy','strcat','strcmp','strstr','strchr','fopen','fclose','fread','fwrite','fprintf','fscanf','getchar','putchar','gets','puts','fgets','fputs','atoi','atof','atol','sprintf','sscanf','abs','fabs','sqrt','pow','sin','cos','tan','exit','abort','system','rand','srand','time'];

// 检测语言
function detectLanguage(codeBlock) {
    for (const cls of codeBlock.classList) {
        if (cls.startsWith('language-')) {
            const lang = cls.replace('language-', '').toLowerCase();
            return getLang(lang) ? lang : null;
        }
    }
    return null;
}

// 执行代码
async function runCode(code, language) {
    const config = getLang(language);
    if (!config) throw new Error(`不支持的语言: ${language}`);

    const res = await fetch(PISTON_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: config.piston,
            version: '*',
            files: [{ content: code }],
            stdin: '',
            args: []
        })
    });

    if (!res.ok) throw new Error(`API 请求失败: ${res.status}`);
    
    const data = await res.json();
    return {
        stdout: data.run.stdout || '',
        stderr: data.run.stderr || '',
        code: data.run.code || 0,
        language: config.name
    };
}

// 显示结果
function showResult(container, result) {
    container.style.display = 'block';
    const ok = result.code === 0;
    let html = `<div class="code-result"><div class="result-${ok ? 'success' : 'error'}">${ok ? '执行成功' : '执行失败'}</div>`;
    if (result.stdout) html += `<div class="result-output"><strong>输出：</strong><pre>${escapeHtml(result.stdout)}</pre></div>`;
    if (result.stderr) html += `<div class="result-error-output"><strong>错误：</strong><pre>${escapeHtml(result.stderr)}</pre></div>`;
    if (!result.stdout && !result.stderr) html += `<div class="result-no-output">程序执行完成，但没有输出。</div>`;
    container.innerHTML = html + '</div>';
}

function showError(container, msg) {
    container.style.display = 'block';
    container.innerHTML = `<div class="code-result"><div class="result-error">错误</div><pre>${escapeHtml(msg)}</pre></div>`;
}

// 创建高亮标记
function createMarkers(editor, language) {
    let markers = [];
    const isC = ['c', 'cpp', 'c++'].includes(language);

    function highlight() {
        markers.forEach(m => { try { m.clear(); } catch (e) {} });
        markers = [];

        editor.getValue().split('\n').forEach((line, num) => {
            // 标记函数
            if (isC) {
                [...C_FUNCS, 'main'].forEach(fn => {
                    const regex = new RegExp('\\b' + fn + '\\b', 'g');
                    let m;
                    while ((m = regex.exec(line)) !== null) {
                        try {
                            markers.push(editor.markText(
                                { line: num, ch: m.index },
                                { line: num, ch: m.index + fn.length },
                                { className: fn === 'main' ? 'cm-main-function' : 'cm-builtin-function', clearOnEnter: true }
                            ));
                        } catch (e) {}
                    }
                });
            }

            // 标记括号
            [{ r: /[()]/g, c: 'cm-bracket cm-paren' }, { r: /[\[\]]/g, c: 'cm-bracket cm-square' }, { r: /[{}]/g, c: 'cm-bracket cm-brace' }]
            .forEach(({ r, c }) => {
                let m;
                while ((m = r.exec(line)) !== null) {
                    try {
                        markers.push(editor.markText({ line: num, ch: m.index }, { line: num, ch: m.index + 1 }, { className: c, clearOnEnter: true }));
                    } catch (e) {}
                }
            });
        });
    }

    let timeout;
    editor.on('change', () => { clearTimeout(timeout); timeout = setTimeout(highlight, 200); });
    setTimeout(highlight, 300);
}

// 设置高度
function setHeight(editor, lines) {
    const h = Math.max(CONFIG.MIN_HEIGHT, lines * (editor.defaultTextHeight?.() || CONFIG.LINE_HEIGHT) + CONFIG.PADDING);
    const wrapper = editor.getWrapperElement();
    const scroller = editor.getScrollerElement();
    wrapper.style.height = scroller.style.height = h + 'px';
    scroller.style.minHeight = CONFIG.MIN_HEIGHT + 'px';
    scroller.style.overflow = 'hidden';
}

// 创建 CodeMirror 编辑器
function createEditor(container, code, language) {
    const config = getLang(language);
    if (!config) return null;

    const editor = CodeMirror(container, {
        value: code,
        mode: config.mode,
        lineNumbers: false,
        lineWrapping: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        smartIndent: true,
        // 自动闭合括号和引号
        autoCloseBrackets: {
            pairs: '()[]{}\'\'""',
            closeBefore: ')]}\'":;,',
            triples: '',
            explode: '[]{}'
        },
        matchBrackets: true,
        theme: 'default',
        spellcheck: false,
        viewportMargin: Infinity,
        extraKeys: {
            'Tab': cm => cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection('    ', 'end'),
            'Shift-Tab': cm => cm.indentSelection('subtract'),
            'Ctrl-Space': cm => window.CodeMirror?.commands?.autocomplete?.(cm),
            // 回车时自动缩进 {}
            'Enter': cm => {
                const cursor = cm.getCursor();
                const line = cm.getLine(cursor.line);
                const before = line.charAt(cursor.ch - 1);
                const after = line.charAt(cursor.ch);
                
                // 在 {} 中间按回车，自动展开并缩进
                if (before === '{' && after === '}') {
                    const indent = cm.getOption('indentUnit');
                    const spaces = ' '.repeat(indent);
                    const currentIndent = line.match(/^\s*/)[0];
                    cm.replaceSelection('\n' + currentIndent + spaces + '\n' + currentIndent);
                    cm.setCursor({ line: cursor.line + 1, ch: currentIndent.length + indent });
                } else {
                    cm.execCommand('newlineAndIndent');
                }
            }
        },
        hintOptions: {
            hint: window.CodeMirrorLoader?.createHintFunction(language),
            completeSingle: false,
            closeOnUnfocus: true
        }
    });

    const wrapper = editor.getWrapperElement();
    wrapper.style.fontFamily = CONFIG.FONT;
    wrapper.style.fontSize = '14px';
    wrapper.style.lineHeight = '1.6';

    createMarkers(editor, language);

    // 禁用滚动
    editor.on('scroll', () => editor.scrollTo(0, 0));

    let lastLines = editor.lineCount();
    setHeight(editor, lastLines);
    // 延迟刷新以确保正确计算高度（特别是对于隐藏的参考答案）
    setTimeout(() => { 
        try { 
            editor.refresh(); 
            const currentLines = editor.lineCount();
            setHeight(editor, currentLines);
            lastLines = currentLines;
        } catch (e) {} 
    }, 100);

    let resizeTimeout;
    editor.on('change', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const lines = editor.lineCount();
            if (lines !== lastLines) { setHeight(editor, lines); lastLines = lines; }
        }, 100);
    });

    // 自动补全
    let hintTimeout;
    editor.on('keyup', (cm, e) => {
        if (!/^[a-zA-Z0-9_]$/.test(e.key)) return;
        clearTimeout(hintTimeout);
        hintTimeout = setTimeout(() => {
            if (!window.CodeMirror?.showHint) return;
            const token = cm.getTokenAt(cm.getCursor());
            if (token.string.length >= 1 && /^[a-zA-Z_]/.test(token.string)) {
                const fn = window.CodeMirrorLoader?.createHintFunction(language);
                if (fn) window.CodeMirror.showHint(cm, fn, { completeSingle: false, closeOnUnfocus: true });
            }
        }, 150);
    });

    return editor;
}

// 自动调整 textarea 高度
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(textarea.scrollHeight, CONFIG.MIN_HEIGHT) + 'px';
    textarea.style.overflow = 'hidden';
}

// 转换代码块
function makeEditable(codeBlock, language) {
    const pre = codeBlock.parentElement;
    const code = codeBlock.textContent;
    
    pre.classList.add('code-block-editable');
    
    const container = document.createElement('div');
    container.className = 'editable-code-container';
    container.setAttribute('data-language', language);

    if (window.CodeMirror && window.CodeMirrorLoader) {
        try {
            const editor = createEditor(container, code, language);
            if (editor) {
                container._editor = editor;
                container.getValue = () => editor.getValue();
                replaceContent(pre, codeBlock, container);
                return container;
            }
        } catch (e) {}
    }

    // 回退到 textarea
    const textarea = document.createElement('textarea');
    textarea.className = 'editable-code';
    textarea.value = code;
    textarea.setAttribute('spellcheck', 'false');
    textarea.style.fontFamily = CONFIG.FONT;
    textarea.style.fontSize = '14px';
    textarea.style.lineHeight = '1.6';
    
    container.appendChild(textarea);
    container.getValue = () => textarea.value;
    
    setTimeout(() => autoResize(textarea), 0);
    textarea.addEventListener('input', function() { autoResize(this); });
    window.addEventListener('resize', () => autoResize(textarea));
    
    replaceContent(pre, codeBlock, container);
    return container;
}

function replaceContent(pre, codeBlock, container) {
    codeBlock.setAttribute('data-replaced', 'true');
    pre.setAttribute('data-replaced', 'true');
    while (pre.firstChild) pre.removeChild(pre.firstChild);
    pre.appendChild(container);
    pre.style.cssText = 'margin:0;padding:0;border:none;background:transparent';
    
    // 淡入显示
    requestAnimationFrame(() => {
        requestAnimationFrame(() => container.classList.add('ready'));
    });
}

// 初始化
function initCodeRunner() {
    // 处理所有代码块，包括参考答案中的（即使默认隐藏）
    document.querySelectorAll('pre code:not([data-replaced])').forEach(codeBlock => {
        if (codeBlock.getAttribute('data-replaced') === 'true') return;
        if (codeBlock.parentElement?.querySelector('.code-runner-buttons')) return;
        
        const language = detectLanguage(codeBlock);
        if (!language || !getLang(language)) return;

        const editor = makeEditable(codeBlock, language);
        
        const buttons = document.createElement('div');
        buttons.className = 'code-runner-buttons';

        const runBtn = document.createElement('button');
        runBtn.className = 'run-code-btn';
        runBtn.textContent = '▶ 运行代码';
        runBtn.onclick = async () => {
            runBtn.disabled = true;
            runBtn.textContent = '运行中...';

            let resultContainer = editor.parentElement.querySelector('.code-result-container');
            if (!resultContainer) {
                resultContainer = document.createElement('div');
                resultContainer.className = 'code-result-container';
                editor.parentElement.appendChild(resultContainer);
            }

            try {
                showResult(resultContainer, await runCode(editor.getValue?.() || '', language));
            } catch (err) {
                showError(resultContainer, err.message);
            } finally {
                runBtn.disabled = false;
                runBtn.textContent = '▶ 运行代码';
            }
        };
        buttons.appendChild(runBtn);

        // 参考答案按钮
        const answer = editor.closest('.exercise-card')?.querySelector('.exercise-answer');
        if (answer) {
            // 初始化参考答案中的代码块（即使默认隐藏，确保显示时不是黑色）
            const initAnswerCode = () => {
                answer.querySelectorAll('pre code:not([data-replaced])').forEach(codeBlock => {
                    const language = detectLanguage(codeBlock);
                    if (language && getLang(language)) {
                        const editorContainer = makeEditable(codeBlock, language);
                        // 即使隐藏也要设置正确的高度
                        if (editorContainer._editor) {
                            setTimeout(() => {
                                try {
                                    const editor = editorContainer._editor;
                                    editor.refresh();
                                    const lines = editor.lineCount();
                                    setHeight(editor, lines);
                                } catch (e) {}
                            }, 150);
                        }
                    }
                });
            };
            // 延迟初始化，确保CodeMirror已加载
            setTimeout(initAnswerCode, 200);
            
            const answerBtn = document.createElement('button');
            answerBtn.className = 'show-answer-btn';
            answerBtn.textContent = '📖 显示参考答案';
            answerBtn.onclick = () => {
                const hidden = answer.style.display === 'none' || !answer.style.display;
                answer.style.display = hidden ? 'block' : 'none';
                answerBtn.textContent = hidden ? '🙈 隐藏参考答案' : '📖 显示参考答案';
                if (hidden) {
                    // 显示时刷新已初始化的代码块高度
                    setTimeout(() => {
                        answer.querySelectorAll('.editable-code-container').forEach(container => {
                            if (container._editor) {
                                try {
                                    const editor = container._editor;
                                    editor.refresh();
                                    const lines = editor.lineCount();
                                    setHeight(editor, lines);
                                } catch (e) {}
                            }
                        });
                        // 如果还有未初始化的代码块，初始化它们
                        answer.querySelectorAll('pre code:not([data-replaced])').forEach(codeBlock => {
                            const language = detectLanguage(codeBlock);
                            if (language && getLang(language)) {
                                const editorContainer = makeEditable(codeBlock, language);
                                if (editorContainer._editor) {
                                    setTimeout(() => {
                                        try {
                                            const editor = editorContainer._editor;
                                            editor.refresh();
                                            const lines = editor.lineCount();
                                            setHeight(editor, lines);
                                        } catch (e) {}
                                    }, 100);
                                }
                            }
                        });
                        answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 50);
                }
            };
            buttons.appendChild(answerBtn);
        }

        editor.parentElement.appendChild(buttons);
        
        // 按钮淡入
        requestAnimationFrame(() => {
            requestAnimationFrame(() => buttons.classList.add('ready'));
        });
    });
}

async function initialize() {
    if (window.CodeMirrorLoader) {
        try {
            await window.CodeMirrorLoader.load();
            await new Promise(r => setTimeout(r, 100));
        } catch (e) {}
    } else {
        setTimeout(() => window.CodeMirrorLoader ? initialize() : initCodeRunner(), 500);
        return;
    }
    
    initCodeRunner();
    setTimeout(() => document.body?.offsetHeight > 0 && initCodeRunner(), 500);
}

// 页面加载
let initialized = false;
const initUrl = location.href;

function init() {
    if (!initialized && location.href === initUrl) {
        initialized = true;
        initialize();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 监听页面切换
let lastUrl = location.href;
document.addEventListener('mdbook-page-changed', () => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        requestAnimationFrame(() => setTimeout(() => {
            if (location.href === lastUrl) initialize();
        }, 200));
    }
});
