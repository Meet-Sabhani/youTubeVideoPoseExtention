document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.getElementById("toggle");
  const { enabled } = await chrome.storage.local.get("enabled");
  toggle.checked = !!enabled;

  toggle.addEventListener("change", async (event) => {
    await chrome.storage.local.set({ enabled: event.target.checked });
  });
});
