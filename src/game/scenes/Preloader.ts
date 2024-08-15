import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("logo", "logo.png");

        this.load.image("monkey", "/img/game/monkey.png");
        this.load.image("dog", "/img/game/dog.png");
        this.load.image("bat", "/img/game/bat.png");
        this.load.image("banana", "/img/game/banana.png");
        this.load.image("shit", "/img/game/shit.png");

        this.load.image("bg_main", "/img/bg/bg_main.png");

        // 音效
        this.load.audio("shit_hit", "/sound/shit_hit.mp3");
        this.load.audio("hover", "/sound/hover.mp3");
        this.load.audio("confirm", "/sound/confirm.mp3");
        this.load.audio("enemy_death", "/sound/enemy_death.mp3");
        this.load.audio("heal", "/sound/heal.mp3");
        this.load.audio("m_hurt", "/sound/monkey_hurt.mp3");
    }

    create() {
        this.scene.start("MainMenu");
    }
}
