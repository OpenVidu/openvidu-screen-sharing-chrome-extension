# OpenVidu Screen Sharing extension for Google Chrome

This Chrome extension allows web applications to capture desktop windows. It is meant to be used in combination with [openvidu-browser](http://openvidu.io/docs/advanced-features/screen-share/) and is easily customizable.

## How to customize this extension

- Modify the following `manifest.json` fields:
  - `name`, `author` and `description`
  - Change the allowed domains in `content_scripts.matches` array
- Replace `icon.png` with your own image

## How to use in openvidu-browser

```javascript
var openvidu = new OpenVidu();
var publisher = openvidu.initPublisher(
    document.getElementById('myTargetElement'),
    {
        videoSource: "screen{https://chrome.google.com/webstore/detail/YOUR_EXTENSION_NAME/YOUR_EXTENSION_ID}",
    }
);
```

## How to test your extension

First of all, add to array `content_scripts.matches` in `manifest.json` the developing URL you are using (for example: `"matches": ["https://*.openvidu.io/*", "http://localhost:4200/"]`)

Then go to `chrome://extensions` in Google Chrome. Click `Load Unpacked` and select the extension's folder.

When setting property `videoSource` in your app, just do it like this:

```javascript
videoSource: "screen{https://chrome.google.com/webstore/detail/not_relevant/DEVELOPING_EXTENSION_ID_CHROME_PROVIDED}",
);
```

You're good to go now!

## How to publish your extension in Chrome Web Store

[https://developer.chrome.com/webstore/publish](https://developer.chrome.com/webstore/publish)

> Acknowledgements to [Muaz Khan](https://www.webrtc-experiment.com/), whose open-source project [Chrome-Extensions](https://github.com/muaz-khan/Chrome-Extensions) helped implementing _OpenVidu/openvidu-screen-sharing-chrome-extension_ repository.