import {collision} from "../common/tools.js";
import {game, card, CODE, PLANTPRICE, images} from "../common/game.js";
import {Pea, SunFlower} from "../plant/plant.js";

export function pickUpSun(x, y) {
    for (let i = 0; i < game.suns.length; ++i) {
        let o = game.suns[i];
        if (collision(o.x, o.y, o.width, o.height, x, y, 1, 1)) {
            o.isDestroy = true;
            game.sun += 25;
            return 0;
        }
    }
}

export function setPlantCode(x, y) {
    if (collision(card._1.x, card._1.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._1.code, images.plant.sun_flower.img[0]);
    else if (collision(card._2.x, card._2.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._2.code, images.plant.pea.img[0]);
    else if (collision(card._3.x, card._3.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._3.code, images.plant.pea.img[0]);
    else if (collision(card._4.x, card._4.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._4.code, images.plant.pea.img[0]);
    else if (collision(card._5.x, card._5.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._5.code, images.plant.pea.img[0]);
    else if (collision(card._6.x, card._6.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._6.code, images.plant.pea.img[0]);
    else if (collision(card._7.x, card._7.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._7.code, images.plant.pea.img[0]);
    else if (collision(card._8.x, card._8.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._8.code, images.plant.pea.img[0]);
    else if (collision(card._9.x, card._9.y, card.width, card.height, x, y, 1, 1))
        SelectPlant(card._9.code, images.plant.pea.img[0]);
}

export function plant(x, y) {
    let row = Math.abs(parseInt((975 - x) / 80) - 8);
    let col = Math.abs(parseInt((565 - y) / 93) - 4);
    switch (game.selectPlant.code) {
        case CODE.PEA:
            addPlant(new Pea(row, col), PLANTPRICE.PEA);
            break;
        case CODE.SUNFLOWER:
            addPlant(new SunFlower(row, col), PLANTPRICE.SUNFLOWER);
            break;
    }
    // 放下植物后归 0, 表示当前没有选择植物
    game.selectPlant.code = 0;
}

function addPlant(plant, price, img) {
    if (game.sun < price) return;
    game.plants.push(plant);
    game.sun -= price;
}

function SelectPlant(code, img) {
    game.selectPlant.code = code;
    game.selectPlant.card = img;
}