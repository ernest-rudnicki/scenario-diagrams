import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words';
import { AttributeChange } from '../types/AttributeChange';
import { CharacterElement } from '../diagram-elements/CharacterElement';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';
import { CharacterTypes } from '../types/CharacterTypes';
import { ContainerElement } from '../diagram-elements/ContainerElement';
import { ItemElement } from '../diagram-elements/ItemElement';
import { ActionElement } from '../diagram-elements/ActionElement';

export class ItemUseService {
    constructor(private nlp: WinkMethods) {}

    processPossibleItemUse(itemUse: string, notChangedAttributes: string[], attributeIncrease?: string[], attributeDecrease?: string[]): ProcessingResult {
        this.nlp.learnCustomEntities(phrasePatterns)
        const itemUseDoc = this.nlp.readDoc(itemUse);
        const itemUseData = itemUseDoc.customEntities().out(this.nlp.its.detail) as Detail[]
        
        const character = stripUnnecessaryWords(itemUseData[0].value)
        const verbIndex = [(itemUseDoc.tokens().out(this.nlp.its.pos) as string[]).findIndex((pos) => pos === 'VERB')]
        const verb = itemUse.split(' ')[verbIndex[0]]
        const item = stripUnnecessaryWords(itemUse.split(' ').slice(verbIndex[0] + 1).join(' '))

        const attributeIncreaseData = this.getAttributeChange(attributeIncrease)
        const attributeDecreaseData = this.getAttributeChange(attributeDecrease)

        const plainAttributes = [
            ...attributeIncreaseData.map((attr) => attr.name),
            ...attributeDecreaseData.map((attr) => attr.name),
            ...notChangedAttributes
        ]

        const changedAttributes = [
            ...attributeIncreaseData.map((attr) => `${attr.name} +${attr.value}`),
            ...attributeDecreaseData.map((attr) => `${attr.name} -${attr.value}`),
            ...notChangedAttributes
        ]

        const leftSideDiagram = this.leftSideDiagram(character, verb, item, plainAttributes)
        const rightSideDiagram = this.rightSideDiagram(character, changedAttributes)

        return { elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements], links: [...leftSideDiagram.links, ...rightSideDiagram.links] }
    }

    leftSideDiagram(character: string, verb: string, item: string, characterAttributes: string[]): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const containerElement = new ContainerElement({ position: { x: 300, y: 500 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 300, y: 350 } }, { text: item })

        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: verb })

        return { elements: [characterElement, containerElement, itemElement, actionElement], links: [
            characterElement.linkTo(containerElement),
            containerElement.linkTo(itemElement),
            characterElement.linkTo(actionElement),
            itemElement.linkTo(actionElement)
        ] }
    }

    rightSideDiagram(character: string, characterAttributes: string[]): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const containerElement = new ContainerElement({ position: { x: 700, y: 350 } }, { text: 'Container' })

        return { elements: [characterElement, containerElement], links: [characterElement.linkTo(containerElement)] }
    }

    getAttributeChange(attributeIncrease?: string[]): AttributeChange[] {
        if (!attributeIncrease) return []
        return attributeIncrease.map((attr) => {
            const verbIndex = (this.nlp.readDoc(attr).tokens().out(this.nlp.its.pos) as string[]).findIndex((pos) => pos === 'VERB')
            const attribute = stripUnnecessaryWords(attr.split(' ').slice(0, verbIndex -1).join(' '))
            const number = attr.match(/\d+/)?.[0]

            return { name: attribute, value: parseInt(number) }
        })
    }
    
}
