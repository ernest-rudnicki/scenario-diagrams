import { ActionElement } from '../diagram-elements/ActionElement'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { LocationElement } from '../diagram-elements/LocationElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'
import { ProcessingResult } from '../types/ProcessingResult'

export class LocationChangeService {
    processPossibleLocationChange = (sentences: string[]): ProcessingResult => {
        const [from, to] = sentences
        const fromData = stripUnnecessaryWords(from).split(' ')
        const toData = stripUnnecessaryWords(to).split(' ')

        const character = fromData[0]
        const verb = fromData[1]
        const place = fromData[2]
        const placeTo = toData[2]

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
