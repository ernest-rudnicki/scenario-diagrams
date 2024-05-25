import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { CharacterTypes } from '../types/CharacterTypes'
import { LocationElement } from '../diagram-elements/LocationElement'
import { ActionElement } from '../diagram-elements/ActionElement'

export class NpcTalkService {
    constructor(private nlp: WinkMethods) {}

    processPossibleNpcTalk = (sentences: string[], characterAttributes: string[]): ProcessingResult => {
        this.nlp.learnCustomEntities(phrasePatterns)

        const locationData = this.nlp.readDoc(sentences[0]).customEntities().out(this.nlp.its.detail) as Detail[]
        const npcTalkDoc = this.nlp.readDoc(sentences[1])
        const npcTalkData = npcTalkDoc.customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(locationData[0].value)
        const location = stripUnnecessaryWords(locationData[1].value)
        let npc = ''
        let verb = ''

        if (npcTalkData[1].value === 'chats' || npcTalkData[1].value === 'talks') {
            npc = stripUnnecessaryWords(npcTalkData[2].value)
            verb = npcTalkData[1].value
        } else {
            npc = stripUnnecessaryWords(npcTalkData[1].value)
            verb = sentences[1].split(' ')[(npcTalkDoc.tokens().out(this.nlp.its.pos) as string[]).findIndex((pos) => pos === 'VERB')]
        }

        const leftSideDiagram = this.leftSideDiagram(character, location, npc, verb, characterAttributes)
        const rightSideDiagram = this.rightSideDiagram(character, location, npc, characterAttributes)

        return { elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements], links: [...leftSideDiagram.links, ...rightSideDiagram.links] }
    }

    leftSideDiagram = (character: string, location: string, npc: string, verb: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const locationElement = new LocationElement({ position: { x: 100, y: 400 } }, { text: location })
        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: verb })

        const npcElement = new CharacterElement({ position: { x: 300, y: 400 } }, { text: npc, type: CharacterTypes.NPC })

        return {
            elements: [characterElement, locationElement, actionElement, npcElement],
            links: [
                characterElement.linkTo(locationElement),
                characterElement.linkTo(actionElement),
                actionElement.linkTo(npcElement),
                npcElement.linkTo(locationElement),
            ],
        }
    }

    rightSideDiagram = (character: string, location: string, npc: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const locationElement = new LocationElement({ position: { x: 600, y: 400 } }, { text: location })

        const npcElement = new CharacterElement({ position: { x: 750, y: 400 } }, { text: npc, type: CharacterTypes.NPC })

        return {
            elements: [characterElement, locationElement, npcElement],
            links: [characterElement.linkTo(locationElement), npcElement.linkTo(locationElement)],
        }
    }
}
