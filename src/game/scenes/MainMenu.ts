import { AUTO, Scene } from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import Pointer = Phaser.Input.Pointer;
import { EventBus } from "../EventBus.ts";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add.image(0, 0, "bg_main").setOrigin(0, 0).setScale(1);
        this.add.image(280, 640, "logo").setOrigin(0, 0).setScale(1);
        this.add
            .text(512, 80, "Monkey", {
                font: "80px blob",
                fontFamily: "Arial Black",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.add
            .text(512, 180, "Survivors", {
                font: "80px blob",
                fontFamily: "Arial Black",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        const startBtn = this.add
            .text(512, 420, "Start", {
                font: "80px blob",
                fontFamily: "Arial Black",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
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
                this.sound.play("hover");
                startBtn.setColor("#fa0b13");
            },
            this,
        );

        startBtn.on(
            "mouseout",
            () => {
                startBtn.setColor("#ffffff");
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

        EventBus.emit("current-scene-ready", this);
    }

    // update() {}

    changeScene(str: string) {
        this.scene.start(str);
    }
}
