'use client';
import React, {useEffect} from 'react'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-separator'
import Lenis from "lenis"
import StickyFooter from '@/components/ui/stickyfooter';
import { AspectRatio } from '@/components/ui/aspect-ratio';
const ProjPages = () => {
    useEffect(() => {
        const lenis = new Lenis();
      
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
      
        requestAnimationFrame(raf);
        document.documentElement.classList.add('scroll-hidden') // 
    
        return () => {
          document.documentElement.classList.remove('scroll-hidden')
          lenis.destroy();
        };
      }, []);
    const tempSkill = ["Next.js", "Express.js", "openai sdk", "AWS", "Supabase", "PostGreSQL"]
    //   const me= "."
    // const nextCase = me.next;
  return (
    <main className='bg-offwhite w-screen flex flex-col justify-center itemss-center text-charcoal-darker'>
        <div className='flex flex-col mt-40 mx-20 mb-32'>
            <div className='w-full flex'>
                <div className='max-w-[60%] mr-10 space-y-3 mt-40'>
                    <h1 className='text-left text-7xl font-semibold'>Proj Name</h1>
                    <div className='w-full flex justify-between text-charcoal/80 text-xl mt-2'>
                        <h2 className='text-start'>Date</h2>
                        <h2 className='text-end'>Last updated</h2>
                    </div>
                    <div className='space-y-9'>
                        <h3 className='text-xl font-sans tracking-wide leading-relaxed'>
                            Plugma is an event platform designed to treat events 
                            hosted together as one unified community, giving serious community organizers the tools to grow their communities.
                        </h3>
                        <div>
                            Role: Lead Programmer
                        </div>
                        <Separator></Separator>
                        <div className=''>
                            <h3 className='text-xl font-bold font-sans tracking-wide leading-relaxed'>
                                Skills:
                            </h3>
                            <Separator className='h-[1px] w-full rounded-2xl bg-charcoal/80 mt-1 mb-2'/>
                            <div className='flex flex-wrap space-x-3'>
                            {tempSkill.flatMap((skill, index) =>
                                index < tempSkill.length - 1
                                ? [<span key={skill}>{skill}</span>, <span key={`dot-${index}`}>&nbsp;·&nbsp;</span>]
                                : [<span key={skill}>{skill}</span>]
                            )}
                            
                            </div>                    
                        </div>
                        
                    </div>
                </div>
            <div className='h-[30vw] w-[30vw] relative'>
                <Image
                    src={"/ai4ce_new_block_trans.png"}
                    alt={"fancy img"
                    }
                    fill
                    className='object-cover'
                />
            </div>
            </div>
            <div className='space-y-3'>
                <h2 className='text-4xl font-medium'>
                    Design process
                </h2>
                <Separator className='bg-charcoal w-full h-[1px]'/>
                {/* First option here is if there is an image for the mermaid diagram or smth else */}
                <div className="w-full">
                {/* Diagram box floated left */}
                <div className=" relative m-4 flex items-center justify-center flex-col max-h-[35vw]">
                    <AspectRatio ratio={16 / 9} className="w-full h-full">
                        <Image
                            src={"/diagram.jpg"}
                            alt="Maze graph visualization"
                            fill
                            className="object-cover"
                        />
                    </AspectRatio>
                    <p className="text-sm mt-2">Figure 1: Maze graph visualization</p>
                </div>

                {/* Wrapped text content */}
                <div className="overflow-hidden w-full">
                    <p className="mb-4">
                    This project aimed to develop a visual navigation system to enable a robot to efficiently traverse a simulated maze using computer vision techniques and pathfinding algorithms. The robot was tasked with reaching a target in the shortest possible time, using a combination of visual exploration data—primarily images and accompanying JSON path logs—and online data collection during simulation. Our overarching objective was to create a visual system capable of recognizing previously visited locations and leveraging that knowledge to autonomously navigate to a goal.
                    </p>
                    <p className="mb-4">
                    {`In testing, we observed a direct relationship between frame rate and the robot’s navigational success. Faster frame processing allowed smoother behavior and more effective pathfinding, emphasizing the importance of computational efficiency in real-time systems. One remaining challenge, however, was the construction of a stable graph. Because exploration images often captured partial angles of scenes, the resulting visual embeddings occasionally mapped to highly similar but spatially distinct images. This aliasing reduced the robustness of our graph-based A* implementation and introduced inconsistencies in path prediction.

                    Looking ahead, our primary goal is to move toward fully autonomous pathfinding. This will require improvements in the exploration phase to capture more diverse and orientation-aware data, allowing the graph structure to better reflect the physical layout of the environment. Additionally, we plan to conduct more extensive hyperparameter tuning for the NetVLAD layers and MiniBatchKMeans clusters, and explore the possibility of combining SIFT with other, more adaptable learned features. By continuing to refine the pipeline and reduce computational overhead, we aim to produce a navigation system capable of reliably solving complex visual environments.

                    This project integrated several state-of-the-art tools and methodologies, including NetworkX for graph construction, FAISS for similarity search, and A* for heuristic pathfinding. Our reference materials included foundational works in similarity indexing and place recognition, such as the NetVLAD and GeM papers, and the original formulation of the A* algorithm by Hart, Nilsson, and Raphael (1968). These resources provided both theoretical grounding and practical guidance in constructing a robust, visually-aware navigation system.`}
                    </p>
                    {/* Continue with the rest of your paragraph-based report */}
                </div>
                </div>
            </div>
        </div>
        <StickyFooter>
        <div className='w-full h-full overflow-hidden bg-charcoal'>
            
            <div>
                <div className='w-full justify-center flex flex-col items-center group'>
                    <h1>Nxt Case Name</h1>
                    <div className='relative w-[400px] h-[400px] overflow-hidden'>
                        <div className={`w-full h-full flex justify-center items-center bg-charcoal-light/80 group-hover:translate-y-[200px] translate-y-[300px] transition-transform duration-700 ease-in-out`}>
                                <Image 
                                src={`/chatbot.png`}
                                width={300}
                                height={0}
                                alt="image"
                                />
                        </div>  
                    </div>
                    <Separator className='bg-beige w-[75%] h-[1px]'/>
                </div>
            </div>
        </div>
        </StickyFooter>
    </main>
  )
}

export default ProjPages