import { shapes } from 'jointjs'
import { BaseElement } from '../types/BaseElement'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { CharacterColorMap } from '../maps/CharacterColorMap'
import { CharacterAttributes } from '../types/CharacterAttributes'

export class CharacterElement implements BaseElement {
    shape: shapes.basic.Generic

    constructor(
        shapeData: ShapeData,
        characterAttributes: CharacterAttributes
    ) {
        this.shape = this.createShape(shapeData, characterAttributes)
    }

    private createShape(
        shapeData: ShapeData,
        elementAttributes: CharacterAttributes
    ): shapes.basic.Generic {
        const { text, type } = elementAttributes

        return new shapes.standard.Rectangle({
            position: shapeData.position,
            size: { width: this.calculateWidth(text), height: 60 },
            attrs: {
                body: { fill: CharacterColorMap[type], rx: 10, ry: 10 },
                text: { text, fill: Colors.Black },
            },
        })
    }

    private calculateWidth(text: string): number {
        const textWidth = text.length * 20
        return textWidth < 100 ? 100 : textWidth
    }
}
