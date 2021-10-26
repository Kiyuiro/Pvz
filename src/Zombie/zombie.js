import {images, game} from "../constant.js";
import {plants} from "../Plant/plant.js";
import {bullets} from "../Bullet/bullet.js";
import {collision} from "../tools.js";

export let zombie = {
    total: 0,
    lastTime: 100,
    interval: 5000,
    count: [],
}

export function Zombie() {
    this.status = game.zombie.WALK;
    this.img = () => {
        switch (this.status) {
            case game.zombie.WALK:
                return images.zombie.normal.walk;
                break;
            case game.zombie.ATTACK:
                return images.zombie.normal.attack;
                break;
            case game.zombie.HEAD:
                return images.zombie.normal.head;
                break;
            case game.zombie.DIE:
                return images.zombie.normal.die;
                break;
        }
    }
    this.imgIdx = 0;
    this.width = 140;
    this.col = parseInt(Math.random() * 5)
    this.isDestroy = false;
    this.playInterval = 80;
    this.life = 100;
    this.x = 800;
    this.y = this.col * 100 + 20
    this.speed = 20;
    this.damage = 10;
    this.move = () => {
        if (this.status == game.zombie.WALK) {
            this.x -= this.speed / game.FPS;
        }
        // TODO shuould game over, can't destroy
        if (this.x < 200) this.isDestroy = true;
    }
    this.attack = () => {
        // normal zombie attack
        for (let i = 0; i < plants.length; ++i) {
            let o = plants[i];
            if (this.x < o.x - 30 && this.x + this.width > o.x && this.col == o.col) {
                this.status = game.zombie.ATTACK;
                if (this.imgIdx / 2 == 9 && this.playInterval < 0) {
                    o.hurt(this.damage);
                }
                return 0;
            }
        }
        this.status = game.zombie.WALK;
    }
    this.hurt = () => {
        for(let i = 0; i < bullets.length; ++i) {
            let o = bullets[i];
            if(this.x < o.x - o.width && this.x + 110 > o.x  && this.col == o.col) {
                console.log("hurt");
                this.life -= o.damage;
                o.isDestroy = true;
                if (this.life <= 0) this.isDestroy = true;
                game.draw(o.img_hit, o.x, o.y);
            }
        }
    }
    this.draw = () => {
        game.draw(this.img()[this.imgIdx], this.x, this.y);
    }
    this.frame = () => {
        if (this.playInterval < 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img().length;
            this.playInterval = 80;
        }
        this.playInterval -= game.FRAME_TIME;
    }
    this.action = () => {
        if(!this.isDestroy) {
            this.frame()
            this.move();
            this.attack();
            this.hurt();
            this.draw();
        }
    }
}