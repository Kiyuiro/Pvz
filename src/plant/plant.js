import {images, game} from "../common/game.js";
import {PeaBullet} from "./bullet.js";

export let plants = [];

export class Plant {
    constructor(img, row, col, playInterval, attackInterval, width, offset) {
        this.img = img;
        this.imgIdx = 0;
        this.width = width;
        this.height = this.img[0].height;
        this.offset = offset;
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

    attack(bullet) {
        this.attackInterval -= game.FRAME_TIME;
        if(this.attackInterval < 0) {
            game.bullets.push(bullet);
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

export class Pea extends Plant {
    constructor(row, col) {
        // (img, row, col, playInterval, attackInterval
        super(images.plant.pea.img, row, col, 70, 1000, 61, 0)
    }
    action() {
        // game.drawRect(this.x + this.offset, this.y, this.width, 61);
        if(this.life <= 0) {
            this.isDestroy = true;
        }
        this.attack(new PeaBullet(this.x, this.y, this.col));
        this.draw();
    }
}

export class Corn extends Plant {
    
}