import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
  Glitch,
  DepthOfField,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode, ToneMappingMode } from "postprocessing";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import GlowingObjects from "./GlowingObjects";
import Donut from "./Donut";
import Lights from "./Lights";

function Scene({ effectsEnabled }) {
  const bloomProps = useControls("Bloom", {
    enabled: true,
    intensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
    luminanceThreshold: { value: 0.3, min: 0, max: 1, step: 0.01 },
    luminanceSmoothing: { value: 0.9, min: 0, max: 1, step: 0.01 },
    mipmapBlur: true,
  });

  const chromaticProps = useControls("Chromatic Aberration", {
    enabled: true,
    offset: {
      value: [0.002, 0.002],
      min: 0,
      max: 0.01,
      step: 0.0001,
    },
  });

  const vignetteProps = useControls("Vignette", {
    enabled: true,
    darkness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    offset: { value: 0.5, min: 0, max: 1, step: 0.01 },
  });

  const noiseProps = useControls("Noise", {
    enabled: false,
    opacity: { value: 0.15, min: 0, max: 1, step: 0.01 },
  });

  const glitchProps = useControls("Glitch", {
    enabled: false,
    delay: { value: [1.5, 3.5], min: 0, max: 10 },
    duration: { value: [0.6, 1.0], min: 0, max: 2 },
    strength: { value: [0.3, 1.0], min: 0, max: 1 },
  });

  const dofProps = useControls("Depth of Field", {
    enabled: false,
    focusDistance: { value: 0.02, min: 0, max: 1, step: 0.001 },
    focalLength: { value: 0.1, min: 0, max: 1, step: 0.001 },
    bokehScale: { value: 4, min: 0, max: 10, step: 0.1 },
  });

  const toneMappingProps = useControls("Tone Mapping", {
    enabled: true,
    mode: {
      value: ToneMappingMode.ACES_FILMIC,
      options: {
        Linear: ToneMappingMode.LINEAR,
        Reinhard: ToneMappingMode.REINHARD,
        Reinhard2: ToneMappingMode.REINHARD2,
        "Optimized Cineon": ToneMappingMode.OPTIMIZED_CINEON,
        "ACES Filmic": ToneMappingMode.ACES_FILMIC,
      },
    },
    exposure: { value: 1, min: 0, max: 3, step: 0.1 },
  });

  return (
    <>
      <color attach="background" args={["#000510"]} />

      <Lights />
      <GlowingObjects />
      <Donut />

      {effectsEnabled && (
        <EffectComposer multisampling={0}>
          {bloomProps.enabled && (
            <Bloom
              intensity={bloomProps.intensity}
              luminanceThreshold={bloomProps.luminanceThreshold}
              luminanceSmoothing={bloomProps.luminanceSmoothing}
              mipmapBlur={bloomProps.mipmapBlur}
            />
          )}

          {chromaticProps.enabled && (
            <ChromaticAberration
              offset={chromaticProps.offset}
              blendFunction={BlendFunction.NORMAL}
            />
          )}

          {vignetteProps.enabled && (
            <Vignette
              darkness={vignetteProps.darkness}
              offset={vignetteProps.offset}
            />
          )}

          {noiseProps.enabled && (
            <Noise
              opacity={noiseProps.opacity}
              blendFunction={BlendFunction.OVERLAY}
            />
          )}

          {glitchProps.enabled && (
            <Glitch
              delay={glitchProps.delay}
              duration={glitchProps.duration}
              strength={glitchProps.strength}
              mode={GlitchMode.SPORADIC}
            />
          )}

          {dofProps.enabled && (
            <DepthOfField
              focusDistance={dofProps.focusDistance}
              focalLength={dofProps.focalLength}
              bokehScale={dofProps.bokehScale}
            />
          )}

          {toneMappingProps.enabled && (
            <ToneMapping mode={toneMappingProps.mode} />
          )}
        </EffectComposer>
      )}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={20}
      />
    </>
  );
}

export default Scene;
