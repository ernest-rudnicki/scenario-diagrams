import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";
import { ElementColorMap } from "../maps/ElementColorMap";
import { Colors } from "../types/Colors";
import { CharacterAttributes } from "../types/CharacterAttributes";
import { ShapeData } from "../types/Position";

export class CharacterElement extends BaseElement {
    protected createShape(shapeData: ShapeData, characterAttributes: CharacterAttributes): shapes.basic.Generic {
        const { text, type } = characterAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: ElementColorMap[type], rx: 10, ry: 10 }, text: { text, fill: Colors.Black } }
          })
    }
}