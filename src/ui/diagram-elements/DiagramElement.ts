import { shapes } from 'jointjs'

export abstract class DiagramElement {
    constructor(private _shape: shapes.basic.Generic) {}

    get shape() {
        return this._shape
    }

    linkTo(element: DiagramElement): shapes.standard.Link {
        const link = new shapes.standard.Link()
        link.source(this.shape)
        link.target(element.shape)
        return link
    }
}
