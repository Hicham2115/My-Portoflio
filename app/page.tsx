"use client";
import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Cursor } from "@/components/Cursor";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Principles } from "@/components/sections/Principles";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Cursor />
      <NavBar />
      <main>
        <Hero animate={loaded} />
        <div style={{ padding: "clamp(80px,15vw,120px) 40px" }}>
          <MarqueeSection />
          <Work />
          <About />
          <Principles />
          <Skills />
        </div>
        <Footer />
      </main>
    </>
  );
}
