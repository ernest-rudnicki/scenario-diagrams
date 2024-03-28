import winkNLP, { Detail, WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { LocationChangeService } from './LocationChangeService'
import { DiagramTypes } from '../types/DiagramTypes'
import { nlpPatterns } from '../nlp-patterns/NlpPatterns'
import { ProcessingResult } from '../types/ProcessingResult'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    private locationChangeService: LocationChangeService

    constructor() {
        this.nlp.learnCustomEntities(nlpPatterns)

        this.locationChangeService = new LocationChangeService(this.nlp)
    }

    convertToDiagramElements = (text: string): ProcessingResult | null => {
        const doc = this.nlp.readDoc(text)
        const customEntities = doc.customEntities().out(this.nlp.its.detail) as Detail[]

        if (customEntities.length !== 1) {
            // TODO handle as error
            return null
        }

        const sentences = doc.sentences().out()

        switch (customEntities[0].type) {
            case DiagramTypes.LOCATION_CHANGE:
                return this.locationChangeService.processPossibleLocationChange(sentences)
            default:
                return null
        }
    }
}
