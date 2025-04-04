import { CardStackDetails, ProjectDetails } from "./types";

export const top3Featured: number[] = [0, 1, 2]; // Indexes of the top 3 featured projects
export const allProjects: ProjectDetails[] = [
    {
        ProjName: "AI Chatbot",
        TechStack:"Python, FastAPI, OpenAI, React",
        Liner:"An AI-powered chatbot for customer support.",
        frontImg:"https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        backImg:"https://images.unsplash.com/photo-1742993493624-ac0f22810eb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        CTA:"Learn More",
        CTA_link:"https://example.com/design-report-ai-chatbot",
    },
    {
        ProjName: "AutoGo",
        TechStack:"Python, TensorFlow, OpenCV, Arduino",
        Liner:"Self-playing Chinese chess board with ML.",
        frontImg:"https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        backImg:"https://images.unsplash.com/photo-1742993493624-ac0f22810eb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        CTA:"Learn More",
        CTA_link:"https://example.com/design-report-autogo",
    },
    {
        ProjName: "Plugma",
        TechStack:"Node.js, Express, Next.js, Supabase, PostGreSQL, AWS",
        Liner:"An event platform built to grow communities",
        frontImg:"https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        backImg:"https://images.unsplash.com/photo-1742993493624-ac0f22810eb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        CTA:"Learn More",
        CTA_link:"https://example.com/design-report-plugma",
    },
    {
        ProjName: "Embodied AI Navigation",
        TechStack:"Python, PyTorch, Sklearn, SLAM",
        Liner:"Maze Puzzle Navigator with SLAM",
        frontImg:"https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        backImg:"https://images.unsplash.com/photo-1742993493624-ac0f22810eb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        CTA:"Learn More",
        CTA_link:"https://example.com/design-report-embodied-ai-navigation",
    }
]


export const expConsts: CardStackDetails[] = [
    {
      title: "AI4CE",
      titleCSS: "bg-blue-500 text-beige",
      jobTitle: "AI Research Assistant",
      duration: "March 2025 — Present",
      description: "Helping alter tools to provide quick simulated benchmarks for Vision Language Action models.",
      achievements: `- Researched optimization techniques to reduce VLA/VLM model training time
  - Optimized SimplerEnv for parallel benchmarks (~3x computational savings)
  - Reduced VRAM usage on PI0 model training using advanced optimizers`,
      skills: ["PyTorch", "Linux", "SimplerEnv", "ManiSkill3"],
      workProof: [
      ],
      src: "/ai4cewide.png",
      link: "https://linkedin.com/in/sean-sh-lai",
      boxColor: "bg-charcoal"
    },
    {
      title: "High Speed Research Network",
      titleCSS: "text-beige",
      jobTitle: "Undergraduate Team Lead",
      duration: "Jan 2024 — Present",
      description: "Working on creating a universal experimentation system that maintains performance and accessiblity",
      achievements: `- Redeveloped an Unreal Engine 5 C++ plugin, increasing user base by 10%
  - Enhanced Python package documentation and reduced jitter by 20%
  - Authored white papers on low latency infrastructure for 100+ researchers`,
      skills: ["C++", "Python", "WebSocket", "Unreal Engine"],
      workProof: [
        { name: "Plugin POC", link: "https://www.example.com/networking/plugin-growth" },
        { name: "PR: Implementation", link: "https://www.example.com/networking/jitter" },
      ],
      src: "/ai4cewide.png",
      link: "https://linkedin.com/in/sean-sh-lai",
      boxColor: "bg-charcoal"
    },
    {
      title: "New York University Sustainble Engineering",
      titleCSS: "text-beige",
      jobTitle: "UGRSP Research Fellow",
      duration: "June 2024 — Sept 2024",
      description: "Helped guide NYU curriculum changes and learned ML techniques",
      achievements: `- Collaborated on a sustainable engineering curriculum impacting 1000+ students
  - Built NLP models for word cloud generation and embeddings, reducing processing times by 25%
  - Implemented sentiment analysis and data aggregation for 300+ student responses`,
      skills: ["NLP", "Data Processing", "Python", "Numpy"],
      workProof: [],
      src: "/ai4cewide.png",
      link: "https://linkedin.com/in/sean-sh-lai",
      boxColor: "bg-charcoal"
    },
    {
      title: "Tech@NYU",
      titleCSS: "text-beige",
      jobTitle: "Startup Week Co-lead",
      duration:"Sept 2023 — Present",
      description: "Leading NYU's premier student led entrepreunership festival with speakers from YC, ZFellows, Forbes30u30 and more!",
      achievements: `- Hosted a hiring hackathon connecting 3 startups with 220 students
  - Organized NYU’s student-run startup festival with 10 events and prominent speakers
  - Developed a backend framework using Django and pandas for event data analysis
  - Created internal tooling with NextJS to manage 300+ active members`,
      skills: ["Django", "NextJS", "Pandas", "Event Management"],
      workProof: [
        { name: "Startup Connections", link: "https://www.example.com/startup/hackathon" },
        { name: "Member Tooling", link: "https://www.example.com/startup/members" }
      ],
      src: "/ai4cewide.png",
      link: "https://linkedin.com/in/sean-sh-lai",
      boxColor: "bg-charcoal"
    },
    
]