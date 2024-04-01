import { Detail } from 'wink-nlp'
import { DiagramTypes } from './DiagramTypes'

export type CustomEntitiesHashMap = {
    [DiagramTypes.LOCATION_FROM]: DetailEntity
    [DiagramTypes.LOCATION_TO]: DetailEntity
    [DiagramTypes.CHARACTER_ATTRIBUTES]: DetailEntity
    [DiagramTypes.ITEM_GRAB]: DetailEntity
    [DiagramTypes.NPC_TALK]: DetailEntity
    [DiagramTypes.ATTRIBUTE_INCREASE]: DetailEntity[]
    [DiagramTypes.ATTRIBUTE_DECREASE]: DetailEntity[]
    [DiagramTypes.ITEM_USE]: DetailEntity
}

export interface DetailEntity extends Detail {
    index: number
}
