import { shapes } from "jointjs";
import { Colors } from "../types/Colors";
import { ShapeData } from "../types/Position";
import { CharacterAttrAttributes } from "../types/CharacterAttrAttributes";
import { AttributeColorMap } from "../maps/AttributeColorMap";
import { BaseElement } from "../types/BaseElement";

export class AttributeElement implements BaseElement {
    shape: shapes.basic.Generic;

    constructor(shapeData: ShapeData, characterAttributes: CharacterAttrAttributes) {
        this.shape = this.createShape(shapeData, characterAttributes)
    }

    private createShape(shapeData: ShapeData, itemAttributes: CharacterAttrAttributes) {
        const { text } = itemAttributes

        return new shapes.basic.Path({
            position: shapeData.position,
            size: shapeData.size,
            attrs: { path: { fill: AttributeColorMap[itemAttributes.type], d: 'm 0 2 l 7 0 l 0 -1 l -2 -1 l -5 0 l 0 2' }, text: { 
                text,
                fill: Colors.Black,
                'ref-y': -25,
                'ref-x': 35,
            } }
          })
    }
}