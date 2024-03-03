import { shapes } from "jointjs"
import { ShapeData } from "../types/Position"
import { CharacterAttributes } from "../types/CharacterAttributes"

export abstract class BaseElement {
    private _shape: shapes.basic.Generic

    constructor(shapeData: ShapeData, characterAttributes: CharacterAttributes) {
        this._shape = this.createShape(shapeData, characterAttributes)
    }

    get shape(): shapes.basic.Generic {
        return this._shape
    }

    protected abstract createShape(shapeData: ShapeData, characterAttributes: CharacterAttributes): shapes.basic.Generic;
        
}