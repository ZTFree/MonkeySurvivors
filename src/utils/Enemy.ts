import Group = Phaser.Physics.Arcade.Group;
import { Bananas } from "./Banana.ts";
import { Monkey } from "./Monkey.ts";
import Sprite = Phaser.Physics.Arcade.Sprite;

interface EnemyProps {
    hp: number;
    atk: number;
    speed: number;
}

interface EnemyOption {
    name?: string;
    x?: number;
    y?: number;
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

    createEnemy(opt?: EnemyOption) {
        const randomAngle = 360 * Math.random(),
            len = 500 + 200 * Math.random(),
            x = len * Math.cos(randomAngle) + Monkey.instance.getX(),
            y = len * Math.sin(randomAngle) + Monkey.instance.getY();

        const option: EnemyOption = {
            name: Math.random() > 0.5 ? "dog" : "bat",
            x,
            y,
            ...opt,
        };

        const enemy = new Enemy(
            this.enemyProps,
            option,
            this.enemyGroup,
            this.scene,
        );
        enemy.renderEnemy();
    }

    // AllTrack(x: number, y: number) {
    //     this.enemyGroup.setVelocity(0, 0);
    //
    //     this.enemyGroup.children.getArray().forEach((child) => {
    //         const angle = Math.atan2(
    //             y - 30 - child.body?.y,
    //             x - 30 - child.body?.x,
    //         );
    //         child.body?.setVelocity(
    //             this.enemyProps.speed * Math.cos(angle),
    //             this.enemyProps.speed * Math.sin(angle),
    //         );
    //     });
    // }
}

class Enemy {
    hp: number;
    atk: number;
    speed: number;
    props: EnemyProps;
    opt: EnemyOption;
    enemySprite: Sprite;
    scene: Phaser.Scene;
    group: Group;

    constructor(
        props: EnemyProps,
        opt: EnemyOption,
        group: Group,
        scene: Phaser.Scene,
    ) {
        this.hp = props.hp;
        this.atk = props.atk;
        this.speed = props.speed;
        this.props = props;
        this.opt = opt;
        this.scene = scene;
        this.group = group;

        // this.renderEnemy();
    }

    renderEnemy() {
        const { x, y, name } = this.opt;
        const sprite: Sprite = this.group
            .create(x, y, name)
            .setOrigin(0.5, 0.5);
        this.enemySprite = sprite;

        this.group.scene.physics.add.existing(sprite);
        sprite.setCollideWorldBounds(true);

        sprite.getHurt = this.getHurt.bind(this);
        sprite.props = this.props;
    }

    getHurt(value: number) {
        console.log("hurt,hp:", this.hp);
        this.hp -= value;
        if (this.hp <= 0) this.die();
        else this.blink();
    }

    blink() {
        this.scene.tweens.add({
            targets: this.enemySprite,
            ease: "Linear",
            yoyo: true,
            alpha: 0,
            duration: 200,
            repeat: 2,
            onComplete(tween, target) {
                tween.destroy();
                target[0].alpha = 1;
            },
        });
    }

    die() {
        this.scene.sound.play("enemy_death", { volume: 0.5 });
        const score = this.scene.registry.get("score");
        this.scene.game.registry.set("score", score + 1);
        if (Bananas.instance) {
            const isCreate = Math.random() > 0.5;

            if (isCreate) {
                Bananas.instance.createBanana(
                    this.enemySprite.x,
                    this.enemySprite.y,
                );
            }
        }
        console.log("die");
        // this.group.remove(this.enemySprite, true, true);
        this.enemySprite.destroy(true);
    }
}
