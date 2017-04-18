var reordering = false;
var animation = new iconAnimator("images/mini.png");
animation.set();

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.main_action == 'show_window') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {main_action: request.main_action});
        });
    }

    if (request.main_action == 'reorder') {
        reordering = true;
        startAnimation();

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {main_action: request.main_action, number_pages: request.number_pages});
            chrome.browserAction.disable(tabs[0].id);
        });
    }

    if (request.main_action == 'reorder_done') {
        reordering = false;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.browserAction.enable(tabs[0].id);
        });
    }
});

function startAnimation() {
    if (reordering == true) {
        setTimeout(function(){
            startAnimation();    
        }, 2100);

        try {
            animation.pulse();
        } catch (err) {}
    }
}

function stopAnimation() {
    clearInterval(animationInterval);
}

function isPinterestSearch(url) {
    if (url.indexOf('.pinterest.') > 0) {
        if (url.indexOf('/search/') > 0) {
            return true;
        }
    }

    return false;
}

/* HANDLE INSTALL ACTION*/

function reloadAllTabs() {
    chrome.tabs.query({}, function(tabs) { 
        for (var e = 0; e < tabs.length; e++) {
            if (tabs[e].url) {
                if (isPinterestSearch(tabs[e].url)) {
                    chrome.tabs.reload(tabs[e].id);
                }
            }
        }
    });
};

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        reloadAllTabs();
    };
});

/* HANDLE BUTTON DEACTIVATION*/

function checkTabWorkability() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        try {
            var pageURL = tabs[0].url;
            var tabID = tabs[0].id;
            if (pageURL) {
                chrome.browserAction.disable(tabID);
                if (isPinterestSearch(pageURL)) {
                    chrome.browserAction.enable(tabID);
                }
            }
        } catch(err) {}
    });   
}

chrome.tabs.onMoved.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onSelectionChanged.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onActiveChanged.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onActivated.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onCreated.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onUpdated.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onDetached.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onAttached.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onUpdated.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onRemoved.addListener(function () {
     checkTabWorkability();
});
chrome.tabs.onReplaced.addListener(function () {
     checkTabWorkability();
});