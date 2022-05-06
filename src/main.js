import {
    canvas,
    context,
    keys,
    particleColors,
    playerParticleColors,
    points_tag,
    game_over_box_tag,
    restart_action,
    __PLAYER,
    __GAME,
    __PROJECTILES,
    __GRIDS,
    __PARTICLES,
    __INVADER_PROJECTILES,
    game_over_score_tag,
} from "./init";
import { Particle } from "./objects";
import { Grid } from "./objects/grid";

let frames = 0;
let interval = Math.floor(Math.random() * 500 + 500);

const createParticles = ({ character, colors }) => {
    for (let i = 0; i < 15; i++) {
        __PARTICLES.push(
            new Particle({
                position: {
                    x: character.position.x + character.width / 2,
                    y: character.position.y + character.height / 2,
                },
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                },
                radius: Math.random() * 3,
                color: colors[Math.floor(Math.random() * colors.length)],
            })
        );
    }
};

const handleInvaderProjectiles = () => {
    __INVADER_PROJECTILES.forEach((invaderProjectile, index) => {
        if (
            invaderProjectile.position.y + invaderProjectile.height >=
            canvas.height
        ) {
            setTimeout(() => {
                __INVADER_PROJECTILES.splice(index, 1);
            }, 0);
        } else invaderProjectile.update();

        // PLAYER HITTED
        // MAYBE GAME OVER
        if (
            invaderProjectile.position.y + invaderProjectile.height >=
                __PLAYER.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >=
                __PLAYER.position.x &&
            invaderProjectile.position.x <= __PLAYER.position.x + __PLAYER.width
        ) {
            setTimeout(() => {
                __INVADER_PROJECTILES.splice(index, 1);
                __PLAYER.opacity = 0;
                __GAME.over = true;
            }, 0);

            setTimeout(() => {
                __GAME.active = false;

                game_over_score_tag   .innerHTML = __PLAYER.score;
                game_over_box_tag.style.opacity = "1";
            }, 2000);

            createParticles({
                character: __PLAYER,
                colors: playerParticleColors,
            });
        }
    });
};

const handleProjectiles = () => {
    __PROJECTILES.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                __PROJECTILES.splice(index, 1);
            }, 0);
        } else projectile.update();
    });
};

const handleEnemiesGrid = () => {
    __GRIDS.forEach((grid, gridIndex) => {
        grid.update();

        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[
                Math.floor(Math.random() * grid.invaders.length)
            ].shoot(__INVADER_PROJECTILES);
        }

        grid.invaders.forEach((invader, invaderIndex) => {
            invader.update({ velocity: grid.velocity });

            __PROJECTILES.forEach((projectile, projectileIndex) => {
                if (
                    projectile.position.y - projectile.radius <=
                        invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >=
                        invader.position.x &&
                    projectile.position.x - projectile.radius <=
                        invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >=
                        invader.position.y
                ) {
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find(
                            (innerInvader) => innerInvader === invader
                        );
                        const projectileFound = __PROJECTILES.find(
                            (innerProjectile) => innerProjectile === projectile
                        );

                        // PLAYER HIT ENEMY
                        // WINNING POINTS
                        if (invaderFound && projectileFound) {
                            __PLAYER.score += 10;
                            points_tag.innerHTML = __PLAYER.score;

                            createParticles({
                                character: invader,
                                colors: particleColors,
                            });

                            grid.invaders.splice(invaderIndex, 1);
                            __PROJECTILES.splice(projectileIndex, 1);

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader =
                                    grid.invaders[grid.invaders.length - 1];

                                grid.width =
                                    lastInvader.position.x -
                                    firstInvader.position.x +
                                    lastInvader.width;
                                grid.position.x = firstInvader.position.x;
                            } else {
                                __GRIDS.splice(gridIndex, 1);
                            }
                        }
                    }, 0);
                }
            });
        });
    });
};

const handlePlayerMoves = () => {
    if (keys.a.pressed && __PLAYER.position.x - __PLAYER.width / 2 >= 0) {
        __PLAYER.velocity.x = -5;
        __PLAYER.rotation = -0.1;
    } else if (
        keys.d.pressed &&
        __PLAYER.position.x + __PLAYER.width / 2 <=
            canvas.width - __PLAYER.width
    ) {
        __PLAYER.velocity.x = 5;
        __PLAYER.rotation = 0.1;
    } else {
        __PLAYER.velocity.x = 0;
        __PLAYER.rotation = 0;
    }
};

const handleParticles = () => {
    __PARTICLES.forEach((particle, index) => {
        if (particle.opacity <= 0) {
            setTimeout(() => {
                __PARTICLES.splice(index, 1);
            }, 0);
        } else particle.update();
    });
};

const animate = () => {
    if (!__GAME.active) return;

    requestAnimationFrame(animate);
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "gray";
    context.clearRect(0, 0, canvas.width, canvas.height);
    __PLAYER.update();

    handleParticles();

    handleInvaderProjectiles();

    handleProjectiles();

    handleEnemiesGrid();

    handlePlayerMoves();

    if (frames % interval === 0) {
        __GRIDS.push(new Grid());
    }

    frames++;
};

animate();

restart_action.addEventListener("click", () => {
    __GAME.active = true;
    __GAME.over = false;

    __PLAYER.position.x = canvas.width / 2;
    __PLAYER.position.y = canvas.height - __PLAYER.height;
    __PLAYER.opacity = 1;
    __PLAYER.score = 0;
    __PLAYER.rotation = 0;

    points_tag.innerHTML = __PLAYER.score;
    frames = 0;
    game_over_box_tag.style.display = "none";

    location.reload();
});
