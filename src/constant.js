import {imageLoad, imageFromPath} from "./tools.js";

export const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const FPS = 60;
const FRAME_TIME = 1000 / FPS;

export const game = {
    FPS: FPS,
    FRAME_TIME: FRAME_TIME,
    canvas: canvas,
    width: 1400,
    height: 600,
    zombie: {
        WALK: 1,
        ATTACK: 2,
        HEAD: 3,
        DIE: 4,
    },
    bullet: {
        FLY: 1,
        HIT: 2,
    },
    draw: (img, x, y) => {
        ctx.drawImage(img, x, y);
    },
    setPen: (size = 20, color = "blank", style = "Consolas") => {
        ctx.font = size + "px " + style;
        ctx.fillStyle = color;
    },
    write: (word, x, y,) => {
        ctx.fillText(word, x, y);
    }
}

const background = {
    grass: imageFromPath("./resource/images/background1.jpg")
}

const plant = {
    pea: {
        img: imageLoad("./resource/images/Plants/pea/", 13),
        bullet: imageFromPath("./resource/images/Plants/pea/bullet.png"),
        bullet_hit: imageFromPath("./resource/images/Plants/pea/bullet_hit.png"),
        card: imageFromPath("./resource/images/Plants/pea/card.png"),
        icon: imageFromPath("./resource/images/Plants/pea/icon.png"),
    },
    seedChooser: imageFromPath("./resource/images/SeedChooser_Background.png"),
}

const zombie = {
    normal: {
        walk: imageLoad("./resource/images/Zombies/Zombie/Walk/", 22),
        attack: imageLoad("./resource/images/Zombies/Zombie/Attack/", 21),
        head: imageLoad("./resource/images/Zombies/Zombie/Head/", 10),
        die: imageLoad("./resource/images/Zombies/Zombie/Die/", 10),
    }
}

export const images = {
    background: background,
    plant: plant,
    zombie: zombie,
    sun: imageLoad("./resource/images/Sun/", 21),
    sunBank: imageFromPath("./resource/images/SunBank.png")
}

export const card = {
    _1: {x: 105, y: 10},
    _2: {x: 165, y: 10},
    _3: {x: 225, y: 10},
    _4: {x: 285, y: 10},
    _5: {x: 345, y: 10},
    _6: {x: 405, y: 10},
    _7: {x: 465, y: 10},
    _8: {x: 525, y: 10},
    _9: {x: 585, y: 10},
    width: 50,
    height: 70
}

export const price = {
    sun: 25,
    pea: 100
}