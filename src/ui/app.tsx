import { render } from 'solid-js/web'
import './index.css'
import { onMount } from 'solid-js'
import { BottomBar } from './components/BottomBar/BottomBar'
import {
    DiagramServicesProvider,
    useDiagramServices,
} from './providers/DiagramServicesProvider'

const AppComponent = () => {
    const { canvas, languageProcessor } = useDiagramServices()

    onMount(() => {
        canvas.init(document.getElementById('paper'))
    })

    const onSubmit = (text: string) => {
       const elements =  languageProcessor.convertToDiagramElements(text)
       console.log(elements);
       canvas.addElements(elements)
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
