import winkNLP, { Detail, Document, WinkMethods } from 'wink-nlp'
import model from 'wink-eng-lite-web-model'
import { LocationChangeService } from './LocationChangeService'
import { DiagramTypes } from '../types/DiagramTypes'
import { sentencePatterns } from '../nlp-patterns/NlpPatterns'
import { ProcessingResult } from '../types/ProcessingResult'
import { CustomEntitiesHashMap, DetailEntity } from '../types/CustomEntitiesHashMap'
import { stripUnnecessaryWords } from '../utils/strip-unnecessary-words'
import { ItemGrabService } from './ItemGrabService'
import { NpcTalkService } from './NpcTalkService'

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    private locationChangeService: LocationChangeService
    private itemGrabService: ItemGrabService
    private npcTalkService: NpcTalkService

    constructor() {
        this.locationChangeService = new LocationChangeService(this.nlp)
        this.itemGrabService = new ItemGrabService(this.nlp)
        this.npcTalkService = new NpcTalkService(this.nlp)
    }

    convertToDiagramElements = (text: string): ProcessingResult => {
        this.nlp.learnCustomEntities(sentencePatterns)

        const doc = this.nlp.readDoc(text)
        const customEntities = doc.customEntities().out(this.nlp.its.detail) as Detail[]
        let characterAttributes: string[] = []

        const customEntitiesHashMap = this.getCustomEntitiesAsHashMap(customEntities)

        if (customEntitiesHashMap[DiagramTypes.CHARACTER_ATTRIBUTES]) {
            characterAttributes = this.extractCharacterAttributes(doc, customEntitiesHashMap[DiagramTypes.CHARACTER_ATTRIBUTES])
        }

        if (customEntitiesHashMap[DiagramTypes.LOCATION_FROM] && customEntitiesHashMap[DiagramTypes.LOCATION_TO]) {
            return this.locationChangeService.processPossibleLocationChange(
                [customEntitiesHashMap[DiagramTypes.LOCATION_FROM].value, customEntitiesHashMap[DiagramTypes.LOCATION_TO].value],
                characterAttributes
            )
        }

        if (customEntitiesHashMap[DiagramTypes.LOCATION_FROM] && customEntitiesHashMap[DiagramTypes.ITEM_GRAB]) {
            return this.itemGrabService.processPossibleItemGrab(
                [customEntitiesHashMap[DiagramTypes.LOCATION_FROM].value, customEntitiesHashMap[DiagramTypes.ITEM_GRAB].value],
                characterAttributes
            )
        }

        if (customEntitiesHashMap[DiagramTypes.LOCATION_FROM] && customEntitiesHashMap[DiagramTypes.NPC_TALK]) {
            return this.npcTalkService.processPossibleNpcTalk(
                [customEntitiesHashMap[DiagramTypes.LOCATION_FROM].value, customEntitiesHashMap[DiagramTypes.NPC_TALK].value],
                characterAttributes
            )
        }

        return { elements: [], links: [] }
    }

    getCustomEntitiesAsHashMap(customEntities: Detail[]): CustomEntitiesHashMap {
        return customEntities.reduce((acc, entity, index) => {
            acc[entity.type as DiagramTypes] = { ...entity, index: index }
            return acc
        }, {} as CustomEntitiesHashMap)
    }

    extractCharacterAttributes = (doc: Document, entity: DetailEntity): string[] => {
        const words = stripUnnecessaryWords(doc.customEntities().itemAt(entity.index).parentSentence().out()).split(' ')
        const attributes = []

        for (let i = 0; i < words.length; i++) {
            if (words[i] === 'attributes' || words[i] === 'skills' || words[i] === 'attribute' || words[i] === 'skill') {
                break
            }
            attributes.push(words[i].toLowerCase())
        }

        return attributes
    }
}
