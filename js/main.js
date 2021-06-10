var $CloseVideo = document.querySelector('.yt-close');
var $introVideo = document.querySelector('.intro-video');
var $useSearch = document.querySelector('.use-search');
var $news = document.querySelector('.news');
var $searchIcon = document.querySelector('.icon');
var $cancelSearch = document.querySelector('.cancel-modal');
var $searchModal = document.querySelector('.search-modal');
var $search = document.querySelector('.search-box');
var $searchDropDown = document.querySelector('.div-container');

// XMLHttpRequest
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=0&currency=USD');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {

  data.name = xhr.response;
});

xhr.send();

// closing intro video
$CloseVideo.addEventListener('click', function (event) {

  $introVideo.className = 'hidden';
  $useSearch.className = 'row ' + 'use-search ' + 'activate';
  $news.className = 'row ' + 'news ' + 'activate';

});

// to show search and cancel modal for search
$searchIcon.addEventListener('click', function (event) {
  $searchModal.className = 'search-modal';
});

$cancelSearch.addEventListener('click', function (event) {
  $searchModal.className = 'search-modal ' + 'hidden';
});

// renderFunction to create the DOM tree needed for search results
var $ul = document.getElementById('search-ul');
// console.log($ul);
function renderListing(coin) {
  var $listing = document.createElement('li');
  var $coinIMG = document.createElement('img');

  $listing.setAttribute('class', 'listing');
  $coinIMG.setAttribute('src', coin.icon);
  $coinIMG.setAttribute('class', 'li-coin');
  $listing.textContent = coin.id;

  $ul.appendChild($listing);
  $listing.append($coinIMG);
  return $ul;
}

// listnening for the key press

$search.addEventListener('input', function (event) {
  var value = event.target.value.toLowerCase();
  // console.log(value);
  if (data.name.coins.length) {
    var coins = data.name.coins;

    // var filteredData = coins.filter(coin => coin.id === value);

    // console.log('filteredData', filteredData);

    for (var i = 0; i < data.name.coins.length; i++) {

      if (value === data.name.coins[i].id) {

        // console.log('matches ID');
        renderListing(coins[i]);
        $searchDropDown.className = 'div-container';
      }
    }

  }
});
