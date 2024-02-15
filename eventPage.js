chrome.contextMenus.create({ id: "M", title: "Multiply", contexts: ["selection"] });

chrome.contextMenus.create({ id: "ATC", title: "Add To Clipboard", contexts: ["selection"] });

chrome.contextMenus.create({ id: "FOW", title: "Find On Wikipedia", contexts: ["selection"] });

chrome.contextMenus.onClicked.addListener(function(clicked){

  if (clicked.menuItemId == "M" && clicked.selectionText){
    chrome.tabs.executeScript({
      file: 'contentScript.js'
    });
  }

  if (clicked.menuItemId == "ATC" && clicked.selectionText){
    chrome.storage.sync.get(['i','list'], function(y){
      (y.list)[y.i] = clicked.selectionText
      chrome.storage.sync.set({'list': y.list})
      y.i = y.i + 1
      chrome.storage.sync.set({'i': y.i})
    });
  }

  if (clicked.menuItemId == "FOW" && clicked.selectionText){
    function other (string) {
      return encodeURI(string).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }
    chrome.storage.sync.get(['h','w'], function(y){

      if(y.h == undefined || y.w == undefined){
        y.h = 50
        y.w = 50
      }

      var url = "https://en.wikipedia.org/wiki/" + other(clicked.selectionText);
      var window = {
        "url": url,
        "type": "popup",
        "top": 250,
        "left": 5,
        "height": parseInt((screen.availHeight * y.h)/100),
        "width": parseInt((screen.availWidth * y.w)/100)
      };
      chrome.windows.create(window, function(){});
    });
  }

});
