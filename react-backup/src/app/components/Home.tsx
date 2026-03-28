import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { Approach } from "./Approach";
import { HowItWorks } from "./HowItWorks";
import { CTA } from "./CTA";

export function Home() {
  return (
    <>
      <Hero />
      <div id="problem">
        <Problem />
      </div>
      <div id="approach">
        <Approach />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <CTA />
    </>
  );
}
