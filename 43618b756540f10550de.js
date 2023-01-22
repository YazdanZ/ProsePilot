var preTags = document.getElementsByTagName('pre');
var size = preTags.length;

for (var i = 0; i < size; i++) {
  preTags[i].innerHTML = '<code>' + preTags[i].innerHTML + '</code>'; // wrap content of pre tag in code tag
}

hljs.highlightAll(); // apply highlighting