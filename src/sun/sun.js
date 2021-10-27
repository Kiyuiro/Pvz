import {images, game} from "../common/game.js";

export let sun = {
    lastTime: 100,
    interval: 3000,
    value: 25
}

export function Sun() {
    this.img = images.sun;
    this.imgIdx = 0;
    this.width = 78;
    this.height = 78;
    this.x = 100 + Math.random() * (game.WIDTH - this.width - 200);
    this.y = -this.height;
    this.maxY = Math.random() * 250 + 100;
    this.stayTime = 5000;
    this.playInterval = 50;
    this.speed = 100;
    this.isDestroy = false;
    this.move = () => {
        if(this.y < this.maxY) {
            this.y += this.speed / game.FPS;
        } else {
            this.stayTime -= game.FRAME_TIME;
        }
    }
    this.draw = () => {
        game.draw(this.img[this.imgIdx], this.x, this.y);
    }
    this.action = () => {
        if(this.stayTime < 0) this.isDestroy = true;
        this.playInterval -= game.FRAME_TIME;
        if(this.playInterval < 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img.length;
            this.playInterval = 50;
        }
        this.move();
        this.draw();
    }
}

export function createSun() {
    if (sun.lastTime < 0) {
        sun.lastTime = sun.interval;
        game.suns.push(new Sun());
    } else sun.lastTime -= game.FRAME_TIME;
}