let steps = [];
let preCapturedScreenshot = null;
const APP_NAME = chrome.runtime.getManifest().name;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "PRE_CAPTURE") {
        // Capture screenshot immediately on mousedown
        chrome.tabs.captureVisibleTab(null, { format: "png" }).then(screenshot => {
            preCapturedScreenshot = screenshot;
            console.log(`${APP_NAME}: Pre-capture stored`);
        }).catch(err => {
            console.error("Pre-capture failed:", err);
        });
    }

    if (request.action === "PROCESS_CLICK") {
        // Use the pre-captured screenshot
        if (preCapturedScreenshot) {
            handleCapture(preCapturedScreenshot, request.data, sender.tab.id);
            preCapturedScreenshot = null; // Clear after use
        } else {
            console.log(`${APP_NAME}: No pre-captured screenshot available`);
        }
    }

    if (request.action === "START_RECORDING") {
        steps = [];
        preCapturedScreenshot = null;
        chrome.storage.local.set({ capturedSteps: [] });
    }
});

async function handleCapture(screenshot, elementData, tabId) {
    try {
        const dpr = elementData.dpr || 1;
        const processedScreenshot = await drawCircleOnImage(screenshot, elementData.x, elementData.y, dpr);

        const step = {
            ...elementData,
            screenshot: processedScreenshot,
            description: generateDescription(elementData)
        };

        steps.push(step);
        chrome.storage.local.set({ capturedSteps: steps });
        console.log(`${APP_NAME}: Step saved -`, step.description);
    } catch (error) {
        console.error("Capture processing failed:", error);
    }
}

async function drawCircleOnImage(dataUrl, x, y, dpr) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const imgBitmap = await createImageBitmap(blob);

    const canvas = new OffscreenCanvas(imgBitmap.width, imgBitmap.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imgBitmap, 0, 0);

    // Scale coordinates by device pixel ratio
    const scaledX = x * dpr;
    const scaledY = y * dpr;
    const radius = 40 * dpr;
    const outerRadius = 45 * dpr;
    const lineWidth = 8 * dpr;
    const outerLineWidth = 15 * dpr;

    // Draw red circle at scaled position
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ff4757";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Outer glow
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, outerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 71, 87, 0.3)";
    ctx.lineWidth = outerLineWidth;
    ctx.stroke();

    const processedBlob = await canvas.convertToBlob({ type: "image/png" });
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(processedBlob);
    });
}

function generateDescription(data) {
    const name = data.text || data.id || data.tagName;
    return `Clicked on ${data.tagName.toLowerCase()} "${name.trim()}"`;
}
