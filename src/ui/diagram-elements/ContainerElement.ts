import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { ElementAttributes } from "../types/ElementAttributes";

export class ContainerElement extends BaseElement {
    protected override createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Polygon({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.Gold, refPoints: '50 3, 100 28, 100 75, 50 100, 3 75, 3 25' }, text: { 
                text,
                fill: Colors.Black,
            } }
          })
    }
}