var item = "public/characters";
var api = `https://gateway.marvel.com/v1/${item}?ts=1&apikey=16cc21ee3af49dc4b9cfaa5f9a379165&hash=d47927c1191f586477297ceaa7b30594`;
var avengersData = [];
var originalAvengersData = [];

const back = document.getElementById('back');

back.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './home.html';
});

function getData() {
  return new Promise((resolve, reject) => {
    try {
      var i = 0;
      var promises = [];

      while (i < 16) {
        var extension = `&limit=100&offset=` + 100 * i;
        var url = api + extension;
        promises.push(fetch(url).then((response) => response.json()));

        i += 1;
      }

      Promise.all(promises)
        .then((responses) => {
          resolve(responses);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (ex) {
      reject(ex);
    }
  });
}

async function getAvengers() {
  try {
    var data = await getData();
    data.forEach((response) => {
      response.data.results.forEach((result) => {
        avengersData.push(result);
      });
    });
    return avengersData;
  } catch (error) {
    console.error(error);
  }
}

async function populateCarousel() {
  await getAvengers();
  avengersData.forEach((data) => {
    addData(data);
  });
}

function addData(data) {
  var carousel = document.getElementById('searchList');
  var item = document.createElement('div');
  item.classList.add('avengers-card');

  item.addEventListener('click', () => onClickEvent(data));

  var imageDiv = document.createElement('div');
  imageDiv.classList.add('avengers-image');
  var image = document.createElement('img');
  image.src = data.thumbnail.path + '.' + data.thumbnail.extension;
  imageDiv.appendChild(image);

  var name = document.createElement('div');
  name.classList.add('avengers-name');
  name.innerHTML = data.name;

  item.appendChild(imageDiv);
  item.appendChild(name);
  carousel.appendChild(item);
}

function onClickEvent(data) {
  var nameElement = document.querySelector('.name');
  nameElement.innerHTML = '';

  var item = document.createElement('div');
  item.classList.add('avengers-card');

  var imageDiv = document.createElement('div');
  imageDiv.classList.add('avengers-image');
  var image = document.createElement('img');
  image.src = data.thumbnail.path + '.' + data.thumbnail.extension;
  imageDiv.appendChild(image);

  var name = document.createElement('div');
  name.classList.add('avengers-name');
  name.innerHTML = data.name;

  item.appendChild(imageDiv);
  item.appendChild(name);

  nameElement.appendChild(item);
}

function NotificationCard() {
  var nameElement = document.querySelector('.name');
  nameElement.innerHTML = '';

  var item = document.getElementById("Notification");

  var clonedItem = item.cloneNode(true);
  clonedItem.style.marginTop = ''; 
  nameElement.appendChild(clonedItem);
}

 function handleChange() {
    var inputValue = input.value.toLowerCase();
    var carousel = document.getElementById('searchList');
    carousel.innerHTML = '';
    avengersData.forEach((data) => {
        var characterName = data.name.toLowerCase();
        if (characterName.includes(inputValue)) {
             addData(data);
        }
    });
 }

var input = document.getElementById('code');
input.addEventListener('input', handleChange);

populateCarousel();
 
