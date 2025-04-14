
import Navbar from '@/components/Navigation/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Share_Tech_Mono } from 'next/font/google';
import localFont from 'next/font/local'
import { AnimationProvider } from '@/components/animated/AnimContext';
import Loader from '@/components/animated/loader';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = localFont({
  src: [
    {
      path: '../public/fonts/static/JetBrainsMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/JetBrainsMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
})


const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-loader',
});

export const metadata = {
  title: 'Sean Lai Portfolio',
  description: 'Full Stack & AI Engineer Portfolio',
  icons: {
    icon: '/seanlai.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${shareTechMono.variable}`}>
      <body className="font-sans text-beige flex items-center justify-center w-screen overflow-x-hidden">
        <AnimationProvider>
          <Navbar />
          <Loader/>
          {children}
          <Toaster/>
          <Analytics/>
        </AnimationProvider>
      </body>
    </html>
  )
}
