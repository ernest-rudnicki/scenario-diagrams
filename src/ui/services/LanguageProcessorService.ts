import winkNLP, { WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { BaseElement } from '../types/BaseElement'
import { nlpPatterns } from '../nlp-patterns/NlpPatterns'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    constructor() {
        this.nlp.learnCustomEntities(nlpPatterns)
    }

    convertToDiagramElements = (text: string): BaseElement[] => {
        // TODO use doc.tokens().out(nlp.its.pos)
        const sentences = this.nlp.readDoc(text).sentences().out()

        sentences.map((sentence) => {
            const doc = this.nlp.readDoc(text)
            console.log(doc.customEntities().out(this.nlp.its.detail))
        })
        return []
    }
}
