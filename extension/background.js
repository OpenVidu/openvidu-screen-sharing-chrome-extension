var screenOptions = ['screen', 'window'];

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(portOnMessageHanlder);
    
    // Function called for each window.postMessage from "script.js"
    function portOnMessageHanlder(message) {
        if(message == 'get-sourceId') {
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
        }

        if(message == 'audio-plus-tab') {
            screenOptions = ['screen', 'window', 'audio'];
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
        }
    }

    // On getting sourceId: "sourceId" will be empty if permission denied
    function onAccessApproved(sourceId) {
        // If "cancel" button is clicked
        if(!sourceId || !sourceId.length) {
            return port.postMessage('PermissionDeniedError');
        }
        
        // "Ok" button is clicked; share "sourceId" with script.js which will forward it to the webpage
        port.postMessage({
            sourceId: sourceId
        });
    }
});
