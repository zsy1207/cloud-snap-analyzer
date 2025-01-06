 # Cloud Snap Analyzer

A cloud recognition system powered by multiple leading AI models, capable of intelligently analyzing cloud types, characteristics, formation mechanisms, and weather predictions. This project features a clean and intuitive interface design with bilingual support, perfect for weather enthusiasts and learners.

## Features

- Multiple Image Upload Methods:
  - Click/Drag & Drop Upload
  - Clipboard Direct Paste
  - Real-time Image Preview
- Multiple Model Support:
  - Google Gemini-2.0-flash-exp
  - OpenAI GPT-4o-mini
  - Claude-3-sonnet-20240229
- API Management:
  - Real-time API Key Validation
  - Key Display Toggle
  - Connection Status Detection
  - One-click API Key Access
  - Local Key Storage
- Interface Design:
  - Chinese/English Interface Switch
  - Bilingual Analysis Results
  - Responsive Layout
  - Modern UI Design
  - Markdown Format Results

## Installation

1. System Requirements:
   - Python 3.8 or higher
   - pip package manager
   - Git (optional, for cloning project)

2. Clone Project:
```bash
git clone [project-url]
cd cloud-identifier
```

3. Create Virtual Environment:
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

4. Install Dependencies:
```bash
# Update pip
python -m pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

# Package Details:
# flask==3.0.0          - Web framework
# pillow==10.1.0        - Image processing
# google-generativeai==0.3.2  - Gemini API
# openai==1.12.0        - OpenAI API
# anthropic==0.8.1      - Claude API
# requests==2.31.0      - HTTP requests
# python-dotenv==1.0.0  - Environment variable management
```

## API Configuration Guide

### Gemini API (Free) Setup:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get API key
2. Login with Google account (VPN might be required)
3. Click "Get API key" in the top right
4. Select "Create API key in new project"
5. Copy the generated API key
6. (Optional) Set usage limits in API key management page

Note:
- Free tier available for new users
- Credit card binding required for first use
- Usage limits recommended
- Available in most regions

### OpenAI API Setup:
1. Visit [OpenAI Platform](https://platform.openai.com/) to get API key
2. Register/Login to OpenAI account (VPN might be required)
3. Click profile icon -> "View API keys"
4. Click "Create new secret key"
5. Add key description (optional)
6. Copy the generated API key (shown only once)

Note:
- Paid service (prepaid model)
- Usage limits recommended
- Secure key storage important
- Credit/Debit cards supported

### Claude API Setup:
1. Visit [Anthropic Console](https://console.anthropic.com/account/keys) to get API key
2. Register/Login to Anthropic account (business email required)
3. Click "Create Key"
4. Set key name and permissions
5. Copy the generated API key

Note:
- Business email required
- Usage-based billing
- Advanced image analysis support
- Credit card verification required

## Usage Instructions

1. Start Application:
```bash
# Ensure virtual environment is activated
python app.py
```

2. Access Website:
```
http://localhost:5000
```

3. Usage Steps:
   - Select interface language (Chinese/English)
   - Choose AI model (Gemini/OpenAI/Claude)
   - Click API link to get key
   - Enter corresponding API key (auto-saved)
   - Click "Test" to verify API connection
   - Upload cloud image (drag & drop or paste supported)
   - Click "Analyze"
   - View results (language follows interface setting)

4. Analysis Results Include:
   - Cloud Type
   - Characteristic Analysis
   - Formation Mechanism
   - Typical Features
   - Weather Prediction

## Usage Tips

1. API Key Management:
   - Environment variables recommended for key management
   - Regular key updates for security
   - Test API connection before use
   - Toggle key display/hide anytime
   - Different models show corresponding API links
   - API keys auto-saved in local browser

2. Image Upload:
   - Clear daytime photos recommended
   - Avoid over-processed images
   - Ensure clear cloud visibility
   - Image size under 5MB recommended
   - Direct paste from other apps supported
   - Mobile photo upload supported

3. Language Switch:
   - Chinese interface by default
   - Language preference saved
   - Analysis results follow interface language
   - Switch language anytime for re-analysis

4. Analysis Optimization:
   - Choose appropriate shooting angle
   - Avoid backlight
   - Maintain original image ratio
   - Try different models for comparison
   - Claude: Best for detailed analysis
   - Gemini: Fast response
   - OpenAI: High accuracy

## Common Issues

1. API Related:
   - "API key not valid"
     - Check key input accuracy
     - Verify key expiration
     - Check account balance
     - Check VPN requirement
   
   - "Connection failed"
     - Check network connection
     - Verify API service status
     - Try reconnecting
     - Check firewall settings

2. Image Upload:
   - Upload Failed
     - Check image format (JPG/PNG/WEBP supported)
     - Verify image size (<5MB)
     - Try alternative upload methods
     - Check browser version
   
   - Preview Not Showing
     - Refresh page
     - Check browser compatibility
     - Clear browser cache
     - Update browser

3. Analysis Results:
   - Inaccurate Results
     - Provide clearer image
     - Try different AI model
     - Ensure clear cloud visibility
     - Avoid complex backgrounds
   
   - Analysis Timeout
     - Check network status
     - Verify API service status
     - Retry later
     - Try compressing image

## Tech Stack

### Frontend:
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- Marked.js (Markdown rendering)

### Backend:
- Python 3.8+
- Flask
- Pillow
- Google Generative AI
- OpenAI
- Anthropic

## License

MIT License