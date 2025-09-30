
const body = document.querySelector('body');

let CANVAS = document.querySelector('#game-canvas');
let CONTEXT = CANVAS.getContext('2d');
CANVAS.width = body.offsetWidth;
CANVAS.height = body.offsetHeight;

const shipSprite = document.querySelector('#ship');


let deltaTime = 0;
let oldTimeStamp = 0;
const FPS = 1000 / 24;

let keyPress = {
    up:false,
    down:false,
    left:false,
    right:false,
    space:false
}

let directions = {
    up:0,
    down:0,
    left:0,
    right:0
}


const spaceShipScale = 5;
let spaceShipInfo = {
    img:shipSprite,
    sourceImage:{
        width: 320,
        height: 320,
        frameAmount: 1,
        currentFrame: 0
    },
    destImage:{
        width: 16 * spaceShipScale,
        height: 16 * spaceShipScale
    },
    maxSpeed: 200,
    slowDown: 0,
    speedUp: 1,
    x: (body.offsetWidth / 2) - ((13 * spaceShipScale) / 2),
    y: body.offsetHeight - (18 * spaceShipScale),
    show: true,
    health: 100
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

// move the ship =====================================

function goUp(){
    spaceShipInfo.y -= directions.up;

    if(spaceShipInfo.y < 0){
        spaceShipInfo.y = 0;
        directions.up = 0;
    }
}

function goRight(){
    spaceShipInfo.x += directions.right;

    if((spaceShipInfo.x + spaceShipInfo.destImage.width) > CANVAS.width){
        spaceShipInfo.x = CANVAS.width - spaceShipInfo.destImage.width;
        directions.right = 0;
    }
}

function goLeft(){
    spaceShipInfo.x -= directions.left;

    if(spaceShipInfo.x < 0){
        spaceShipInfo.x = 0;
        directions.left = 0;
    }
}

function goDown(){
    spaceShipInfo.y += directions.down;

    if((spaceShipInfo.y + spaceShipInfo.destImage.height) > body.offsetHeight){
        spaceShipInfo.y = body.offsetHeight - spaceShipInfo.destImage.height;
        directions.down = 0;
    }
}

/**
 * Move the ship
 */
function moveShip(){

    //console.log(deltaTime / 100);

    const speedUp = spaceShipInfo.speedUp * (deltaTime / 100);
    const slowDown = spaceShipInfo.slowDown * (deltaTime / 100);

    //console.log(spaceShipInfo.speedUp);

    // speed up ===============================
    if(keyPress.up && directions.up < spaceShipInfo.maxSpeed){
        directions.up += speedUp;
        if(directions.up > spaceShipInfo.maxSpeed){
            directions.up = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.down && directions.down < spaceShipInfo.maxSpeed){
        directions.down += speedUp;
        if(directions.down > spaceShipInfo.maxSpeed){
            directions.down = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.right && directions.right < spaceShipInfo.maxSpeed){
        directions.right += speedUp;
        if(directions.right > spaceShipInfo.maxSpeed){
            directions.right = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.left && directions.left < spaceShipInfo.maxSpeed){
        directions.left += speedUp;
        if(directions.left > spaceShipInfo.maxSpeed){
            directions.left = spaceShipInfo.maxSpeed;
        }
    }

    // slowdown ====================================

    if(!keyPress.up && directions.up > 0){
        directions.up -= slowDown;
        if(directions.up < 0){
            directions.up = 0;
        }
    }

    if(!keyPress.down && directions.down > 0){
        directions.down -= slowDown;
        if(directions.down < 0){
            directions.down = 0;
        }
    }

    if(!keyPress.right && directions.right > 0){
        directions.right -= slowDown;
        if(directions.right < 0){
            directions.right = 0;
        }
    }

    if(!keyPress.left && directions.left > 0){
        directions.left -= slowDown;
        if(directions.left < 0){
            directions.left = 0;
        }
    }

    goUp();
    goDown();
    goLeft();
    goRight();
}


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

    drawSprite(spaceShipInfo);
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
        moveShip();
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
