# Chrome Web Store Listing Details

## Name
Scriber

## Short Description
Capture screenshots on click and export for Markdown.

## Detailed Description
**Effortless Documentation for Markdown**

Scriber is the ultimate tool for developers and technical writers who build documentation with Markdown. Instead of manually taking screenshots, cropping them, and writing markdown, Scriber does it all for you as you navigate.

**Key Features:**
*   **Click-to-Capture:** Automatically takes a screenshot every time you click an element on the page.
*   **Smart Annotation:** visually highlights the clicked element with a professional red circle.
*   **VitePress Ready:** Exports a ready-to-use `.zip` file containing optimized images and a `guide.md` file with pre-written Markdown steps.
*   **Privacy First:** All processing happens locally in your browser. No data is sent to the cloud.

**How to Use:**
1.  Click "Start Recording" in the popup.
2.  Navigate through your website and perform the actions you want to document.
3.  Click "Stop Recording".
4.  Download the zip file and unzip it into your VitePress project.

**Perfect for:**
*   Creating step-by-step tutorials
*   Bug reporting
*   User acceptance testing (UAT) documentation
*   Onboarding guides

---

## Privacy Policy & Data Disclosure

**1. Data Collection:**
Scriber does **not** collect, store, or transmit any personal data, usage analytics, or screenshot data to external servers. All data is stored locally within your browser's storage (`chrome.storage.local`) while you are recording.

**2. Data Usage:**
The screenshots and click metadata are used solely for the purpose of generating the downloadable documentation package. This data is cleared from memory when you start a new recording or remove the extension.

**3. Third-Party Sharing:**
We do not share any data with third parties.

**4. Permissions:**
*   `activeTab`: Required to capture screenshots of the active tab when you click "Start Recording".
*   `scripting`: Required to inject the visual click indicator (red circle) into the page.
*   `storage`: Required to temporarily save your steps before export.
*   `downloads`: Required to save the final `.zip` file to your computer.

---

## Single Purpose Justification (for Chrome Web Store Review)

**Purpose:**  
The "Scriber" extension allows users to create automated step-by-step documentation guides by recording their interactions on web pages.

**Justification for Permissions:**
*   **`activeTab`**: The extension captures screenshots of the currently active tab when the user explicitly clicks "Start Recording". This permission is only used on tabs where the user has activated the extension.
*   **`scripting`**: Needed to inject the visual "click indicator" (red circle) into the page to show the user where they clicked in the final screenshot.
*   **`storage`**: Temporarily stores captured steps in local browser storage until the user exports them.
*   **`downloads`**: Allows the user to download their documentation package as a `.zip` file.
