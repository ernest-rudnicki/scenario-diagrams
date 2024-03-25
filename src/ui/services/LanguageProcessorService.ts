import winkNLP, { Detail, WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { BaseElement } from '../types/BaseElement'
import { LocationChangeService } from './LocationChangeService'
import { SentenceTypes } from '../types/SentenceTypes'
import { nlpPatterns } from '../nlp-patterns/NlpPatterns'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    private locationChangeService: LocationChangeService

    constructor() {
        this.nlp.learnCustomEntities(nlpPatterns)

        this.locationChangeService = new LocationChangeService()
    }

    convertToDiagramElements = (text: string): BaseElement[] => {
        const doc = this.nlp.readDoc(text)
        const customEntities = doc.customEntities().out(this.nlp.its.detail) as Detail[]

        if (customEntities.length !== 1) {
            // TODO handle as error
            return []
        }

        const sentences = doc.sentences().out()

        switch (customEntities[0].type) {
            case SentenceTypes.LOCATION_CHANGE:
                return this.locationChangeService.processPossibleLocationChange(sentences)
            default:
                return []
        }
    }
}
