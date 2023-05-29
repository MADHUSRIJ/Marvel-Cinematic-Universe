// const back = document.getElementById('back');

// back.addEventListener('click',(e) => {
//     e.preventDefault();
//     window.location.href = './home.html';
// });
//'9131edf1a60d41109fa39d709554760a';
const stones = [
  { name: "Space Stone", lat: 34.0522, lon: -118.2437 },
  { name: "Mind Stone", lat: 13.0827, lon: 80.2707 },
  { name: "Reality Stone", lat: 37.5519, lon: 126.9918 },
  { name: "Power Stone", lat: -76.299965, lon: -148.003021 },
  { name: "Time Stone", lat: 52.5200, lon: 13.4050 },
  { name: "Soul Stone", lat: 65.2482, lon: -60.4621 }
];

var mymap;
var thanosLocations = [];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function findClosestStone(startLat, startLon) {
  let closestStone = null;
  let closestDistance = Infinity;

  stones.forEach((stone) => {
    const distance = calculateDistance(
      startLat,
      startLon,
      stone.lat,
      stone.lon
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestStone = stone;
    }
  });

  return closestStone;
}

function getRandomCoordinate(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomLatitude() {
  return getRandomCoordinate(-90, 90);
}

function getRandomLongitude() {
  return getRandomCoordinate(-180, 180);
}

function getThanosLocation() {
  var startLatitude = getRandomLatitude();
  var startLongitude = getRandomLongitude();

  var apiKey = '9131edf1a60d41109fa39d709554760a';
  var requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${startLatitude}+${startLongitude}&key=${apiKey}`;

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        var location = data.results[0].formatted;
        console.log('Location:', location);

        const dateTime = new Date().toISOString();
        const formattedDateTime = formatDateTime(dateTime);
        const locationData = {
          location: location,
          dateTime: formattedDateTime
        };

        storeThanosLocation(locationData);

        thanosLocations.push(locationData);

        mymap = L.map('map').setView([startLatitude, startLongitude], 13);
        const Icon = L.Icon.extend({
          options: {
            iconSize: [25, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          }
        });
        const ThanosIcon = L.Icon.extend({
          options: {
            iconSize: [50, 100],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          }
        });

        var closestStone = findClosestStone(startLatitude, startLongitude);
        console.log("Closest Stone:", closestStone);

        const thanosIcon = new ThanosIcon({ iconUrl: './assets/images/thanos.png' });
        const stoneIcons = stones.map(stone => new Icon({ iconUrl: `./assets/images/${stone.name.replace(/ /g, "_")}_VFX.png` }));

        const thanos = L.marker([startLatitude, startLongitude], { icon: thanosIcon }).bindPopup('Thanos is in ' + location).addTo(mymap);

        stones.forEach((stone, index) => {
          const marker = L.marker([stone.lat, stone.lon], { icon: stoneIcons[index] }).bindPopup(`${stone.name} is in ${stone.lat}, ${stone.lon}`).addTo(mymap);
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
          language: 'en'
        }).addTo(mymap);

        setTimeout(function () {
          mymap.flyTo([closestStone.lat, closestStone.lon], 13, {
            duration: 2,
            animate: true
          });
          setTimeout(function () {
            thanos.setLatLng([closestStone.lat, closestStone.lon]);
          }, 2000);
        }, 2000);
      } else {
        console.log('Unable to retrieve location information.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function storeThanosLocation(locationData) {
  const storedLocations = localStorage.getItem('thanosLocations');

  let locations = [];

  if (storedLocations) {
    locations = JSON.parse(storedLocations);
  }

  locations.push(locationData);
  console.log("inside storage");
  localStorage.setItem('thanosLocations', JSON.stringify(locations));
}

function displayThanosLocations() {
  const storedLocations = localStorage.getItem('thanosLocations');

  if (storedLocations) {
    const locations = JSON.parse(storedLocations);
    const locationList = document.getElementById('locationList');
    let currentDate = null;

    locationList.innerHTML = '';

    locations.forEach((location, index) => {
      const dateTime = new Date(location.dateTime);
      const date = dateTime.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      if (date !== currentDate) {
        const dateHeader = document.createElement('div');
        dateHeader.classList.add('date');
        dateHeader.textContent = date;
        locationList.appendChild(dateHeader);
        currentDate = date;
      }

      const listItem = document.createElement('div');
      listItem.classList.add('locationInfo');

      const infoItem = document.createElement('p');
      infoItem.classList.add('location');
      infoItem.textContent = `Thanos Spotted at ${location.location}`;
      listItem.appendChild(infoItem);

      const timeItem = document.createElement('p');
      timeItem.classList.add('time');
      timeItem.textContent = `${time}`;
      listItem.appendChild(timeItem);

      locationList.appendChild(listItem);
    });
  }
}


function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const ampm = dateTime.getHours() >= 12 ? 'PM' : 'AM';

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

var image = document.getElementById('thanos');
var dialogOverlay = document.querySelector('.thanos-dialog-overlay');
var dialogBox = document.querySelector('.thanos-dialog-box');

image.addEventListener('click', function () {
  getThanosLocation();
  dialogOverlay.style.display = 'block';
  dialogBox.style.display = 'block';
});

dialogOverlay.addEventListener('click', function () {
  displayThanosLocations();
  dialogOverlay.style.display = 'none';
  dialogBox.style.display = 'none';
  mymap.remove();
});

displayThanosLocations();