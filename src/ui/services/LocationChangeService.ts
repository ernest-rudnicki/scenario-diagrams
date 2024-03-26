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
        const diagramData = stripUnnecessaryWords(from).split(' ')
        const placeTo = stripUnnecessaryWords(to).split(' ')[2]
        const fromDiagram = this.locationFromElements(diagramData)
        const toDiagram = this.locationToElements(diagramData, placeTo)

        return {
            elements: [...fromDiagram.elements, ...toDiagram.elements],
            links: [...fromDiagram.links, ...toDiagram.links],
        }
    }

    private locationFromElements = (data: string[]): ProcessingResult => {
        const [character, verb, place] = data

        const characterElement = new CharacterElement(
            { position: { x: 100, y: 30 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player }
        )
        const actionElement = new ActionElement({ position: { x: 300, y: 30 } }, { text: verb })
        const locationElement = new LocationElement({ position: { x: 100, y: 200 } }, { text: place })

        return {
            elements: [characterElement, actionElement, locationElement],
            links: [characterElement.linkTo(actionElement), characterElement.linkTo(locationElement)],
        }
    }

    private locationToElements = (data: string[], placeTo: string): ProcessingResult => {
        const [character, verb, place] = data

        const characterElement = new CharacterElement(
            { position: { x: 500, y: 30 } },
            { text: capitalizeFirstLetter(character), type: CharacterTypes.Player }
        )
        const actionElement = new ActionElement({ position: { x: 750, y: 30 } }, { text: verb })
        const locationElement = new LocationElement({ position: { x: 500, y: 200 } }, { text: place })
        const locationToElement = new LocationElement({ position: { x: 750, y: 200 } }, { text: placeTo })

        return {
            elements: [characterElement, actionElement, locationElement, locationToElement],
            links: [characterElement.linkTo(actionElement), characterElement.linkTo(locationToElement)],
        }
    }
}
