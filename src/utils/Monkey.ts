import { Physics } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export class Monkey {
    static instance: Monkey;
    scene: Phaser.Scene;
    cursors: CursorKeys;
    monkey: Physics.Arcade.Image | Phaser.GameObjects.Image;
    speed: number;
    health: number;
    isInvincible: boolean = false;
    isDead: boolean = false;

    constructor(scene?: Phaser.Scene, cursors?: CursorKeys) {
        Monkey.instance = this;
        if (scene) this.scene = scene;
        if (cursors) this.cursors = cursors;
    }

    renderMonkey(x: number, y: number, isPhysics: boolean = true) {
        if (isPhysics) {
            this.monkey = this.scene.physics.add
                .image(x, y, "monkey")
                .setDepth(999)
                .setOrigin(0.5, 0.5)
                .setCollideWorldBounds(true);
            this.health = 3;
            this.speed = 300;
            this.isInvincible = false;
        } else {
            this.monkey = this.scene.add
                .image(x, y, "monkey")
                .setDepth(999)
                .setOrigin(0.5, 0.5);
        }
    }

    move() {
        if (!this.cursors) return;
        const mk = this.monkey as Physics.Arcade.Image;
        mk.setVelocity(0);
        if (this.cursors.down.isDown) {
            mk.setVelocityY(this.speed);
        } else if (this.cursors.up.isDown) {
            mk.setVelocityY(-this.speed);
        }
        if (this.cursors.left.isDown) {
            mk.setVelocityX(-this.speed);
            mk.flipX = false;
        }
        if (this.cursors.right.isDown) {
            mk.setVelocityX(this.speed);
            mk.flipX = true;
        }
    }

    getHurt(value: number) {
        if (this.isInvincible) return;
        this.scene.sound.play("m_hurt");
        this.health -= value;
        this.blink();
        if (this.health <= 0) {
            this.die();
        } else {
            this.isInvincible = true;
            setTimeout(() => {
                this.isInvincible = false;
            }, 1000);
        }
    }

    blink() {
        this.scene.tweens.add({
            targets: this.monkey,
            ease: "Linear",
            yoyo: true,
            alpha: 0,
            duration: 200,
            repeat: 4,
            onComplete(tween, target) {
                tween.destroy();
                target[0].alpha = 1;
            },
        });
    }

    addHealth() {
        this.health = Math.min(3, this.health + 1);
    }

    die() {
        if (this.scene) this.scene.scene.start("GameOver");
        // this.isDead = true;
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene;
    }

    setCursors(cursors: CursorKeys) {
        this.cursors = cursors;
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
}
