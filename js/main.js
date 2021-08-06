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
const spinner = document.querySelector('.spinner')
var $newSection = document.querySelector('.news')


window.addEventListener('load', function(){
  spinner.style.display = 'none'
  function test() {
    var coins = data.name.coins;
    for (var i = 0; i < data.name.coins.length; i++) {
      renderListing(coins[i]);
    }
  }
  test()
})

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=0&currency=USD');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {

  data.name = xhr.response;
});

xhr.send();


var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://cryptonews-api.com/api/v1/category?section=general&items=10&token=115nzgq46bkciplsspiurjsbqrgsqy33fy4fjvee');
xhr2.responseType = 'json';
xhr2.addEventListener('load', function () {
  data.news = xhr2.response
  renderingNews(data.news.data)

});

xhr2.send();

function renderingNews() {
  for (var i = 0; i < data.news.data.length; i++) {
    renderNews(data.news.data[i])
  }
}


function renderNews(news) {
  var $newsUl = document.querySelector('.news-list')
  var $li = document.createElement('li');
  $li.setAttribute('class', 'new-row news-post');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'col-half');
  $li.appendChild($div)

  var $image = document.createElement('img');
  $image.setAttribute('src', news.image_url);
  $image.setAttribute('class', 'news-icon');
  $div.appendChild($image)

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'col-half');
  $li.appendChild($div2)

  var $title = document.createElement('h3');
  $title.textContent = news.title;
  $title.setAttribute('class', 'news-headline');
  $div2.appendChild($title)

  var $link = document.createElement('a');
  $link.setAttribute('href', news.news_url);
  $link.setAttribute('target', '_blank');
  $link.textContent = 'Read Article'
  $div2.appendChild($link)

  $newsUl.appendChild($li)
  return $li
}

$CloseVideo.addEventListener('click', function (event) {

  $introVideo.className = 'hidden';
  $useSearch.className = 'row ' + 'use-search ' + 'activate';
  $news.className = 'row ' + 'news ' + 'activate';

});


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


$search.addEventListener('click', function (event) {
  if ($searchDropDown.className === 'div-container hidden'){
    $searchDropDown.className = "div-containe"
    $addFavButton.className = 'col-half addToFavDiv';
    $removeFavButton.className = 'col-half removeFavDiv hidden';

  } else {
    $searchDropDown.className = "div-container hidden"
  }
});


var $coinDataPage = document.querySelector('.coin-data');

$searchDropDown.addEventListener('click', function (event) {
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
      $favListing.className = 'fav-list hide-faves hidden'
    }
  }
  $favListing.className = 'fav-ul fav-list hide-faves hidden';
});


var $favUl = document.querySelector('.fav-list');

function renderFavorites(coin) {

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

  return $li;

}



var $addToFav = document.querySelector('.add-to-fav');

var $favListing = document.querySelector('.hide-faves');

$addToFav.addEventListener('click', function () {
  var $dataID = document.querySelector('.coinName').getAttribute('data-ID');
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
    }
  }
  $coinDataPage.className = 'coin-data ' + 'hidden';
  $newSection.className = 'row news'
});


var $goHome = document.querySelector('.go-home');

var $addFavButton = document.querySelector('.addToFavDiv');
var $removeFavButton = document.querySelector('.removeFavDiv');
var $favoriteClick = document.querySelector('.fav-list');
var $popUpModal = document.querySelector('.modal-container');
var $cancelRemove = document.querySelector('.cancel');
var $yesButton = document.querySelector('.yes');

$goHome.addEventListener('click', function (event) {
  $coinDataPage.className = 'coin-data ' + 'hidden';
  $favListing.className = 'fav-ul fav-list hide-faves';
  $addFavButton.className = 'col-half addToFavDiv';
  $removeFavButton.className = 'col-half removeFavDiv hidden';
  $newSection.className = 'row news'


});

$favoriteClick.addEventListener('click', function (event) {
  $coinDataPage.className = 'coin-data';
  $newSection.className = 'row news hidden'

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
      $yesButton.setAttribute('entryId', data.favorites[i].entryId);
      $coinDataPage.className = 'coin-data';
      $favListing.className = 'fav-ul fav-list hide-faves hidden';
      $addFavButton.className = 'col-half addToFavDiv hidden';
      $removeFavButton.className = 'col-half removeFavDiv';

      return;

    }
  }
  $favListing.className = 'fav-ul fav-list hide-faves hidden';


});

$removeFavButton.addEventListener('click', function (event) {
  $popUpModal.className = 'modal-container';


});

$cancelRemove.addEventListener('click', function (event) {
  $popUpModal.className = 'modal-container hidden';
});


function updateDom(event) {

  $favUl.innerHTML = '';

  for (var x = 0; x < data.favorites.length; x++) {
    var renderUpdatedList = renderFavorites(data.favorites[x])
    $favUl.appendChild(renderUpdatedList)
  }
}

$yesButton.addEventListener('click', function () {
  var $entryId = event.target.getAttribute('entryId')

  $entryId = parseInt($entryId);

  for (var i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].entryId === $entryId) {
      data.editing = data.favorites[i];
      if(data.editing.entryId === data.favorites[i].entryId){
        data.favorites.splice(i, 1);
      }
    }
  }


  updateDom(data.favorites)
  $addFavButton.className = 'col-half addToFavDiv';
  $removeFavButton.className = 'col-half removeFavDiv hidden';

  $favListing.className = 'fav-ul fav-list hide-faves';
  $popUpModal.className = 'modal-container hidden';
  $coinDataPage.className = 'coin-data hidden';
  $newSection.className = 'row news'

  data.editing = null

});


function renderNews(news){
  var $newsUl = document.querySelector('.news-list')
  var $li = document.createElement('li');
  $li.setAttribute('class', 'new-row news-post');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'col-half');
  $li.appendChild($div)

  var $image = document.createElement('img');
  $image.setAttribute('src', news.image_url);
  $image.setAttribute('class', 'news-icon');
  $div.appendChild($image)

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'col-half');
  $li.appendChild($div2)

  var $title = document.createElement('h3');
  $title.textContent = news.title;
  $title.setAttribute('class', 'news-headline');
  $div2.appendChild($title)

  var $link = document.createElement('a');
  $link.setAttribute('href', news.news_url);
  $link.setAttribute('target', '_blank');
  $link.textContent = 'Read Article'
  $div2.appendChild($link)

  $newsUl.appendChild($li)
  return $li
}


document.addEventListener('DOMContentLoaded', function (event) {
  renderingNews(data.news.data)
  for (var i = 0; i < data.favorites.length; i++) {
    renderFavorites(data.favorites[i]);
    $introVideo.className = 'hidden';
    $favListing.className = 'fav-ul fav-list hide-faves';

  }
});
