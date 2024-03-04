import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { ElementAttributes } from "../types/ElementAttributes";

export class ActionElement extends BaseElement {
    protected override createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.standard.Polygon({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { body: { fill: Colors.Grassgreen, refPoints: '100 -20, 100 75, 50 40, 3 75, 3 -20',  }, text: { 
                text,
                fill: Colors.Black,
                "ref-y": -10,
            } }
          })
    }
}