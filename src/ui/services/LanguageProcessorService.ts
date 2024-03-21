import winkNLP, { WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { BaseElement } from '../types/BaseElement'

export class LanguageProcessorService {
    nlp: WinkMethods = winkNLP(model)

    convertToDiagramElements = (text: string): BaseElement[] => {
        // TODO use doc.tokens().out(nlp.its.pos)
        return []
    }
}
