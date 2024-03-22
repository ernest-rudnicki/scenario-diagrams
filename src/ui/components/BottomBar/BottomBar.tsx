import { createSignal } from 'solid-js'

interface BottomBarProps {
    onSubmit?: (value: string) => void
}

export const BottomBar = (props: BottomBarProps) => {
    const [value, setValue] = createSignal('')

    const onEnterClick = (key: string): void => {
        if (key !== 'Enter') return

        props.onSubmit(value())
    }

    return (
        <div class="w-full h-[50px] flex justify-center mb-6 fixed bottom-0">
            <input
                value={value()}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyUp={(e) => onEnterClick(e.key)}
                placeholder="Provide description for the diagram..."
                class="w-2/4 border border-slate-600 p-4 bg-slate-100 rounded-2xl placeholder:text-slate-500"
            ></input>
        </div>
    )
}
