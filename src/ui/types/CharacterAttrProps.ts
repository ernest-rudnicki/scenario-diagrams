import { AttributeTypes } from './AttributeTypes'
import { ElementAttributes } from './ElementAttributes'

export interface CharacterAttrProps extends ElementAttributes {
    type: AttributeTypes
}
