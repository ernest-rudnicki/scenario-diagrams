import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { ElementAttributes } from '../types/ElementAttributes'
import { DiagramElement } from './DiagramElement'

export class ContainerElement extends DiagramElement {
    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        const shape = new shapes.standard.Polygon({
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

        super(shape)
    }
}
