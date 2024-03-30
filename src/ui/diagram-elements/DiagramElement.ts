import { shapes } from 'jointjs'

export abstract class DiagramElement {
    constructor(
        private _shape: shapes.basic.Generic,
        private _innerElements: DiagramElement[] = []
    ) {}

    get shape() {
        return this._shape
    }

    get innerElements() {
        return this._innerElements
    }

    linkTo(element: DiagramElement): shapes.standard.Link {
        const link = new shapes.standard.Link()
        link.source(this.shape)
        link.target(element.shape)
        return link
    }
}
