import { shapes } from "jointjs"
import { ShapeData } from "../types/Position"
import { ElementAttributes } from "../types/ElementAttributes"

export abstract class BaseElement {
    private _shape: shapes.basic.Generic

    constructor(shapeData: ShapeData, elementAttributes: ElementAttributes) {
        this._shape = this.createShape(shapeData, elementAttributes)
    }

    get shape(): shapes.basic.Generic {
        return this._shape
    }

    protected abstract createShape(shapeData: ShapeData, elementAttributes: ElementAttributes): shapes.basic.Generic;
        
}