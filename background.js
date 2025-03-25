chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ enabled: false, wasPlaying: false });
});

// Detect when the user switches apps (Alt+Tab, Windows+D)
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  const { enabled, wasPlaying } = await chrome.storage.local.get(["enabled", "wasPlaying"]);
  if (!enabled) return;

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // User switched away from Chrome
    await pauseYouTube();
  } else {
    // Check if the active tab is YouTube before resuming
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch") && wasPlaying) {
      await checkAndResumeYouTube();
    }
  }
});


// Detect when user changes tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const { enabled } = await chrome.storage.local.get(["enabled"]);
  if (!enabled) return;

  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url.includes("youtube.com/watch")) {
    await checkAndResumeYouTube(); // Resume if YouTube was paused
  } else {
    await pauseYouTube(); // Pause if switching away from YouTube
  }
});

// Detect when a YouTube tab is updated (e.g., reopened, reloaded)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const { enabled } = await chrome.storage.local.get(["enabled"]);
  if (!enabled) return;

  if (
    tab.url.includes("youtube.com/watch") &&
    changeInfo.status === "complete"
  ) {
    await checkAndResumeYouTube();
  }
});

async function pauseYouTube() {
  const { enabled } = await chrome.storage.local.get(["enabled"]);
  if (!enabled) return;

  const tabs = await chrome.tabs.query({ audible: true });
  for (const tab of tabs) {
    if (tab.url.includes("youtube.com/watch")) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pauseVideo,
      });
    }
  }
}

async function checkAndResumeYouTube() {
  const { enabled, wasPlaying } = await chrome.storage.local.get([
    "enabled",
    "wasPlaying",
  ]);
  if (!enabled || !wasPlaying) return;

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  for (const tab of tabs) {
    if (tab.url.includes("youtube.com/watch")) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: playVideo,
      });
      await chrome.storage.local.set({ wasPlaying: false }); // Reset state after resuming
    }
  }
}

function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    video.pause();
    chrome.storage.local.set({ wasPlaying: true });
  }
}

function playVideo() {
  const video = document.querySelector("video");
  if (video && video.paused) {
    video.play();
  }
}

// Keep service worker alive
chrome.runtime.onMessage.addListener(() => true);
