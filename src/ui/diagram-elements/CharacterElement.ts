import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";

import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { CharacterColorMap } from "../maps/CharacterColorMap";
import { CharacterAttributes } from "../types/CharacterAttributes";

export class CharacterElement extends BaseElement {

    constructor(shapeData: ShapeData, characterAttributes: CharacterAttributes) {
        super(shapeData, characterAttributes)
    }

    protected createShape(shapeData: ShapeData, elementAttributes: CharacterAttributes): shapes.basic.Generic {
        const { text, type } = elementAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: CharacterColorMap[type], rx: 10, ry: 10 }, text: { text, fill: Colors.Black } }
          })
    }
}