import { shapes } from "jointjs";
import { BaseElement } from "./BaseElement";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { ElementAttributes } from "../types/ElementAttributes";

export class AttributeElement extends BaseElement {
    protected override createShape(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        return new shapes.basic.Path({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { path: { fill: Colors.LightViolet, d: 'm 0 2 l 7 0 l 0 -1 l -2 -1 l -5 0 l 0 2' }, text: { 
                text,
                fill: Colors.Black,
                'ref-y': -25,
                'ref-x': 35,
            } }
          })
    }
}