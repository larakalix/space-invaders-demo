import { Player, Projectile } from "./objects";
import { Grid } from "./objects/grid";

export const points_tag = document.querySelector("#scoreValue");
export const game_over_box_tag = document.querySelector("#game_over_box");
export const game_over_score_tag = document.querySelector("#game_over_score");
export const canvas = document.querySelector("#board");
export const restart_action = document.querySelector("#restart_btn");
export const context = canvas.getContext("2d");

export const particleColors = [
    "#fffb05",
    "#ffe505",
    "#ffc905",
    "#ffb805",
    "#ffa505",
    "#ff5959",
    "tomato",
];

export const playerParticleColors = [
    "#78c1ff",
    "#5099f4",
    "#468fea",
    "#2871cc",
    "#003f9a",
    "#1d2e92",
    "#767bef",
];

// canvas.width = innerWidth;
// canvas.height = innerHeight;

canvas.width = 1024;
canvas.height = 576;

export let __PLAYER = new Player();
export let __GAME = {
    over: false,
    active: true,
};
export let __PROJECTILES = [];
export let __GRIDS = [new Grid()];
export let __PARTICLES = [];
export let __INVADER_PROJECTILES = [];

export const keys = {
    w: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    a: { pressed: false },
    space: { pressed: false },
};

addEventListener("keydown", ({ key }) => {
    if (__GAME.over) return;

    switch (key) {
        case "ArrowUp":
        case "w":
            keys.w.pressed = true;
            break;
        case "s":
            keys.s.pressed = true;
            break;
        case "ArrowLeft":
        case "a":
            keys.a.pressed = true;
            break;
        case "ArrowRight":
        case "d":
            keys.d.pressed = true;
        //     break;
        // case "Shift":
        //     keys.shift.pressed = true;
        //     break;
        case " ":
            __PROJECTILES.push(
                new Projectile({
                    position: {
                        x: __PLAYER.position.x + __PLAYER.width / 2,
                        y: __PLAYER.position.y,
                    },
                    velocity: { x: 0, y: -7 },
                    rotation: 0,
                })
            );
            break;

        default:
            break;
    }
});

addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "ArrowUp":
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "ArrowLeft":
        case "a":
            keys.a.pressed = false;
            break;
        case "ArrowRight":
        case "d":
            keys.d.pressed = false;
            break;
        // case "Shift":
        //     keys.shift.pressed = false;
        //     break;
        case " ":
            keys.space.pressed = false;
            break;

        default:
            break;
    }
});
