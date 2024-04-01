import { WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'

export class ItemUseService {
    constructor(private nlp: WinkMethods) {}

    processPossibleItemUse(sentence: string): ProcessingResult {
        return { elements: [], links: [] }
    }

    leftSideDiagram = (character: string, location: string, item: string, verb: string, characterAttributes: string[]): ProcessingResult => {
        return { elements: [], links: [] }
    }

    rightSideDiagram = (character: string, location: string, item: string, characterAttributes: string[]): ProcessingResult => {
        return { elements: [], links: [] }
    }
}
