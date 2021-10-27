import {game} from "./game.js"

export let imageFromPath = function (path) {
    let img = new Image()
    img.src = path
    return img
}

export function imageLoad(path, count) {
    let res = [], idx = 1;
    while (idx <= count) {
        res.push(imageFromPath(path + idx + ".png"));
        idx++;
    }
    return res;
}

export function collision(ax, ay, aw, ah, bx, by, bw, bh) {
    if(ax + aw > bx && ax < bx + bw) {
        if(ay + ah > by && ay < by + bh) {
            return true;
        }
    }
    return false;
}

export function colCollision(ax, aw, bx, bw) {
    return ax + aw > bx && ax < bx + bw;

}

export function getPointOnCanvas(x, y) {
    // 获取光标在画板上的坐标
    let bbox = game.canvas.getBoundingClientRect()
    return {
        x: x - bbox.left,
        y: y - bbox.top,
    }
}