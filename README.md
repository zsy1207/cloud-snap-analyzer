# 拍照识云 (Cloud Snap Analyzer)

一个基于大模型的云识别系统，支持多种主流大模型API，能够智能分析云的类型、特征、形成机制，并预测天气。本项目采用简洁直观的界面设计，支持中英文切换，适合气象爱好者和学习者使用。

## 功能特点

- 多种图片上传方式：
  - 点击/拖拽上传
  - 剪贴板直接粘贴
  - 实时图片预览
- 多模型支持：
  - Google Gemini-2.0-flash-exp
  - OpenAI GPT-4o-mini
  - Claude-3-sonnet-20240229
- API管理：
  - API密钥实时验证
  - 密钥显示切换
  - 连接状态检测
  - 一键获取API链接
  - 本地密钥存储
- 界面设计：
  - 中英文界面切换
  - 中英文分析结果
  - 响应式布局
  - 现代化UI设计
  - Markdown格式结果展示

## 安装步骤

1. 确保系统环境：
   - Python 3.8或更高版本
   - pip包管理器
   - Git（可选，用于克隆项目）

2. 克隆项目：
```bash
git clone [项目地址]
cd cloud-identifier
```

3. 创建虚拟环境：
```bash
# Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1

# Windows CMD
python -m venv venv
venv\Scripts\activate.bat

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

4. 安装依赖包：
```bash
# 更新pip
python -m pip install --upgrade pip

# 安装依赖
pip install -r requirements.txt

# 依赖包说明：
# flask==3.0.0          - Web框架
# pillow==10.1.0        - 图像处理
# google-generativeai==0.3.2  - Gemini API
# openai==1.12.0        - OpenAI API
# anthropic==0.8.1      - Claude API
# requests==2.31.0      - HTTP请求
# python-dotenv==1.0.0  - 环境变量管理
```

## API配置指南

### Gemini API（免费）配置：
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey) 获取密钥
2. 登录Google账号（需要科学上网）
3. 点击右上角"Get API key"
4. 选择"Create API key in new project"
5. 复制生成的API密钥
6. （可选）在API密钥管理页面设置使用限制


### OpenAI API配置：
1. 访问 [OpenAI Platform](https://platform.openai.com/) 获取密钥
2. 注册/登录OpenAI账号（需要科学上网）
3. 点击右上角头像 -> "View API keys"
4. 点击"Create new secret key"
5. 添加密钥描述（可选）
6. 复制生成的API密钥（注意：只显示一次）

注意事项：
- 需要付费使用（预付费模式）
- 建议设置使用限额
- 请妥善保管密钥
- 支持信用卡和借记卡

### Claude API配置：
1. 访问 [Anthropic Console](https://console.anthropic.com/account/keys) 获取密钥
2. 注册/登录Anthropic账号（需要企业邮箱）
3. 点击"Create Key"
4. 设置密钥名称和权限
5. 复制生成的API密钥

注意事项：
- 需要企业邮箱注册
- 按使用量计费
- 支持高级图像分析
- 需要信用卡验证

## 使用说明

1. 启动应用：
```bash
# 确保在虚拟环境中
python app.py
```

2. 访问网址：
```
http://localhost:5000
```

3. 使用步骤：
   - 选择界面语言（中/英）
   - 选择AI模型（Gemini/OpenAI/Claude）
   - 点击API链接获取密钥
   - 输入对应的API密钥（会自动保存）
   - 点击"测试"验证API连接
   - 上传云的图片（支持拖拽或粘贴）
   - 点击"开始分析"
   - 查看分析结果（结果语言跟随界面语言）

4. 分析结果包含：
   - 云的具体类型
   - 特征分析说明
   - 云的形成机制
   - 典型特点描述
   - 相关天气预测

## 使用技巧

1. API密钥管理：
   - 建议使用环境变量管理密钥
   - 定期更新密钥提高安全性
   - 使用前先测试API连接
   - 可以随时切换显示/隐藏密钥
   - 选择不同模型会显示对应的API获取链接
   - API密钥会自动保存在本地浏览器中

2. 图片上传：
   - 推荐使用清晰的白天照片
   - 避免过度处理的图片
   - 确保云层在画面中清晰可见
   - 图片大小建议不超过5MB
   - 支持直接从其他应用复制图片后粘贴
   - 支持手机拍照直接上传

3. 语言切换：
   - 界面默认使用中文
   - 语言设置会被保存
   - 分析结果会跟随界面语言
   - 可以随时切换语言重新分析

4. 分析效果优化：
   - 选择合适的拍摄角度
   - 避免逆光拍摄
   - 保持图片原始比例
   - 可以尝试不同模型比较结果
   - Claude模型对细节分析较好
   - Gemini模型响应速度快
   - OpenAI模型准确度高

## 常见问题

1. API相关：
   - "API key not valid"
     - 检查密钥是否正确输入
     - 确认密钥未过期
     - 验证账户余额充足
     - 检查是否需要科学上网
   
   - "Connection failed"
     - 检查网络连接
     - 确认API服务可用
     - 尝试重新测试连接
     - 检查防火墙设置

2. 图片上传：
   - 上传失败
     - 检查图片格式（支持JPG/PNG/WEBP）
     - 确认图片大小适中（<5MB）
     - 尝试不同的上传方式
     - 检查浏览器版本
   
   - 预览不显示
     - 刷新页面重试
     - 检查浏览器兼容性
     - 清除浏览器缓存
     - 更新浏览器版本

3. 分析结果：
   - 结果不准确
     - 提供更清晰的图片
     - 尝试切换AI模型
     - 确保图片中云层明显
     - 避免复杂背景
   
   - 分析超时
     - 检查网络状态
     - 确认API服务正常
     - 可以稍后重试
     - 尝试压缩图片

## 技术栈

### 前端：
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- Marked.js（Markdown渲染）

### 后端：
- Python 3.8+
- Flask
- Pillow
- Google Generative AI
- OpenAI
- Anthropic

## 许可证

MIT License# cloud-snap-analyzer
