import React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { NavBarDetails } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SquareTerminalIcon, WebhookIcon } from "lucide-react"
import NavigationLink from "../ui/navLink"


export default function Navbar()  {
    const projects: NavBarDetails[] = [
        { name: "AI Chatbot", href: "/projects/ai-chatbot", shortDescript: "An AI-powered chatbot for customer support." },
        { name: "AutoGo", href: "/projects/autogo",
            shortDescript: "Self playing chinese chess board with ML"
        },
        { name: "Plugma" , href: "/projects/plugma",
            shortDescript: "An event platform to drive community growth"
        },
    ]
    const experience: NavBarDetails[] = [
        { name: "Resume", href: "/Sean%20Lai%20Resume.pdf", shortDescript: "Simple Quick Easy" },
        
        { name: "Jobs" , href: "/experience",
            shortDescript: "Everything I've done in the past"
        },
        { name: "Community", href: "/community",
            shortDescript: "Alittle bit of everything"
        },
    ]
    return (
        <NavigationMenu className="fixed top-0 justify-center items-center mt-2 z-30">
            <NavigationMenuList className=" items-center justify-center w-full flex gap-6 bg-charcoal text-beige text-xl px-6 py-3 rounded-xl border dark:border-white/[0.2] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <NavigationMenuItem className=" transition duration-300 ease-in-out rounded-md border-lg">
                <NavigationLink
                    href="/"
                >
                    <span className="block px-3 py-1 rounded-md hover:bg-charcoal-light hover:text-white text-beige text-3xl">
                    SL
                    </span>
                </NavigationLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/projects" passHref>
                        <span className={`${navigationMenuTriggerStyle()} inline-flex sm:hidden items-center justify-center`}>
                            <WebhookIcon className="w-7 h-7" />
                        </span>
                    </Link>
                    <NavigationMenuTrigger className="sm:inline-flex hidden">
                       <p className="">Projects</p> 
                        
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-charcoal-light/50 shadow-lg shadow-charcoal-darker rounded-md duration-300">
                    <ul className="gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] grid">
                        <li className="row-span-3">
                            
                                <NavigationLink
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-offwhite text-charcoal-light shadow-sm shadow-charcoal from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:text-black transition-all duration-400 ease-in-out hover:scale-[1.025]"
                                    href="/projects"
                                >
                                    <div className="items-center justify-center flex top-0">
                                        <WebhookIcon className="w-[100px] h-[100px] top-0 text-muted-foreground mb-2" />
                                    </div>
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                    Showcase
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                    A collection of projects
                                    </p>
                                </NavigationLink>
                        </li>
                        {
                            projects.map((project) => (
                                <ListItem
                                    key={project.name}
                                    title={project.name}
                                    className="p-6
                                     no-underline bg-charcoal
                                    hover:bg-charcoal-darker
                                    text-beige border border-[#eae4d350]  shadow-sm shadow-[#eae4d319]
                                    backdrop-blur-sm hover:text-white duration-300 ease-in-out transition-all"
                                    href={project.href}
                                >
                                    {project.shortDescript}
                                </ListItem>
                            ))
                        }
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    
                        <div className={`${navigationMenuTriggerStyle()} inline-flex sm:hidden items-center justify-center`}>
                            <Link href="/experience"className="sm:hidden" passHref>
                                <SquareTerminalIcon className="w-7 h-7" />
                            </Link>
                        </div>
                    
                    <NavigationMenuTrigger className="sm:inline-flex hidden">
                        
                        Experience
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-charcoal-light/50 shadow-lg shadow-charcoal-darker rounded-md duration-300">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            {/* <NavigationMenuLink asChild> */}
                            <NavigationLink
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-offwhite text-charcoal-light shadow-sm shadow-charcoal from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:text-black transition-all duration-400 ease-in-out hover:scale-[1.025]"
                                href="/experience"
                            >
                                <div className="items-center justify-center flex top-0">
                                    <SquareTerminalIcon className="w-[100px] h-[100px] top-0 text-muted-foreground mb-2" />
                                </div>
                                <div className="mb-2 mt-4 text-lg font-medium">
                                Journey
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                How I got here
                                </p>
                            </NavigationLink>
                            {/* </NavigationMenuLink> */}
                        </li>
                        {
                            experience.map((exp) => (
                                <ListItem
                                    key={exp.name}
                                    title={exp.name}
                                    className="bg-charcoal
                                    hover:bg-charcoal-darker 
                                    p-6 no-underline shadow-sm shadow-[#eae4d319] text-beige border border-[#eae4d350] backdrop-blur-sm hover:text-white duration-300 ease-in-out transition-all"
                                    href={exp.href}
                                >
                                    {exp.shortDescript}
                                </ListItem>
                            ))
                        }
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationLink href="/contact"  className={`${navigationMenuTriggerStyle()} sm:inline-flex hidden cursor-pointer`}>
                        Contact
                    </NavigationLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"