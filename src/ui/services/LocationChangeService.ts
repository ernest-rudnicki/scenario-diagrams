import { CharacterElement } from '../diagram-elements/CharacterElement'
import { LocationElement } from '../diagram-elements/LocationElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { ProcessingResult } from '../types/ProcessingResult'
import { Detail, WinkMethods } from 'wink-nlp'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { phrasePatterns } from '../nlp-patterns/NlpPatterns'

export class LocationChangeService {
    constructor(private nlp: WinkMethods) {}

    processPossibleLocationChange = (sentences: string[], characterAttributes: string[]): ProcessingResult => {
        this.nlp.learnCustomEntities(phrasePatterns)

        const [from, to] = sentences

        const fromData = this.nlp.readDoc(from).customEntities().out(this.nlp.its.detail) as Detail[]
        const toDoc = this.nlp.readDoc(to)
        const toData = toDoc.customEntities().out(this.nlp.its.detail) as Detail[]

        const character = stripUnnecessaryWords(fromData[0].value)

        const place = stripUnnecessaryWords(fromData[1].value)
        const placeTo = stripUnnecessaryWords(toData[1].value)

        const fromDiagram = this.locationFromElements(character, place, placeTo, characterAttributes)
        const toDiagram = this.locationToElements(character, place, placeTo, characterAttributes)

        return {
            elements: [...fromDiagram.elements, ...toDiagram.elements],
            links: [...fromDiagram.links, ...toDiagram.links],
        }
    }

    private locationFromElements = (character: string, place: string, placeTo: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )
        const locationElement = new LocationElement({ position: { x: 100, y: 400 } }, { text: place })
        const locationToElement = new LocationElement({ position: { x: 300, y: 400 } }, { text: placeTo })

        return {
            elements: [characterElement, locationElement, locationToElement],
            links: [characterElement.linkTo(locationElement)],
        }
    }

    private locationToElements = (character: string, place: string, placeTo: string, characterAttributes: string[]): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player },
            characterAttributes
        )
        const locationElement = new LocationElement({ position: { x: 600, y: 400 } }, { text: place })
        const locationToElement = new LocationElement({ position: { x: 800, y: 400 } }, { text: placeTo })

        return {
            elements: [characterElement, locationElement, locationToElement],
            links: [characterElement.linkTo(locationToElement)],
        }
    }
}
