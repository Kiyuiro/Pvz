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
        for(let i = 0; i < game.zombies.length; ++i) {
            let o = game.zombies[i];
            if(colCollision(this.x + this.offset, this.width, o.x + o.offset, o.width) && this.col == o.col) {
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