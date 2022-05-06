import { context } from "../init";

export class Particle {
    constructor({ position, velocity, radius, color }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
    }

    draw() {
        context.save();
        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        // context.moveTo(
        //     this.position.x + this.radius / 2,
        //     this.position.y + this.radius / 2
        // );
        // context.lineTo(this.position.x + 30 / 4, this.position.y + 30 / 4);
        // context.lineTo(this.position.x + 30 / 4, this.position.y + 10 / 4);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.opacity -= 0.01;
    }
}
