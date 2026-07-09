import { SceneManager } from "@/components/journey/SceneManager";
import { GenesisScene } from "@/components/journey/scenes/GenesisScene";
import { MaterialScene } from "@/components/journey/scenes/MaterialScene";
import { EvolutionScene } from "@/components/journey/scenes/EvolutionScene";
import { LightScene } from "@/components/journey/scenes/LightScene";
import { ProcessScene } from "@/components/journey/scenes/ProcessScene";
import { ResultScene } from "@/components/journey/scenes/ResultScene";
import { FinalScene } from "@/components/journey/scenes/FinalScene";
import { Header } from "@/components/sections/Header";

export default function Home() {
  return (
    <main id="journey-wrapper" className="relative bg-graphite">
      {/*
          Main Wrapper height is 1050vh (7 scenes * 150vh)
          We add some extra buffer to ensure the last scene is fully visible.
      */}
      <div className="h-[1200vh] pointer-events-none" />

      <Header />

      <SceneManager>
        <GenesisScene />
        <MaterialScene />
        <EvolutionScene />
        <LightScene />
        <ProcessScene />
        <ResultScene />
        <FinalScene />
      </SceneManager>
    </main>
  );
}
