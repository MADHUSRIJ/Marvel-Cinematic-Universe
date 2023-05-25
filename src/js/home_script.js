const gauntletElement = document.querySelector('.gauntlet');

gauntletElement.addEventListener('animationend', () => {
    console.log("Hey");
    gauntletElement.remove();
});

