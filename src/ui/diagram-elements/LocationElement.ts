import { shapes } from "jointjs";
import { ShapeData } from "../types/Position";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ElementAttributes } from "../types/ElementAttributes";

export class LocationElement extends BaseElement {
    protected override createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Ellipse({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.LightBlue }, text: { text, fill: Colors.Black } }
          })
    }
}