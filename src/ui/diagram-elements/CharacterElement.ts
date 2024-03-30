import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { CharacterColorMap } from '../maps/CharacterColorMap'
import { CharacterAttributes } from '../types/CharacterAttributes'
import { DiagramElement } from './DiagramElement'
import { AttributeElement } from './AttributeElement'
import { AttributeTypes } from '../types/AttributeTypes'

export class CharacterElement extends DiagramElement {
    constructor(shapeData: ShapeData, characterAttributes: CharacterAttributes, attributes: string[] = []) {
        const { text, type } = characterAttributes
        const textWidth = text.length * 12

        const shape = new shapes.standard.Rectangle({
            position: shapeData.position,
            size: { width: textWidth < 100 ? 100 : textWidth, height: 60 * (attributes.length || 1) },
            attrs: {
                body: { fill: CharacterColorMap[type], rx: 10, ry: 10 },
                text: { text, fill: Colors.Black },
            },
        })

        const attributeElements = attributes.map(
            (attribute, index) =>
                new AttributeElement(
                    { position: { x: shapeData.position.x + textWidth, y: shapeData.position.y + 25 * index } },
                    { text: attribute, type: AttributeTypes.Normal }
                )
        )

        super(shape, attributeElements)
    }
}
