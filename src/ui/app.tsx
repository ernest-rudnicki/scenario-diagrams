import { render } from "solid-js/web";
import './index.css';
import { onMount } from "solid-js";
import { Canvas } from "./diagram-elements/Canvas";

import { CharacterElement } from "./diagram-elements/CharacterElement";
import { CharacterTypes } from "./types/CharacterTypes";
import { ItemElement } from "./diagram-elements/ItemElement";
import { ContainerElement } from "./diagram-elements/ContainerElement";
import { BuildingElement } from "./diagram-elements/BuildingElement";
import { LocationElement } from "./diagram-elements/LocationElement";
import { AttributeElement } from "./diagram-elements/AttributeElement";
import { AttributeTypes } from "./types/AttributeTypes";

const CountingComponent = () => {

    onMount(() => {
        const canvas = new Canvas(document.getElementById("paper"))

        const character = new CharacterElement({ position: { x: 100, y: 30 }, size: { width: 100, height: 40 } }, { text: "Knight", type: CharacterTypes.Player })
        const enemy = new CharacterElement({ position: { x: 250, y: 30 }, size: { width: 100, height: 40 } }, { text: "Orc", type: CharacterTypes.Enemy })
        const npc = new CharacterElement({ position: { x: 400, y: 30 }, size: { width: 100, height: 40 } }, { text: "Trader", type: CharacterTypes.NPC })
        const item  = new ItemElement({ position: { x: 100, y: 100 }, size: { width: 100, height: 40 } }, { text: "Sword" })
        const container = new ContainerElement({ position: { x: 250, y: 100 }, size: { width: 100, height: 60 } }, { text: "Backpack" })
        const building = new BuildingElement({ position: { x: 400, y: 100 }, size: { width: 100, height: 60 } }, { text: "House" })
        const location =  new LocationElement({ position: { x: 100, y: 200 }, size: { width: 100, height: 60 } }, { text: "Forest" })
        const attribute = new AttributeElement({ position: { x: 250, y: 220 }, size: { width: 100, height: 20 } }, { text: "Strength", type: AttributeTypes.Normal })
        const attributeGlobal = new AttributeElement({ position: { x: 400, y: 220 }, size: { width: 100, height: 20 } }, { text: "Strength", type: AttributeTypes.Global })

        canvas.addElements([character, enemy, npc, item, container, building, location, attribute, attributeGlobal])
    });

    return <div id="paper"></div>;
};

render(() => <CountingComponent />, document.getElementById("app"));