const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const exportBtn = document.getElementById('exportBtn');
const statusDot = document.getElementById('statusDot');
const stepsCount = document.getElementById('stepsCount');

let isRecording = false;

// Initial state
chrome.storage.local.get(['isRecording', 'capturedSteps'], (result) => {
    isRecording = result.isRecording || false;
    updateUI(isRecording);
    updateCount(result.capturedSteps?.length || 0);
});

// Watch for changes (e.g. captures happening in content script)
chrome.storage.onChanged.addListener((changes) => {
    if (changes.capturedSteps) {
        updateCount(changes.capturedSteps.newValue.length);
    }
});

startBtn.onclick = async () => {
    isRecording = true;
    await chrome.storage.local.set({ isRecording: true, capturedSteps: [] });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "START_RECORDING" });
    chrome.runtime.sendMessage({ action: "START_RECORDING" }); // Tell background to reset

    updateUI(true);
};

stopBtn.onclick = async () => {
    isRecording = false;
    await chrome.storage.local.set({ isRecording: false });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "STOP_RECORDING" });

    updateUI(false);
    exportBtn.style.display = 'block';
};

exportBtn.onclick = async () => {
    const result = await chrome.storage.local.get(['capturedSteps']);
    const steps = result.capturedSteps || [];

    if (steps.length === 0) {
        alert("No steps captured!");
        return;
    }

    generateVitePressExport(steps);
};

function updateUI(recording) {
    if (recording) {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
        exportBtn.style.display = 'none';
        statusDot.classList.add('recording');
    } else {
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        statusDot.classList.remove('recording');
    }
}

function updateCount(count) {
    stepsCount.innerText = `${count} steps captured`;
}

async function generateVitePressExport(steps) {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    let markdown = "# Recording Guide\n\n";

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const fileName = `step-${i + 1}.png`;

        markdown += `## Step ${i + 1}\n\n`;
        markdown += `${step.description}\n\n`;
        markdown += `![${step.description}](./images/${fileName})\n\n`;

        // Add image to ZIP (strip data:image/png;base64, prefix)
        const base64Data = step.screenshot.split(',')[1];
        imgFolder.file(fileName, base64Data, { base64: true });
    }

    zip.file("guide.md", markdown);

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    chrome.downloads.download({
        url: url,
        filename: 'scribe-export.zip'
    });
}

function downloadDataUrl(dataUrl, filename) {
    chrome.downloads.download({
        url: dataUrl,
        filename: filename
    });
}
