import { Detail, WinkMethods } from 'wink-nlp'
import { ProcessingResult } from '../types/ProcessingResult'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { CharacterTypes } from '../types/CharacterTypes'
import { LocationElement } from '../diagram-elements/LocationElement'
import { ContainerElement } from '../diagram-elements/ContainerElement'
import { ActionElement } from '../diagram-elements/ActionElement'
import { ItemElement } from '../diagram-elements/ItemElement'

export class ItemGrabService {
    constructor(private nlp: WinkMethods) {}

    processPossibleItemGrab = (sentences: string[], characterAttributes: string[]): ProcessingResult => {
        this.nlp.learnCustomEntities(phrasePatterns)

        const [locationSentence, itemGrabSentence] = sentences

        const fromData = this.nlp.readDoc(locationSentence).customEntities().out(this.nlp.its.detail) as Detail[]
        const itemDoc = this.nlp.readDoc(itemGrabSentence)
        const itemGrabData = itemDoc.customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(fromData[0].value)
        const location = stripUnnecessaryWords(fromData[1].value)
        const item = stripUnnecessaryWords(itemGrabData[1].value)
        const verb = itemGrabSentence.split(' ')[(itemDoc.tokens().out(this.nlp.its.pos) as string[]).findIndex((pos) => pos === 'VERB')]

        const leftSideDiagram = this.leftSideDiagram(character, location, verb, item, characterAttributes)
        const rightSideDiagram = this.rightSideDiagram(character, location, verb, item, characterAttributes)

        return {
            elements: [...leftSideDiagram.elements, ...rightSideDiagram.elements],
            links: [...leftSideDiagram.links, ...rightSideDiagram.links],
        }
    }

    leftSideDiagram = (character: string, location: string, verb: string, item: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const locationElement = new LocationElement({ position: { x: 100, y: 400 } }, { text: location })
        const containerElement = new ContainerElement({ position: { x: 300, y: 350 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 300, y: 500 } }, { text: item })

        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: verb })

        return {
            elements: [characterElement, locationElement, containerElement, actionElement, itemElement],
            links: [characterElement.linkTo(locationElement), characterElement.linkTo(containerElement), characterElement.linkTo(actionElement)],
        }
    }

    rightSideDiagram = (character: string, location: string, verb: string, item: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )

        const locationElement = new LocationElement({ position: { x: 600, y: 400 } }, { text: location })
        const containerElement = new ContainerElement({ position: { x: 900, y: 350 } }, { text: 'Container' })
        const itemElement = new ItemElement({ position: { x: 900, y: 500 } }, { text: item })

        return {
            elements: [characterElement, locationElement, containerElement, itemElement],
            links: [characterElement.linkTo(locationElement), characterElement.linkTo(containerElement), itemElement.linkTo(containerElement)],
        }
    }
}
