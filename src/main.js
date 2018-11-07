var hljs = require('highlight.js');
require('bootstrap');

function createLangOption(lang) {
  var option = document.createElement("option");
  option.value = lang;
  option.innerText = lang;

  if (lang == "swift") {
    option.selected = true;
  }
  return option;
}

var langSelect = document.getElementById("lang");
var langList = hljs.listLanguages();
for (var ix = 0; ix < langList.length; ix++)  {
  langSelect.appendChild(createLangOption(langList[ix]));
}

var chkAutoCopy = document.getElementById("chkAutoCopy");
chkAutoCopy.checked = true;

var button = document.getElementById("execute_button");
button.onclick = function () {
  var resultDiv = document.getElementById("resultDiv");
  resultDiv.hidden = false;
  
  var src = document.getElementById("src").value;
  var result = document.getElementById("result");
  result.textContent = src;
  result.setAttribute("class", langSelect.value);
  hljs.highlightBlock(result);

  if (chkAutoCopy.checked) {
    copyElement(result);
  }
};

function copyElement(element) {
  var range = document.createRange();
  range.selectNodeContents(element);

  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');

  selection.removeAllRanges();
}
