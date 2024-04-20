import { render } from 'solid-js/web'
import './index.css'
import { createSignal, onMount } from 'solid-js'
import { BottomBar } from './components/BottomBar/BottomBar'
import { DiagramServicesProvider, useDiagramServices } from './providers/DiagramServicesProvider'

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
        console.log(event.target);
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
