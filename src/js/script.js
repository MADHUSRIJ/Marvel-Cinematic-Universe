const form = document.getElementById('myForm');
const input = document.getElementById('myInput');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = './src/home.html';
  });

  var contactContainer = document.getElementById("contact-container");

  contactContainer.addEventListener("keydown", function(event) {
    var currentScrollPosition = contactContainer.scrollTop;
    
    if (event.key === "ArrowDown") {
      contactContainer.scrollTop += 100; 
      event.preventDefault(); 
    } else if (event.key === "ArrowUp") {
      contactContainer.scrollTop -= 100; 
      event.preventDefault(); 
    }
  });
  
  