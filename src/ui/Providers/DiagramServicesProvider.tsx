import { createContext, createSignal, useContext } from 'solid-js'
import { CanvasService } from '../services/CanvasService'
import { LanguageProcessorService } from '../services/LanguageProcessorService'
import { ProviderProps } from '../types/ProviderProps'

interface ContextProps {
    canvas: CanvasService
    languageProcessor: LanguageProcessorService
}

const DiagramServicesContext = createContext<ContextProps>()

export const DiagramServicesProvider = (props: ProviderProps) => {
    const [canvas] = createSignal(new CanvasService())
    const [languageProcessor] = createSignal(new LanguageProcessorService())

    const value = {
        canvas: canvas(),
        languageProcessor: languageProcessor(),
    }

    return (
        <DiagramServicesContext.Provider value={value}>
            {props.children}
        </DiagramServicesContext.Provider>
    )
}

export const useDiagramServices = (): ContextProps => {
    return useContext(DiagramServicesContext)
}
