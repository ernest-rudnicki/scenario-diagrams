import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { ElementAttributes } from '../types/ElementAttributes'
import { BaseElement } from '../types/BaseElement'

export class ContainerElement implements BaseElement {
    shape: shapes.basic.Generic

    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        this.shape = this.createShape(shapeData, itemAttributes)
    }

    private createShape(
        shapeData: ShapeData,
        itemAttributes: ElementAttributes
    ) {
        const { text } = itemAttributes

        return new shapes.standard.Polygon({
            position: shapeData.position,
            size: { width: text.length * 10, height: 100 },
            attrs: {
                body: {
                    fill: Colors.Gold,
                    refPoints: '50 3, 100 28, 100 75, 50 100, 3 75, 3 25',
                },
                text: {
                    text,
                    fill: Colors.Black,
                },
            },
        })
    }
}
