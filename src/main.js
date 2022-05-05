import { canvas, context, keys, player, projectiles } from "./init";

const animate = () => {
    requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        } else projectile.update();
    });

    if (keys.a.pressed && player.position.x - player.width / 2 >= 0) {
        player.velocity.x = -5;
        player.rotation = -0.1;
    } else if (
        keys.d.pressed &&
        player.position.x + player.width / 2 <= canvas.width - player.width
    ) {
        player.velocity.x = 5;
        player.rotation = 0.1;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
};

animate();
