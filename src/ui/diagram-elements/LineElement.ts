import { shapes } from 'jointjs'
import { Colors } from '../types/Colors'
import { ShapeData } from '../types/Position'
import { DiagramElement } from './DiagramElement'

export class LineElement extends DiagramElement {
    constructor(shapeData: ShapeData, height = 60) {
        const shape = new shapes.standard.Rectangle({
            position: shapeData.position,
            size: { width: 2, height },
            attrs: { body: { fill: Colors.Black } },
        })

        super(shape)
    }
}
