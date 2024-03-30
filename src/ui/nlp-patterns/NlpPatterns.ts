import { CustomEntityExample } from 'wink-nlp'
import { DiagramTypes } from '../types/DiagramTypes'
import { PhraseTypes } from '../types/PhraseTypes'

export const sentencePatterns: CustomEntityExample[] = [
    {
        name: DiagramTypes.LOCATION_FROM,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [is|was] in [|DET] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.LOCATION_TO,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [goes|arrives|moves|comes|travels] to [|DET] [NOUN|PROPN]'],
    },
]

export const phrasePatterns: CustomEntityExample[] = [
    {
        name: PhraseTypes.NOUN_PHRASE,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN]'],
    },
]
