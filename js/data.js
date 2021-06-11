/* exported data */

var data = {
  name: [],
  editing: null,
  nextEntryId: 1
};

var oldDataJSON = localStorage.getItem('javascript-local-storage');

if (oldDataJSON !== null) {
  data = JSON.parse(oldDataJSON);
}

window.addEventListener(BeforeUnloadEvent, function (event) {
  var coinDataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', coinDataJSON);
});
