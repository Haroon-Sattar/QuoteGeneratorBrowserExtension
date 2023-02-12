document.getElementById("generate").addEventListener("click", function () {
  chrome.runtime.sendMessage({ type: "getQuote" });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(JSON.stringify(request))
  if (request.type === "quote") {
    document.getElementById("text").innerText = request.quote.text;
    document.getElementById("author").innerText = request.quote.author;
  }

});
