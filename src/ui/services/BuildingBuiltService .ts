import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { CharacterTypes } from '../types/CharacterTypes'
import { ActionElement } from '../diagram-elements/ActionElement'
import { getAttributeChange } from '../utils/get-attribute-change'
import { BuildingElement } from '../diagram-elements/BuildingElement'
import { AttributeElement } from '../diagram-elements/AttributeElement'
import { AttributeTypes } from '../types/AttributeTypes'

export class BuildingBuiltService {
    constructor(private nlp: WinkMethods) {}

    processPossibleBuildingBuilt(
        itemUse: string,
        notChangedAttributes: string[],
        attributeIncrease?: string[],
        attributeDecrease?: string[],
        isDestroy?: boolean
    ): ProcessingResult {
        this.nlp.learnCustomEntities(phrasePatterns)
        const itemUseDoc = this.nlp.readDoc(itemUse)
        const itemUseData = itemUseDoc.customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(itemUseData[0].value)
        const building = stripUnnecessaryWords(itemUseData[1].value)

        const attributeIncreaseData = getAttributeChange(this.nlp, attributeIncrease)
        const attributeDecreaseData = getAttributeChange(this.nlp, attributeDecrease)

        const plainAttributes = [
            ...attributeIncreaseData.map((attr) => attr.name),
            ...attributeDecreaseData.map((attr) => attr.name),
            ...notChangedAttributes,
        ]

        const changedAttributes = [
            ...attributeIncreaseData.map((attr) => `${attr.name} +${attr.value}`),
            ...attributeDecreaseData.map((attr) => `${attr.name} -${attr.value}`),
            ...notChangedAttributes,
        ]

        const leftSideDiagram = this.leftSideDiagram(character, building, plainAttributes, isDestroy)
        const rightSideDiagram = this.rightSideDiagram(character, building, changedAttributes, isDestroy)

        return { elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements], links: [...leftSideDiagram.links, ...rightSideDiagram.links] }
    }

    leftSideDiagram(character: string, building: string, globalAttributes: string[], isDestroy?: boolean): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.NPC },
            []
        )

        const buildingElement = new BuildingElement({ position: { x: 100, y: 500 } }, { text: building })

        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: isDestroy ? 'destroys' : 'builds' })
        const globalAttributesElement = globalAttributes.map(
            (attr, index) => new AttributeElement({ position: { x: 100 + index * 100, y: 200 } }, { text: attr, type: AttributeTypes.Global })
        )

        return {
            elements: [characterElement, actionElement, buildingElement, ...globalAttributesElement],
            links: [characterElement.linkTo(actionElement), actionElement.linkTo(buildingElement)],
        }
    }

    rightSideDiagram(character: string, building: string, globalAttributes: string[], isDestroy?: boolean): ProcessingResult {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.NPC },
            []
        )

        const globalAttributesElement = globalAttributes.map(
            (attr, index) => new AttributeElement({ position: { x: 600 + index * 100, y: 200 } }, { text: attr, type: AttributeTypes.Global })
        )

        const buildingElement = new BuildingElement({ position: { x: 600, y: 500 } }, { text: building })

        return { elements: [characterElement, !isDestroy ? buildingElement : null, ...globalAttributesElement].filter((el) => !!el), links: [] }
    }
}
