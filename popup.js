document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.getElementById("toggle");

  // Get stored setting (default to false)
  const result = await chrome.storage.local.get(["enabled"]);
  toggle.checked = result.enabled ?? false; // Default OFF

  toggle.addEventListener("change", async (event) => {
    await chrome.storage.local.set({ enabled: event.target.checked });

    // Notify background script of change
    chrome.runtime.sendMessage({
      action: "toggleUpdated",
      enabled: event.target.checked,
    });
  });
});
