import { useFrame } from "@react-three/fiber"
import { Effect } from "postprocessing"
import { forwardRef, useRef } from "react"
import { Uniform } from "three"
import { TestShader } from "../shaders/RisographShader"

// Effect with controllable uniforms
class TestEffectImpl extends Effect {
    constructor({ grainIntensity = 0.15, grainScale = 300.0 } = {}) {
        super("TestEffect", TestShader.fragmentShader, {
            uniforms: new Map([
                ["uGrainIntensity", new Uniform(grainIntensity)],
                ["uGrainScale", new Uniform(grainScale)],
                ["uTime", new Uniform(0.0)],
            ]),
        })
    }

    update(_renderer: unknown, _inputBuffer: unknown, deltaTime?: number) {
        const timeUniform = this.uniforms.get("uTime")
        if (timeUniform && deltaTime !== undefined) {
            timeUniform.value += deltaTime
        }
    }

    setGrainIntensity(value: number) {
        const uniform = this.uniforms.get("uGrainIntensity")
        if (uniform) uniform.value = value
    }

    setGrainScale(value: number) {
        const uniform = this.uniforms.get("uGrainScale")
        if (uniform) uniform.value = value
    }
}

interface RisographEffectProps {
    grainIntensity?: number
    grainScale?: number
}

export const RisographEffect = forwardRef<TestEffectImpl, RisographEffectProps>(
    ({ grainIntensity = 0.15, grainScale = 300.0 }, ref) => {
        const effectRef = useRef<TestEffectImpl>(null)

        useFrame((_, delta) => {
            if (effectRef.current) {
                effectRef.current.update(null, null, delta)
                effectRef.current.setGrainIntensity(grainIntensity)
                effectRef.current.setGrainScale(grainScale)
            }
        })

        try {
            const effect = new TestEffectImpl({ grainIntensity, grainScale })

            return (
                <primitive
                    ref={(el: TestEffectImpl) => {
                        effectRef.current = el
                        if (typeof ref === "function") ref(el)
                        else if (ref) ref.current = el
                    }}
                    object={effect}
                    dispose={null}
                />
            )
        } catch (error) {
            console.error("Error in RisographEffect:", error)
            return null
        }
    }
)
