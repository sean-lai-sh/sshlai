import ExperienceSection from "@/components/experience/expSection";
import Loader from "@/components/loader";

// components/Hero.tsx
export default function Hero() {
  return (
    <Loader>
      <section className="min-h-screen w-full text-black flex flex-col justify-center items-center px-6 bg-beige">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Sean Lai
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl text-offwhite text-center">
          Full Stack & AI Engineer. Building systems where code meets cognition.
        </p>
        <a
          href="/projects"
          className="mt-8 px-6 py-3 border border-beige text-beige hover:bg-beige hover:text-charcoal transition-all duration-300 rounded-lg"
        >
          View My Work
        </a>
      </section>
      <ExperienceSection />
    </Loader>
  );
}

