chrome.tabs.onActivated.addListener(pauseYouTube);
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    pauseYouTube();
  }
});

async function pauseYouTube() {
  const { enabled } = await chrome.storage.local.get("enabled");
  if (!enabled) return;

  const tabs = await chrome.tabs.query({ audible: true });
  for (const tab of tabs) {
    if (tab.url.includes("youtube.com/watch")) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          function: pauseVideo,
        })
        .catch((err) => console.error("Error executing script:", err));
    }
  }
}

function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    video.pause();
  }
}
