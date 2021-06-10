var $CloseVideo = document.querySelector('.yt-close');
var $introVideo = document.querySelector('.intro-video');
var $useSearch = document.querySelector('.use-search');
var $news = document.querySelector('.news');
var $searchIcon = document.querySelector('.icon');
var $cancelSearch = document.querySelector('.cancel-modal');
var $searchModal = document.querySelector('.search-modal');
var $search = document.querySelector('.search-box');
var $searchDropDown = document.querySelector('.div-container');
var $mobileSearch = document.querySelector('.search-input');
var $mobileSearchDropdown = document.querySelector('.mobile-container');

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
  $mobileUL.className = 'mobile-dropdown ' + 'hidden';
});

// renderFunction to create the DOM tree needed for search results
var $ul = document.getElementById('search-ul');

function renderListing(coin) {
  var $listing = document.createElement('li');
  var $coinIMG = document.createElement('img');

  $listing.setAttribute('class', 'listing');
  $coinIMG.setAttribute('src', coin.icon);
  $coinIMG.setAttribute('class', 'li-coin');
  $listing.textContent = coin.id;

  $listing.append($coinIMG);
  $ul.appendChild($listing);
  return $ul;
}

// renderMobile
var $mobileUL = document.getElementById('mobile-ul');
// console.log($ul);
function renderListingMobile(coin) {
  var $listing = document.createElement('li');
  var $coinIMG = document.createElement('img');

  $listing.setAttribute('class', 'listing');
  $coinIMG.setAttribute('src', coin.icon);
  $coinIMG.setAttribute('class', 'li-coin');
  $listing.textContent = coin.id;

  $mobileUL.appendChild($listing);
  $listing.append($coinIMG);
  return $mobileUL;
}

// listnening for the key press

$search.addEventListener('input', function (event) {

  var value = event.target.value.toLowerCase();
  // console.log(value);
  if (data.name.coins.length) {
    var coins = data.name.coins;

    for (var i = 0; i < data.name.coins.length; i++) {
      if (value === coins[i].id) {
        // console.log('matches ID');
        renderListing(coins[i]);
        $searchDropDown.className = 'div-container';
        return;
      } else if (value !== coins[i].id) {
        $searchDropDown.className = 'div-container ' + 'hidden';
      }
    }
  }
});

// mobile search
$mobileSearch.addEventListener('input', function (event) {

  var value = event.target.value.toLowerCase();
  // console.log(value);
  if (data.name.coins.length) {
    var coins = data.name.coins;
    // var filteredData = coins.filter(coin => coin.id === value);
    // console.log('filteredData', filteredData);

    for (var i = 0; i < data.name.coins.length; i++) {

      if (value === coins[i].id) {

        $mobileSearchDropdown.className = 'mobile-container';
        renderListingMobile(coins[i]);
        return;
      } else if (value !== coins[i].id) {
        $mobileSearchDropdown.className = 'mobile-container ' + 'hidden';

      }

    }
  }
});
