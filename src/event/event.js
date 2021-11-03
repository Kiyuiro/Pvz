import {images, card, game} from "../common/game.js";
import {NormalZombie} from "../zombie/zombie.js";
import {pickUpSun, setPlantCode, plant} from "./event_content.js"
import {getPointOnCanvas, collision} from "../common/tools.js";

addEventListener("mousemove", (k) => {
    game.cursor = getPointOnCanvas(k.x, k.y);
})

addEventListener("click", () => {
    pickUpSun(game.cursor.x, game.cursor.y);

    // 判断鼠标是否在卡槽上
    if (collision(card._1.x, card._1.y, 530, card.height, game.cursor.x, game.cursor.y, 1, 1)) {
        if (game.selectPlant.code != 0) game.selectPlant.code = 0;
        else setPlantCode(game.cursor.x, game.cursor.y);
    }

    if (game.selectPlant.code != 0 && collision(255, 80, 720, 485, game.cursor.x, game.cursor.y, 1, 1)) {
        plant(game.cursor.x, game.cursor.y);
    }

})

// test function
function creatZombie(col) {
    if (col > 0 && col < 6) {
        game.zombies.push(new NormalZombie(col - 1));
    }
}

addEventListener("keydown", (k) => {
    // test function
    creatZombie(k.key);
})
