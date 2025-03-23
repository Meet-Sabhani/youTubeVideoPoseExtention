# YouTube Auto Pause

## Description
YouTube Auto Pause is a Chrome extension that automatically pauses YouTube videos when you switch tabs or minimize your browser. This ensures that you don’t miss any content while multitasking.

## Features
- Automatically pauses the video when you switch to another tab.
- Resumes playback when you return to YouTube.
- Works only on YouTube (`www.youtube.com`).
- Lightweight and efficient background script.

## Installation
1. Download the repository ZIP file from GitHub.
2. Extract the ZIP file to a folder on your computer.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** (toggle switch in the top right corner).
5. Click **Load unpacked** and select the extracted folder.
6. The extension will now be added to your Chrome browser.

## Permissions
The extension requires the following permissions:
- `tabs` and `activeTab`: To detect when the user switches tabs.
- `storage`: To store user preferences if needed in the future.
- `scripting`: To execute scripts on YouTube.
- `host_permissions`: To interact with `www.youtube.com` only.

## Manifest.json Configuration
```json
{
  "manifest_version": 3,
  "name": "YouTube Auto Pause",
  "version": "1.0",
  "description": "Pauses YouTube video when you switch tabs or minimize the browser.",
  "permissions": ["tabs", "activeTab", "storage", "scripting"],
  "host_permissions": ["*://www.youtube.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "youtube.png"
  }
}
```

## Usage
1. Open **YouTube (www.youtube.com)** in a Chrome tab.
2. Play a video.
3. Switch to another tab or minimize Chrome.
4. The video will automatically pause.
5. Return to the YouTube tab, and the video will resume playing.

## Contribution
Feel free to fork this repository and submit pull requests to enhance functionality.

## License
This project is licensed under the MIT License.


