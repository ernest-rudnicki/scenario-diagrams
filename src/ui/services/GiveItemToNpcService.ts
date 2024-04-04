import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { CharacterTypes } from '../types/CharacterTypes'
import { ContainerElement } from '../diagram-elements/ContainerElement'
import { ItemElement } from '../diagram-elements/ItemElement'
import { ActionElement } from '../diagram-elements/ActionElement'

export class GiveItemToNpcService {
    constructor(private nlp: WinkMethods) {}

    processPossibleGiveItemToNpc(sentence: string): ProcessingResult {
        this.nlp.learnCustomEntities(phrasePatterns)
        const entities = this.nlp.readDoc(sentence).customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(entities[0].value)
        const item = stripUnnecessaryWords(entities[1].value)
        const npc = stripUnnecessaryWords(entities[2].value)

        const leftSideDiagram = this.leftSideDiagram(character, item, npc)
        const rightSideDiagram = this.rightSideDiagram(character, item, npc)

        return {
            elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements],
            links: [...leftSideDiagram.links, ...rightSideDiagram.links],
        }
    }

    leftSideDiagram(character: string, item: string, npc: string): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            []
        )

        const containerElement = new ContainerElement({ position: { x: 100, y: 500 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 300, y: 350 } }, { text: item })

        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: 'gives' })

        const npcElement = new CharacterElement({ position: { x: 300, y: 250 } }, { text: capitalizeFirstLetter(npc), type: CharacterTypes.NPC }, [])
        return {
            elements: [characterElement, containerElement, itemElement, actionElement, npcElement],
            links: [characterElement.linkTo(containerElement), characterElement.linkTo(actionElement), containerElement.linkTo(itemElement)],
        }
    }

    rightSideDiagram(character: string, item: string, npc: string): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            []
        )

        const containerElement = new ContainerElement({ position: { x: 600, y: 200 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 600, y: 400 } }, { text: item })

        const npcElement = new CharacterElement({ position: { x: 800, y: 250 } }, { text: capitalizeFirstLetter(npc), type: CharacterTypes.NPC }, [])
        return {
            elements: [characterElement, containerElement, itemElement, npcElement],
            links: [characterElement.linkTo(containerElement), npcElement.linkTo(itemElement)],
        }
    }
}
