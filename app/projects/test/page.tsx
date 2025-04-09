'use client';
import React, {useEffect} from 'react'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-separator'
import Lenis from "lenis"
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
  return (
    <div className='bg-charcoal-darker w-screen min-h-screen flex justify-center itemss-center'>
        <div className='w-3/4 flex flex-col mt-40'>
            <div className='w-full flex'>
            <div className=' w-[50%] mr-10 space-y-3'>
                <h1 className='text-left text-7xl font-semibold'>Proj Name</h1>
                <div className='w-full flex justify-between text-beige/80 text-xl mt-2'>
                    <h2 className='text-start'>Date</h2>
                    <h2 className='text-end'>Last updated</h2>
                </div>
                <div className='space-y-9'>
                    <div className='text-xl font-sans tracking-wide leading-relaxed'>
                        Plugma is an event platform designed to treat events 
                        hosted together as one unified community, giving serious community organizers the tools to grow their communities.
                    </div>

                    <Separator></Separator>
                    <div className='space-y-5'>
                        <h3>
                            Skills:
                        </h3>
                        <div className='flex flex-wrap'>
                        {
                            tempSkill.map((skill,idx) => {
                                return(
                                    <p key={idx}>
                                        {skill}
                                        *
                                    </p>
                                )
                            })
                        }
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
                <Separator className='bg-beige w-full h-[1px]'/>
                {/* First option here is if there is an image for the mermaid diagram or smth else */}
                <div className="w-full">
                {/* Diagram box floated left */}
                <div className="m-4 flex items-center justify-center flex-col min-h-[40vw]">
                    <div className="w-full h-full min-w-[35vw] min-h-[35vw] rounded-2xl border-charcoal-darker bg-offwhite p-5 text-black shadow">
                    Diagram goes here
                    </div>
                    <p className="text-sm mt-2">Figure 1: Maze graph visualization</p>
                </div>

                {/* Wrapped text content */}
                <div className="overflow-hidden w-full">
                    <p className="mb-4">
                    This project aimed to develop a visual navigation system to enable a robot to efficiently traverse a simulated maze using computer vision techniques and pathfinding algorithms. The robot was tasked with reaching a target in the shortest possible time, using a combination of visual exploration data—primarily images and accompanying JSON path logs—and online data collection during simulation. Our overarching objective was to create a visual system capable of recognizing previously visited locations and leveraging that knowledge to autonomously navigate to a goal.
                    </p>
                    <p className="mb-4">
                    In testing, we observed a direct relationship between frame rate and the robot’s navigational success. Faster frame processing allowed smoother behavior and more effective pathfinding, emphasizing the importance of computational efficiency in real-time systems. One remaining challenge, however, was the construction of a stable graph. Because exploration images often captured partial angles of scenes, the resulting visual embeddings occasionally mapped to highly similar but spatially distinct images. This aliasing reduced the robustness of our graph-based A* implementation and introduced inconsistencies in path prediction.

Looking ahead, our primary goal is to move toward fully autonomous pathfinding. This will require improvements in the exploration phase to capture more diverse and orientation-aware data, allowing the graph structure to better reflect the physical layout of the environment. Additionally, we plan to conduct more extensive hyperparameter tuning for the NetVLAD layers and MiniBatchKMeans clusters, and explore the possibility of combining SIFT with other, more adaptable learned features. By continuing to refine the pipeline and reduce computational overhead, we aim to produce a navigation system capable of reliably solving complex visual environments.

This project integrated several state-of-the-art tools and methodologies, including NetworkX for graph construction, FAISS for similarity search, and A* for heuristic pathfinding. Our reference materials included foundational works in similarity indexing and place recognition, such as the NetVLAD and GeM papers, and the original formulation of the A* algorithm by Hart, Nilsson, and Raphael (1968). These resources provided both theoretical grounding and practical guidance in constructing a robust, visually-aware navigation system.
                    </p>
                    {/* Continue with the rest of your paragraph-based report */}
                </div>
                </div>
            </div>
        </div>
        {/* <div className='w-3/4 flex'>
            <h2>
                Design Process
            </h2>
            <Separator className='h-1 w-full bg-beige rounded-xl'/>
        </div> */}
    </div>
  )
}

export default ProjPages