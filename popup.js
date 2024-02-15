$(function(){
  $('#repeat').click(function(){
    var amount = $('#repetitions').val();
    if (amount){
      chrome.storage.sync.set({'amount': amount})
    }
  });
  $('#clear').click(function(){
    chrome.storage.sync.set({'i': 0})
    chrome.storage.sync.set({'x': ""})
    var list = []
    chrome.storage.sync.set({'list': list})
  });
  chrome.storage.sync.get(['i','list'], function(y){
    for(it = 0; it < y.i; it++){
      var textArea = $('<textarea id="new" style="border-width: 0px; font-family: Gill Sans; font-weight: 400; resize: none; margin-bottom: 5px"></textarea>')
      $('#clipboard').append(textArea)
      var text = y.list[it]
      $('#new').val(text)
      $('#new').attr("id", it)
    }
    for(it = 0; it < y.i; it++){
      $("#" + it).click(function(){
        $(this).select();
        document.execCommand("copy");
      });
    }
    var list = []
    for(it = 0; it < y.i; it++){
      $("#" + it).on('input propertychange paste', function() {
        for(it2 = 0; it2 < y.i; it2++){
          list[it2] = $("#" + it2).val()
        }
        var list2 = list.filter(function (e) {return e != "";})
        var _ = list2.length
        chrome.storage.sync.set({'i': _})
        chrome.storage.sync.set({'list': list2})
      });
    }
  });
  $('#dimensions').click(function(){
    var h = $('#height').val();
    var w = $('#width').val();
    if (h && w){
      chrome.storage.sync.set({'h': h})
      chrome.storage.sync.set({'w': w})
    }
  });
});
