import { shapes } from 'jointjs'
import { ShapeData } from '../types/Position'
import { Colors } from '../types/Colors'
import { ElementAttributes } from '../types/ElementAttributes'
import { DiagramElement } from './DiagramElement'

export class LocationElement extends DiagramElement {
    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes

        const shape = new shapes.standard.Ellipse({
            position: shapeData.position,
            size: { width: text.length * 16, height: 80 },
            attrs: {
                body: { fill: Colors.LightBlue },
                text: { text, fill: Colors.Black },
            },
        })

        super(shape)
    }
}
