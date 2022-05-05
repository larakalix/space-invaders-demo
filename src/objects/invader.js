import { canvas, context, player } from "../init";
import { createImage } from "../utils/utils";

import invaderImage from "./../../assets/invader-2.png";

export class Invader {
    constructor() {
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
            const scale = 1;
            this.image = invader;
            this.width = invader.width * scale;
            this.height = invader.height * scale;

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height / 2,
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

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}
