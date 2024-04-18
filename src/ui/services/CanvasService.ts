import { dia, shapes } from 'jointjs'
import { DiagramElement } from '../diagram-elements/DiagramElement'
import { LineElement } from '../diagram-elements/LineElement'

export class CanvasService {
    private readonly graph = new dia.Graph()
    private paper: dia.Paper
    private document: Document

    private selectedElement: dia.Element<dia.Element.Attributes, dia.ModelSetOptions> | dia.Link<dia.Link.Attributes, dia.ModelSetOptions>

    init(paperElement: HTMLElement, document: Document): void {
        this.paper = new dia.Paper({
            el: paperElement,
            width: 1024,
            height: 1024,
            model: this.graph,
            gridSize: 1,
        })
        this.document = document

        this.setupHandlers()
    }

    createDiagram(elements: DiagramElement[], links: shapes.standard.Link[]): void {
        this.setupScenarioProductionElements()
        this.addElements(elements)
        this.addLinks(links)
    }

    private addElements(elements: DiagramElement[]): void {
        elements.forEach((element) => {
            this.graph.addCell(element.shape)
            element.innerElements.forEach((innerElement) => this.graph.addCell(innerElement.shape))
        })
    }

    private addLinks(links: shapes.standard.Link[]): void {
        links.forEach((link) => link.addTo(this.graph))
    }

    private setupScenarioProductionElements(): void {
        const line = new LineElement({ position: { x: 500, y: 50 } }, 600)
        const arrow = new shapes.standard.Link({
            source: { x: 450, y: 300 },
            target: { x: 550, y: 300 },
        })

        this.graph.addCells([line.shape])
        arrow.addTo(this.graph)
    }

    private setupHandlers(): void {
        this.paper.on('element:pointerdown', (element) => this.selectElement(element))
        this.paper.on('link:pointerdown', (element) => this.selectLink(element))
        this.paper.on('blank:pointerdown', () => this.unselectElement())
        this.document.addEventListener('keydown', () => this.removeElement())
    }

    selectElement(element: dia.ElementView): void {
        if (this.selectedElement) {
            this.resetSelectedElement()
        }

        const currentElement = element.model
        currentElement.attr({ body: { stroke: 'gold', strokeWidth: 2 } })

        this.selectedElement = currentElement
    }

    selectLink(link: dia.LinkView): void {
        if (this.selectedElement) {
            this.resetSelectedElement()
        }

        const currentElement = link.model
        currentElement.attr({ line: { stroke: 'gold', strokeWidth: 3, strokeDasharray: '5,2' } })

        this.selectedElement = currentElement
    }

    unselectElement(): void {
        if (!this.selectedElement) return

        this.resetSelectedElement()

        this.selectedElement = null
    }

    resetSelectedElement(): void {
        this.selectedElement.attr({ body: { stroke: 'black' }, line: { stroke: 'black', strokeWidth: 1, strokeDasharray: 0 } })
    }

    removeElement(): void {
        this.selectedElement?.remove()
        this.selectedElement = null
    }
}
