const backgrounds = [
    'assets/background/Bowls.jpg',
    'assets/background/shakes.jpeg'
];

const layers = [
    document.getElementById('bg-layer-1'),
    document.getElementById('bg-layer-2')
];

layers[0].style.backgroundImage = `url('${backgrounds[0]}')`;
layers[1].style.backgroundImage = `url('${backgrounds[1]}')`;

let currentLayer = 0;

function switchBackground() {
    layers[currentLayer].classList.remove('active');
    currentLayer = 1 - currentLayer;
    layers[currentLayer].classList.add('active');
}

setInterval(switchBackground, 15000);
