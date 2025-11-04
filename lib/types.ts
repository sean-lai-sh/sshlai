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
    src?:string;
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


export type CommunityExp = {
    title: string;
    img: string;
    tagline:string;
    maskedContent: React.FC | null; // what our mask will reveal slowly upon our learn more
    shadowCol: string; // Determine shadow color :)
}

export type workExpDetails = {
    company_name: string;
    job_title: string;
    duration: string;
    description: string;
    achievements: string[];
    skills: string[];
    logo_img_src: string;
    img_tag: string;
    company_link: string;
    bp_style?: string;
    shadowColor?: string;
}

export type ProjectDetails_v2 = {
    proj_name: string;
    proj_liner: string;
    proj_link: string;
}

export interface PanelData {
    id: number;
    number: string; // "01", "02", etc.
    title: string;
    description: string[];
    ctaText: string;
    ctaLink: string;
    image: string;
    bgColor: string;
    itemColor?: string; // Optional, defaults to charcoal-darker
}