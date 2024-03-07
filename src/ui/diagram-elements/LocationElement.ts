import { shapes } from "jointjs";
import { ShapeData } from "../types/Position";
import { Colors } from "../types/Colors";
import { ElementAttributes } from "../types/ElementAttributes";
import { BaseElement } from "../types/BaseElement";

export class LocationElement implements BaseElement {
    shape: shapes.basic.Generic;

    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        this.shape = this.createShape(shapeData, itemAttributes)
    }

    private createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Ellipse({
            position: shapeData.position,
            size: { width: text.length * 16, height: 80 },
            attrs: { body: { fill: Colors.LightBlue }, text: { text, fill: Colors.Black } }
          })
    }
}