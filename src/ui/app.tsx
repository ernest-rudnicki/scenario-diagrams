import { render } from "solid-js/web";
import './index.css';
import { onMount } from "solid-js";
import { Canvas } from "./diagram-elements/Canvas";
import { ElementTypes } from "./types/ElementTypes";
import { CharacterElement } from "./diagram-elements/CharacterElement";

const CountingComponent = () => {

    onMount(() => {
        const canvas = new Canvas(document.getElementById("paper"))

        const character = new CharacterElement({ position: { x: 100, y: 30 }, size: { width: 100, height: 40 } }, { text: "Knight", type: ElementTypes.Player })
        const enemy = new CharacterElement({ position: { x: 250, y: 30 }, size: { width: 100, height: 40 } }, { text: "Orc", type: ElementTypes.Enemy })
        const npc = new CharacterElement({ position: { x: 400, y: 30 }, size: { width: 100, height: 40 } }, { text: "Trader", type: ElementTypes.NPC })

        canvas.addElements([character, enemy, npc])
    
        // const rect = new shapes.basic.Rect({
        //   position: { x: 100, y: 30 },
        //   size: { width: 100, height: 30 },
        //   attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
        // });
    
        // const rect2 = rect.clone() as joint.shapes.basic.Rect;
        // rect2.translate(300);
        
    
        // const link = new dia.Link({
        //   source: { id: rect.id },
        //   target: { id: rect2.id }
        // });
    
        // canvas.addCells([rect, rect2, link]);
    });

    return <div id="paper">Count value is</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));