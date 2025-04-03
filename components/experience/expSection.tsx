'use client'
import { useEffect } from "react";
import StackingCard from "../ui/StackingCard";
import Lenis from "lenis";
export default function StackedExperience() {
    const experiences = [
      {
        title: "AI4CE",
        description: "Integrating work for Open Source SimplerEnv robotic simulator for openVLA",
        color:"bg-charcoal-light" // Optional color for the card background
      },
      {
        title: "HSRN",
        description: "Helped in experimentation plugin design and contributed to python and Unreal Engine codebases",
        color:"bg-red-500"

      },
      {
        title: "New York University",
        description: "Sustainable Engineering Institute. Understanding effective curriculum implementations to create sustainability conscious engineers",
        color:"bg-charcoal-darker" // Optional color for the card background
      },
      {
        title: "Tech@NYU",
        description: "Grew sponsorship by 20%, hosted 40+ founders, scaled NYU's largest founder event.",
        src: "/portfolio_filler.png",
        color:"bg-charcoal-light" // Optional color for the card background
      },
      
      
    ];
    
    useEffect( () => {

        const lenis = new Lenis()  
        function raf(time: number) {   
          lenis.raf(time)   
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    
      })

    return (
        
      <section className="mt-[20vh] mb-[10vh] block">
        <h1 className="text-7xl text-charcoal font-bold text-center">Work Experience</h1>
        {
            experiences.map( (exp, index) => {
                return (
                    <StackingCard
                        key={`exp-${index}`} // Unique key for each experience
                        title={exp.title} // Title of the experience
                        src={"/portfolio_filler.png"} // Placeholder image source
                        link={"#"} // Link for more details (if applicable)
                        description={exp.description} // Description of the experience
                        color={exp.color} // Optional color for the card background
                    />
                )
            })
        }
      </section>
    );
  }
  