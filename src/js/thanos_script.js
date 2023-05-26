const back = document.getElementById('back');

back.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './home.html';
});
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
  
  console.log("Start Latitude:", startLatitude);
  console.log("Start Longitude:", startLongitude);
  
  var targetLatitude1 = 34.0522;
  var targetLongitude1 = -118.2437;

  var targetLatitude2 = 13.0827;
  var targetLongitude2 = 80.2707;

  
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
            iconSize: [50, 100],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          }
        });
  
        const thanosIcon = new Icon({ iconUrl: './assets/images/thanos.png' });
        const spaceIcon = new Icon({ iconUrl: './assets/images/Space_Stone_VFX.png' });
        const mindIcon = new Icon({ iconUrl: './assets/images/Mind_Stone_VFX.png' });
  
        const thanos = L.marker([startLatitude, startLongitude], { icon: thanosIcon }).bindPopup('Thanos is in ' + location).addTo(mymap);
        const Space = L.marker([targetLatitude1, targetLongitude1], { icon: spaceIcon }).bindPopup('Space Stone is in Los Angels, US.').addTo(mymap);
        const Mind = L.marker([targetLatitude2, targetLongitude2], { icon: mindIcon }).bindPopup('Space Stone is Chennaic, India').addTo(mymap);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
          language: 'en' 
        }).addTo(mymap);
  
        setTimeout(function () {
            
            mymap.flyTo([targetLatitude1, targetLongitude1], 13, {
              duration: 120, 
              animate: true
            });
            console.log("Final Latitude:", targetLatitude1);
            console.log("Final Longitude:", targetLongitude1);

            setTimeout(function(){   
             thanos.setLatLng([targetLatitude1, targetLongitude1]);
            },12000);
    
            setTimeout(function () {
              mymap.flyTo([targetLatitude2, targetLongitude2], 13, {
                duration: 120,  
                animate: true
              });
              setTimeout(function(){
                thanos.setLatLng([targetLatitude2, targetLongitude2]);
              },24000);
              console.log("Final Latitude:", targetLatitude2);
              console.log("Final Longitude:", targetLongitude2);
            }, 120000);});
      } else {
        console.log('Unable to retrieve location information.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  