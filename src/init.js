import { Player, Projectile } from "./objects";

export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

export const player = new Player();
export const projectiles = [];
export const invaders = [];

export const keys = {
    w: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    a: { pressed: false },
    space: { pressed: false },
};

addEventListener("keydown", ({ key }) => {
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
            break;
        case "Shift":
            keys.shift.pressed = true;
            break;
        case " ":
            // keys.space.pressed = true;
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y,
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
        case "Shift":
            keys.shift.pressed = false;
            break;
        case " ":
            keys.space.pressed = false;
            break;

        default:
            break;
    }
});
