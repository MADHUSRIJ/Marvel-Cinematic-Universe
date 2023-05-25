// var entered = false;

// const gauntletElement = document.querySelector('.gauntlet');

// gauntletElement.addEventListener('animationend', () => {
//     entered = true;
//     gauntletElement.remove();
// });

// if(entered){
//     gauntletElement.remove();
// }

const stone = document.getElementById('stone');
const thanos = document.getElementById('thanos');
const avengers = document.getElementById('avengers');
const map = document.getElementById('map');

stone.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './stone.html';
});

thanos.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './thanos.html';
});

avengers.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './avengers.html';
});

map.addEventListener('click',(e) => {
    e.preventDefault();
    window.location.href = './map.html';
});
