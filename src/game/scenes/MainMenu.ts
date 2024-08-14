import { AUTO, Scene } from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import Pointer = Phaser.Input.Pointer;

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add.image(0, 0, "bg_main").setOrigin(0, 0).setScale(1);
        this.add.image(280, 640, "logo").setOrigin(0, 0).setScale(1);
        this.add.text(190, 80, "Monkey Survivors", {
            font: "80px blob",
            color: "#31fd2c",
        });

        const startBtn = this.add
            .text(420, 360, "Start", {
                font: "80px blob",
                color: "#31fd2c",
            })
            .setInteractive();

        startBtn.on(
            "click",
            () => {
                this.sound.play("confirm");
                this.scene.start("MainGame");
            },
            this,
        );

        startBtn.on(
            "mouseover",
            () => {
                startBtn.setColor("#fa0b13");
                this.sound.play("hover");
                // this.sound.play("confirm");
            },
            this,
        );

        startBtn.on(
            "mouseout",
            () => {
                startBtn.setColor("#31fd2c");
            },
            this,
        );

        this.input.on(
            "gameobjectup",
            function (pointer: Pointer, gameObject: GameObject) {
                gameObject.emit("click", gameObject);
            },
            this,
        );

        this.input.on(
            "pointerover",
            function (pointer: Pointer, gameObject: GameObject[]) {
                gameObject[0].emit("mouseover", gameObject);
            },
            this,
        );
        this.input.on(
            "pointerout",
            function (pointer: Pointer, gameObject: GameObject[]) {
                gameObject[0].emit("mouseout", gameObject);
            },
            this,
        );
    }

    update() {}

    changeScene() {
        this.scene.start("Game");
    }
}
