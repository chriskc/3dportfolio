import { Effect } from "postprocessing"
import { forwardRef } from "react"
import { TestShader } from "../shaders/RisographShader"

// Minimal effect for testing
class TestEffectImpl extends Effect {
    constructor() {
        try {
            super("TestEffect", TestShader.fragmentShader)
        } catch (error) {
            console.error("Error creating TestEffect:", error)
            throw error
        }
    }
}

export const RisographEffect = forwardRef<TestEffectImpl, Record<string, never>>((_, ref) => {
    try {
        return <primitive ref={ref} object={new TestEffectImpl()} dispose={null} />
    } catch (error) {
        console.error("Error in RisographEffect:", error)
        return null
    }
})
