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
    {
        name: DiagramTypes.CHARACTER_ATTRIBUTES,
        patterns: ['[attributes|skills|attribute|skill] [|of|for] [|DET] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.ITEM_GRAB,
        patterns: ['[|DET] [NOUN|PROPN] [grabs|takes|collects|finds] [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.NPC_TALK,
        patterns: ['[|DET] [NOUN|PROPN] [talks|speaks|chats|communicates] to [|DET] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.ITEM_USE,
        patterns: [
            '[|DET] [NOUN|PROPN] [uses|consumes|applies] [|DET] [|ADJ] [NOUN|PROPN]',
            '[|DET] [NOUN|PROPN] [uses|consumes|applies] [|DET] [NOUN|PROPN] of [NOUN|PROPN]',
        ],
    },
    {
        name: DiagramTypes.ATTRIBUTE_INCREASE,
        patterns: ['[|DET] [NOUN|PROPN] is increased by'],
    },
    {
        name: DiagramTypes.ATTRIBUTE_DECREASE,
        patterns: ['[|DET] [NOUN|PROPN] is decreased by'],
    },
]

export const phrasePatterns: CustomEntityExample[] = [
    {
        name: PhraseTypes.NOUN_PHRASE,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN]'],
    },
]
