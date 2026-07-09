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
    <main id="journey-wrapper" className="relative min-h-screen bg-graphite">
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

      <div className="h-[1200vh] pointer-events-none" />
    </main>
  );
}
