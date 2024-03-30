import { Detail } from 'wink-nlp'
import { DiagramTypes } from './DiagramTypes'

export type CustomEntitiesHashMap = {
    [key in DiagramTypes]: DetailEntity
}

export interface DetailEntity extends Detail {
    index: number
}
