document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const uploadForm = document.getElementById('uploadForm');
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const previewImage = document.getElementById('previewImage');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const togglePassword = document.getElementById('togglePassword');
    const testApiBtn = document.getElementById('testApi');
    const analyzeBtn = document.querySelector('.analyze-btn');
    const apiStatus = document.getElementById('apiStatus');

    // API密钥本地存储
    const API_KEYS_STORAGE_KEY = 'cloud_analyzer_api_keys';
    let apiKeys = JSON.parse(localStorage.getItem(API_KEYS_STORAGE_KEY) || '{}');

    // API链接切换
    const modelRadios = document.querySelectorAll('input[name="model"]');
    const apiLinks = {
        gemini: document.querySelector('.gemini-link'),
        openai: document.querySelector('.openai-link'),
        claude: document.querySelector('.claude-link')
    };

    // 加载保存的API密钥
    function loadApiKey(model) {
        const savedKey = apiKeys[model];
        if (savedKey) {
            apiKeyInput.value = savedKey;
            testApiBtn.disabled = false;
            updateAnalyzeButton();
        } else {
            apiKeyInput.value = '';
            testApiBtn.disabled = true;
            updateAnalyzeButton();
        }
    }

    // 保存API密钥
    function saveApiKey(model, key) {
        apiKeys[model] = key;
        localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(apiKeys));
    }

    // 更新API状态显示
    function updateApiStatus(status, message) {
        apiStatus.className = 'api-status ' + status;
        if (status === 'loading') {
            apiStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        } else if (status === 'success') {
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (status === 'error') {
            apiStatus.innerHTML = '<i class="fas fa-times-circle"></i>';
        } else {
            apiStatus.innerHTML = '';
        }
    }

    // 监听模型切换
    modelRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // 隐藏所有链接
            Object.values(apiLinks).forEach(link => {
                if (link) link.style.display = 'none';
            });
            // 显示选中模型的链接
            const selectedLink = apiLinks[this.value];
            if (selectedLink) selectedLink.style.display = 'inline';
            // 加载对应的API密钥
            loadApiKey(this.value);
            // 清除状态
            updateApiStatus('');
        });
    });

    // 初始显示Gemini链接和密钥
    Object.values(apiLinks).forEach(link => {
        if (link) link.style.display = 'none';
    });
    if (apiLinks.gemini) apiLinks.gemini.style.display = 'inline';
    loadApiKey('gemini');

    // 语言切换
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            document.documentElement.setAttribute('data-lang', lang);
            localStorage.setItem('lang', lang);
            updateLanguage();
            
            // 更新按钮状态
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 加载保存的语言设置或默认使用中文
    const currentLang = localStorage.getItem('lang') || 'zh';
    document.documentElement.setAttribute('data-lang', currentLang);
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });
    updateLanguage();

    // 更新页面语言
    function updateLanguage() {
        const currentLang = document.documentElement.getAttribute('data-lang');
        document.querySelectorAll('.translate').forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
    }

    // 监听API密钥输入
    apiKeyInput.addEventListener('input', function() {
        const hasKey = this.value.trim() !== '';
        testApiBtn.disabled = !hasKey;
        updateAnalyzeButton();
        // 清除状态
        updateApiStatus('');
    });

    // 监听图片选择
    imageInput.addEventListener('change', function() {
        updateAnalyzeButton();
    });

    // 更新分析按钮状态
    function updateAnalyzeButton() {
        const hasKey = apiKeyInput.value.trim() !== '';
        const hasImage = imageInput.files.length > 0;
        analyzeBtn.disabled = !hasKey || !hasImage;
    }

    // 处理API密钥显示/隐藏
    togglePassword.addEventListener('click', function() {
        const type = apiKeyInput.getAttribute('type') === 'password' ? 'text' : 'password';
        apiKeyInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // 测试API连接
    testApiBtn.addEventListener('click', async function() {
        const apiKey = apiKeyInput.value.trim();
        const model = document.querySelector('input[name="model"]:checked').value;
        
        if (!apiKey) {
            updateApiStatus('error');
            return;
        }

        testApiBtn.disabled = true;
        updateApiStatus('loading');

        try {
            const formData = new FormData();
            formData.append('model', model);
            formData.append('api_key', apiKey);

            const response = await fetch('/test_api', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                updateApiStatus('success');
                saveApiKey(model, apiKey);
            } else {
                updateApiStatus('error');
            }
        } catch (error) {
            updateApiStatus('error');
            console.error('Error:', error);
        } finally {
            testApiBtn.disabled = false;
        }
    });

    // 处理拖放上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });

    // 处理点击上传
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // 处理文件选择
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    });

    // 处理粘贴上传
    document.addEventListener('paste', (e) => {
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                handleImageFile(file);
                break;
            }
        }
    });

    // 统一处理图片文件
    function handleImageFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                preview.style.display = 'block';
                result.style.display = 'none';
            }
            reader.readAsDataURL(file);
            imageInput.files = new DataTransfer().files;
            const transfer = new DataTransfer();
            transfer.items.add(file);
            imageInput.files = transfer.files;
            updateAnalyzeButton();
        }
    }

    // 处理表单提交
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const file = imageInput.files[0];
        if (!file) {
            showAlert(document.documentElement.getAttribute('data-lang') === 'zh' ? 
                '请选择一张图片' : 'Please select an image', 'warning');
            return;
        }

        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            showAlert(document.documentElement.getAttribute('data-lang') === 'zh' ? 
                '请输入API密钥' : 'Please enter API key', 'warning');
            return;
        }

        // 显示加载动画
        loading.style.display = 'block';
        result.style.display = 'none';
        analyzeBtn.disabled = true;

        // 创建FormData对象
        const formData = new FormData();
        formData.append('image', file);
        formData.append('model', document.querySelector('input[name="model"]:checked').value);
        formData.append('api_key', apiKey);
        formData.append('lang', document.documentElement.getAttribute('data-lang'));

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                // 使用marked渲染Markdown
                resultText.innerHTML = marked.parse(data.result);
                result.style.display = 'block';
                result.scrollIntoView({ behavior: 'smooth' });
            } else {
                showAlert(data.error || (document.documentElement.getAttribute('data-lang') === 'zh' ? 
                    '分析失败，请重试' : 'Analysis failed, please try again'), 'danger');
            }
        } catch (error) {
            showAlert(document.documentElement.getAttribute('data-lang') === 'zh' ? 
                '发生错误，请重试' : 'An error occurred, please try again', 'danger');
            console.error('Error:', error);
        } finally {
            loading.style.display = 'none';
            analyzeBtn.disabled = false;
        }
    });

    // 显示警告信息
    function showAlert(message, type = 'danger') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const cardBody = document.querySelector('.card-body');
        cardBody.insertBefore(alertDiv, cardBody.firstChild);

        // 3秒后自动消失
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
});