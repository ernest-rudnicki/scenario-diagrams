import { BaseElement } from '../types/BaseElement'
import { ActionElement } from '../diagram-elements/ActionElement'
import { CharacterElement } from '../diagram-elements/CharacterElement'
import { LocationElement } from '../diagram-elements/LocationElement'
import { CharacterTypes } from '../types/CharacterTypes'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter'

export class LocationChangeService {
    processPossibleLocationChange = (sentences: string[]): BaseElement[] => {
        const [from, to] = sentences
        return this.locationFromElements(from)
    }

    private locationFromElements = (from: string): BaseElement[] => {
        const [character, verb, place] = stripUnnecessaryWords(from).split(' ')
        return [
            new CharacterElement({ position: { x: 100, y: 30 } }, { text: capitalizeFirstLetter(character), type: CharacterTypes.Player }),
            new ActionElement({ position: { x: 100, y: 300 } }, { text: verb }),
            new LocationElement({ position: { x: 100, y: 200 } }, { text: place }),
        ]
    }
}
