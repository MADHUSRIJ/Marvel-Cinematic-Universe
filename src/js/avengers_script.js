var item = "public/characters";
var api = `http://gateway.marvel.com/v1/${item}?ts=1&apikey=16cc21ee3af49dc4b9cfaa5f9a379165&hash=d47927c1191f586477297ceaa7b30594`;
var avengersData = [];


function getData() {
  return new Promise((resolve, reject) => {
    try {
      var i = 0;
      var promises = [];

      while (i < 16) {
        var extension = `&limit=100&offset=` + 100 * i;
        var url = api + extension;
        promises.push(
          fetch(url)
            .then((response) => response.json())
        );

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
        //results.push(result.thumbnail.path+"."+result.thumbnail.extension);
      });
    });
    return avengersData;
  } catch (error) {
    console.error(error);
  }
}

async function populateCarousel() {
    var carousel = document.getElementById('main');
    await getAvengers();
    avengersData.forEach((data) => {
        var item = document.createElement('div');
        item.classList.add('card');

        var image = document.createElement('img');
        image.classList.add('avengers_imgage');
        image.src = data.thumbnail.path+"."+data.thumbnail.extension;

        var name = document.createElement('p');
        name.classList.add('text');
        name.innerHTML = data.name;

        item.appendChild(image);
        item.appendChild(name);
        carousel.appendChild(item);
    });
  }

  populateCarousel();
 var input = document.getElementById('code');

 function handleChange() {
    var inputValue = input.value.toLowerCase();
    var carousel = document.getElementById('main');
    carousel.innerHTML = '';
    avengersData.forEach((data) => {
        var characterName = data.name.toLowerCase();
        if (characterName.includes(inputValue)) {
            var item = document.createElement('div');
            item.classList.add('card');

            var image = document.createElement('img');
            image.classList.add('avengers_imgage');
            image.src = data.thumbnail.path+"."+data.thumbnail.extension;

            var name = document.createElement('p');
            name.classList.add('text');
            name.innerHTML = data.name;

            item.appendChild(image);
            item.appendChild(name);
            carousel.appendChild(item);
        }
    });
 }

 input.addEventListener('input', handleChange);
 
