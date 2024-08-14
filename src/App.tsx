import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // const jump = (str: string) => {
    //     phaserRef.current?.scene.changeScene(str);
    //     console.log(phaserRef.current);
    // };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            {/*<button onClick={() => jump("GameOver")} style={{ color: "black" }}>*/}
            {/*    Btn GameOver*/}
            {/*</button>*/}
            {/*<button onClick={() => jump("MainGame")} style={{ color: "black" }}>*/}
            {/*    Btn MainGame*/}
            {/*</button>*/}
            {/*<button onClick={() => jump("MainMenu")} style={{ color: "black" }}>*/}
            {/*    Btn MainMenu*/}
            {/*</button>*/}
        </div>
    );
}

export default App;
