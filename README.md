# Scriber

> **Effortless documentation for VitePress and Markdown**

Scriber is a Chrome extension that automatically captures screenshots as you click through a website, then exports them as a ready-to-use documentation guide.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Click-to-Capture**: Automatically takes a screenshot every time you click an element
- **Smart Annotation**: Highlights clicked elements with a professional red circle
- **VitePress Ready**: Exports a `.zip` file with optimized images and a `guide.md` file
- **Privacy First**: All processing happens locally in your browser—no cloud uploads

## 🚀 Installation

### From Chrome Web Store
*Coming soon!*

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the `scriber` folder

## 📖 How to Use

1. Click the **Scriber** icon in your browser toolbar
2. Click **Start Recording**
3. Navigate through your website and click on elements you want to document
4. Click **Stop Recording**
5. Click **Download for VitePress**
6. Unzip the file into your VitePress project

## 🎯 Perfect For

- Creating step-by-step tutorials
- Bug reporting with visual evidence
- User acceptance testing (UAT) documentation
- Onboarding guides
- Technical documentation

## 🛠️ Tech Stack

- **Manifest V3** (Chrome Extension)
- **Vanilla JavaScript** (No frameworks)
- **JSZip** (For export packaging)

## 📁 Project Structure

```
scriber/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── background.js       # Background service worker
├── content.js          # Content script (injected into pages)
├── content.css         # Visual feedback styles
├── icons/              # Extension icons
└── jszip.min.js        # ZIP library
```

## 🔒 Privacy

Scriber does **not** collect, store, or transmit any data to external servers. All screenshots are processed locally in your browser and stored temporarily until you export them.

Read our full [Privacy Policy](PRIVACY.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

**Amjad M Masoud**

---

⭐ If you find this extension useful, please consider giving it a star on GitHub!
