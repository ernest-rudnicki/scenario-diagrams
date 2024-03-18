import { dia } from 'jointjs'
import { BaseElement } from '../types/BaseElement'

export class Canvas {
    private readonly graph = new dia.Graph()
    private paper: dia.Paper

    constructor(paperElement: HTMLElement) {
        this.graph = new dia.Graph()
        this.paper = new dia.Paper({
            el: paperElement,
            width: 1024,
            height: 1024,
            model: this.graph,
            gridSize: 1,
        })
    }

    addElements(element: BaseElement[]): void {
        this.graph.addCells(element.map((el) => el.shape))
    }
}
