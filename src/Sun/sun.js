import {images, game} from "../constant.js";

let total = 0;
let suns = []

export let sun = {
    total: 0,
    lastTime: 100,
    interval: 3000,
    count: [],
}

export function Sun() {
    this.img = images.sun;
    this.imgIdx = 0;
    this.width = this.img[0].width
    this.height = this.img[0].height;
    this.x = 100 + Math.random() * (game.width - this.width - 200);
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