import { ShootGun } from "../../utils/ShootGun.ts";
import { getClosestOneAngleOfGroup } from "./ComputeSystem.ts";

type Group = Phaser.Physics.Arcade.Group | Phaser.GameObjects.Group;

export function gunShootCloset(
    x: number,
    y: number,
    gun: ShootGun,
    group: Group,
    time: number,
) {
    if (gun.checkInCd(time)) return;
    let angle: number = 0;
    if (!group.children.size) {
        angle = Math.random() * 360;
    } else {
        angle = getClosestOneAngleOfGroup(x, y, group);
    }

    gun.shoot({
        name: "shit",
        x,
        y,
        angle,
    });
}
