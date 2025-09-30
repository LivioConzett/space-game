
let CANVAS = document.querySelector('#game-canvas');
let CONTEXT = CANVAS.getContext('2d');


let deltaTime = 0;
let oldTimeStamp = 0;
const FPS = 1000 / 1;

let keyPress = {
    up:false,
    down:false,
    left:false,
    right:false,
    space:false
}

const spaceShipScale = 4;
let spaceShipInfo = {
    img:spaceShip,
    sourceImage:{
        width: 91,
        height: 378,
        frameAmount: 3,
        currentFrame: 0
    },
    destImage:{
        width: 13 * spaceShipScale,
        height: 18 * spaceShipScale
    },
    maxSpeed: 300,
    slowDown: 400,
    speedUp: 400,
    x: (body.offsetWidth / 2) - ((13 * spaceShipScale) / 2),
    y: body.offsetHeight - (18 * spaceShipScale),
    show: true,
    health: 100,
    ammo: 200,
    enemyDowned: 0
}

document.addEventListener('keydown', (e) => {

    // console.log(e.code);
    switch(e.code){
        case 'ArrowUp':
        case 'KeyW':
            keyPress.up = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyPress.down = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keyPress.left = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyPress.right = true;
            break;
        case 'Space':
            keyPress.space = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {

    // console.log(e.code);
    switch(e.code){
        case 'ArrowUp':
        case 'KeyW':
            keyPress.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyPress.down = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keyPress.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyPress.right = false;
            break;
        case 'Space':
            keyPress.space = false;
            break;
        // case 'KeyP':
        //     togglePause();
        //     break;
        // case 'Escape':
        //     togglePause();
        //     break;
    }
});


/**
 * Function to draw a sprite
 * @param sprite Sprite to draw
 */
function drawSprite(sprite){
    CONTEXT.drawImage(
        sprite.img,
        0,
        sprite.sourceImage.height / sprite.sourceImage.frameAmount * sprite.sourceImage.currentFrame,
        sprite.sourceImage.width,
        sprite.sourceImage.height / sprite.sourceImage.frameAmount,
        sprite.x,
        sprite.y,
        sprite.destImage.width,
        sprite.destImage.height
    );
}



/**
 * The main game loop
 */
function mainGameLoop(timeStamp){
    // Calculate how much time has passed
    deltaTime = timeStamp - oldTimeStamp;

    if(deltaTime > FPS){
        oldTimeStamp = timeStamp;
        console.log("hello");
    }


    // get the game running
    window.requestAnimationFrame(mainGameLoop);
}

/**
 * Initialize the game
 */
function init(){


    // get the game running
    window.requestAnimationFrame(mainGameLoop);
}

console.log("loaded main");

init();
