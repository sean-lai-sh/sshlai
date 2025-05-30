// tailwind.config.ts

import type { Config } from 'tailwindcss'
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  safelist: ['bg-vantablack'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			charcoal: {
  				DEFAULT: '#1a1a1a',
  				light: '#2b2b2b',
  				darker: '#0d0d0d'
  			},
  			beige: {
  				DEFAULT: '#f3f0e8',
				alt: '#f4f1eb',
  			},
			vantablack:' #000000',
  			white: '#ffffff',
  			offwhite: '#f5f5f5',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		backgroundImage: {
		'charcoal-gradient': 'linear-gradient(215deg, #0d0d0d, #0d0d0d, #f3f0e8, #0d0d0d)',
		},
		backgroundSize: {
		'400': '400% 400%',
		},
	
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			mono: [
  				'JetBrains Mono',
  				'ui-monospace'
  			],
			loader: ['var(--font-loader)', 'monospace'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		animation: {
			marquee: 'marquee 60s linear infinite',
			'gradient-shift': 'gradient-shift 7s cubic-bezier(0.76, 0, 0.24, 1) infinite',
		},
		keyframes: {
		marquee: {
			'0%': { transform: 'translateX(0%)' },
			'100%': { transform: 'translateX(-100%)' },
		},
		'gradient-shift': {
			'0%': { backgroundPosition: '60% 50%' },
			'50%': { backgroundPosition: '80% 50%' },
			'100%': { backgroundPosition: '60% 50%' },
		},
		},
  },
  plugins: [tailwindcssAnimate]
},
  
}
export default config
