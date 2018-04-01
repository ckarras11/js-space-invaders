const canvas = document.querySelector('#game');
const c = canvas.getContext('2d');
const upImg = document.querySelector('#up');
const downImg = document.querySelector('#down');

class Enemy {
    constructor(x, y) {
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.destroyed = false
        this.xdir = .5;
    }
    show() {
        c.drawImage(downImg, this.x, this.y, this.width, this.height)    
    }
    destroy() {
        this.destroyed = true
    }
    move() {
        this.x += this.xdir
    }
    shift() {
        this.y += this.height /2;
        this.xdir *= -1;
    }
}

export default Enemy