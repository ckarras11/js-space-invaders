const canvas = document.querySelector('#game');
const c = canvas.getContext('2d');
const upImg = document.querySelector('#up');
const downImg = document.querySelector('#down');

import Ship from './ship';
import Bullet from './bullet';
import Enemy from './enemy';


canvas.width = 600;
canvas.height = 400;


let map = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,
]

let paused = false
const ship = new Ship;
let bullets;
let enemies;
let direction;
let score;
let roundsLeft;
let screen;
let edge = false;
const w = canvas.width;
const h = canvas.height;

function initializeGame() {
    bullets = [];
    enemies = [];
    direction = 0;
    score = 0;
    roundsLeft = 45;
    screen = 'playing';
    createEnemies();
}

function animate() {
    window.requestAnimationFrame(animate)
    switch(screen){
        case 'playing':
            playing();
            break;
        case 'win':
            win();
            break;
        case 'lose':
            lose();
            break;
    } 
}

function playing() {
    if(!paused){
        drawCanvas();
        displayScore();
        displayAmmo();
        ship.show();
        ship.move(direction)
        bullets.forEach(bullet => {
            bullet.show();
            bullet.fire();
        })
        handleCollisions();
        renderEnemies();
        handleEnd();
    }
}

function lose() {
    drawCanvas();
    displayMsg('red', 'center', 40, 'Game Over!', w / 2, h / 2)
    displayMsg('red', 'center', 25, `You ran out of ammo with ${enemies.length} enemies remaining`, w / 2, (h / 2) + 40)
    displayMsg('red', 'center', 25, 'Press "R" to restart', w / 2, h - 10)
}

function win() {
    drawCanvas();
    displayMsg('lime', 'center', 40, 'You destroyed all of the Aliens', w / 2, h / 2)
    displayMsg('lime', 'center', 25, 'Press "R" to restart', w / 2, h - 10)
}

function displayMsg(color, align, fontSize, msg, x, y) {
    c.fillStyle = color;
    c.textAlign = align;
    c.font = `${fontSize}px Arial`;
    c.fillText(msg, x, y);
}

function handleEnd() {
    if(enemies.length === 0) {
        screen = 'win';
    }
    if(roundsLeft === 0 && bullets.length === 0 && enemies.length > 0) {
        screen = 'lose';
    }
}

function displayAmmo() {
    displayMsg('white', 'start', 20, `Ammo - ${roundsLeft}`, 100, 20);
}

function displayScore() {
    displayMsg('white', 'start', 20, `Score ${score}`, 10, 20);
}

function createEnemies() {
    for(let i = 0; i <= map.length; i++) {
        if(map[i] === 1) {
            const enemy = new Enemy((i % 30) * 20 , Math.floor(i/30) * 20)
            enemies.push(enemy);
        }
    }
}

function drawCanvas() {
    c.clearRect(0, 0, w, h);
    c.fillStyle = 'black';
    c.fillRect(0,0,w, h)
}

function renderEnemies() {
    for(let i = enemies.length -1 ; i >= 0; i--) {
        if(!enemies[i].destroyed) {
            enemies[i].show()
            enemies[i].move()
        } else if (enemies[i].destroyed){
            enemies.splice(i, 1)
        }
    }
    enemies.forEach(enemy => {
        if(enemy && enemy.x + enemy.width >= w || enemy.x < 0) {
            edge = true
        }
    })
    if(edge) {
        enemies.forEach(enemy => {
            enemy.shift()  
        })
        edge = false
    }
}

function handleCollisions() {
    for(let i = bullets.length-1; i >= 0; i-- ){
        enemies.forEach(enemy => {
            if(!enemy.destroyed) {
                if(bullets[i] && bullets[i].y <= enemy.y && bullets[i].y >= enemy.y - enemy.height && bullets[i].x <= enemy.x + enemy.width && bullets[i].x >= enemy.x) {
                    bullets.splice(i, 1)
                    enemy.destroy()
                    score +=1
                }
            }
        })
        if(bullets[i] && bullets[i].y <= 0) {
            bullets.splice(i, 1)
        }
    }
}

window.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft') {
        direction = -1
    }
    if(e.key === 'ArrowRight') {
        direction = 1
    }
    if(e.key === ' ') {
        if(roundsLeft !== 0 && bullets.length === 0) {
            const bullet = new Bullet(ship.x + ship.width / 2 , ship.y);
            bullets.push(bullet);
            roundsLeft --; 
        }
    }
    if(e.key === 'p') {
        paused = !paused
    }
    if(e.key === 'r') {
        initializeGame()
    }
})

window.addEventListener('keyup', e => {
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        direction = 0
    }
})


initializeGame();
animate();