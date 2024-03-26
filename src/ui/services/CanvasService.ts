import { dia, shapes } from 'jointjs'
import { DiagramElement } from '../diagram-elements/DiagramElement'

export class CanvasService {
    private readonly graph = new dia.Graph()
    private paper: dia.Paper

    init(paperElement: HTMLElement): void {
        this.paper = new dia.Paper({
            el: paperElement,
            width: 1024,
            height: 1024,
            model: this.graph,
            gridSize: 1,
        })
    }

    createDiagram(elements: DiagramElement[], links: shapes.standard.Link[]): void {
        this.addElements(elements)
        this.addLinks(links)
    }

    private addElements(element: DiagramElement[]): void {
        this.graph.addCells(element.map((el) => el.shape))
    }

    private addLinks(links: shapes.standard.Link[]): void {
        links.forEach((link) => link.addTo(this.graph))
    }
}
