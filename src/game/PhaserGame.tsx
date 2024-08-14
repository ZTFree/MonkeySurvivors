import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

export const PhaserGame = forwardRef<IRefPhaserGame, any>(
    function PhaserGame(ref, props) {
        const game = useRef<Phaser.Game | null>(null!);

        useLayoutEffect(() => {
            if (game.current === null) {
                game.current = StartGame("game-container");

                if (!ref) {
                    ref = { game: game.current, scene: null };
                }
            }

            return () => {
                if (game.current) {
                    game.current.destroy(true);
                    game.current = null;
                }
            };
        }, [ref]);

        useEffect(() => {
            EventBus.on("current-scene-ready", (scene: Phaser.Scene) => {
                if (!ref) {
                    ref = {
                        game: game.current,
                        scene: scene,
                    };
                }
            });
            return () => {
                EventBus.removeListener("current-scene-ready");
            };
        }, [ref]);

        return <div id="game-container" />;
    },
);
