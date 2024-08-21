import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const jump = (str: string) => {
        phaserRef.current?.scene?.changeScene(str);
    };

    const handle = () => {
        console.log(phaserRef.current?.scene?.registry.get("score"));
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            {/*<div*/}
            {/*    style={{*/}
            {/*        display: "flex",*/}
            {/*        position: "absolute",*/}
            {/*        left: "0",*/}
            {/*        top: "0",*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <button onClick={handle}>click</button>*/}
            {/*    <button onClick={() => jump("GameOver")}>Btn GameOver</button>*/}
            {/*    <button onClick={() => jump("MainGame")}>Btn MainGame</button>*/}
            {/*    <button onClick={() => jump("MainMenu")}>Btn MainMenu</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
