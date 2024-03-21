import { createContext, createSignal, useContext } from 'solid-js'
import { Canvas } from '../diagram-elements/Canvas'
import { LanguageProcessor } from '../language-processor/LanguageProcessor'
import { ProviderProps } from '../types/ProviderProps'

interface ContextProps {
    canvas: Canvas
    languageProcessor: LanguageProcessor
}

const DiagramServicesContext = createContext<ContextProps>()

export const DiagramServicesProvider = (props: ProviderProps) => {
    const [canvas] = createSignal(new Canvas())
    const [languageProcessor] = createSignal(new LanguageProcessor())

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
