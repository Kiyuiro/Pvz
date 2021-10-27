import {images, game} from "../common/game.js";
import {colCollision} from "../common/tools.js";

const STATUS = {
    WALK: 1,
    ATTACK: 2,
    DIE: 4,
}

class Zombie {
    constructor(img, col, life, speed, damage, width, offset) {
        this.status = STATUS.WALK;
        this.img = () => {
            switch (this.status) {
                case STATUS.WALK:
                    return img.walk;
                    break;
                case STATUS.ATTACK:
                    return img.attack;
                    break;
                case STATUS.DIE:
                    return img.die;
                    break;
            }
        }
        this.imgIdx = 0;
        this.width = width;
        this.offset = offset;
        this.isDestroy = false;
        this.playInterval = 80;
        this.life = life;
        this.x = 800;
        this.y = col * 100 + 20
        this.col = col;
        this.speed = speed;
        this.damage = damage;
    }

    frame() {
        if (this.playInterval < 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img().length;
            this.playInterval = 80;
        }
        this.playInterval -= game.FRAME_TIME;
    }

    draw() {
        if (this.status == STATUS.DIE) {
            // TODO die animation
        } else game.draw(this.img()[this.imgIdx], this.x, this.y);
        this.frame();
    }

    move() {
        if (this.status == STATUS.WALK) {
            this.x -= this.speed / game.FPS;
        }
        // TODO shuould game over, can't destroy
        if (this.x < 200) this.isDestroy = true;
    }

    attack() {
        for (let i = 0; i < game.plants.length; ++i) {
            let o = game.plants[i];
            if (colCollision(this.x + this.offset, this.width, o.x + o.offset, o.width) && this.col == o.col) {
                this.status = STATUS.ATTACK;
                if (this.imgIdx / 2 == 9 && this.playInterval < 0) {
                    o.hurt(this.damage);
                }
                return 0;
            }
        }
        this.status = STATUS.WALK;
    }
}

export class NormalZombie extends Zombie {
    constructor(col) {
        // img, col, life, speed, damage, width, offset
        super(images.zombie.normal, col, 100, 20, 50, 60, 80);
    }

    hurt(damage) {
        this.life -= damage;
    }

    action() {
        // game.drawRect(this.x + this.offset, this.y, this.width, 100);
        if(this.life <= 0) {
            this.isDestroy = true;
            this.status = STATUS.DIE;
        }
        if (!this.isDestroy) {
            this.move();
            this.attack();
        }
        this.draw();
    }
}