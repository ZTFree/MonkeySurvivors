import Group = Phaser.Physics.Arcade.Group;
import Sprite = Phaser.Physics.Arcade.Sprite;

export function GroupToOne(
    x: number,
    y: number,
    group: Group,
    sp: number = 100,
) {
    group.setVelocity(0, 0);

    group.children.getArray().forEach((child) => {
        const node = child as Sprite;
        const speed = node?.props?.speed ?? sp;
        const angle = Math.atan2(y - node.y, x - node.x);
        node.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle));
    });
}
