import { CustomEntityExample } from 'wink-nlp'
import { SentenceTypes } from '../types/SentenceTypes'

export const nlpPatterns: CustomEntityExample[] = [
    {
        name: SentenceTypes.LOCATION_CHANGE,
        patterns: [
            '[|DET] [|ADJ] [NOUN|PROPN] [is|was] in [|DET] [NOUN|PROPN] PUNCT [|DET] [|ADJ] [NOUN|PROPN] [goes|arrives|moves|comes|travels] to [|DET] [NOUN|PROPN]',
        ],
    },
]
