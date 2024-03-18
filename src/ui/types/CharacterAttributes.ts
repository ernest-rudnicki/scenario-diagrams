import { CharacterTypes } from './CharacterTypes'
import { ElementAttributes } from './ElementAttributes'

export interface CharacterAttributes extends ElementAttributes {
    type: CharacterTypes
}
