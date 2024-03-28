import { ActionElement } from '../diagram-elements/ActionElement'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { LocationElement } from '../diagram-elements/LocationElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { ProcessingResult } from '../types/ProcessingResult'
import { Detail, WinkMethods } from 'wink-nlp'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'

export class LocationChangeService {
    constructor(private nlp: WinkMethods) {}

    processPossibleLocationChange = (sentences: string[]): ProcessingResult => {
        const [from, to] = sentences

        const fromData = this.nlp.readDoc(from).customEntities().out(this.nlp.its.detail) as Detail[]
        const toDoc = this.nlp.readDoc(to)
        const toData = toDoc.customEntities().out(this.nlp.its.detail) as Detail[]
        const character = stripUnnecessaryWords(fromData[0].value)

        const verbIndex = toDoc
            .tokens()
            .out(this.nlp.its.pos)
            .findIndex((pos: string) => pos === 'VERB')

        const verb = toDoc.tokens().out()[verbIndex]

        const place = stripUnnecessaryWords(fromData[1].value)
        const placeTo = stripUnnecessaryWords(toData[1].value)

        const fromDiagram = this.locationFromElements(character, verb, place, placeTo)
        const toDiagram = this.locationToElements(character, verb, place, placeTo)

        return {
            elements: [...fromDiagram.elements, ...toDiagram.elements],
            links: [...fromDiagram.links, ...toDiagram.links],
        }
    }

    private locationFromElements = (character: string, verb: string, place: string, placeTo: string): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 100, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player }
        )
        const actionElement = new ActionElement({ position: { x: 300, y: 100 } }, { text: verb })
        const locationElement = new LocationElement({ position: { x: 100, y: 400 } }, { text: place })
        const locationToElement = new LocationElement({ position: { x: 300, y: 400 } }, { text: placeTo })

        return {
            elements: [characterElement, actionElement, locationElement, locationToElement],
            links: [characterElement.linkTo(actionElement), characterElement.linkTo(locationElement)],
        }
    }

    private locationToElements = (character: string, verb: string, place: string, placeTo: string): ProcessingResult => {
        const characterElement = new CharacterElement(
            { position: { x: 600, y: 100 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player }
        )
        const actionElement = new ActionElement({ position: { x: 800, y: 100 } }, { text: verb })
        const locationElement = new LocationElement({ position: { x: 600, y: 400 } }, { text: place })
        const locationToElement = new LocationElement({ position: { x: 800, y: 400 } }, { text: placeTo })

        return {
            elements: [characterElement, actionElement, locationElement, locationToElement],
            links: [characterElement.linkTo(actionElement), characterElement.linkTo(locationToElement)],
        }
    }
}
