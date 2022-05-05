import { context } from "../init";

export class Projectile {
    constructor({ position, velocity, rotation }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 3;
    }

    draw() {
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = "greenyellow";
        context.fill();
        context.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
