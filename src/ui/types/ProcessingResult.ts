import { DiagramElement } from '../diagram-elements/DiagramElement'
import { shapes } from 'jointjs'

export interface ProcessingResult {
    elements: DiagramElement[]
    links: shapes.standard.Link[]
}
