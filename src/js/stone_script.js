const space = document.getElementById('space');
const mind = document.getElementById('mind');
const reality = document.getElementById('reality');
const power = document.getElementById('power');
const time = document.getElementById('time');
const soul = document.getElementById('soul');

function display(stoneName){
    var stone = document.getElementById(stoneName);
    stone.style.backgroundColor = 'rgba(64, 130, 188, 0.300)';

    var stone_back = document.getElementById(stoneName+' stone-back')
    stone_back.classList.remove('hidden');

    var stone_front = document.getElementById(stoneName+' stone-front');
    stone_front.classList.add('hidden');

}

function hide(stoneName){
    var stone = document.getElementById(stoneName);
    stone.style.backgroundColor = 'rgba(240, 248, 255, 0.144)';

    var stone_back = document.getElementById(stoneName+' stone-back')
    stone_back.classList.add('hidden');

    var stone_front = document.getElementById(stoneName+' stone-front');
    stone_front.classList.remove('hidden');
}

space.addEventListener('mouseenter',() =>  display('space'));
space.addEventListener('mouseleave',() => hide('space'));

time.addEventListener('mouseenter',() =>  display('time'));
time.addEventListener('mouseleave',() => hide('time'));

reality.addEventListener('mouseenter',() =>  display('reality'));
reality.addEventListener('mouseleave',() => hide('reality'));

power.addEventListener('mouseenter',() =>  display('power'));
power.addEventListener('mouseleave',() => hide('power'));

mind.addEventListener('mouseenter',() =>  display('mind'));
mind.addEventListener('mouseleave',() => hide('mind'));

soul.addEventListener('mouseenter',() =>  display('soul'));
soul.addEventListener('mouseleave',() => hide('soul'));



var stoneImage = document.getElementById('stone');
var stoneDialogOverlay = document.querySelector('.stone-dialog-overlay');
var stoneDialogBox = document.querySelector('.stone-dialog-box');

stoneImage.addEventListener('click', function() {
  stoneDialogOverlay.style.display = 'block';
  stoneDialogBox.style.display = 'block';
});

stoneDialogOverlay.addEventListener('click', function() {
  stoneDialogOverlay.style.display = 'none';
  stoneDialogBox.style.display = 'none';
});



// const back = document.getElementById('back');

// back.addEventListener('click',(e) => {
//     e.preventDefault();
//     window.location.href = './home.html';
// });