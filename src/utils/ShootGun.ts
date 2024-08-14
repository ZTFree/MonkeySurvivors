import Group = Phaser.Physics.Arcade.Group;

interface GunOption {
    shootCd: number;
    shootSpeed: number;
    shootAtk: number;
}

export class ShootGun {
    shootCd: number;
    shootSpeed: number;
    shootAtk: number;
    shootTime: number;
    scence: Phaser.Scene;
    bulletGroup: Group;

    constructor(scence: Phaser.Scene, opt?: GunOption) {
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
        this.shootTime = 0;
        this.bulletGroup = this.scence.physics.add.group({ immovable: false });
    }

    shoot(opt: { name: string; x: number; y: number; angle: number }) {
        const { name, x, y, angle } = opt;

        const bullet: Phaser.Physics.Arcade.Image = this.bulletGroup.create(
            x,
            y,
            name,
        );

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
}
