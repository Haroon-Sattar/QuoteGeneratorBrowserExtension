chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log(activeInfo)
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        function: clickButton
    });
});

function clickButton() {
    document.getElementsByClassName("question-page unified-theme")[0].append("<p>12</p>");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    if (request.type === "getQuote") {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({
                    type: "quote",
                    quote: {
                        text: data.content,
                        author: data.author
                    }
                });
                sendResponse({
                    type: "quote",
                    quote: {
                        text: data.content,
                        author: data.author
                    }
                });
            });
        return true;
    }
});
