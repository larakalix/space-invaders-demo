import { canvas, context } from "../init";
import { createImage } from "../utils/utils";

import invaderImage from "./../../assets/invader-3.png";
import { InvaderProjectile } from "./projectile";

export class Invader {
    constructor({ position }) {
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20,
        };
        this.velocity = { x: 0, y: 0 };
        this.rotation = 0.23;
        this.width = 100;
        this.height = 100;

        const invader = createImage(invaderImage);

        invader.onload = () => {
            const scale = 0.04;
            this.image = invader;
            this.width = invader.width * scale;
            this.height = invader.height * scale;

            this.position = {
                x: position.x,
                y: position.y,
            };
        };
    }

    draw() {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update({ velocity }) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(
            new InvaderProjectile({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                velocity: { x: 0, y: 5 },
            })
        );
    }
}
