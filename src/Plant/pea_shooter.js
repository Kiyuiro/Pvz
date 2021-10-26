import {images, game} from "../constant.js";
import {Plant} from "./plant.js";

export class Pea extends Plant {
    constructor(row, col) {
        // (img, row, col, playInterval, attackInterval
        super(images.plant.pea.img, row, col, 70, 1000)
        this.width = 61;
        this.height = 61;
    }
    action() {
        if(this.life <= 0) {
            this.isDestroy = true;
        }
        this.attack();
        this.draw();
    }
}