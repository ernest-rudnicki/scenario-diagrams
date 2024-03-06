import { shapes } from "jointjs";
import { BaseElement } from "../types/BaseElement";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { CharacterColorMap } from "../maps/CharacterColorMap";
import { CharacterAttributes } from "../types/CharacterAttributes";

export class CharacterElement implements BaseElement {
    shape: shapes.basic.Generic;
    embedded: shapes.basic.Generic[];

    constructor(shapeData: ShapeData, characterAttributes: CharacterAttributes) {
        this.shape = this.createShape(shapeData, characterAttributes)
        this.embedded = []
    }

    private createShape(shapeData: ShapeData, elementAttributes: CharacterAttributes): shapes.basic.Generic {
        const { text, type } = elementAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: CharacterColorMap[type], rx: 10, ry: 10 }, text: { text, fill: Colors.Black } }
          })
    }
}