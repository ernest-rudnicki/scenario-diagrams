import { WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { ContainerElement } from '../diagram-elements/ContainerElement'
import { ItemElement } from '../diagram-elements/ItemElement'
import { ActionElement } from '../diagram-elements/ActionElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'

export class KillEnemyService {
    constructor(private nlp: WinkMethods) {}

    processPossibleKillEnemy(sentence: string, characterAttributes: string[]): ProcessingResult {
        this.nlp.learnCustomEntities(phrasePatterns)

        const entities = this.nlp.readDoc(sentence).customEntities().out()

        const character = stripUnnecessaryWords(entities[0])
        const enemy = stripUnnecessaryWords(entities[1])
        const item = stripUnnecessaryWords(entities[2])

        const verb = sentence.match(/kills|defeats|eliminates/)?.[0]

        const leftSideDiagram = this.leftSideDiagram(character, verb, enemy, item, characterAttributes)
        const rightSideDiagram = this.rightSideDiagram(character, item, characterAttributes)

        return {
            elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements],
            links: [...leftSideDiagram.links, ...rightSideDiagram.links],
        }
    }

    leftSideDiagram(character: string, verb: string, enemy: string, item: string, characterAttributes: string[]): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const containerElement = new ContainerElement({ position: { x: 100, y: 500 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 300, y: 350 } }, { text: item })

        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: verb })

        const enemyElement = new CharacterElement(
            { position: { x: 300, y: 250 } },
            { text: capitalizeFirstLetter(enemy), type: CharacterTypes.Enemy },
            []
        )

        return {
            elements: [characterElement, containerElement, itemElement, actionElement, enemyElement],
            links: [
                characterElement.linkTo(containerElement),
                containerElement.linkTo(itemElement),
                characterElement.linkTo(actionElement),
                actionElement.linkTo(enemyElement),
            ],
        }
    }

    rightSideDiagram(character: string, item: string, characterAttributes: string[]): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const containerElement = new ContainerElement({ position: { x: 600, y: 200 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 600, y: 400 } }, { text: item })

        return {
            elements: [characterElement, containerElement, itemElement],
            links: [characterElement.linkTo(containerElement), containerElement.linkTo(itemElement)],
        }
    }
}
