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
import { ItemUseService } from './ItemUseService'
import { KillEnemyService } from './KillEnemyService'
import { AttackEnemyService } from './AttackEnemyService'
import { GetItemFromNpcService } from './GetItemFromNpcService'
import { GiveItemToNpcService } from './GiveItemToNpcService'
import { BuildingBuiltService } from './BuildingBuiltService '

export class LanguageProcessorService {
    private nlp: WinkMethods = winkNLP(model)

    private locationChangeService: LocationChangeService
    private itemGrabService: ItemGrabService
    private npcTalkService: NpcTalkService
    private itemUseService: ItemUseService
    private killEnemyService: KillEnemyService
    private attackEnemyService: AttackEnemyService
    private getItemFromNpcService: GetItemFromNpcService
    private giveItemToNpcService: GiveItemToNpcService
    private buildingBuiltService: BuildingBuiltService

    constructor() {
        this.locationChangeService = new LocationChangeService(this.nlp)
        this.itemGrabService = new ItemGrabService(this.nlp)
        this.npcTalkService = new NpcTalkService(this.nlp)
        this.itemUseService = new ItemUseService(this.nlp)
        this.killEnemyService = new KillEnemyService(this.nlp)
        this.attackEnemyService = new AttackEnemyService(this.nlp)
        this.getItemFromNpcService = new GetItemFromNpcService(this.nlp)
        this.giveItemToNpcService = new GiveItemToNpcService(this.nlp)
        this.buildingBuiltService = new BuildingBuiltService(this.nlp)
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

        if (
            customEntitiesHashMap[DiagramTypes.ITEM_USE] &&
            (customEntitiesHashMap[DiagramTypes.ATTRIBUTE_INCREASE] || customEntitiesHashMap[DiagramTypes.ATTRIBUTE_DECREASE])
        ) {
            const sentences = doc.sentences().out()
            return this.itemUseService.processPossibleItemUse(
                customEntitiesHashMap[DiagramTypes.ITEM_USE].value,
                characterAttributes,
                customEntitiesHashMap[DiagramTypes.ATTRIBUTE_INCREASE]?.map((entity) => sentences[entity.index]),
                customEntitiesHashMap[DiagramTypes.ATTRIBUTE_DECREASE]?.map((entity) => sentences[entity.index])
            )
        }

        if (customEntitiesHashMap[DiagramTypes.KILL_ENEMY]) {
            return this.killEnemyService.processPossibleKillEnemy(customEntitiesHashMap[DiagramTypes.KILL_ENEMY].value, characterAttributes)
        }

        if (customEntitiesHashMap[DiagramTypes.ATTACK_ENEMY] && customEntitiesHashMap[DiagramTypes.ATTRIBUTE_DECREASE]) {
            const sentences = doc.sentences().out()
            return this.attackEnemyService.processPossibleAttackEnemy(
                customEntitiesHashMap[DiagramTypes.ATTACK_ENEMY].value,
                characterAttributes,
                customEntitiesHashMap[DiagramTypes.ATTRIBUTE_DECREASE]?.map((entity) => sentences[entity.index])
            )
        }

        if (customEntitiesHashMap[DiagramTypes.GET_ITEM_FROM_NPC]) {
            return this.getItemFromNpcService.processPossibleGetItemFromNpc(
                customEntitiesHashMap[DiagramTypes.GET_ITEM_FROM_NPC].value,
                characterAttributes
            )
        }

        if (customEntitiesHashMap[DiagramTypes.GIVE_ITEM_TO_NPC]) {
            return this.giveItemToNpcService.processPossibleGiveItemToNpc(
                customEntitiesHashMap[DiagramTypes.GIVE_ITEM_TO_NPC].value,
                characterAttributes
            )
        }

        if (customEntitiesHashMap[DiagramTypes.BUILDING_BUILT]) {
            const sentences = doc.sentences().out()
            return this.buildingBuiltService.processPossibleBuildingBuilt(
                customEntitiesHashMap[DiagramTypes.BUILDING_BUILT].value,
                characterAttributes,
                customEntitiesHashMap[DiagramTypes.GLOBAL_ATTRIBUTE_INCREASE]?.map((entity) => sentences[entity.index]),
                customEntitiesHashMap[DiagramTypes.GLOBAL_ATTRIBUTE_DECREASE]?.map((entity) => sentences[entity.index])
            )
        }

        if (customEntitiesHashMap[DiagramTypes.BUILDING_DESTROYED]) {
            const sentences = doc.sentences().out()
            return this.buildingBuiltService.processPossibleBuildingBuilt(
                customEntitiesHashMap[DiagramTypes.BUILDING_DESTROYED].value,
                characterAttributes,
                customEntitiesHashMap[DiagramTypes.GLOBAL_ATTRIBUTE_INCREASE]?.map((entity) => sentences[entity.index]),
                customEntitiesHashMap[DiagramTypes.GLOBAL_ATTRIBUTE_DECREASE]?.map((entity) => sentences[entity.index]),
                true
            )
        }

        return { elements: [], links: [] }
    }

    getCustomEntitiesAsHashMap(customEntities: Detail[]): CustomEntitiesHashMap {
        return customEntities.reduce((acc, entity, index) => {
            const type = entity.type as DiagramTypes
            if (
                type === DiagramTypes.ATTRIBUTE_INCREASE ||
                type === DiagramTypes.ATTRIBUTE_DECREASE ||
                type === DiagramTypes.GLOBAL_ATTRIBUTE_INCREASE ||
                type === DiagramTypes.GLOBAL_ATTRIBUTE_DECREASE
            ) {
                if (acc[type]) {
                    acc[type].push({ ...entity, index: index })
                } else {
                    acc[type] = [{ ...entity, index: index }]
                }
                return acc
            }

            acc[type] = { ...entity, index: index }
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
