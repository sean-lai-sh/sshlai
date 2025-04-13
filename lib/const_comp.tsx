// for all components

import React from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import { Link2Icon } from "lucide-react"

export const HofHackCommCard: React.FC = () => {
    return (<>
        <Link href={'https://hof-hacks.devpost.com'} className="flex flex-row items-center" target="_blank" rel="noreferrer">
            <h1 className='text-4xl font-serif leading-relaxed hover:text-blue-800 duration-300 transition-colors mr-5'>HOF Hacks</h1>
            <Link2Icon/>
        </Link>
        <h2 className='text-2xl italic'>Building Tomorrow</h2>
        <p>{"To be honest, this was pulled off in under a month. From a warm intro to Tahseen and HOF thanks to Baylor at ZFelllows, it was non-stop fun. While there were many late night calling  and meetings, it was only possible by the graceful words that came out when negotiating the terms,"} 
        <br/>
        <br/>
            | <span className='italic font-medium'>{`"We'll help with intros and the venue, you do the rest". - Tahseen`}</span> 
        <br/>
        <br/>
      {` Those very warm introductions reinforced why I love the builder community. What started as persuading Vercel head of startups to give NYU builders a shot, resulted in expanding reach to include V1 @ UMich and cracked builders from Penn, Columbia, Cornell and more. It's allowed me to grow in so many ways, and appreciate for all the people who I can trust, call, and hope to build on in the coming years.`}
       <br/>
       Finally, I also learned one extra lesson. <strong>If someone drinks from Saratoga water daily, they know some people or made it</strong>, usually its both.
        </p>
        <div className='w-full'>
            <AspectRatio ratio={16 / 9} className="w-full h-full">
                <Image
                src={"/hoffice.jpg"}
                alt={"Back Image"}
                fill
                className='object-cover  rounded-2xl'
                />
            </AspectRatio>
            <p className=" italic text-offwhite">A chill sofa area where {`you'll`} find their collection of Saratoga Water</p>
        </div>
        </>
    )
}

export const SW2025Card: React.FC = () => {
    return (
        <>
        <Link href={'https://nyustartupweek.org'} className="flex flex-row items-center" target="_blank" rel="noreferrer">
            <h1 className='text-4xl font-serif leading-relaxed hover:text-blue-800 text-offwhite duration-300 transition-colors  mr-5'>Startup Week 2025</h1>
            <Link2Icon/>
        </Link>
        <h2 className='text-2xl italic'>A week to grow student founders @ NYU</h2>
        <p>
            Startup Week 2024 was my entry into the mystical worlds of startups. 2025 was the year I got to co-lead it. I had a vision, to bring it to new heights, to bring together a hungry team wanting to prove we could do it, and most of all to bring together the community. From our new events to our classic banquet, we delivered the best its been in years past. It has been a bitter sweet moment knowing that I may not lead it again, but I am comforted that <Link href={"https://www.linkedin.com/in/michashen/"} target="_blank" rel="noreferrer" className="underline">Michael</Link>, <Link href={"https://www.linkedin.com/in/parul-veda/"} className="underline" target="_blank" rel="noreferrer">Parul</Link> and I have trained <Link href={"https://www.linkedin.com/in/grace-gao-96a15828b/"} className="underline">Grace</Link> and <Link href={"https://www.linkedin.com/in/taijung-wu/"} className="underline" target="_blank" rel="noreferrer">Nicole</Link> to lead it.
        
       </p><br/> <p>
           {` Even amidst the long nights, stressful moments, forcing myself on the A train to manage the venues, I had alot of fun with my team. From the team Thai massaging ribeye steaks as we barbequed in the frigid winter, pool competitions and the occassional nice meal was a great way to bond. It's hard to now detach Startup Week from essentially what defined my freshman + sophomore college life and fun. Hopefully I may get one more run of this rollercoaster ride, but we shall see if God permits.`}
        <br/>
        </p>
        <div className='w-full'>
            <AspectRatio ratio={16 / 9} className="w-full h-full">
                <Image
                src={"/sw25teampic.jpg"}
                alt={"Back Image"}
                fill
                className='object-cover  rounded-2xl'
                />
            </AspectRatio>
            <p className=" italic text-offwhite">Missing the vibe master, Dorien Zhang</p>
        </div>
        </>
    )
}

export const SWBuildathon: React.FC = () => {
    return (
        <>
        <Link href={'https://buildathon-sw.devpost.com'} className="flex flex-row items-center" target="_blank" rel="noreferrer">
            <h1 className='text-4xl font-serif leading-relaxed hover:text-blue-800 text-offwhite duration-300 transition-colors mr-5'>Buildathon by Startup Week </h1>
            <Link2Icon/>
        </Link>
        <h2 className='text-2xl italic'>36 Hrs. Build, Create, and Get Hired</h2>
        <p>
           It started as skimming through web archives and seeing the elusive hackathon that once existed for Startup Week prior to 2019. This mere mention left an impression, as it grew and captivated me for why we needed it now more than ever. I mainly thought of it as a way to showcase hungry engineers to VC backed startups, but it evolved into a way to united the general community. Open with no application, it was just pure fun with great sponsors from Adobe and Anthropic alongside our startups Soar and Capybara.
       </p>
       <br/>
        <p>
           {`When we started in November, we knew we had 4 months to lock in. We looked to Treehacks and CalHacks as a model, learning how to do things as first timers. We reactivated long lost relations, established new ones with Anthropic under Drew Bent, and integrated with the startup ecosystem with Verci's gracious lending of their flatiron venue. I wont lie and say I did this myself. It was a team effort to turn a dream into reality, and I am immensly grateful for my team at Tech@NYU to help me realize this.`}
        <br/>
        </p>
        <div className='w-full'>
            <AspectRatio ratio={16 / 9} className="w-full h-full">
                <Image
                src={"/buildathonpic.jpg"}
                alt={"Back Image"}
                fill
                className='object-cover  rounded-2xl'
                />
            </AspectRatio>
            <p className=" italic text-offwhite">Winners, Finalists of Buildathon 2025</p>
        </div>
        </>
    )
}

export const MnM: React.FC = () => {
    return (
        <>
        <Link href={'https://buildathon-sw.devpost.com'} className="flex flex-row items-center" target="_blank" rel="noreferrer">
            <h1 className='text-4xl font-serif leading-relaxed hover:text-blue-800 text-offwhite duration-300 transition-colors mr-5'>Mentor & Meet</h1>
            <Link2Icon/>
        </Link>
        <h2 className='text-2xl italic'>Meet Startup Professionals</h2>
        <p className="whitespace-pre-line">
           A partnership with Supermomos, a growing community based startup in NYC. Just a simple event bringing together founders, professionals in Series B to students. It became my training ground to host bigger events, learning how to handle all the adminsitrative tasks that my previous leads Tanuj and Indeera shouldered among themselves. I still appreciate the event, for giving us a bigger network to tap into aside from cold outreach and alumni, one where we seem ever more connected to the startup ecosystem of NYC.
        </p>
        <br/>
        <p className=" whitespace-pre">
  {`      As a moderator, hearing how these professionals approached the attitudes of working in various startups alongside the importance of culture and a go-getter attitude, I couldn't ask for a better set of professionals who took time out of their busy schedules to provide valuable insights and mentoring to students. They also showed the important power of placements, helping put our students in front of the right people. This event largely influenced by late desire to host Buildathon, as it showed we needed a way to now show our engineering talent to startups.`}
        </p>
        <div className='w-full'>
            <AspectRatio ratio={16 / 9} className="w-full h-full">
                <Image
                src={"/mnmteam.png"}
                alt={"Back Image"}
                fill
                className='object-cover  rounded-2xl'
                />
            </AspectRatio>
            <p className=" italic text-offwhite">The wonderful speakers + michael & I</p>
        </div>
        </>
    )
}