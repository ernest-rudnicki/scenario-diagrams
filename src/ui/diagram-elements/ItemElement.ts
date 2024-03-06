import { shapes } from "jointjs";
import { ShapeData } from "../types/Position";
import { Colors } from "../types/Colors";
import { ElementAttributes } from "../types/ElementAttributes";
import { BaseElement } from "../types/BaseElement";

export class ItemElement implements BaseElement {
    shape: shapes.basic.Generic;

    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        this.shape = this.createShape(shapeData, itemAttributes)
    }

    private createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.Grey, rx: 1, ry: 1 }, text: { text, fill: Colors.Black } }
          })
    }
}