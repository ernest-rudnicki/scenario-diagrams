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
    [DiagramTypes.KILL_ENEMY]: DetailEntity
    [DiagramTypes.ATTACK_ENEMY]: DetailEntity
    [DiagramTypes.GET_ITEM_FROM_NPC]: DetailEntity
    [DiagramTypes.GIVE_ITEM_TO_NPC]: DetailEntity
}

export interface DetailEntity extends Detail {
    index: number
}
