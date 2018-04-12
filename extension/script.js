// This script plays role of medium to publish/subscribe messages from webpage to the background script

// This object is used to make sure our extension isn't conflicted with irrelevant messages
var rtcmulticonnectionMessages = {
    'are-you-there': true,
    'get-sourceId':  true,
    'audio-plus-tab': true
};

// This port connects with background script
var port = chrome.runtime.connect();

// If background script sent a message
port.onMessage.addListener(function (message) {
    // Get message from background script and forward to the webpage
    window.postMessage(message, '*');
});

// This event handler watches for messages sent from the webpage
// It receives those messages and forwards to background script
window.addEventListener('message', function (event) {
    // If invalid source
    if (event.source != window)
        return;
        
    // It is 3rd party message
    if(!rtcmulticonnectionMessages[event.data]) return;
        
    // If browser is asking whether extension is available
    if(event.data == 'are-you-there') {
        window.postMessage('rtcmulticonnection-extension-loaded', '*');
    }

    // If it is something that need to be shared with background script
    if(event.data == 'get-sourceId' || event.data === 'audio-plus-tab') {
        // Forward message to background script
        port.postMessage(event.data);
    }
});

// Inform browser that you are available
window.postMessage('rtcmulticonnection-extension-loaded', '*');
