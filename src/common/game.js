import {imageLoad, imageFromPath} from "./tools.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export const CODE = {
    PEA: 1,
    CORN: 2,
    SUNFLOWER: 3,
}

export let game = {
    FPS: 60,
    FRAME_TIME: 1000 / 60,
    canvas: canvas,
    WIDTH: 1400,
    HEIGHT: 600,
    selectPlant: {
        code: 0,
        card: "img",
    },
    plants: [],
    bullets: [],
    zombies: [],
    suns: [],
    sun: 9999,
    cursor: {
        x: 0,
        y: 0,
    },
    draw: (img, x, y) => {
        ctx.drawImage(img, x, y);
    },
    drawRect: (x, y, w, h) => {
        ctx.fillRect(x, y, w, h);
    },
    setPen: (size = 20, color = "blank", style = "Consolas") => {
        ctx.font = size + "px " + style;
        ctx.fillStyle = color;
    },
    write: (word, x, y,) => {
        ctx.fillText(word, x, y);
    }
}

export const images = {
    background: {
        grass: imageFromPath("./resource/images/background1.jpg")
    },
    plant: {
        pea: {
            img: imageLoad("./resource/images/Plants/pea/", 13),
            bullet: imageFromPath("./resource/images/Plants/pea/bullet.png"),
            bullet_hit: imageFromPath("./resource/images/Plants/pea/bullet_hit.png"),
            card: imageFromPath("./resource/images/Plants/pea/card.png"),
            icon: imageFromPath("./resource/images/Plants/pea/icon.png"),
        },
        sun_flower: {
            img: imageLoad("./resource/images/Plants/sun_flower/", 18),
            card: imageFromPath("./resource/images/Plants/sun_flower/card.png"),
            icon: imageFromPath("./resource/images/Plants/sun_flower/icon.png"),
        }
    },
    zombie: {
        normal: {
            walk: imageLoad("./resource/images/Zombies/Zombie/Walk/", 22),
            attack: imageLoad("./resource/images/Zombies/Zombie/Attack/", 21),
            die: {
                head: imageLoad("./resource/images/Zombies/Zombie/Head/", 10),
                body: imageLoad("./resource/images/Zombies/Zombie/Die/", 10),
            }
        }
    },
    sun: imageLoad("./resource/images/Sun/", 21),
    sunBank: imageFromPath("./resource/images/SunBank.png")
}

export const card = {
    _1: {x: 105, y: 10, code: CODE.SUNFLOWER},
    _2: {x: 165, y: 10, code: CODE.PEA},
    _3: {x: 225, y: 10, code: CODE.PEA},
    _4: {x: 285, y: 10, code: CODE.PEA},
    _5: {x: 345, y: 10, code: CODE.PEA},
    _6: {x: 405, y: 10, code: CODE.PEA},
    _7: {x: 465, y: 10, code: CODE.PEA},
    _8: {x: 525, y: 10, code: CODE.PEA},
    _9: {x: 585, y: 10, code: CODE.PEA},
    width: 50,
    height: 70
}

export const PLANTPRICE = {
    PEA: 100,
    SUNFLOWER: 50,
}