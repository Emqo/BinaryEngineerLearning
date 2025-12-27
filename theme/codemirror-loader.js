/**
 * CodeMirror 加载器
 */

const CM_VERSION = '5.65.16';
const CM_CDN = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CM_VERSION}`;

// 关键字和函数
const LANG_DATA = {
    c: {
        keywords: ['auto','break','case','char','const','continue','default','do','double','else','enum','extern','float','for','goto','if','int','long','register','return','short','signed','sizeof','static','struct','switch','typedef','union','unsigned','void','volatile','while'],
        stdlib: ['printf','scanf','malloc','free','calloc','realloc','strlen','strcpy','strcat','strcmp','strstr','strchr','fopen','fclose','fread','fwrite','fprintf','fscanf','getchar','putchar','gets','puts','fgets','fputs','atoi','atof','atol','sprintf','sscanf','abs','fabs','sqrt','pow','sin','cos','tan','exit','abort','system','rand','srand','time'],
        signatures: {
            'printf': 'printf(const char *format, ...)',
            'scanf': 'scanf(const char *format, ...)',
            'malloc': 'malloc(size_t size)',
            'free': 'free(void *ptr)',
            'strlen': 'strlen(const char *str)',
            'strcpy': 'strcpy(char *dest, const char *src)',
            'strcat': 'strcat(char *dest, const char *src)',
            'strcmp': 'strcmp(const char *s1, const char *s2)',
            'fopen': 'fopen(const char *filename, const char *mode)',
            'fclose': 'fclose(FILE *stream)',
            'fread': 'fread(void *ptr, size_t size, size_t n, FILE *stream)',
            'fwrite': 'fwrite(const void *ptr, size_t size, size_t n, FILE *stream)',
            'calloc': 'calloc(size_t n, size_t size)',
            'realloc': 'realloc(void *ptr, size_t size)'
        },
        // 代码片段模板
        snippets: {
            'main': { text: 'int main() {\n    \n    return 0;\n}', cursor: { line: 1, ch: 4 }, display: 'main - int main() {...}' },
            'maina': { text: 'int main(int argc, char *argv[]) {\n    \n    return 0;\n}', cursor: { line: 1, ch: 4 }, display: 'maina - int main(argc, argv) {...}' },
            'for': { text: 'for (int i = 0; i < n; i++) {\n    \n}', cursor: { line: 0, ch: 19 }, display: 'for - for (int i = 0; i < n; i++)' },
            'while': { text: 'while () {\n    \n}', cursor: { line: 0, ch: 7 }, display: 'while - while () {...}' },
            'if': { text: 'if () {\n    \n}', cursor: { line: 0, ch: 4 }, display: 'if - if () {...}' },
            'ife': { text: 'if () {\n    \n} else {\n    \n}', cursor: { line: 0, ch: 4 }, display: 'ife - if () {...} else {...}' },
            'switch': { text: 'switch () {\n    case :\n        break;\n    default:\n        break;\n}', cursor: { line: 0, ch: 8 }, display: 'switch - switch () {...}' },
            'struct': { text: 'struct  {\n    \n};', cursor: { line: 0, ch: 7 }, display: 'struct - struct {...}' },
            '#inc': { text: '#include <stdio.h>', cursor: { line: 0, ch: 18 }, display: '#inc - #include <stdio.h>' },
            '#incl': { text: '#include <stdlib.h>', cursor: { line: 0, ch: 19 }, display: '#incl - #include <stdlib.h>' },
            '#incs': { text: '#include <string.h>', cursor: { line: 0, ch: 19 }, display: '#incs - #include <string.h>' },
            '#def': { text: '#define ', cursor: { line: 0, ch: 8 }, display: '#def - #define' }
        }
    },
    python: {
        keywords: ['and','as','assert','break','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','not','or','pass','print','raise','return','try','while','with','yield'],
        builtins: ['abs','all','any','bin','bool','bytes','chr','dict','dir','enumerate','filter','float','format','getattr','hasattr','hash','help','hex','id','input','int','isinstance','iter','len','list','map','max','min','next','object','open','ord','pow','print','range','repr','reversed','round','set','sorted','str','sum','super','tuple','type','zip'],
        snippets: {
            'def': { text: 'def ():\n    ', cursor: { line: 0, ch: 4 }, display: 'def - def ()...' },
            'class': { text: 'class :\n    def __init__(self):\n        ', cursor: { line: 0, ch: 6 }, display: 'class - class ...' },
            'if': { text: 'if :\n    ', cursor: { line: 0, ch: 3 }, display: 'if - if:...' },
            'ife': { text: 'if :\n    \nelse:\n    ', cursor: { line: 0, ch: 3 }, display: 'ife - if:...else:...' },
            'for': { text: 'for  in :\n    ', cursor: { line: 0, ch: 4 }, display: 'for - for in:...' },
            'while': { text: 'while :\n    ', cursor: { line: 0, ch: 6 }, display: 'while - while:...' },
            'try': { text: 'try:\n    \nexcept Exception as e:\n    ', cursor: { line: 1, ch: 4 }, display: 'try - try:...except:...' },
            'main': { text: 'def main():\n    \n\nif __name__ == "__main__":\n    main()', cursor: { line: 1, ch: 4 }, display: 'main - def main()...' }
        }
    }
};

// 是否本地开发
const isLocal = () => ['localhost','127.0.0.1'].includes(location.hostname);

// 获取资源路径
function getBase() {
    if (isLocal()) return null;
    const root = window.path_to_root ?? (() => {
        const parts = location.pathname.split('/').filter(p => p && !p.endsWith('.html'));
        return parts.length > 0 ? '../'.repeat(parts.length) : '';
    })();
    return `${root}theme/lib/codemirror/${CM_VERSION}`;
}

// 加载资源
function loadResource(tag, attr, local, cdn, callback) {
    const el = document.createElement(tag);
    el[attr] = local || cdn;
    if (callback) el.onload = callback;
    el.onerror = () => {
        if (local && cdn) {
            const fallback = document.createElement(tag);
            fallback[attr] = cdn;
            if (callback) fallback.onload = callback;
            document.head.appendChild(fallback);
        } else callback?.();
    };
    document.head.appendChild(el);
}

function loadScript(local, cdn, cb) { loadResource('script', 'src', local, cdn, cb); }
function loadCSS(local, cdn) {
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = local || cdn;
    el.onerror = () => {
        if (local && cdn) {
            const f = document.createElement('link');
            f.rel = 'stylesheet';
            f.href = cdn;
            document.head.appendChild(f);
        }
    };
    document.head.appendChild(el);
}

// 顺序加载脚本
function loadScripts(items, done) {
    if (!items.length) return done?.();
    const [first, ...rest] = items;
    loadScript(first.local, first.cdn, () => loadScripts(rest, done));
}

// 加载 CodeMirror
function loadCodeMirror() {
    return new Promise((resolve, reject) => {
        if (window.CodeMirror) return resolve(window.CodeMirror);

        const base = getBase();
        const useLocal = base !== null;
        const l = path => useLocal ? `${base}/${path}` : null;
        const c = path => `${CM_CDN}/${path}`;

        loadCSS(l('codemirror.min.css'), c('codemirror.min.css'));

        loadScripts([
            { local: l('codemirror.min.js'), cdn: c('codemirror.min.js') },
            { local: l('mode/clike/clike.min.js'), cdn: c('mode/clike/clike.min.js') },
            { local: l('mode/python/python.min.js'), cdn: c('mode/python/python.min.js') },
            { local: l('addon/hint/show-hint.min.js'), cdn: c('addon/hint/show-hint.min.js') },
            { local: l('addon/edit/closebrackets.min.js'), cdn: c('addon/edit/closebrackets.min.js') },
            { local: l('addon/edit/matchbrackets.min.js'), cdn: c('addon/edit/matchbrackets.min.js') }
        ], () => {
            loadCSS(l('addon/hint/show-hint.min.css'), c('addon/hint/show-hint.min.css'));
            setTimeout(() => window.CodeMirror ? resolve(window.CodeMirror) : reject(new Error('CodeMirror 加载失败')), 100);
        });
    });
}

// 获取语言关键字
function getKeywords(lang) {
    const l = lang?.toLowerCase();
    if (['c','cpp','c++'].includes(l)) return [...LANG_DATA.c.keywords, ...LANG_DATA.c.stdlib];
    if (['python','py'].includes(l)) return [...LANG_DATA.python.keywords, ...LANG_DATA.python.builtins];
    return [];
}

// 创建自动补全函数
function createHintFunction(lang) {
    const keywords = getKeywords(lang);
    const l = lang?.toLowerCase();
    const isC = ['c','cpp','c++'].includes(l);
    const isPy = ['python','py'].includes(l);
    const langData = isC ? LANG_DATA.c : (isPy ? LANG_DATA.python : null);
    const stdlib = langData?.stdlib || [];
    const sigs = langData?.signatures || {};
    const snippets = langData?.snippets || {};

    return function(editor) {
        if (!window.CodeMirror) return null;

        const cursor = editor.getCursor();
        const token = editor.getTokenAt(cursor);
        const line = editor.getLine(cursor.line);
        const word = line.slice(token.start, cursor.ch);

        if (word.length < 1) return null;

        const list = [];
        const wordLower = word.toLowerCase();
        const needSemi = isC && line.slice(cursor.ch).trim() === '';

        // 1. 代码片段（优先级最高）
        Object.keys(snippets).forEach(key => {
            if (key.toLowerCase().startsWith(wordLower) && key.toLowerCase() !== wordLower) {
                const snippet = snippets[key];
                list.push({
                    text: key,
                    displayText: '📝 ' + snippet.display,
                    className: 'cm-snippet-hint',
                    hint: (cm, data) => {
                        const from = data.from;
                        const to = data.to;
                        const currentIndent = line.match(/^\s*/)[0];
                        
                        // 处理多行代码片段的缩进
                        const lines = snippet.text.split('\n');
                        const indentedText = lines.map((l, i) => i === 0 ? l : currentIndent + l).join('\n');
                        
                        cm.replaceRange(indentedText, from, to);
                        
                        // 设置光标位置
                        const targetLine = from.line + snippet.cursor.line;
                        const targetCh = snippet.cursor.line === 0 
                            ? from.ch + snippet.cursor.ch 
                            : currentIndent.length + snippet.cursor.ch;
                        cm.setCursor({ line: targetLine, ch: targetCh });
                    }
                });
            }
        });

        // 2. 标准库函数
        if (isC) {
            stdlib.forEach(fn => {
                if (fn.toLowerCase().startsWith(wordLower) && fn.toLowerCase() !== wordLower) {
                    list.push({
                        text: fn,
                        displayText: sigs[fn] ? `${fn} - ${sigs[fn]}` : `${fn}()`,
                        className: 'cm-function-hint',
                        hint: (cm, data) => {
                            const from = data.from;
                            const to = data.to;
                            const needParen = line.charAt(cursor.ch) !== '(';
                            let insert = fn;
                            let cursorOffset = fn.length;
                            
                            if (needParen) {
                                if (['printf','scanf','fprintf','fscanf','sprintf','sscanf','puts','fputs'].includes(fn)) {
                                    insert = fn + '("")';
                                    cursorOffset = fn.length + 2;
                                    if (needSemi) insert += ';';
                                } else {
                                    insert = fn + '()';
                                    cursorOffset = fn.length + 1;
                                    if (needSemi) insert += ';';
                                }
                            }
                            
                            cm.replaceRange(insert, from, to);
                            cm.setCursor({ line: from.line, ch: from.ch + cursorOffset });
                        }
                    });
                }
            });
        }

        // 3. 从代码中提取变量名和函数名
        const code = editor.getValue();
        const existingNames = new Set();
        
        if (isC) {
            // C语言变量声明: int a, char *str, float arr[10]
            const varPattern = /\b(int|char|float|double|long|short|unsigned|signed|void|size_t|FILE)\s*\**\s+(\w+)/g;
            let match;
            while ((match = varPattern.exec(code)) !== null) {
                if (match[2] && match[2].length > 1) existingNames.add(match[2]);
            }
            // 函数定义: int func(...)
            const funcPattern = /\b(int|char|float|double|long|short|void)\s+(\w+)\s*\(/g;
            while ((match = funcPattern.exec(code)) !== null) {
                if (match[2] && match[2] !== 'main' && match[2].length > 1) existingNames.add(match[2]);
            }
            // for 循环变量: for (int i = 0
            const forPattern = /for\s*\(\s*int\s+(\w+)/g;
            while ((match = forPattern.exec(code)) !== null) {
                if (match[1]) existingNames.add(match[1]);
            }
        } else if (isPy) {
            // Python 变量赋值: x = 
            const assignPattern = /^(\s*)(\w+)\s*=/gm;
            let match;
            while ((match = assignPattern.exec(code)) !== null) {
                if (match[2] && match[2].length > 1 && !/^(if|for|while|def|class|return|import|from)$/.test(match[2])) {
                    existingNames.add(match[2]);
                }
            }
            // 函数定义: def func(...)
            const defPattern = /def\s+(\w+)\s*\(/g;
            while ((match = defPattern.exec(code)) !== null) {
                if (match[1]) existingNames.add(match[1]);
            }
            // for 循环变量: for x in
            const forPattern = /for\s+(\w+)\s+in/g;
            while ((match = forPattern.exec(code)) !== null) {
                if (match[1]) existingNames.add(match[1]);
            }
        }

        // 添加提取的变量名到补全列表
        existingNames.forEach(name => {
            if (name.toLowerCase().startsWith(wordLower) && name.toLowerCase() !== wordLower) {
                if (!stdlib.includes(name) && !snippets[name]) {
                    list.push({
                        text: name,
                        displayText: '📌 ' + name,
                        className: 'cm-variable-hint'
                    });
                }
            }
        });

        // 4. 关键字
        keywords.forEach(kw => {
            if (kw.toLowerCase().startsWith(wordLower) && kw.toLowerCase() !== wordLower) {
                // 跳过已经作为片段添加的关键字
                if (snippets[kw]) return;
                // 跳过已经作为函数添加的
                if (stdlib.includes(kw)) return;
                list.push(kw);
            }
        });

        if (!list.length) return null;

        return {
            list,
            from: window.CodeMirror.Pos(cursor.line, token.start),
            to: window.CodeMirror.Pos(cursor.line, cursor.ch)
        };
    };
}

// 创建语法检查函数
function createLintFunction(lang) {
    return function(text) {
        if (!window.CodeMirror || !['c','cpp','c++'].includes(lang?.toLowerCase())) return [];
        
        const errors = [];
        const lines = text.split('\n');
        let braces = 0, parens = 0, brackets = 0;

        lines.forEach((line, num) => {
            let inStr = false, strChar = '', escaped = false;

            for (const char of line) {
                if (escaped) { escaped = false; continue; }
                if (char === '\\') { escaped = true; continue; }
                
                if (!inStr && (char === '"' || char === "'")) {
                    inStr = true; strChar = char;
                } else if (inStr && char === strChar) {
                    inStr = false;
                } else if (!inStr) {
                    if (char === '{') braces++;
                    else if (char === '}') braces--;
                    else if (char === '(') parens++;
                    else if (char === ')') parens--;
                    else if (char === '[') brackets++;
                    else if (char === ']') brackets--;
                }
            }

            if (inStr) {
                errors.push({
                    from: window.CodeMirror.Pos(num, 0),
                    to: window.CodeMirror.Pos(num, line.length),
                    message: `未闭合的${strChar === '"' ? '双' : '单'}引号`,
                    severity: 'error'
                });
            }
        });

        const last = Math.max(0, lines.length - 1);
        [[braces, '}'], [parens, ')'], [brackets, ']']].forEach(([count, char]) => {
            if (count > 0) {
                errors.push({
                    from: window.CodeMirror.Pos(last, 0),
                    to: window.CodeMirror.Pos(last, 0),
                    message: `缺少 ${count} 个 ${char}`,
                    severity: 'error'
                });
            }
        });

        return errors;
    };
}

// 导出
window.CodeMirrorLoader = {
    load: loadCodeMirror,
    getKeywords,
    createHintFunction,
    createLintFunction
};
