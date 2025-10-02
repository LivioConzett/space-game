
class Ship {
    constructor(img, scale, x, y){
        this.img = img;
        this.sourceImage = {
            width: 320,
            height: 320,
            frameAmount: 1,
            currentFrame: 0
        };
        this.destImage = {
            width: 16 * scale,
            height: 16 * scale
        };
        this.slowDown = 0;
        this.speedUp = 1;
        this.x = x;
        this.y = y;
        this.direction = {
            x: 0,
            y: 0
        }
    }

    moveY(screen){
        this.y += this.direction.y;

        if(this.y < 0){
            this.y = 0;
            this.direction.y = 0;
            return;
        }

        if((this.y + this.destImage.height) > screen.height){
            this.y = screen.height - this.destImage.height;
            this.direction.y = 0;
        }
    }


    moveX(screen){
        this.x += this.direction.x;

        if(this.x < 0){
            this.x = 0;
            this.direction.x = 0;
            return;
        }

        if((this.x + this.destImage.width) > screen.width){
            this.x = screen.width - this.destImage.width;
            this.direction.x = 0;
        }
    }


    move(deltaTime, keys, screenSize){

        //console.log(this.direction.y, this.direction.x);
        //console.log(this.x, this.y);

        const speedUp = this.speedUp * (deltaTime / 100);
        const slowDown = this.slowDown * (deltaTime / 100);

        if(keys.up){
            this.direction.y -= speedUp;
        }

        if(keys.down){
            this.direction.y += speedUp;
        }

        if(keys.right){
            this.direction.x += speedUp;
        }

        if(keys.left){
            this.direction.x -= speedUp;
        }


        this.moveY(screenSize);
        this.moveX(screenSize);
    }

}