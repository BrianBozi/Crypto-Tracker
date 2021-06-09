/* exported data */

var data = {
  name: []
};

var oldDataJSON = localStorage.getItem('javascript-local-storage');

if (oldDataJSON !== null) {
  data = JSON.parse(oldDataJSON);
}

window.addEventListener(BeforeUnloadEvent, function (event) {
  var coinDataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', coinDataJSON);
});
