import {game, images} from "../common/game.js";
import {colCollision} from "../common/tools.js";

export let bullets = [];

export class Bullet {
    constructor(img, img_hit, x, y, col, speed, damage, width, offset) {
        this.img = img
        this.img_hit = img_hit
        this.x = x;
        this.y = y;
        this.col = col;
        this.width = width;
        this.offset = offset
        this.speed = speed;
        this.damage = damage;
        this.isDestroy = false;
    }

    move() {
        if (this.x > 1200) this.isDestroy = true;
        this.x += this.speed / game.FPS
    }

    attack() {
        for (let i = 0; i < game.zombies.length; ++i) {
            let o = game.zombies[i];
            if (colCollision(this.x + this.offset, this.width, o.x + o.offset, o.width) && this.col == o.col) {
                o.hurt(this.damage);
                this.isDestroy = true;
                game.draw(this.img_hit, this.x, this.y);
            }
        }
    }

    draw() {
        game.draw(this.img, this.x, this.y);
    }
}

export class PeaBullet extends Bullet {
    constructor(x, y, col) {
        // img, img_hit, x, y, col, speed, damage, width, offset
        super(images.plant.pea.bullet, images.plant.pea.bullet_hit, x, y, col, 130, 10, 28, 28);
    }

    action() {
        // game.drawRect(this.x + this.offset, this.y, this.width, 30);
        if (!this.isDestroy) {
            this.move();
            this.draw();
            this.attack();
        }
    }
}

export function Sun(x, y) {
    this.img = images.sun;
    this.imgIdx = 0;
    this.width = 78;
    this.height = 78;
    this.x = x;
    this.y = y;
    this.defX = x;
    this.defY = y - 20;
    this.offsetX = parseInt(Math.random() * 2) == 0 ? -1 : 1; // [0, 20]
    this.speed = 30;
    this.existTime = 8000;
    this.playInterval = 50;
    this.isDestroy = false;
    this.move = () => {
        if (Math.abs(this.offsetX) < 25) {
            if (this.offsetX < 0) this.offsetX -= this.speed / game.FPS;
            else this.offsetX += this.speed / game.FPS;
        }
        this.x = this.defX + this.offsetX;
        this.y = this.defY + Math.pow((0.3 * this.offsetX), 2) - 20;
        this.stayTime -= game.FRAME_TIME;
        this.existTime -= game.FRAME_TIME;
        if (this.existTime < 0) this.isDestroy = true;
    }
    this.frame = () => {
        this.playInterval -= game.FRAME_TIME;
        if (this.playInterval < 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img.length;
            this.playInterval = 50;
        }
    }
    this.draw = () => {
        this.frame();
        game.draw(this.img[this.imgIdx], this.x, this.y);
    }
    this.action = () => {
        this.move();
        this.draw();
    }
}