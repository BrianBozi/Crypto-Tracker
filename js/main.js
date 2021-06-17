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

document.addEventListener('DOMContentLoaded', function () {

});

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
  $favListing.className = 'fav-ul fav-list hide-faves ' + 'hidden';

});

$cancelSearch.addEventListener('click', function (event) {
  $searchModal.className = 'search-modal ' + 'hidden';
  $mobileUL.className = 'mobile-dropdown ' + 'hidden';
  $favListing.className = 'fav-ul fav-list hide-faves';
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
  // console.log(event.target);

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
        return;

      } else if (value !== coins[i].id) {
        $mobileSearchDropdown.className = 'mobile-container ' + 'hidden';

      }
    }
  }

});

var $coinDataPage = document.querySelector('.coin-data');
// coinpage viewport desktop
$searchDropDown.addEventListener('click', function (event) {
  // console.log('click on', event.target);

  var coins = data.name.coins;
  var coinName = document.querySelector('.coinName');
  var coinPriceChange = document.querySelector('.price-change');
  var coinPrice = document.querySelector('.price');
  var coinVol = document.querySelector('.vol');
  var coinImage = document.querySelector('.coinImage');
  var $dataID = event.target.getAttribute('data-id');

  for (var i = 0; i < data.name.coins.length; i++) {
    if ($dataID === data.name.coins[i].id) {
      coinName.setAttribute('data-ID', coins[i].id);
      coinName.textContent = coins[i].name;
      coinImage.setAttribute('src', coins[i].icon);
      coinPriceChange.textContent = coins[i].priceChange1d;
      coinPrice.textContent = coins[i].price;
      coinVol.textContent = coins[i].volume;
      $coinDataPage.className = 'coin-data';
      $searchDropDown.className = 'div-container ' + 'hidden';
      // console.log('data-id', $dataID);
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
  var $dataID = event.target.getAttribute('data-id');

  for (var i = 0; i < data.name.coins.length; i++) {
    if ($dataID === data.name.coins[i].id) {
      coinName.setAttribute('data-ID', coins[i].id);
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

// render for fav list

function renderFavorites(coin) {
  var $favUl = document.querySelector('.fav-list');

  var $li = document.createElement('li');
  $li.setAttribute('class', 'new-row fav-list');
  $li.setAttribute('entryId', coin.entryId);
  $favUl.appendChild($li);

  var $div = document.createElement('div');
  $div.setAttribute('class', 'col-half');
  $div.setAttribute('coin-id', coin.id);
  $li.appendChild($div);

  var $favIMG = document.createElement('img');
  $favIMG.setAttribute('class', 'fav-icon');
  $favIMG.setAttribute('coin-id', coin.id);
  $favIMG.setAttribute('src', coin.icon);

  $div.appendChild($favIMG);

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'col-half');
  $div2.setAttribute('coin-id', coin.id);
  var $coinName = document.createElement('h3');
  $coinName.setAttribute('coin-id', coin.id);
  $coinName.textContent = coin.name;
  $div2.appendChild($coinName);
  var $coinPriceChange = document.createElement('h3');
  $coinPriceChange.setAttribute('coin-id', coin.id);
  $coinPriceChange.textContent = '$' + coin.price;
  $div2.appendChild($coinPriceChange);

  $li.appendChild($div2);

  return $favUl;

}

// coins = paramether
// pass in the xhr.response.coins[i] in it

var $addToFav = document.querySelector('.addToFav');
// function coinsRquest(coin) {

//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=0&currency=USD');
//   xhr.setRequestHeader('token', 'abc123');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     for (var i = 0; i < xhr.response.coins[i]; i++) {
//       renderFavorites(xhr.response.coins[i]);

//     }
//   });
// }
var $favListing = document.querySelector('.hide-faves');

$addToFav.addEventListener('click', function () {
  var $dataID = document.querySelector('.coinName').getAttribute('data-ID');
  // console.log('click');
  // console.log($dataID);
  for (var i = 0; i < xhr.response.coins.length; i++) {
    if ($dataID === xhr.response.coins[i].id) {
      renderFavorites(xhr.response.coins[i]);
      $favListing.className = 'fav-ul fav-list hide-faves';

      var fav = {
        icon: xhr.response.coins[i].icon,
        id: xhr.response.coins[i].id,
        name: xhr.response.coins[i].name,
        priceChange: xhr.response.coins[i].priceChange1d,
        price: xhr.response.coins[i].price,
        volume: xhr.response.coins[i].volume,
        entryId: data.nextEntryId
      };

      data.favorites.push(fav);
      data.nextEntryId++;
      // console.log('match');
    }
  }
  $coinDataPage.className = 'coin-data ' + 'hidden';
  // event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function (event) {
  // var $favUl = document.querySelector('.fav-list');

  for (var i = 0; i < data.favorites.length; i++) {
    renderFavorites(data.favorites[i]);
    $introVideo.className = 'hidden';
    $favListing.className = 'fav-ul fav-list hide-faves';

  }
});

// go home btn
var $goHome = document.querySelector('.goHome');

var $addFavButton = document.querySelector('.addToFavDiv');
var $removeFavButton = document.querySelector('.removeFavDiv');
var $favoriteClick = document.querySelector('.fav-list');
var $popUpModal = document.querySelector('.modal-container');
var $cancelRemove = document.querySelector('.cancel');
// var $yesButton = document.querySelector('.yes');

$goHome.addEventListener('click', function (event) {
  $coinDataPage.className = 'coin-data ' + 'hidden';
  $favListing.className = 'fav-ul fav-list hide-faves';
  $addFavButton.className = 'col-half addToFavDiv';
  $removeFavButton.className = 'col-half removeFavDiv hidden';
});

$favoriteClick.addEventListener('click', function (event) {
  $coinDataPage.className = 'coin-data';

  var coinName = document.querySelector('.coinName');
  var coinPriceChange = document.querySelector('.price-change');
  var coinPrice = document.querySelector('.price');
  var coinVol = document.querySelector('.vol');
  var coinImage = document.querySelector('.coinImage');

  var $coinID = event.target.getAttribute('coin-id');

  for (var i = 0; i < data.favorites.length; i++) {
    if ($coinID === data.favorites[i].id) {

      coinName.setAttribute('data-ID', data.favorites[i].id);
      coinName.textContent = data.favorites[i].name;
      coinImage.setAttribute('src', data.favorites[i].icon);
      coinPriceChange.textContent = data.favorites[i].priceChange;
      coinPrice.textContent = '$' + data.favorites[i].price;
      coinVol.textContent = data.favorites[i].volume;
      // $yesButton.setAttribute('entryId', data.favorites[i].entryId);
      $coinDataPage.className = 'coin-data';
      $favListing.className = 'fav-ul fav-list hide-faves hidden';
      $addFavButton.className = 'col-half addToFavDiv hidden';
      $removeFavButton.className = 'col-half removeFavDiv';

      // $addToFav.textContent = 'Remove from Favorites';
      return;

    }
  }

});

$removeFavButton.addEventListener('click', function (event) {
  // console.log('click');
  $popUpModal.className = 'modal-container';
});

$cancelRemove.addEventListener('click', function (event) {
  $popUpModal.className = 'modal-container hidden';
  // console.log('clicked cancel');
});

// i added a entryId to the Li's to get the entry number to match the array entries in data.js
// function on line 200
// $yesButton.addEventListener('click', function () {
//   var entry = $li.getAttribute(entryId);
//   entry = parseInt(entry);

//   for (var i = 0; i < data.favorites.length; i++) {
//     if (data.favorites[i].entryId === entry) {
//       data.editing = data.favorites[i];
//       console.log(data.editing);
//     }
//   }

// });
