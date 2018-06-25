// This background script is used to invoke desktopCapture API
// to capture screen-MediaStream.

var screenOptions = ['screen', 'window', 'tab'];

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(portOnMessageHanlder);

    // This one is called for each message from "content-script.js"
    function portOnMessageHanlder(message) {
        if (!!message['get-custom-sourceId']) {
            screenOptions = message['get-custom-sourceId'];
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
            return;
        }

        if (message == 'get-sourceId') {
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
            return;
        }

        if (message == 'audio-plus-tab') {
            screenOptions = ['screen', 'window', 'audio', 'tab'];
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
            return;
        }
    }

    // On getting sourceId
    // "sourceId" will be empty if permission is denied.
    function onAccessApproved(sourceId, opts) {
        // if "cancel" button is clicked
        if (!sourceId || !sourceId.length) {
            return port.postMessage('PermissionDeniedError');
        }

        // "ok" button is clicked; share "sourceId" with the
        // content-script which will forward it to the webpage
        port.postMessage({
            sourceId: sourceId,
            canRequestAudioTrack: !!opts.canRequestAudioTrack
        });
    }
});
