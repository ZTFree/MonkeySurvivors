import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import GameObject = Phaser.GameObjects.GameObject;
import { Enemys } from "../../utils/Enemy.ts";
import { ShootGun } from "../../utils/ShootGun.ts";
import { Monkey } from "../../utils/Monkey.ts";
import { Bananas } from "../../utils/Banana.ts";

export class MainGame extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    monkey: Monkey;
    cursors: CursorKeys;
    shootGun: ShootGun;
    enemys: Enemys;
    bananas: Bananas;
    enemyTime: number;
    gameUI: any;

    constructor() {
        super("MainGame");
    }

    create() {
        this.add.image(0, 0, "bg_main").setOrigin(0, 0).setScale(0.4);
        this.cursors = this.input.keyboard?.createCursorKeys() as CursorKeys;
        this.shootGun = new ShootGun(this);
        this.enemys = new Enemys(this);
        this.monkey = new Monkey(this, this.cursors);
        this.bananas = new Bananas(this);

        this.game.registry.set("score", 0);

        this.initPhysicsBehavior();
        EventBus.emit("current-scene-ready", this);
    }

    getEnemyCd() {
        const score = this.game.registry.get("score");

        return Math.max(500, 2000 - score * 100);
    }

    update(time: number) {
        this.renderScoreBar();
        this.gunShoot(time);

        if (!this.enemyTime) this.enemyTime = time;
        if (time - this.enemyTime > this.getEnemyCd()) {
            this.enemyTime = time;
            this.createEnemy();
        }

        this.updateEnemy();
        this.monkey.move();
    }

    // 物理交互
    initPhysicsBehavior() {
        // 子弹与敌人的交叠
        this.physics.add.overlap(
            this.shootGun.bulletGroup,
            this.enemys.enemyGroup,
            (bullet, enemy) => {
                bullet.destroy();
                enemy.body.getHurt(this.shootGun.shootAtk);
                this.sound.play("shit_hit");
            },
        );

        // 敌人与玩家的交叠
        this.physics.add.overlap(
            this.enemys.enemyGroup,
            this.monkey.getMonkey(),
            (monkey, enemy) => {
                this.monkey.getHurt(1);
            },
        );

        // 香蕉与玩家的交叠
        this.physics.add.overlap(
            this.monkey.getMonkey(),
            this.bananas.BananaGroup,
            (monkey, banana) => {
                banana.body.eaten();
            },
        );

        // 子弹接触边界销毁
        this.physics.world.on("worldbounds", (body: GameObject) =>
            body.collisionWorldBounds(),
        );
    }

    // 射击
    gunShoot(time: number) {
        if (this.shootGun.checkInCd(time)) return;
        let angle: number = 0;
        if (!this.enemys.enemyGroup.children.size) {
            // 无敌人则随机发射
            angle = Math.random() * 360;
        } else {
            // 有敌人则攻击最近的敌人
            const children = this.enemys.enemyGroup.children.getArray();
            const monkeyX = this.monkey.getX(),
                monkeyY = this.monkey.getY();
            children.sort((a, b) => {
                const aXlen = a.body?.x - monkeyX,
                    bXlen = b.body?.x - monkeyX;
                const aYlen = a.body?.y - monkeyY,
                    bYlen = b.body?.y - monkeyY;
                const aLen = Math.pow(aXlen ** 2 + aYlen ** 2, 0.5),
                    bLen = Math.pow(bXlen ** 2 + bYlen ** 2, 0.5);
                return Math.abs(bLen - aLen);
            });
            angle = Math.atan2(
                children[0].y - monkeyY,
                children[0].x - monkeyX,
            );
        }

        this.shootGun.shoot({
            name: "shit",
            x: this.monkey.getX(),
            y: this.monkey.getY(),
            angle,
        });
    }

    // 创建敌人
    createEnemy() {
        const randomAngle = 360 * Math.random(),
            len = 500 + 200 * Math.random(),
            x = len * Math.cos(randomAngle) + this.monkey.getX(),
            y = len * Math.sin(randomAngle) + this.monkey.getY();

        this.enemys.createEnemy({
            name: "dog",
            x,
            y,
            angle: randomAngle - 180,
        });
    }

    // 更新敌人追踪方向
    updateEnemy() {
        this.enemys.AllTrack(this.monkey.getX(), this.monkey.getY());
    }

    renderScoreBar() {
        const score = this.game.registry.get("score");
        if (!this.gameUI) {
            this.gameUI = {};
            this.gameUI.scoreBar = this.add
                .text(20, 20, `Score: ${score}`, {
                    fontFamily: "Arial Black",
                    fontSize: 40,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                })
                .setOrigin(0, 0)
                .setDepth(100);

            this.gameUI.healthBar = this.add
                .text(20, 80, `Health: ${Monkey.instance.health}`, {
                    fontFamily: "Arial Black",
                    fontSize: 40,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                })
                .setOrigin(0, 0)
                .setDepth(100);
        } else {
            this.gameUI.scoreBar.setText(`Score: ${score}`);
            this.gameUI.healthBar.setText(`Health: ${Monkey.instance.health}`);
        }
    }

    changeScene() {}
}
