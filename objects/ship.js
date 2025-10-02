
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
        this.maxSpeed = 200;
        this.slowDown = 0;
        this.speedUp = 1;
        this.x = x;
        this.y = y;
        this.direction = {
            up: 0,
            down: 0,
            left: 0,
            right: 0
        }
    }

    goUp(screen){
        this.y -= this.direction.up;

        if(this.y < 0){
            this.y = 0;
            this.direction.up = 0;
        }
    }

    goDown(screen){
        this.y += this.direction.down;

        if((this.y + this.destImage.height) > screen.height){
            this.y = body.offsetHeight - this.destImage.height;
            this.direction.down = 0;
        }
    }

    goLeft(screen){
        this.x -= this.direction.left;

        if(this.x < 0){
            this.x = 0;
            this.left = 0;
        }
    }

    goRight(screen){
        this.x += this.direction.right;

        if((this.x + this.destImage.width) > screen.width){
            this.x = screen.width - this.destImage.width;
            this.direction.right = 0;
        }
    }

    move(deltaTime, keys, screenSize){

        //console.log(deltaTime / 100);

        const speedUp = this.speedUp * (deltaTime / 100);
        const slowDown = this.slowDown * (deltaTime / 100);

        //console.log(this.speedUp);

        // speed up ===============================
        if(keys.up && this.direction.up < this.maxSpeed){
            this.direction.up += this.speedUp;
            if(this.direction.up > this.maxSpeed){
                this.direction.up = this.maxSpeed;
            }
        }

        if(keys.down && this.direction.down < this.maxSpeed){
            this.direction.down += this.speedUp;
            if(this.direction.down > this.maxSpeed){
                this.direction.down = this.maxSpeed;
            }
        }

        if(keys.right && this.direction.right < this.maxSpeed){
            this.direction.right += this.speedUp;
            if(this.direction.right > this.maxSpeed){
                this.direction.right = this.maxSpeed;
            }
        }

        if(keys.left && this.direction.left < this.maxSpeed){
            this.direction.left += this.speedUp;
            if(this.direction.left > this.maxSpeed){
                this.direction.left = this.maxSpeed;
            }
        }

        // slowdown ====================================

        if(!keys.up && this.direction.up > 0){
            this.direction.up -= this.slowDown;
            if(this.direction.up < 0){
                this.direction.up = 0;
            }
        }

        if(!keys.down && this.direction.down > 0){
            this.direction.down -= this.slowDown;
            if(this.direction.down < 0){
                this.direction.down = 0;
            }
        }

        if(!keys.right && this.direction.right > 0){
            this.direction.right -= this.slowDown;
            if(this.direction.right < 0){
                this.direction.right = 0;
            }
        }

        if(!keys.left && this.direction.left > 0){
            this.direction.left -= this.slowDown;
            if(this.direction.left < 0){
                this.direction.left = 0;
            }
        }

        this.goUp(screenSize);
        this.goDown(screenSize);
        this.goLeft(screenSize);
        this.goRight(screenSize);
    }

}