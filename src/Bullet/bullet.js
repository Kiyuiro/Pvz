import {game, images} from "../constant.js";
import {collision} from "../tools.js";
import {zombie} from "../Zombie/zombie.js"

export let bullets = [];

export class Bullet {
    constructor(img, img_hit, x, y, col, speed, damage) {
        this.img = img
        this.img_hit = img_hit
        this.x = x;
        this.y = y;
        this.col = col;
        this.width = this.img.width;
        this.height = this.img.height;
        this.speed = speed;
        this.damage = damage;
        this.isDestory = false;
    }

    move() {
        if (this.x > 1200) this.isDestory = true;
        this.x += this.speed / game.FPS
    }

    attack() {
        for(let i = 0; i < zombie.count.length; ++i) {
            let o = zombie.count[i];
            if(this.x + this.width > o.x && this.col == o.col) {
                o.life -= 20;
                this.isDestory = true;
                game.draw(this.img_hit, this.x, this.y);
            }
        }
    }

    draw() {
        game.draw(this.img, this.x, this.y);
    }
}