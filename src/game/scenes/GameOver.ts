import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Pointer = Phaser.Input.Pointer;
import GameObject = Phaser.GameObjects.GameObject;

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.add.image(0, 0, "bg_main").setOrigin(0, 0).setScale(0.4);
        const gameOverText = this.add
            .text(512, 284, "Game Over", {
                fontFamily: "Arial Black",
                fontSize: 80,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        const ScoreShow = this.add
            .text(512, 384, `Score: ${this.game.registry.get("score") || 0}`, {
                fontFamily: "Arial Black",
                fontSize: 40,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive();

        // const againBtn = this.add
        //     .text(512, 384, "Try Again", {
        //         fontFamily: "Arial Black",
        //         fontSize: 40,
        //         color: "#ffffff",
        //         stroke: "#000000",
        //         strokeThickness: 8,
        //         align: "center",
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(100)
        //     .setInteractive();
        //
        // againBtn.on("click", () => {
        //     this.scene.start("MainGame");
        // });
        //
        // againBtn.on(
        //     "mouseover",
        //     () => {
        //         this.sound.play("hover");
        //         againBtn.setColor("#fa0b13");
        //     },
        //     this,
        // );
        //
        // againBtn.on(
        //     "mouseout",
        //     () => {
        //         againBtn.setColor("#ffffff");
        //     },
        //     this,
        // );
        //
        // const backHomeBtn = this.add
        //     .text(512, 484, "Back Home", {
        //         fontFamily: "Arial Black",
        //         fontSize: 40,
        //         color: "#ffffff",
        //         stroke: "#000000",
        //         strokeThickness: 8,
        //         align: "center",
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(100)
        //     .setInteractive();
        //
        // backHomeBtn.on("click", () => {
        //     this.scene.start("MainMenu");
        // });
        //
        // backHomeBtn.on(
        //     "mouseover",
        //     () => {
        //         this.sound.play("hover");
        //         backHomeBtn.setColor("#fa0b13");
        //     },
        //     this,
        // );
        //
        // backHomeBtn.on(
        //     "mouseout",
        //     () => {
        //         backHomeBtn.setColor("#ffffff");
        //     },
        //     this,
        // );

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

    changeScene(str: string) {
        this.scene.start(str);
    }
}
