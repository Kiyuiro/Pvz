import {images, game} from "../constant.js";
import {bullets} from "../Bullet/bullet.js";
import {PeaBullet} from "../Bullet/pea_bullet.js";

export let plants = [];

export class Plant {
    constructor(img, row, col, playInterval, attackInterval) {
        this.img = img;
        this.imgIdx = 0;
        this.width = this.img[0].width;
        this.height = this.img[0].height;
        this.x = 255 + 82 * row;
        this.y = 90 + 100 * col;
        this.row = row;
        this.col = col;
        this.isDestroy = false;
        this.life = 100;
        this.playInterval = playInterval;
        this.playIntervalSave = playInterval;
        this.attackInterval = attackInterval;
        this.attackIntervalSave = attackInterval;
    }

    attack() {
        this.attackInterval -= game.FRAME_TIME;
        if(this.attackInterval < 0) {
            bullets.push(new PeaBullet(this.x, this.y, this.col))
            this.attackInterval = this.attackIntervalSave;
        }
    }

    frame() {
        this.playInterval -= game.FRAME_TIME;
        if(this.playInterval < 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img.length;
            this.playInterval = this.playIntervalSave;
        }
    }

    draw() {
        this.frame();
        game.draw(this.img[this.imgIdx], this.x, this.y);
    }

    hurt(damage) {
        this.life -= damage;
    }
}