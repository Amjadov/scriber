let isRecording = false;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_RECORDING") {
    isRecording = true;
    console.log("Scribe Clone v1.7: Recording started");
    // Start continuous pre-capture
    startPreCapture();
  } else if (request.action === "STOP_RECORDING") {
    isRecording = false;
    console.log("Scribe Clone v1.7: Recording stopped");
    stopPreCapture();
  }
});

// Check recording state on load
chrome.storage.local.get(["isRecording"], (result) => {
  isRecording = result.isRecording || false;
  if (isRecording) {
    startPreCapture();
  }
});

// Continuous pre-capture system
let preCaptureInterval = null;

function startPreCapture() {
  if (preCaptureInterval) return;

  // Capture every 300ms while recording
  preCaptureInterval = setInterval(() => {
    if (isRecording) {
      chrome.runtime.sendMessage({ action: "PRE_CAPTURE" });
    }
  }, 300);

  // Also capture immediately
  chrome.runtime.sendMessage({ action: "PRE_CAPTURE" });
  console.log("Scribe Clone v1.7: Continuous pre-capture started");
}

function stopPreCapture() {
  if (preCaptureInterval) {
    clearInterval(preCaptureInterval);
    preCaptureInterval = null;
    console.log("Scribe Clone v1.7: Continuous pre-capture stopped");
  }
}

// Process clicks with the pre-captured screenshot
document.addEventListener("click", (event) => {
  if (!isRecording) return;
  if (event.button !== 0) return;

  const { clientX, clientY } = event;
  const element = event.target;

  console.log("Scribe Clone v1.7: Click detected, using latest pre-captured screenshot");

  // Visual feedback
  drawClickCircle(clientX, clientY);

  // Send click data - background will pair it with pre-captured screenshot
  chrome.runtime.sendMessage({
    action: "PROCESS_CLICK",
    data: {
      tagName: element.tagName,
      id: element.id,
      className: element.className,
      text: (element.innerText || element.value || "").substring(0, 50),
      x: clientX,
      y: clientY,
      dpr: window.devicePixelRatio || 1,
      timestamp: Date.now(),
      path: getElementPath(element)
    }
  });

}, true);

function drawClickCircle(x, y) {
  const circle = document.createElement("div");
  circle.className = "scribe-click-circle";
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  document.body.appendChild(circle);
  setTimeout(() => circle.remove(), 1000);
}

function getElementPath(el) {
  const path = [];
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
      path.unshift(selector);
      break;
    } else {
      let sib = el, nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      if (nth != 1) selector += ":nth-of-type(" + nth + ")";
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(" > ");
}
