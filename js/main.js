var $CloseVideo = document.querySelector('.yt-close');
var $introVideo = document.querySelector('.intro-video');
var $useSearch = document.querySelector('.use-search');
var $news = document.querySelector('.news');
var $searchIcon = document.querySelector('.icon');
var $cancelSearch = document.querySelector('.cancel-modal');
var $searchModal = document.querySelector('.search-modal');

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
// var $ul = document.getElementById('search');
// function renderListing(results) {
//   var $lisitng = document.createElement('li');
//   var $coinIMG = document.createElement('img');
//   // getting from JSON
//   // results.icon;
//   // results.name;

//   $coinIMG.setAttribute('src', results.icon);
//   $lisitng.textContent = results.name;

//   $ul.appendChild($lisitng);
// }

// create
