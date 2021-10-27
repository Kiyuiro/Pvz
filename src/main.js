import {game, images, card} from "./common/game.js";
import {mapInit} from "./init/map_init.js";
import {startPlantSelect} from "./init/start_plant_select.js";
import {startMenu} from "./init/start_menu.js"
import {collision} from "./common/tools.js";
import {createSun} from "./sun/sun.js";

function init() {
    startMenu();
    startPlantSelect();
    mapInit();
}

function action() {
    createSun();
    // draw background
    game.draw(images.background.grass, 0, 0)

    // draw sun
    game.draw(images.sunBank, 15, 10)
    game.write(game.sun, 28, 90);

    if (game.plantCode != 0) {
        // TODO 应该根据选择植物来更改画的图片
        game.draw(images.plant.pea.img[0], game.cursor.x - 35, game.cursor.y - 45);
    }

    // plant
    for (let i = 0; i < game.plants.length; ++i) {
        game.plants[i].action();
    }

    // zombie
    for (let i = 0; i < game.zombies.length; ++i) {
        game.zombies[i].action();
    }

    // bullet
    for (let i = 0; i < game.bullets.length; ++i) {
        game.bullets[i].action();
    }

    // sun
    for (let i = 0; i < game.suns.length; ++i) {
        game.suns[i].action();
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
    for (let i = 0; i < game.suns.length; ++i) {
        if (game.suns[i].isDestroy) {
            game.suns.splice(i, 1);
        }
    }
    // zombie
    for (let i = 0; i < game.zombies.length; ++i) {
        if (game.zombies[i].isDestroy) {
            game.zombies.splice(i, 1);
        }
    }
    // plant
    for (let i = 0; i < game.plants.length; ++i) {
        if (game.plants[i].isDestroy) {
            game.plants.splice(i, 1);
        }
    }
    // bullet
    for (let i = 0; i < game.bullets.length; ++i) {
        if (game.bullets[i].isDestroy) {
            game.bullets.splice(i, 1);
        }
    }
}

function main() {
    game.setPen(25, "black");
    init();
    setInterval(() => {
        action();
        destroy();
    }, game.FRAME_TIME);
}

window.onload = () => {
    main();
}
