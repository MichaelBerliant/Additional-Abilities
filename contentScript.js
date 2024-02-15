chrome.storage.sync.get('amount', function(y){
  var multipliedText = (document.getSelection().toString()).repeat(y.amount);
  if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
    var start = document.activeElement.selectionStart;
    var end = document.activeElement.selectionEnd;

    var before = document.activeElement.value.slice(0, start);
    var after = document.activeElement.value.slice(end);

    var text = before + multipliedText + after;
    document.activeElement.value = text;
  }
  else {
    if (document.getSelection) {
      var selection = document.getSelection();
      if (selection.rangeCount) {
        var range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(multipliedText));
      }
    }
  }
});