import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { ElementAttributes } from '../types/ElementAttributes'
import { DiagramElement } from './DiagramElement'

export class BuildingElement extends DiagramElement {
    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        const shape = new shapes.standard.Polygon({
            position: shapeData.position,
            size: { width: text.length * 20, height: 100 },
            attrs: {
                body: {
                    fill: Colors.LightGreen,
                    refPoints: '50 15, 100 100, 0 100',
                },
                text: {
                    text,
                    fill: Colors.Black,
                    'ref-y': 0.2,
                },
            },
        })

        super(shape)
    }
}
