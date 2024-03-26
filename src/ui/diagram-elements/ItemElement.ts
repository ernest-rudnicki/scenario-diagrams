import { shapes } from 'jointjs'
import { ShapeData } from '../types/Position'
import { Colors } from '../types/Colors'
import { ElementAttributes } from '../types/ElementAttributes'
import { DiagramElement } from './DiagramElement'

export class ItemElement extends DiagramElement {
    constructor(shapeData: ShapeData, itemAttributes: ElementAttributes) {
        const { text } = itemAttributes
        const textWidth = text.length * 20

        const shape = new shapes.standard.Rectangle({
            position: shapeData.position,
            size: { width: textWidth < 100 ? 100 : textWidth, height: 60 },
            attrs: {
                body: { fill: Colors.Grey, rx: 1, ry: 1 },
                text: { text, fill: Colors.Black },
            },
        })

        super(shape)
    }
}
