import { Physics } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export class Monkey {
    scene: Phaser.Scene;
    cursors: CursorKeys;
    monkey: Physics.Arcade.Image;
    speed: number;

    constructor(scene: Phaser.Scene, cursors: CursorKeys) {
        this.scene = scene;
        this.cursors = cursors;
        this.monkey = this.scene.physics.add
            .image(512, 384, "monkey")
            .setDepth(999)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);

        this.speed = 300;
    }

    move() {
        if (!this.cursors) return;
        this.monkey.setVelocity(0);
        if (this.cursors.down.isDown) {
            this.monkey.setVelocityY(this.speed);
        } else if (this.cursors.up.isDown) {
            this.monkey.setVelocityY(-this.speed);
        }
        if (this.cursors.left.isDown) {
            this.monkey.setVelocityX(-this.speed);
            this.monkey.flipX = false;
        }
        if (this.cursors.right.isDown) {
            this.monkey.setVelocityX(this.speed);
            this.monkey.flipX = true;
        }
    }

    getX() {
        return this.monkey.x;
    }
    getY() {
        return this.monkey.y;
    }
}
