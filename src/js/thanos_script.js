const back = document.getElementById('back');

back.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './home.html';
});

const stones = [
  { name: "Space Stone", lat : 34.0522, lon : -118.2437 },
  { name: "Mind Stone", lat : 13.0827, lon : 80.2707},
  { name: "Reality Stone", lat : 37.5519, lon : 126.9918  },
  { name: "Power Stone", lat : -76.299965, lon :	-148.003021  },
  { name: "Time Stone", lat : 52.5200, lon : 13.4050  },
  { name: "Soul Stone", lat : 65.2482, lon : -60.4621 }
];


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
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
  
var startLatitude = getRandomLatitude();
var startLongitude = getRandomLongitude();
  
console.log("Thanos Latitude:", startLatitude);
console.log("Thanos Longitude:", startLongitude);
var apiKey = '9131edf1a60d41109fa39d709554760a';
var requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${startLatitude}+${startLongitude}&key=${apiKey}`;
  
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        var location = data.results[0].formatted;
        console.log('Location:', location);
  
        var mymap = L.map('map').setView([startLatitude, startLongitude], 13);
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
        console.log("Closest Stone ",closestStone);
  
        const thanosIcon = new ThanosIcon({ iconUrl: './assets/images/thanos.png' });
        const spaceIcon = new Icon({ iconUrl: './assets/images/Space_Stone_VFX.png' });
        const mindIcon = new Icon({ iconUrl: './assets/images/Mind_Stone_VFX.png' });
        const realityIcon = new Icon({ iconUrl: './assets/images/Reality_Stone_VFX.png' });
        const powerIcon = new Icon({ iconUrl: './assets/images/Power_Stone_VFX.png' });
        const timeIcon = new Icon({ iconUrl: './assets/images/Time_Stone_VFX.png' });
        const soulIcon = new Icon({ iconUrl: './assets/images/Soul_Stone_VFX.png' });
  
        const thanos = L.marker([startLatitude, startLongitude], { icon: thanosIcon }).bindPopup('Thanos is in ' + location).addTo(mymap);
        const Space = L.marker([stones[0].lat, stones[0].lon], { icon: spaceIcon }).bindPopup('Space Stone is in Los Angels, US.').addTo(mymap);
        const Mind = L.marker([stones[1].lat, stones[1].lon], { icon: mindIcon }).bindPopup('Mind Stone is Chennaic, India').addTo(mymap);
        const Reality = L.marker([stones[2].lat, stones[2].lon], { icon: realityIcon }).bindPopup('Reality Stone is in Los Angels, US.').addTo(mymap);
        const Power = L.marker([stones[3].lat, stones[3].lon], { icon: powerIcon }).bindPopup('Power Stone is Chennaic, India').addTo(mymap);
        const Time = L.marker([stones[4].lat, stones[4].lon], { icon: timeIcon }).bindPopup('Time Stone is in Los Angels, US.').addTo(mymap);
        const Soul = L.marker([stones[5].lat, stones[5].lon], { icon: soulIcon }).bindPopup('Soul Stone is Chennaic, India').addTo(mymap);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
          language: 'en' 
        }).addTo(mymap);
  
        setTimeout(function () {
            mymap.flyTo([closestStone.lat, closestStone.lon], 13, {
              duration: 120, 
              animate: true
            });
            setTimeout(function(){   
              thanos.setLatLng([closestStone.lat, closestStone.lon]);
             },12000);
            }, 12000);
      } else {
        console.log('Unable to retrieve location information.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  