const canvas = document.querySelector('#game');
const c = canvas.getContext('2d');
class Bullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 15;
        this.x = x;
        this.y = y;
    }
    show() {
        c.fillStyle = 'white';
        c.fillRect (this.x, this.y, this.width, this.height);
    }
    fire () {
        this.y -= 5
    }
}
export default Bullet