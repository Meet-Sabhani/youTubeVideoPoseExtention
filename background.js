chrome.tabs.onActivated.addListener(async (activeInfo) => {
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
});

function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    video.pause();
  }
}
