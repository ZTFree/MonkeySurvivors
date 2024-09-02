// import Group = Phaser.Physics.Arcade.Group;

type Group = Phaser.Physics.Arcade.Group | Phaser.GameObjects.Group;

export function getClosestOneAngleOfGroup(x: number, y: number, group: Group) {
    // 有敌人则攻击最近的敌人
    const children = group.children.getArray();

    children.sort((a, b) => {
        const aXlen = a.body?.x - x,
            bXlen = b.body?.x - x;
        const aYlen = a.body?.y - y,
            bYlen = b.body?.y - y;
        const aLen = Math.pow(aXlen ** 2 + aYlen ** 2, 0.5),
            bLen = Math.pow(bXlen ** 2 + bYlen ** 2, 0.5);
        return aLen - bLen;
    });
    const angle = Math.atan2(children[0].y - y, children[0].x - x);
    return angle;
}
