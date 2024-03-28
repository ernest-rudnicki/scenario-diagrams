import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { CharacterColorMap } from '../maps/CharacterColorMap'
import { CharacterAttributes } from '../types/CharacterAttributes'
import { DiagramElement } from './DiagramElement'

export class CharacterElement extends DiagramElement {
    constructor(shapeData: ShapeData, characterAttributes: CharacterAttributes) {
        const { text, type } = characterAttributes
        const textWidth = text.length * 12

        const shape = new shapes.standard.Rectangle({
            position: shapeData.position,
            size: { width: textWidth < 100 ? 100 : textWidth, height: 60 },
            attrs: {
                body: { fill: CharacterColorMap[type], rx: 10, ry: 10 },
                text: { text, fill: Colors.Black },
            },
        })

        super(shape)
    }
}
