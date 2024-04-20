import { render } from 'solid-js/web'
import './index.css'
import { createSignal, onMount } from 'solid-js'
import { BottomBar } from './components/BottomBar/BottomBar'
import { DiagramServicesProvider, useDiagramServices } from './providers/DiagramServicesProvider'
import { CharacterElement } from './diagram-elements/CharacterElement'
import { CharacterTypes } from './types/CharacterTypes'
import { LocationElement } from './diagram-elements/LocationElement'
import { ActionElement } from './diagram-elements/ActionElement'
import { AttributeElement } from './diagram-elements/AttributeElement'
import { AttributeTypes } from './types/AttributeTypes'
import { BuildingElement } from './diagram-elements/BuildingElement'
import { ContainerElement } from './diagram-elements/ContainerElement'
import { ItemElement } from './diagram-elements/ItemElement'

const AppComponent = () => {
    const { canvas, languageProcessor } = useDiagramServices()
    const [dragged, setDragged] = createSignal(null)

    onMount(() => {
        canvas.init(document.getElementById('paper'), document)
    })

    const onSubmit = (text: string) => {
        const { elements, links } = languageProcessor.convertToDiagramElements(text)
        canvas.createDiagram(elements, links)
    }

    const onDrop = (event: DragEvent) => {
        const { offsetX, offsetY } = event;
        switch(dragged()) {
            case 'character': {
                const characterElement = new CharacterElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Character', type: CharacterTypes.Player },
                    []
                )
                canvas.addElements([characterElement])
                break;
            }
            case 'npc': {
                const npcElement = new CharacterElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'NPC', type: CharacterTypes.NPC },
                    []
                )
                canvas.addElements([npcElement])
                break;
            }
            case 'enemy': {
                const enemyElement = new CharacterElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Enemy', type: CharacterTypes.Enemy },
                    []
                )
                canvas.addElements([enemyElement])
                break;
            }
            case 'location': {
                const locationElement = new LocationElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Location' },
                )
                canvas.addElements([locationElement])
                break;
            }
            case 'action': {
                const actionElement = new ActionElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Action' },
                )
                canvas.addElements([actionElement])
                break;
            }
            case 'attribute': {
                const attributeElement = new AttributeElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Attribute', type: AttributeTypes.Normal },
                )
                canvas.addElements([attributeElement])
                break;
            }
            case 'building': {
                const buildingElement = new BuildingElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Building'},
                )
                canvas.addElements([buildingElement])
                break;
            }
            case 'container': {
                const containerElement = new ContainerElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Container'},
                )
                canvas.addElements([containerElement])
                break;
            }
            case 'item': {
                const itemElement = new ItemElement(
                    { position: { x: offsetX, y: offsetY } },
                    { text: 'Item'},
                )
                canvas.addElements([itemElement])
                break;
            }
            default:
                break;
        }
    }

    const onDragStart = (event: DragEvent) => {
       setDragged((event.target as HTMLElement).attributes.getNamedItem('data-diagram').value)
    }

    const onDragEnd = () => {
        setDragged(null);
    }



    return (
        <main class="h-full flex flex-col">
            <div class="h-full" onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
                <div id="paper"></div>
            </div>
            <div 
                class="absolute bg-slate-500 h-full right-0 border-l-2 border-solid border-slate-950 p-2 overflow-auto" 
                style="width: 200px">
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="character" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Character</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="npc" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">NPC</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="enemy" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Enemy</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="location" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Location</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="action" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Action</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="attribute" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Attribute</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="building" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Building</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="container" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Container</div>
                </div>
                <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} data-diagram="item" class="border-2 border-solid border-slate-950 flex justify-center items-center py-4 mb-2">
                    <div class="text-slate-50">Item</div>
                </div>
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
