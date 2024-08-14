import Group = Phaser.Physics.Arcade.Group;
import GameObject = Phaser.GameObjects.GameObject;
import { ShootGun } from "./ShootGun.ts";
import { Monkey } from "./Monkey.ts";

export class Bananas {
    static instance: Bananas;
    BananaGroup: Group;
    scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        if (Bananas.instance) return;
        Bananas.instance = this;
        this.scene = scene;
        this.BananaGroup = this.scene.physics.add.group({ immovable: true });
    }

    createBanan(x: number, y: number) {
        new Banana(x, y, this.BananaGroup, this.scene);
    }
}

class Banana {
    scence: Phaser.Scene;
    gameObj: GameObject;
    constructor(x: number, y: number, group: Group, scence: Phaser.Scene) {
        this.scence = scence;
        const banana = group.create(x, y, "banana").setOrigin(0.5, 0.5);

        group.scene.physics.add.existing(banana);

        this.gameObj = banana;

        banana.body.eaten = this.eaten.bind(this);
    }

    eaten() {
        Monkey.instance.addHealth();
        ShootGun.instance.upgrade();
        this.scence.sound.play("heal");
        this.gameObj.destroy();
    }
}
