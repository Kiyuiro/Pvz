import {game, images, card, price} from "./constant.js";
import {Sun, sun} from "./Sun/sun.js";
import {zombie, Zombie} from "./zombie/zombie.js";
import {Pea} from "./Plant/pea_shooter.js";
import {plants} from "./Plant/plant.js";
import {getPointOnCanvas, collision} from "./tools.js";
import {bullets} from "./Bullet/bullet.js";

function addObject(arr, type) {
    if (arr.lastTime < 0) {
        arr.lastTime = arr.interval;
        arr.count.push(type);
    } else arr.lastTime -= game.FRAME_TIME;
}

function create() {
    addObject(sun, new Sun())
    addObject(zombie, new Zombie())
}

let selectSeed = 0;
let point = {x: 0, y: 0}

function action() {
    // draw background
    game.draw(images.background.grass, 0, 0)

    // draw sun
    game.draw(images.sunBank, 15, 10)
    game.write(sun.total, 28, 90);

    if (selectSeed != 0) {
        game.draw(images.plant.pea.img[0], point.x - 35, point.y - 45);
    }

    // plant
    for (let i = 0; i < plants.length; ++i) {
        plants[i].action();
    }

    // zombie
    for (let i = 0; i < zombie.count.length; ++i) {
        zombie.count[i].action();
    }

    // bullet
    for (let i = 0; i < bullets.length; ++i) {
        bullets[i].action();
    }

    // sun
    for (let i = 0; i < sun.count.length; ++i) {
        sun.count[i].action();
    }

    // draw card
    game.draw(images.plant.pea.card, card._1.x, card._1.y)
    game.draw(images.plant.pea.card, card._2.x, card._2.y)
    game.draw(images.plant.pea.card, card._3.x, card._3.y)
    game.draw(images.plant.pea.card, card._4.x, card._4.y)
    game.draw(images.plant.pea.card, card._5.x, card._5.y)
    game.draw(images.plant.pea.card, card._6.x, card._6.y)
    game.draw(images.plant.pea.card, card._7.x, card._7.y)
    game.draw(images.plant.pea.card, card._8.x, card._8.y)
    game.draw(images.plant.pea.card, card._9.x, card._9.y)
}

function destroy() {
    // sun
    for (let i = 0; i < sun.count.length; ++i) {
        if (sun.count[i].isDestroy) {
            sun.count.splice(i, 1);
        }
    }
    // zombie
    for (let i = 0; i < zombie.count.length; ++i) {
        if (zombie.count[i].isDestroy) {
            zombie.count.splice(i, 1);
        }
    }
    // plant
    for (let i = 0; i < plants.length; ++i) {
        if (plants[i].isDestroy) {
            plants.splice(i, 1);
        }
    }
    // bullet
    for (let i = 0; i < bullets.length; ++i) {
        if (bullets[i].isDestroy) {
            bullets.splice(i, 1);
        }
    }
}

function seedChoose(x, y) {
    if (collision(card._1.x, card._1.y, card.width, card.height, x, y, 1, 1))
        return 1;
    if (collision(card._2.x, card._2.y, card.width, card.height, x, y, 1, 1))
        return 2;
    if (collision(card._3.x, card._3.y, card.width, card.height, x, y, 1, 1))
        return 3;
    if (collision(card._4.x, card._4.y, card.width, card.height, x, y, 1, 1))
        return 4;
    if (collision(card._5.x, card._5.y, card.width, card.height, x, y, 1, 1))
        return 5;
    if (collision(card._6.x, card._6.y, card.width, card.height, x, y, 1, 1))
        return 6;
    if (collision(card._7.x, card._7.y, card.width, card.height, x, y, 1, 1))
        return 7;
    if (collision(card._8.x, card._8.y, card.width, card.height, x, y, 1, 1))
        return 8;
    if (collision(card._9.x, card._9.y, card.width, card.height, x, y, 1, 1))
        return 9;
    return 0;
}

document.getElementById("canvas").onclick = (k) => {
    let p = getPointOnCanvas(k.x, k.y);
    // sun
    for (let i = 0; i < sun.count.length; ++i) {
        let o = sun.count[i];
        if (collision(o.x, o.y, o.width, o.height, p.x, p.y, 1, 1)) {
            o.isDestroy = true;
            sun.total += price.sun;
            return 0;
        }
    }
    if (collision(card._1.x, card._1.y, 530, card.height, p.x, p.y, 1, 1)) {
        selectSeed = seedChoose(p.x, p.y);
    }
    // seed pea shooter
    if (selectSeed != 0 && collision(255, 80, 720, 485, p.x, p.y, 1, 1)) {
        let row = parseInt((975 - p.x) / 80);
        let col = parseInt((565 - p.y) / 93);
        plants.push(new Pea(Math.abs(row - 8), Math.abs(col - 4)));
        sun.total -= price.pea;
        selectSeed = 0;
    }
}

document.getElementById("canvas").onmousemove = (k) => {
    point = getPointOnCanvas(k.x, k.y);
}

function main() {
    game.setPen(25, "black");
    setInterval(() => {

        create();

        action();

        destroy();

    }, game.FRAME_TIME);
}

main();