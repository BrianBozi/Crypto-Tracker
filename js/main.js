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
  $mobileUL.className = 'mobile-dropdown';

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
  $listing.setAttribute('data-id', coin.id);
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
  $listing.setAttribute('data-id', coin.id);
  $coinIMG.setAttribute('src', coin.icon);
  $coinIMG.setAttribute('class', 'li-coin');
  $listing.textContent = coin.id;

  $mobileUL.append($listing);
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

// $searchDropDown.addEventListener('click', function (event) {
//   console.log(event.target);
// });

// mobile search
$mobileSearch.addEventListener('input', function (event) {
  // console.log('input listener');
  var value = event.target.value.toLowerCase();
  if (data.name.coins.length) {
    var coins = data.name.coins;
    // var filteredData = coins.filter(coin => coin.id === value);
    // console.log('filteredData', filteredData);
    for (var i = 0; i < data.name.coins.length; i++) {
      if (value === coins[i].id) {
        $mobileSearchDropdown.className = 'mobile-container';
        renderListingMobile(coins[i]);
        // console.log('match');

      } else if (value !== coins[i].id) {
        $mobileSearchDropdown.className = 'mobile-container ' + 'hidden';
      }
    }
  }

});

// DOMTREE COIN DATA PAGE

// function renderCoinPage() {
//   var coinPage = document.createElement('div');
//   coinPage.setAttribute('class', 'coin-page');
//   var newRow = document.createElement('div');
//   newRow.setAttribute('class', 'new-row');
//   var coinIMG = document.createElement('image');
//   coinIMG.setAttribute('src', _________);
//   var newRow2 = document.createElement('div');
//   newRow2.setAttribute('class', 'new-row');
//   var colHalf = document.createElement('div');
//   colHalf.setAttribute('class', 'col-half');
//   var coinName = document.createElement('h3');
//   coinName.textContent = _________;
//   var colHalf2 = document.createElement('div');
//   colHalf2.setAttribute('class', 'col-half');
//   var priceChange = document.crea
// }

var $coinDataPage = document.querySelector('.coin-data');
// coinpage viewport desktop
$searchDropDown.addEventListener('click', function (event) {

  var coins = data.name.coins;
  var coinName = document.querySelector('.coinName');
  var coinPriceChange = document.querySelector('.price-change');
  var coinPrice = document.querySelector('.price');
  var coinVol = document.querySelector('.vol');
  var coinImage = document.querySelector('.coinImage');
  var $dataID = document.querySelector('.listing').getAttribute('data-id');

  for (var i = 0; i < data.name.coins.length; i++) {
    if ($dataID === data.name.coins[i].id) {
      coinName.textContent = coins[i].name;
      coinImage.setAttribute('src', coins[i].icon);
      coinPriceChange.textContent = coins[i].priceChange1d;
      coinPrice.textContent = coins[i].price;
      coinVol.textContent = coins[i].volume;
      $coinDataPage.className = 'coin-data';
      $searchDropDown.className = 'div-container ' + 'hidden';
      return;
    }
  }

});

$mobileSearchDropdown.addEventListener('click', function (event) {

  var coins = data.name.coins;
  var coinName = document.querySelector('.coinName');
  var coinPriceChange = document.querySelector('.price-change');
  var coinPrice = document.querySelector('.price');
  var coinVol = document.querySelector('.vol');
  var coinImage = document.querySelector('.coinImage');
  var $dataID = document.querySelector('.listing').getAttribute('data-id');

  for (var i = 0; i < data.name.coins.length; i++) {
    if ($dataID === data.name.coins[i].id) {
      coinName.textContent = coins[i].name;
      coinImage.setAttribute('src', coins[i].icon);
      coinPriceChange.textContent = coins[i].priceChange1d;
      coinPrice.textContent = coins[i].price;
      coinVol.textContent = coins[i].volume;
      $searchModal.className = 'search-modal ' + 'hidden';
      $mobileUL.className = 'mobile-dropdown ' + 'hidden';
      $coinDataPage.className = 'coin-data';
      return;
    }
  }
});
