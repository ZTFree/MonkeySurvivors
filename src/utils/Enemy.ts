import Group = Phaser.Physics.Arcade.Group;
import GameObject = Phaser.GameObjects.GameObject;
import { dogImgSize } from "../global/imgSize.ts";
import { Bananas } from "./Banana.ts";
import { Monkey } from "./Monkey.ts";

interface EnemyProps {
    hp: number;
    atk: number;
    speed: number;
}

interface EnemyOption {
    name?: string;
    x?: number;
    y?: number;
    angle?: number;
}

const defProps: EnemyProps = {
    hp: 10,
    atk: 1,
    speed: 200,
};

export class Enemys {
    enemyGroup: Group;
    scene: Phaser.Scene;
    enemyProps: EnemyProps;
    constructor(scene: Phaser.Scene, enemyProps?: EnemyProps) {
        this.scene = scene;
        this.enemyProps = enemyProps ? enemyProps : defProps;
        this.enemyGroup = this.scene.physics.add.group({ immovable: false });

        // 敌人之间的物理碰撞
        this.scene.physics.add.collider(this.enemyGroup, this.enemyGroup);
    }

    // 创建敌人
    createEnemy(opt?: EnemyOption) {
        const randomAngle = 360 * Math.random(),
            len = 500 + 200 * Math.random(),
            x = len * Math.cos(randomAngle) + Monkey.instance.getX(),
            y = len * Math.sin(randomAngle) + Monkey.instance.getY();

        const option: EnemyOption = {
            name: Math.random() > 0.5 ? "dog" : "bat",
            x,
            y,
            angle: randomAngle - 180,
            ...opt,
        };
        // this.createEnemy();
        new Enemy(this.enemyProps, option, this.enemyGroup, this.scene);
    }

    AllTrack(x: number, y: number) {
        this.enemyGroup.setVelocity(0, 0);

        this.enemyGroup.children.getArray().forEach((child) => {
            const angle = Math.atan2(
                y - 30 - child.body?.y,
                x - 30 - child.body?.x,
            );
            child.body?.setVelocity(
                this.enemyProps.speed * Math.cos(angle),
                this.enemyProps.speed * Math.sin(angle),
            );
        });
    }
}

export class Dogs extends Enemys {
    constructor(scene: Phaser.Scene) {
        const dogProps = {
            hp: 10,
            atk: 1,
            speed: 200,
        };
        super(scene, dogProps);
    }
}

class Enemy {
    hp: number;
    atk: number;
    speed: number;
    opt: EnemyOption;
    gameObj: GameObject;
    scene: Phaser.Scene;

    constructor(
        props: EnemyProps,
        opt: EnemyOption,
        group: Group,
        scene: Phaser.Scene,
    ) {
        this.hp = props.hp;
        this.atk = props.atk;
        this.speed = props.speed;
        this.opt = opt;
        this.scene = scene;

        const { x, y, name, angle } = opt;
        const enemy = group.create(x, y, name).setOrigin(0.5, 0.5);
        this.gameObj = enemy;

        enemy.body.getHurt = this.getHurt.bind(this);

        group.scene.physics.add.existing(enemy);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle),
        );
    }

    getHurt(value: number) {
        this.hp -= value;
        if (this.hp <= 0) this.die();
    }

    die() {
        this.scene.sound.play("enemy_death", { volume: 0.5 });
        const score = this.scene.registry.get("score");
        this.scene.game.registry.set("score", score + 1);
        if (Bananas.instance) {
            const isCreate = Math.random() > 0.5;

            if (isCreate) {
                Bananas.instance.createBanana(this.gameObj.x, this.gameObj.y);
            }
        }
        this.gameObj.destroy();
    }
}
