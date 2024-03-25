import { CustomEntityExample } from 'wink-nlp'
import { DiagramTypes } from '../types/DiagramTypes'

export const nlpPatterns: CustomEntityExample[] = [
    {
        name: DiagramTypes.LOCATION_CHANGE,
        patterns: [
            '[|DET] [|ADJ] [NOUN|PROPN] [is|was] in [|DET] [NOUN|PROPN] PUNCT [|DET] [|ADJ] [NOUN|PROPN] [goes|arrives|moves|comes|travels] to [|DET] [NOUN|PROPN]',
        ],
    },
]
