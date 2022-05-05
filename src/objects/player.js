import { canvas, context, player } from "../init";
import { createImage } from "../utils/utils";

import shipImage from "./../../assets/ship-2.png";

export class Player {
    constructor() {
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20,
        };
        this.velocity = { x: 0, y: 0 };
        this.rotation = 0.23;
        this.width = 100;
        this.height = 100;

        const ship = createImage(shipImage);

        ship.onload = () => {
            const scale = 0.1;
            this.image = ship;
            this.width = ship.width * scale;
            this.height = ship.height * scale;

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 15,
            };
        };
    }

    draw() {
        context.save();
        context.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        );
        context.rotate(this.rotation);
        context.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        );

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        context.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
}
