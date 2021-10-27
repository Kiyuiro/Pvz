import {collision} from "../common/tools.js";
import {game, card, CODE, PLANTPRICE} from "../common/game.js";
import {Pea} from "../plant/plant.js";

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
        game.plantCode = card._1.code;
    else if (collision(card._2.x, card._2.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._2.code;
    else if (collision(card._3.x, card._3.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._3.code;
    else if (collision(card._4.x, card._4.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._4.code;
    else if (collision(card._5.x, card._5.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._5.code;
    else if (collision(card._6.x, card._6.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._6.code;
    else if (collision(card._7.x, card._7.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._7.code;
    else if (collision(card._8.x, card._8.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._8.code;
    else if (collision(card._9.x, card._9.y, card.width, card.height, x, y, 1, 1))
        game.plantCode = card._9.code;
}

export function plant(x, y) {
    let row = Math.abs(parseInt((975 - x) / 80) - 8);
    let col = Math.abs(parseInt((565 - y) / 93) - 4);
    switch (game.plantCode) {
        case CODE.PEA:
            if(game.sun < PLANTPRICE.PEA) break;
            game.plants.push(new Pea(row, col));
            game.sun -= PLANTPRICE.PEA;
            break;
    }
    // 放下植物后归 0, 表示当前没有选择植物
    game.plantCode = 0;
}