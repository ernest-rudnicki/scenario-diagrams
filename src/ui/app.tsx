import { render } from "solid-js/web";
import './index.css';
import { onMount } from "solid-js";
import { Canvas } from "./diagram-elements/Canvas";

import { CharacterElement } from "./diagram-elements/CharacterElement";
import { CharacterTypes } from "./types/CharacterTypes";
import { ItemElement } from "./diagram-elements/ItemElement";

const CountingComponent = () => {

    onMount(() => {
        const canvas = new Canvas(document.getElementById("paper"))

        const character = new CharacterElement({ position: { x: 100, y: 30 }, size: { width: 100, height: 40 } }, { text: "Knight", type: CharacterTypes.Player })
        const enemy = new CharacterElement({ position: { x: 250, y: 30 }, size: { width: 100, height: 40 } }, { text: "Orc", type: CharacterTypes.Enemy })
        const npc = new CharacterElement({ position: { x: 400, y: 30 }, size: { width: 100, height: 40 } }, { text: "Trader", type: CharacterTypes.NPC })
        const item  = new ItemElement({ position: { x: 100, y: 100 }, size: { width: 100, height: 40 } }, { text: "Sword" })

        canvas.addElements([character, enemy, npc, item])
    });

    return <div id="paper">Count value is</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));