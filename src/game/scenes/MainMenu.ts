import { AUTO, Scene } from "phaser";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add.text(100, 200, "Monkey Survivors", {
            fontSize: 100,
            color: "#fff",
        });

        const img = this.add
            .text(100, 400, "Start", {
                fontSize: 80,
                color: "#f00",
            })
            .setInteractive();

        img.on(
            "click",
            () => {
                this.scene.start("MainGame");
            },
            this,
        );

        this.input.on(
            "gameobjectup",
            function (pointer, gameObject) {
                gameObject.emit("click", gameObject);
            },
            this,
        );
    }

    update() {}

    changeScene() {
        this.scene.start("Game");
    }
}
