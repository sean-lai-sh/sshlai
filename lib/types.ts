export interface NavBarDetails {
    name: string;
    href: string; // URL to the project page
    shortDescript:string;
    caseStudy?:string;
}

export interface ProjectDetails {
    ProjName: string;
    TechStack: string;
    Liner: string;
    frontImg: string;
    backImg: string;
    CTA: string;
    CTA_link: string;
    tag?:string; // for landing page
}

export interface CardStackDetails {
    title: string;
    titleCSS: string;
    jobTitle?: string;
    description: string;
    achievements: string;
    duration?:string;
    skills: string[];
    workProof: miniWorkDetails[];
    src: string;
    link: string;
    boxColor: string;
}

export interface miniWorkDetails {
    name: string;
    link:string ;
}