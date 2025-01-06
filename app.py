from flask import Flask, render_template, request, jsonify
import os
import google.generativeai as genai
from PIL import Image
import io
import base64
from openai import OpenAI
import requests
import anthropic

app = Flask(__name__)

def test_gemini_api(api_key):
    """测试Gemini API密钥是否有效"""
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content("Test connection")
        return True, "API连接成功"
    except Exception as e:
        return False, f"Gemini API错误: {str(e)}"

def test_openai_api(api_key):
    """测试OpenAI API密钥是否有效"""
    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "Test connection"}],
            max_tokens=5
        )
        return True, "API连接成功"
    except Exception as e:
        return False, f"OpenAI API错误: {str(e)}"

def test_claude_api(api_key):
    """测试Claude API密钥是否有效"""
    try:
        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=5,
            messages=[{"role": "user", "content": "Test connection"}]
        )
        return True, "API连接成功"
    except Exception as e:
        return False, f"Claude API错误: {str(e)}"

@app.route('/test_api', methods=['POST'])
def test_api():
    """测试API密钥是否有效"""
    model = request.form.get('model')
    api_key = request.form.get('api_key')
    
    if not api_key:
        return jsonify({'success': False, 'message': '请提供API密钥'}), 400
    
    if model == 'gemini':
        success, message = test_gemini_api(api_key)
    elif model == 'openai':
        success, message = test_openai_api(api_key)
    elif model == 'claude':
        success, message = test_claude_api(api_key)
    else:
        return jsonify({'success': False, 'message': '不支持的模型类型'}), 400
    
    return jsonify({
        'success': success,
        'message': message
    })

# 中文prompt模板
CLOUD_ANALYSIS_PROMPT_ZH = """作为一位专业的气象学者，请判断这张云的图片所属云的类型，
并请用简单易懂的语言分析这张云的图片，帮助初学者理解云的特征和形成过程。
如果图片没有云，则输出“糟糕，没能识别到云”，
如果有云，请按以下格式输出(除以下内容外，不要输出别的内容)：

## 云的类型
[云的具体类型名称，加粗]

## 特征分析
[用通俗易懂的语言列出关键特征，解释为什么属于这种类型]

## 形成机制
[简单解释这种云是如何形成的，包括温度、湿度、气流等关键因素]

## 典型特点
[描述这种云的主要特点，使用生动的比喻帮助理解]

## 天气预测
[相关的天气预测信息，以及对日常生活的影响]

注意：若图片中出现多种云，请各自说明，请使用细致、通俗易懂的科普语言，必要时对专业概念进行解释。"""

# 英文prompt模板
CLOUD_ANALYSIS_PROMPT_EN = """As a professional meteorologist, please analyze this cloud image and help beginners understand its characteristics and formation process using simple language. Please format your response as follows:

## Cloud Type
[Specific cloud type name, in bold]

## Characteristic Analysis
[List key features in easy-to-understand language, explaining why it belongs to this type]

## Formation Mechanism
[Simple explanation of how this cloud forms, including temperature, humidity, and air flow factors]

## Typical Features
[Describe the main characteristics, using vivid metaphors for better understanding]

## Weather Prediction
[Related weather forecast information and its impact on daily life]

Note: If multiple cloud types are present in the image, please explain each one. Use clear, educational language and explain technical concepts when necessary."""

def analyze_with_gemini(image, api_key, lang='zh'):
    """使用Gemini API分析云图"""
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        prompt = CLOUD_ANALYSIS_PROMPT_ZH if lang == 'zh' else CLOUD_ANALYSIS_PROMPT_EN
        response = model.generate_content([prompt, image])
        return response.text
    except Exception as e:
        raise Exception(f"Gemini API错误: {str(e)}")

def analyze_with_openai(image, api_key, lang='zh'):
    """使用OpenAI API分析云图"""
    try:
        client = OpenAI(api_key=api_key)
        prompt = CLOUD_ANALYSIS_PROMPT_ZH if lang == 'zh' else CLOUD_ANALYSIS_PROMPT_EN
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_to_base64(image)}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        raise Exception(f"OpenAI API错误: {str(e)}")

def analyze_with_claude(image, api_key, lang='zh'):
    """使用Claude API分析云图"""
    try:
        client = anthropic.Anthropic(api_key=api_key)
        prompt = CLOUD_ANALYSIS_PROMPT_ZH if lang == 'zh' else CLOUD_ANALYSIS_PROMPT_EN
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        },
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": image_to_base64(image)
                            }
                        }
                    ]
                }
            ]
        )
        return response.content[0].text
    except Exception as e:
        raise Exception(f"Claude API错误: {str(e)}")

def image_to_base64(image):
    """将PIL Image对象转换为base64字符串"""
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': '没有上传图片'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': '没有选择图片'}), 400
    
    model = request.form.get('model', 'gemini')
    api_key = request.form.get('api_key')
    lang = request.form.get('lang', 'zh')
    
    if not api_key:
        return jsonify({'error': '请提供API密钥'}), 400
    
    try:
        # 读取和处理图片
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # 根据选择的模型调用相应的API
        if model == 'gemini':
            result = analyze_with_gemini(image, api_key, lang)
        elif model == 'openai':
            result = analyze_with_openai(image, api_key, lang)
        elif model == 'claude':
            result = analyze_with_claude(image, api_key, lang)
        else:
            return jsonify({'error': '不支持的模型类型'}), 400
        
        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)