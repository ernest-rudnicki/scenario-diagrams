import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { getAttributeChange } from '../utils/get-attribute-change'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { CharacterTypes } from '../types/CharacterTypes'
import { ContainerElement } from '../diagram-elements/ContainerElement'
import { ItemElement } from '../diagram-elements/ItemElement'
import { ActionElement } from '../diagram-elements/ActionElement'

export class AttackEnemyService {
    constructor(private nlp: WinkMethods) {}

    processPossibleAttackEnemy(attackSentence: string, characterAttributes: string[], attributeDecrease: string[]): ProcessingResult {
        this.nlp.learnCustomEntities(phrasePatterns)
        const attackEntities = this.nlp.readDoc(attackSentence).customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(attackEntities[0].value)
        const enemy = stripUnnecessaryWords(attackEntities[2].value)
        const verb = attackSentence.match(/attacks|hits|strikes/)?.[0]
        const item = stripUnnecessaryWords(attackEntities[3].value)

        const attributeDecreaseData = getAttributeChange(this.nlp, attributeDecrease)

        const leftSideDiagram = this.leftSideDiagram(
            character,
            verb,
            enemy,
            item,
            characterAttributes,
            attributeDecreaseData.map((attr) => attr.name)
        )
        const rightSideDiagram = this.rightSideDiagram(
            character,
            enemy,
            item,
            characterAttributes,
            attributeDecreaseData.map((attr) => `${attr.name} -${attr.value}`)
        )

        return {
            elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements],
            links: [...leftSideDiagram.links, ...rightSideDiagram.links],
        }
    }

    leftSideDiagram(
        character: string,
        verb: string,
        enemy: string,
        item: string,
        characterAttributes: string[],
        enemyAttributes: string[]
    ): ProcessingResult {
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
            enemyAttributes
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

    rightSideDiagram(character: string, enemy: string, item: string, characterAttributes: string[], enemyAttributes: string[]): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const enemyElement = new CharacterElement(
            { position: { x: 800, y: 100 } },
            { text: capitalizeFirstLetter(enemy), type: CharacterTypes.Enemy },
            enemyAttributes
        )

        const containerElement = new ContainerElement({ position: { x: 600, y: 200 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 600, y: 400 } }, { text: item })

        return {
            elements: [characterElement, containerElement, itemElement, enemyElement],
            links: [characterElement.linkTo(containerElement), containerElement.linkTo(itemElement)],
        }
    }
}
