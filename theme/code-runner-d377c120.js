/**
 * 代码运行器 - 使用 Piston API
 * 支持 C、C++、Python、Assembly 等语言
 */

// 语言配置映射
const LANGUAGE_CONFIG = {
    'c': {
        pistonLang: 'c',
        codemirrorMode: 'text/x-csrc',
        name: 'C',
        version: '*'
    },
    'cpp': {
        pistonLang: 'cpp',
        codemirrorMode: 'text/x-c++src',
        name: 'C++',
        version: '*'
    },
    'c++': {
        pistonLang: 'cpp',
        codemirrorMode: 'text/x-c++src',
        name: 'C++',
        version: '*'
    },
    'python': {
        pistonLang: 'python3',
        codemirrorMode: 'python',
        name: 'Python 3',
        version: '*'
    },
    'py': {
        pistonLang: 'python3',
        codemirrorMode: 'python',
        name: 'Python 3',
        version: '*'
    },
    'assembly': {
        pistonLang: 'nasm',
        codemirrorMode: 'gas',
        name: 'x86-64 Assembly',
        version: '*'
    },
    'asm': {
        pistonLang: 'nasm',
        codemirrorMode: 'gas',
        name: 'x86-64 Assembly',
        version: '*'
    },
    'x86': {
        pistonLang: 'nasm',
        codemirrorMode: 'gas',
        name: 'x86-64 Assembly',
        version: '*'
    },
    'x86-64': {
        pistonLang: 'nasm',
        codemirrorMode: 'gas',
        name: 'x86-64 Assembly',
        version: '*'
    }
};

// Piston API 端点
const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

/**
 * 检测代码块的语言
 * 返回语言代码，如果没有语言标记则返回 null
 */
function detectLanguage(codeBlock) {
    const classList = codeBlock.classList;
    
    // mdbook 会在代码块上添加语言类，如 'language-c', 'language-python'
    for (let className of classList) {
        if (className.startsWith('language-')) {
            const lang = className.replace('language-', '').toLowerCase();
            return LANGUAGE_CONFIG[lang] ? lang : null; // 如果不在支持列表中，返回 null
        }
    }
    
    return null; // 没有语言标记，返回 null
}

/**
 * 使用 Piston API 执行代码
 */
async function runCode(code, language) {
    const config = LANGUAGE_CONFIG[language];
    if (!config) {
        throw new Error(`不支持的语言: ${language}`);
    }

    try {
        const response = await fetch(PISTON_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: config.pistonLang,
                version: config.version,
                files: [{
                    content: code
                }],
                stdin: '',
                args: []
            })
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const result = await response.json();
        
        return {
            stdout: result.run.stdout || '',
            stderr: result.run.stderr || '',
            output: result.run.output || '',
            code: result.run.code || 0,
            language: config.name
        };
    } catch (error) {
        throw new Error(`执行代码时出错: ${error.message}`);
    }
}

/**
 * 显示执行结果
 */
function showResult(resultContainer, result) {
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'block';

    const resultDiv = document.createElement('div');
    resultDiv.className = 'code-result';

    // 状态指示器
    const statusDiv = document.createElement('div');
    statusDiv.className = result.code === 0 ? 'result-success' : 'result-error';
    statusDiv.textContent = result.code === 0 ? '✓ 执行成功' : '✗ 执行失败';
    resultDiv.appendChild(statusDiv);

    // 标准输出
    if (result.stdout) {
        const stdoutDiv = document.createElement('div');
        stdoutDiv.className = 'result-output';
        stdoutDiv.innerHTML = `<strong>输出：</strong><pre>${escapeHtml(result.stdout)}</pre>`;
        resultDiv.appendChild(stdoutDiv);
    }

    // 标准错误
    if (result.stderr) {
        const stderrDiv = document.createElement('div');
        stderrDiv.className = 'result-error-output';
        stderrDiv.innerHTML = `<strong>错误：</strong><pre>${escapeHtml(result.stderr)}</pre>`;
        resultDiv.appendChild(stderrDiv);
    }

    // 如果没有输出也没有错误，显示提示
    if (!result.stdout && !result.stderr) {
        const noOutputDiv = document.createElement('div');
        noOutputDiv.className = 'result-no-output';
        noOutputDiv.textContent = '程序执行完成，但没有输出。';
        resultDiv.appendChild(noOutputDiv);
    }

    resultContainer.appendChild(resultDiv);
}

/**
 * 显示错误信息
 */
function showError(resultContainer, errorMessage) {
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'block';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'code-result result-error';
    errorDiv.innerHTML = `<div class="result-error">✗ 错误</div><pre>${escapeHtml(errorMessage)}</pre>`;
    resultContainer.appendChild(errorDiv);
}

/**
 * HTML 转义
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 打开代码编辑器
 */
function openEditor(code, language) {
    const config = LANGUAGE_CONFIG[language];
    if (!config) {
        alert(`不支持的语言: ${language}`);
        return;
    }

    // 创建编辑器模态框
    const modal = document.createElement('div');
    modal.className = 'code-editor-modal';
    modal.innerHTML = `
        <div class="code-editor-container">
            <div class="code-editor-header">
                <span>编辑代码 (${config.name})</span>
                <button class="close-editor-btn" onclick="this.closest('.code-editor-modal').remove()">×</button>
            </div>
            <div class="code-editor-wrapper">
                <textarea id="code-editor-textarea" class="code-editor-textarea">${escapeHtml(code)}</textarea>
            </div>
            <div class="code-editor-footer">
                <button class="run-editor-btn" onclick="runEditorCode('${language}')">▶ 运行代码</button>
                <button class="close-editor-btn" onclick="this.closest('.code-editor-modal').remove()">关闭</button>
            </div>
            <div class="code-editor-result"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // 简单的代码编辑器（可以后续集成 CodeMirror）
    const textarea = modal.querySelector('#code-editor-textarea');
    textarea.style.width = '100%';
    textarea.style.height = '400px';
    textarea.style.fontFamily = 'monospace';
    textarea.style.fontSize = '14px';
    textarea.style.padding = '10px';
    textarea.style.border = '1px solid #ddd';
    textarea.style.borderRadius = '4px';
}

/**
 * 运行编辑器中的代码
 */
window.runEditorCode = async function(language) {
    const modal = document.querySelector('.code-editor-modal');
    const textarea = modal.querySelector('#code-editor-textarea');
    const resultContainer = modal.querySelector('.code-editor-result');
    const runButton = modal.querySelector('.run-editor-btn');

    const code = textarea.value;
    
    runButton.disabled = true;
    runButton.textContent = '运行中...';

    try {
        const result = await runCode(code, language);
        showResult(resultContainer, result);
    } catch (error) {
        showError(resultContainer, error.message);
    } finally {
        runButton.disabled = false;
        runButton.textContent = '▶ 运行代码';
    }
};

/**
 * 自动调整 textarea 高度
 */
function autoResizeTextarea(textarea) {
    // 重置高度以获取正确的 scrollHeight
    textarea.style.height = 'auto';
    // 计算内容高度（包括 padding）
    const scrollHeight = textarea.scrollHeight;
    // 设置最小高度，确保至少显示一行
    const minHeight = 60;
    // 设置高度为内容高度，但不小于最小高度
    textarea.style.height = Math.max(scrollHeight, minHeight) + 'px';
    // 确保没有滚动条
    textarea.style.overflow = 'hidden';
}

/**
 * 将代码块转换为可编辑的 textarea
 */
function makeCodeBlockEditable(codeBlock, language) {
    const preElement = codeBlock.parentElement;
    const code = codeBlock.textContent;
    
    // 标记为已处理
    preElement.classList.add('code-block-editable');
    
    // 创建 textarea 替换 code 元素
    const textarea = document.createElement('textarea');
    textarea.className = 'editable-code';
    textarea.value = code;
    textarea.setAttribute('data-language', language);
    
    // 复制代码块的样式
    const computedStyle = window.getComputedStyle(codeBlock);
    textarea.style.fontFamily = computedStyle.fontFamily || '"Fira Code", Consolas, Monaco, "Courier New", monospace';
    textarea.style.fontSize = computedStyle.fontSize || '14px';
    textarea.style.lineHeight = computedStyle.lineHeight || '1.6';
    
    // 等待 DOM 更新后调整高度
    setTimeout(() => {
        autoResizeTextarea(textarea);
    }, 0);
    
    // 监听输入，自动调整高度
    textarea.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        autoResizeTextarea(textarea);
    });
    
    // 替换 code 元素
    codeBlock.replaceWith(textarea);
    
    return textarea;
}

/**
 * 初始化代码运行器
 */
function initCodeRunner() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
        // 跳过已经有运行器的代码块
        if (codeBlock.parentElement.querySelector('.code-runner-buttons')) {
            return;
        }

        const language = detectLanguage(codeBlock);
        
        // 如果没有语言标记（纯文本代码块），跳过处理
        if (!language) {
            return;
        }
        
        const config = LANGUAGE_CONFIG[language];

        if (!config) {
            return; // 不支持的语言，跳过
        }

        // 将代码块转换为可编辑的 textarea
        const textarea = makeCodeBlockEditable(codeBlock, language);
        
        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'code-runner-buttons';

        // 运行按钮
        const runButton = document.createElement('button');
        runButton.className = 'run-code-btn';
        runButton.textContent = '▶ 运行代码';
        runButton.onclick = async function() {
            runButton.disabled = true;
            runButton.textContent = '运行中...';

            // 获取当前代码
            const code = textarea.value;

            // 创建结果显示容器
            let resultContainer = textarea.parentElement.querySelector('.code-result-container');
            if (!resultContainer) {
                resultContainer = document.createElement('div');
                resultContainer.className = 'code-result-container';
                textarea.parentElement.appendChild(resultContainer);
            }

            try {
                const result = await runCode(code, language);
                showResult(resultContainer, result);
            } catch (error) {
                showError(resultContainer, error.message);
            } finally {
                runButton.disabled = false;
                runButton.textContent = '▶ 运行代码';
            }
        };

        buttonContainer.appendChild(runButton);

        // 检查是否是练习题页面，如果是则添加"显示参考答案"按钮
        const exerciseCard = textarea.closest('.exercise-card');
        if (exerciseCard) {
            // 找到对应的参考答案（通过查找最近的 exercise-card 中的 exercise-answer）
            const exerciseAnswer = exerciseCard.querySelector('.exercise-answer');
            if (exerciseAnswer) {
                const answerButton = document.createElement('button');
                answerButton.className = 'show-answer-btn';
                answerButton.textContent = '📖 显示参考答案';
                answerButton.onclick = function() {
                    const isHidden = exerciseAnswer.style.display === 'none';
                    if (isHidden) {
                        exerciseAnswer.style.display = 'block';
                        answerButton.textContent = '🙈 隐藏参考答案';
                        // 平滑滚动到参考答案位置
                        exerciseAnswer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        exerciseAnswer.style.display = 'none';
                        answerButton.textContent = '📖 显示参考答案';
                    }
                };
                buttonContainer.appendChild(answerButton);
            }
        }

        // 插入到代码块后面
        textarea.parentElement.appendChild(buttonContainer);
    });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeRunner);
} else {
    initCodeRunner();
}

// 监听 mdbook 的页面切换（SPA 应用）
document.addEventListener('mdbook-page-changed', initCodeRunner);

