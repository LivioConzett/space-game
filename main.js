
const body = document.querySelector('body');

let CANVAS = document.querySelector('#game-canvas');
let CONTEXT = CANVAS.getContext('2d');
CANVAS.width = body.offsetWidth;
CANVAS.height = body.offsetHeight;

const shipSprite = document.querySelector('#ship');


let deltaTime = 0;
let oldTimeStamp = 0;
const FPS = 1000 / 10;

let keyPress = {
    up:false,
    down:false,
    left:false,
    right:false,
    space:false
}


const spaceShipScale = 5;
const SHIP = new Ship(
    shipSprite,
    spaceShipScale,
    (CANVAS.width / 2) - ((13 * spaceShipScale) / 2),
    CANVAS.height - (18 * spaceShipScale)
)


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
 * Draw the ship
 */
function drawShip(){

    // if(keyPress.left && !keyPress.right){
    //     spaceShipInfo.sourceImage.currentFrame = 1;
    // }
    // else if(keyPress.right && !keyPress.left){
    //     spaceShipInfo.sourceImage.currentFrame = 2;
    // }
    // else{
    //     spaceShipInfo.sourceImage.currentFrame = 0;
    // }

    drawSprite(SHIP);
}


/**
 * Main draw function
 */
function draw(){

    // clear the screen
    CONTEXT.clearRect(0,0,CANVAS.width, CANVAS.height);

    drawShip();
}


/**
 * The main game loop
 */
function mainGameLoop(timeStamp){
    // Calculate how much time has passed
    deltaTime = timeStamp - oldTimeStamp;

    if(deltaTime > FPS){
        oldTimeStamp = timeStamp;
        SHIP.move(deltaTime, keyPress, CANVAS);
        draw();
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
