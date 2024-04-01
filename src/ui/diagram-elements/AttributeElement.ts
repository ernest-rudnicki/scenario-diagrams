import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { CharacterAttrProps } from '../types/CharacterAttrProps'
import { AttributeColorMap } from '../maps/AttributeColorMap'
import { DiagramElement } from './DiagramElement'

export class AttributeElement extends DiagramElement {
    constructor(shapeData: ShapeData, characterAttributes: CharacterAttrProps) {
        const { text, type } = characterAttributes

        const shape = new shapes.basic.Path({
            position: shapeData.position,
            size: { width: text.length * 10, height: 20 },
            attrs: {
                path: {
                    fill: AttributeColorMap[type],
                    d: 'm 0 2 l 7 0 l 0 -1 l -2 -1 l -5 0 l 0 2',
                },
                text: {
                    text,
                    fill: Colors.Black,
                    'ref-y': -25,
                    textAnchor: 'middle',
                },
            },
        })

        super(shape)
    }
}
