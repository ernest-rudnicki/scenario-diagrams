import { CustomEntityExample } from 'wink-nlp'
import { DiagramTypes } from '../types/DiagramTypes'
import { PhraseTypes } from '../types/PhraseTypes'

export const sentencePatterns: CustomEntityExample[] = [
    {
        name: DiagramTypes.LOCATION_FROM,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [is|was] in [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.LOCATION_TO,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [goes|arrives|moves|comes|travels] to [|DET] [|ADJ] [NOUN|PROPN]'],
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
    {
        name: DiagramTypes.KILL_ENEMY,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [kills|defeats|eliminates] [|DET] [|ADJ] [NOUN|PROPN] with [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.ATTACK_ENEMY,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN] [attacks|strikes|hits] [|DET] [|ADJ] [NOUN|PROPN] with [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.GET_ITEM_FROM_NPC,
        patterns: ['[|DET] [NOUN|PROPN] gets [|DET] [|ADJ] [NOUN|PROPN] from [|DET] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.GIVE_ITEM_TO_NPC,
        patterns: ['[|DET] [NOUN|PROPN] gives [|DET] [|ADJ] [NOUN|PROPN] to [|DET] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.BUILDING_BUILT,
        patterns: ['[|DET] [NOUN|PROPN] builds [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.BUILDING_DESTROYED,
        patterns: ['[|DET] [NOUN|PROPN] destroys [|DET] [|ADJ] [NOUN|PROPN]'],
    },
    {
        name: DiagramTypes.GLOBAL_ATTRIBUTE_INCREASE,
        patterns: ['[|DET] [NOUN|PROPN] is globally increased by'],
    },
    {
        name: DiagramTypes.GLOBAL_ATTRIBUTE_DECREASE,
        patterns: ['[|DET] [NOUN|PROPN] is globally decreased by'],
    },
]

export const phrasePatterns: CustomEntityExample[] = [
    {
        name: PhraseTypes.NOUN_PHRASE,
        patterns: ['[|DET] [|ADJ] [NOUN|PROPN]'],
    },
]
