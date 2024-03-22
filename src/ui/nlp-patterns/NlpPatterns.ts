import { SentenceTypes } from '../types/SentenceTypes'

export const nlpPatterns = [
    {
        name: SentenceTypes.BEING_IN_LOCATION,
        patterns: [
            '[|DET] [|ADJ] [NOUN|PROPN] [is|was] in [|DET] [NOUN|PROPN]',
        ],
    },
    {
        name: SentenceTypes.BEING_IN_LOCATION,
        patterns: [
            '[|DET] [|ADJ] [NOUN|PROPN] [goes|arrives|moves|comes|travels] to [|DET] [NOUN|PROPN]',
        ],
    },
]
