import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { ElementAttributes } from '../types/ElementAttributes'
import { DiagramElement } from './DiagramElement'

export class ActionElement extends DiagramElement {
    minWidth = 100

    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes
        const width = text.length * 12

        const shape = new shapes.standard.Polygon({
            position: shapeData.position,
            size: { width: width < 100 ? 100 : width, height: 100 },
            attrs: {
                body: {
                    fill: Colors.Grassgreen,
                    refPoints: '100 -20, 100 75, 50 40, 3 75, 3 -20',
                },
                text: {
                    text,
                    fill: Colors.Black,
                    'ref-y': -10,
                },
            },
        })

        super(shape)
    }
}
