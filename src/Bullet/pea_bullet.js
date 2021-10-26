import {game, images} from "../constant.js";
import {Bullet} from "./bullet.js"

export class PeaBullet extends Bullet {
    constructor(x, y, col) {
        // img, img_hit, x, y, col, speed, damage, type
        super(images.plant.pea.bullet, images.plant.pea.bullet_hit, x, y, col, 130, 10);
    }
    action() {
        if (!this.isDestory) {
            this.move();
            this.draw();
        }
    }
}