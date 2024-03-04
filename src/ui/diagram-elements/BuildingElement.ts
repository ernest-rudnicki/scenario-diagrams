import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { ElementAttributes } from "../types/ElementAttributes";

export class BuildingElement extends BaseElement {
    protected override createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Polygon({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.LightGreen, refPoints: '50 15, 100 100, 0 100' }, text: { 
                text,
                fill: Colors.Black,
                'ref-y': 0.2,
            } }
          })
    }
}