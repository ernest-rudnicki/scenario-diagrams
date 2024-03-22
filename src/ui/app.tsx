import { render } from 'solid-js/web'
import './index.css'
import { onMount } from 'solid-js'

import { CharacterElement } from './diagram-elements/CharacterElement'
import { CharacterTypes } from './types/CharacterTypes'
import { ItemElement } from './diagram-elements/ItemElement'
import { ContainerElement } from './diagram-elements/ContainerElement'
import { BuildingElement } from './diagram-elements/BuildingElement'
import { LocationElement } from './diagram-elements/LocationElement'
import { AttributeElement } from './diagram-elements/AttributeElement'
import { AttributeTypes } from './types/AttributeTypes'
import { ActionElement } from './diagram-elements/ActionElement'
import { BottomBar } from './components/BottomBar/BottomBar'
import {
    DiagramServicesProvider,
    useDiagramServices,
} from './providers/DiagramServicesProvider'

const AppComponent = () => {
    const { canvas, languageProcessor } = useDiagramServices()
    onMount(() => {
        canvas.init(document.getElementById('paper'))

        const character = new CharacterElement(
            { position: { x: 100, y: 30 } },
            { text: 'Knight', type: CharacterTypes.Player }
        )
        const enemy = new CharacterElement(
            { position: { x: 250, y: 30 } },
            { text: 'Orc', type: CharacterTypes.Enemy }
        )
        const npc = new CharacterElement(
            { position: { x: 400, y: 30 } },
            { text: 'Trader', type: CharacterTypes.NPC }
        )
        const item = new ItemElement(
            { position: { x: 100, y: 120 } },
            { text: 'Sword' }
        )
        const container = new ContainerElement(
            { position: { x: 250, y: 100 } },
            { text: 'Backpack' }
        )
        const building = new BuildingElement(
            { position: { x: 400, y: 100 } },
            { text: 'House' }
        )
        const location = new LocationElement(
            { position: { x: 100, y: 200 } },
            { text: 'Forest' }
        )
        const attribute = new AttributeElement(
            { position: { x: 250, y: 220 } },
            { text: 'Strength', type: AttributeTypes.Normal }
        )
        const attributeGlobal = new AttributeElement(
            { position: { x: 400, y: 220 } },
            { text: 'Strength', type: AttributeTypes.Global }
        )
        const actionElement = new ActionElement(
            { position: { x: 100, y: 300 } },
            { text: 'Attack' }
        )

        canvas.addElements([
            character,
            enemy,
            npc,
            item,
            container,
            building,
            location,
            attribute,
            attributeGlobal,
            actionElement,
        ])
    })

    const onSubmit = (text: string) => {
        languageProcessor.convertToDiagramElements(text)
    }

    return (
        <main class="h-full flex flex-col">
            <div class="h-full">
                <div id="paper"></div>
            </div>
            <BottomBar onSubmit={onSubmit} />
        </main>
    )
}

render(
    () => (
        <DiagramServicesProvider>
            <AppComponent />
        </DiagramServicesProvider>
    ),
    document.getElementById('app')
)
