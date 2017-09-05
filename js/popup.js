chrome.runtime.sendMessage({main_action: 'show_window'});
chrome.tabs.query({active: true}, (tabs) => {
    let loc = new URL(tabs[0].url);

    if (loc.host.indexOf("www.pinterest.") !== 0) {
        chrome.tabs.create({url: "https://www.pinterest.com/"});
    } else {
        window.close();
    }
})