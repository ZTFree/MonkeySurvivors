import { Physics } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export class Monkey {
    static instance: Monkey;
    scene: Phaser.Scene;
    cursors: CursorKeys;
    monkey: Physics.Arcade.Image;
    speed: number;
    health: number;
    isInvincible: boolean;

    constructor(scene: Phaser.Scene, cursors: CursorKeys) {
        Monkey.instance = this;
        this.scene = scene;
        this.cursors = cursors;
        this.monkey = this.scene.physics.add
            .image(512, 384, "monkey")
            .setDepth(999)
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);

        this.health = 3;
        this.speed = 300;
        this.isInvincible = false;
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
        return this.monkey?.x;
    }
    getY() {
        return this.monkey?.y;
    }

    getMonkey() {
        return this.monkey;
    }

    getHurt(value: number) {
        if (!this.isInvincible) {
            this.scene.sound.play("m_hurt");
            this.health -= value;
        }
        if (this.health <= 0) {
            this.die();
        } else {
            this.isInvincible = true;
            setTimeout(() => {
                this.isInvincible = false;
            }, 1000);
        }
    }

    addHealth() {
        this.health = Math.min(3, this.health + 1);
    }

    die() {
        this.scene.scene.start("GameOver");
    }
}
