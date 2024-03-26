import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { CharacterAttrAttributes } from '../types/CharacterAttrAttributes'
import { AttributeColorMap } from '../maps/AttributeColorMap'
import { DiagramElement } from './DiagramElement'

export class AttributeElement extends DiagramElement {
    constructor(shapeData: ShapeData, characterAttributes: CharacterAttrAttributes) {
        const { text } = characterAttributes

        const shape = new shapes.basic.Path({
            position: shapeData.position,
            size: { width: text.length * 10, height: 20 },
            attrs: {
                path: {
                    fill: AttributeColorMap[characterAttributes.type],
                    d: 'm 0 2 l 7 0 l 0 -1 l -2 -1 l -5 0 l 0 2',
                },
                text: {
                    text,
                    fill: Colors.Black,
                    'ref-y': -25,
                    'ref-x': 35,
                },
            },
        })

        super(shape)
    }
}
