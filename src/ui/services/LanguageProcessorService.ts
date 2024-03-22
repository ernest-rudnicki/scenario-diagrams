import winkNLP, { Detail, WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { BaseElement } from '../types/BaseElement'
import { nlpPatterns } from '../nlp-patterns/NlpPatterns'
import { SentenceTypes } from '../types/SentenceTypes'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { ActionElement } from '../diagram-elements/ActionElement'
import { LocationElement } from '../diagram-elements/LocationElement'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    constructor() {
        this.nlp.learnCustomEntities(nlpPatterns)
    }

    convertToDiagramElements = (text: string): BaseElement[] => {
        const sentences = this.nlp.readDoc(text).sentences().out();

        if (sentences.length === 2) {
            return this.processPossibleLocationChange(text)
        }


        return []
    }

    private processPossibleLocationChange = (text: string): BaseElement[] => {
        const doc = this.nlp.readDoc(text)
        const [from, to] = doc.customEntities().out(this.nlp.its.detail) as Detail[];
        console.log(from, to)
        
        if(from.type === SentenceTypes.BEING_IN_LOCATION && to.type === SentenceTypes.GOING_TO_LOCATION) {
            return this.locationFromElements(from)
        }
        
        return [];
    }

    private locationFromElements = (from: Detail): BaseElement[] => {
        const [character, verb, place] = this.stripUnnecessaryWords(from.value).split(' ')
        return [
            new CharacterElement(
                { position: { x: 100, y: 30 } },
                { text: character, type: CharacterTypes.Player }
            ),
            new ActionElement(
                { position: { x: 100, y: 300 } },
                { text: verb }
            ),
            new LocationElement(
                { position: { x: 100, y: 200 } },
                { text: place }
            )
        ]
    }

    private stripUnnecessaryWords = (text: string): string => {
        return text.replace(/(the|a|an|in|to|from)\s/g, '')
    }
}
