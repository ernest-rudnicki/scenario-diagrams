import { shapes } from "jointjs";
import { ShapeData } from "../types/Position";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ElementAttributes } from "../types/ElementAttributes";

export class ItemElement extends BaseElement {
    protected createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.Grey, rx: 1, ry: 1 }, text: { text, fill: Colors.Black } }
          })
    }
}