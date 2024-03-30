import winkNLP, { Detail, WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { LocationChangeService } from './LocationChangeService'
import { DiagramTypes } from '../types/DiagramTypes'
import { sentencePatterns } from '../nlp-patterns/NlpPatterns'
import { ProcessingResult } from '../types/ProcessingResult'
import { CustomEntitiesHashMap } from '../types/CustomEntitiesHashMap'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    private locationChangeService: LocationChangeService

    constructor() {
        this.locationChangeService = new LocationChangeService(this.nlp)
    }

    convertToDiagramElements = (text: string): ProcessingResult | null => {
        this.nlp.learnCustomEntities(sentencePatterns)

        const doc = this.nlp.readDoc(text)
        const customEntities = doc.customEntities().out(this.nlp.its.detail) as Detail[]

        const customEntitiesHashMap = this.getCustomEntitiesAsHashMap(customEntities)

        if (customEntitiesHashMap[DiagramTypes.LOCATION_FROM] && customEntitiesHashMap[DiagramTypes.LOCATION_TO]) {
            return this.locationChangeService.processPossibleLocationChange([
                customEntitiesHashMap[DiagramTypes.LOCATION_FROM],
                customEntitiesHashMap[DiagramTypes.LOCATION_TO],
            ])
        }

        return null
    }

    getCustomEntitiesAsHashMap(customEntities: Detail[]): CustomEntitiesHashMap {
        return customEntities.reduce((acc, entity) => {
            acc[entity.type as DiagramTypes] = entity.value
            return acc
        }, {} as CustomEntitiesHashMap)
    }
}
