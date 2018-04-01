const canvas = document.querySelector('#game');
const c = canvas.getContext('2d');
class Ship {
    constructor() {
        this.width = 50;
        this.height = 20;
        this.x = canvas.width / 2;
        this.y = canvas.height - (this.height + 10);
    }

    show() {
        c.fillStyle = 'white';
        c.fillRect (this.x, this.y, this.width, this.height);
    }  

    move(dir) {
        if(this.x <= 0 && dir === -1 || this.x + this.width >= canvas.width && dir === 1) {
            return
        }
        this.x += dir * 3
       
    }
}

export default Ship