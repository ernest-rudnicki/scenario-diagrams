import { WinkMethods } from 'wink-nlp'
import { AttributeChange } from '../types/AttributeChange'
import { stripUnnecessaryWords } from './strip-unnecessary-words'

export function getAttributeChange(nlp: WinkMethods, attribute?: string[]): AttributeChange[] {
    if (!attribute) return []
    return attribute.map((attr) => {
        const verbIndex = (nlp.readDoc(attr).tokens().out(nlp.its.pos) as string[]).findIndex((pos) => pos === 'VERB')
        const attribute = stripUnnecessaryWords(
            attr
                .split(' ')
                .slice(0, verbIndex - 1)
                .join(' ')
        )
        const number = attr.match(/\d+/)?.[0]

        return { name: attribute, value: parseInt(number) }
    })
}
