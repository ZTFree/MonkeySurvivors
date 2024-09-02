import Group = Phaser.Physics.Arcade.Group;

interface GunOption {
    shootCd: number;
    shootSpeed: number;
    shootAtk: number;
}

export class ShootGun {
    static instance: ShootGun;
    shootCd: number;
    shootSpeed: number;
    shootAtk: number;
    shootTime: number;
    scence: Phaser.Scene;
    bulletGroup: Group;
    grade: number;

    constructor(scence: Phaser.Scene, opt?: GunOption) {
        ShootGun.instance = this;
        this.scence = scence;
        if (opt) {
            this.shootCd = opt.shootCd;
            this.shootSpeed = opt.shootSpeed;
            this.shootAtk = opt.shootAtk;
        } else {
            this.shootCd = 1000;
            this.shootSpeed = 600;
            this.shootAtk = 5;
        }
        this.grade = 1;
        this.shootTime = 0;
        this.bulletGroup = this.scence.physics.add.group({ immovable: false });
    }

    shoot(opt: { name: string; x: number; y: number; angle: number }) {
        const { name, x, y, angle } = opt;

        const bullet: Phaser.Physics.Arcade.Image = this.bulletGroup
            .create(x, y, name)
            .setDepth(1000);

        this.scence.physics.add.existing(bullet);
        bullet.setCollideWorldBounds(true, 1, 1, true);
        bullet.setCollideWorldBounds(true);

        if (bullet.body) {
            bullet.body.collisionWorldBounds = function () {
                bullet.destroy();
            };
        }
        bullet.setVelocity(
            this.shootSpeed * Math.cos(angle),
            this.shootSpeed * Math.sin(angle),
        );
    }

    checkInCd(time: number) {
        if (this.shootTime === 0) {
            this.shootTime = time;
            return false;
        } else {
            const flag = time - this.shootTime > this.shootCd;
            if (flag) {
                this.shootTime = time;
                return false;
            } else {
                return true;
            }
        }
    }

    upgrade() {
        this.grade++;
        const g = this.grade - 1;
        this.shootCd = Math.max(500, 1000 - g * 100);
        this.shootSpeed = Math.min(1000, 600 + g * 100);
        this.shootAtk = Math.min(10, 5 + g);
    }
}
