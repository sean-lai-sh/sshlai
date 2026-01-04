import { z } from 'zod'
import { CardStackDetails, ProjectDetails, workExpDetails, PanelData, ProjectDetails_v2 } from "./types";
export const searching: boolean = false; // Set to true when searching for a job
export const top3Featured: number[] = [0, 1, 2]; // Indexes of the top 3 featured projects
export const allProjects: ProjectDetails[] = [
     {
        ProjName: "Plugma",
        TechStack:"Node.js, Express, Next.js, Supabase, PostGreSQL, AWS",
        Liner:"An event platform built to grow communities",
        frontImg:"/plugmafront.png",
        backImg:"/plugmaback.png",
        CTA:"Learn More",
        CTA_link:"https://github.com/sean-lai-sh/plugma",
        tag:"bg-offwhite/80",
        src:"/plugmafront.png",
    },
    {
        ProjName: "AutoGo",
        TechStack:"Python, TensorFlow, OpenCV, Arduino",
        Liner:"Self-playing Chinese chess board with ML",
        frontImg:"/ago.png",
        backImg:"/autoGoBack.jpg",
        CTA:"Learn More",
        CTA_link:"https://github.com/sean-lai-sh/AutoGo",
        tag:"bg-black",
        src:"/ago.png",
    },
    {
        ProjName: "AI Chatbot",
        TechStack:"Python, FastAPI, OpenAI, React",
        Liner:"An AI-powered chatbot for customer support",
        frontImg:"./bpimg.jpg",
        backImg:"/chatbot.png",
        CTA:"Learn More",
        CTA_link:"http://13.211.144.173/",
        tag:"bg-offwhite/80",
        src:"/chatbot.png",
    },
   
    {
        ProjName: "Embodied AI Navigation",
        TechStack:"Python, PyTorch, Sklearn, SLAM",
        Liner:"Maze Puzzle Navigator with SLAM",
        frontImg:"https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        backImg:"https://images.unsplash.com/photo-1659823449893-c1e106e10a98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        CTA:"Learn More",
        CTA_link:"https://github.com/sean-lai-sh/embodied_ai_navigation",
    }
]
export const contactFields = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'john smith*',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'you@example.com*',
    type: 'email',
  },
  {
    name: 'company',
    label: 'Organization',
    placeholder: 'acme inc*',
    type: 'text',
  },
  {
    name: 'msg',
    label: 'Message',
    placeholder: 'I want you to...*',
    type: 'textarea', // 👈 for multiline message
  },
] as const;
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
      boxColor: "bg-charcoal "
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
      src: "/hsrn.jpeg",
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
      src: "/techatnyulogo.png",
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
      src: "/test2.png",
      link: "https://linkedin.com/in/sean-sh-lai",
      boxColor: "bg-charcoal"
    },
    
    
];
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),

  email: z
    .string()
    .email({ message: 'Invalid email address' }),

  company: z
    .string()
    .min(1, { message: 'Company or organization is required' })
    .max(100, { message: 'Company name too long' }),

  msg: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be under 1000 characters' }),
});

export const commPanel: PanelData[] = [
  {
    id: 1,
    number: "01",
    title: "HOF Hacks",
    description: [
      "1 Month to Host. 230+ RSVPs.",
      "Vercel, Figma, & HOF Capital.",
      "Tons of Saratoga Water."
    ],
    ctaText: "View Event",
    ctaLink: "#",
    image: "/hofhack.png",
    bgColor: "#c44541"
  },
  {
    id: 2,
    number: "02",
    title: "Startup Week 2025",
    description: [
      "New Events, Energy, and Team",
      "Anthropic, Adobe, ZFellows, & Google Ventures",
      "A better week for student entrepreneurs."
    ],
    ctaText: "View Event",
    ctaLink: "#",
    image: "/sw2025.png",
    bgColor: "#f5f5f5",
    itemColor: 'border-charcoal-darker',
    
  },
  {
    id: 3,
    number: "03",
    title: "Startup Week Buildathon",
    description: [
      "Inaugural Hiring Hackathon. 36Hrs, 10K Prize Pool",
      "Hosted in under 4 months. 220 RSVPs & 10 offers",
      "Hosted at Verci @ NYC"
    ],
    ctaText: "Learn the Story",
    ctaLink: "#",
    image: "/swbuildathon.png",
    bgColor: "white",
    itemColor: 'border-charcoal-darker',
  },
  {
    id: 4,
    number: "04",
    title: "Mentor & Meet",
    description: [
      "10 Founders and Operators from Series A - C",
      "1:4 Student Ratio. 1 night of networking",
      "In collaboration with Supermomos"
    ],
    ctaText: "Visit Event",
    ctaLink: "#",
    image: "/mnm.png",
    bgColor: "#C2DAFF"
  },
  {
    id: 5,
    number: "05",
    title: "Startup Week 2024",
    description: [
      "1 Week, 40+ founders, & YC",
      "Students hungry for a chance",
      "My first big event at NYU."
    ],
    ctaText: "Visit Event",
    ctaLink: "#",
    image: "/sw24.png",
    
    bgColor: "#f5f5f5",
    itemColor: 'border-charcoal-darker'
  }
];
export const workExp: workExpDetails[] = [
  // {
  //   company_name: "Boost Payment Solutions",
  //   job_title: "Data Engineer Intern",
  //   duration: "June 2025 — Present",
  //   description: "Data Warehousing to store >$23B in annual transactions",
  //   achievements: [
  //     "Developed a data pipeline using Python and AWS to process transaction data",
  //     "Implemented data validation checks to ensure data integrity",
  //     "Collaborated with cross-functional teams to gather requirements and deliver solutions"
  //   ],
  //   skills: ["Python", "AWS", "Data Pipeline", "SQL"],
  //   logo_img_src: "/boost_logo.png",
  //   img_tag: "bg-white text-black",
  //   company_link: "https://www.boostb2b.com/"
  // },
  {
    company_name: "AI4CE",
    job_title: "AI Research Assistant",
    duration: "March 2025 — May 2025",
    description: "Helping alter tools to provide quick simulated benchmarks for Vision Language Action models.",
    achievements: [
      "Researched optimization techniques to reduce VLA/VLM model training time",
      "Optimized SimplerEnv for parallel benchmarks (~3x computational savings)",
      "Reduced VRAM usage on PI0 model training using advanced optimizers"
    ],
    skills: ["PyTorch", "SimplerEnv", "ManiSkill3"],
    logo_img_src: "/ai4ce_new_block_trans.png",
    img_tag: "bg-vantablack",
    company_link: "https://ai4ce.org/",
    bp_style: "bg-offwhite",
    shadowColor: "200,200,200",
  },
  {
    company_name: "NYU Entrepreneurship Institute",
    job_title: "Advisory Board Member",
    duration: "Nov 2024 — Present",
    description: "Fund events that help student founders scale and get infront of VCs",
    achievements: [
      "Provided feedback on entrepreneurship curriculum for 1000+ students",
      "Assisted in organizing events and workshops for aspiring entrepreneurs",
      "Collaborated with faculty to enhance the entrepreneurship program"
    ],
    skills: ["Curriculum Development", "Event Planning", "Student Outreach"],
    logo_img_src: "/nyu_elab2.png",
    img_tag: "bg-offwhite text-black",
    company_link: "https://entrepreneur.nyu.edu/"
  },
  {
    company_name: "NYU HSRN Lab",
    job_title: "Research Engineer Lead",
    duration: "Jan 2024 — Present",
    description: "Working on creating a universal experimentation system that maintains performance and accessiblity",
    achievements: [
      "Redeveloped an Unreal Engine 5 C++ plugin, increasing user base by 10%",
      "Enhanced Python package documentation and reduced jitter by 20%",
      "Authored white papers on low latency infrastructure for 100+ researchers"
    ],
    skills: ["C++", "Python", "WebSocket", "Unreal Engine"],
    logo_img_src: "/nyu_hsrn.png",
    img_tag: "bg-vantablack text-offwhite",
    company_link: "https://vip.hsrn.nyu.edu/",
    bp_style: "bg-offwhite"
  },
  {
    company_name: "NYU SEI",
    job_title: "UGRSP Research Fellow",
    duration: "June 2024 — Sept 2024",
    description: "Run NLP and collate data to support sustainable engineering curriculum implementation",
    achievements: [
      "Collaborated on a sustainable engineering curriculum impacting 1000+ students",
      "Built NLP models for word cloud generation and embeddings, reducing processing times by 25%",
      "Implemented sentiment analysis and data aggregation for 300+ student responses"
    ],
    skills: ["NLP", "Data Processing", "Python", "Numpy"],
    logo_img_src: "/test2.png",
    img_tag: "bg-offwhite text-black",
    company_link: "https://www.engineering.nyu.edu/"
  },
  {
    company_name: "Tech@NYU",
    job_title: "Vice President",
    duration: "Sept 2023 — Present",
    description: "Leading NYU's premier student led entrepreunership festival with speakers from YC, ZFellows, Forbes30u30 and more!",
    achievements: [
      "Hosted a hiring hackathon connecting 3 startups with 220 students",
      "Organized NYU’s student-run startup festival with 10 events and prominent speakers",
      "Developed an admin platform using Django to handle 500+ active members",
      "Developed an admin platform using Django to handle 500+ active members",
    ],
    skills: ["Django", "NextJS", "Pandas", "Event Management"],
    logo_img_src: "/techatnyulogo.png",
    img_tag: "bg-vantablack",
    company_link: "https://techatnyu.org/",
    bp_style: "bg-offwhite",
    shadowColor: "255,255,255"
  }
]

export const projectList: ProjectDetails_v2[] = [
  {
    proj_name: "TBA",
    proj_liner: "MCP Observability SDK",
    proj_link: "https://github.com/sean-lai-sh/"
  },
  {
    proj_name: "Tech@NYU",
    proj_liner: "Revamped Website",
    proj_link: "https://techatnyu.org/"
  },
  {
    proj_name: "Orches",
    proj_liner: "Real time Infra Deployment",
    proj_link: "https://github.com/sean-lai-sh/exp-orchestrator",
  },
  {
    proj_name: "Plugma",
    proj_liner: "Luma at Home",
    proj_link: "https://github.com/sean-lai-sh/plugma"
  },
  {
    proj_name: "AutoGo",
    proj_liner: "A Real Board for AlphaGo",
    proj_link: "https://github.com/sean-lai-sh/AutoGo",
  },
  {
    proj_name: "AI Navigator",
    proj_liner: "Fast Racing CV Agent",
    proj_link: "https://github.com/sean-lai-sh/embodied_ai_navigation"
  },
]