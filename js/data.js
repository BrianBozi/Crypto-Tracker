/* exported data */

var data = {
  name: [],
  news: [],
  favorites: [],
  editing: null,
  nextEntryId: 1
};

var oldDataJSON = localStorage.getItem('javascript-local-storage');

if (oldDataJSON !== null) {
  data = JSON.parse(oldDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var coinDataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', coinDataJSON);
});
