
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
        cosmos: {
          DEFAULT: '#8A2BE2',
          light: '#B87BFF',
          dark: '#5A1999'
        },
        ethereum: {
          DEFAULT: '#627EEA',
          light: '#95B1FF',
          dark: '#3F51B5'
        },
        bnb: {
          DEFAULT: '#F3BA2F',
          light: '#FFD875',
          dark: '#C99900'
        },
        crossflip: {
          purple: '#9B30FF',
          blue: '#38B6FF',
          green: '#00E8A2',
          pink: '#FF5EF7',
          yellow: '#FFD166'
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(156, 39, 176, 0.5), 0 0 10px rgba(156, 39, 176, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(156, 39, 176, 0.8), 0 0 20px rgba(156, 39, 176, 0.5)' 
          }
        },
        'rotate-orbit': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'pulse-fade': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'rotate-orbit': 'rotate-orbit 20s linear infinite',
        'pulse-fade': 'pulse-fade 3s ease-in-out infinite'
			},
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0F0B2F 0%, #1A1B3F 25%, #20153D 50%, #241045 75%, #281254 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(33, 30, 58, 0.8) 0%, rgba(45, 38, 82, 0.8) 100%)',
        'button-gradient': 'linear-gradient(90deg, #9B30FF 0%, #38B6FF 100%)',
        'glow-green': 'radial-gradient(circle, rgba(0, 232, 162, 0.2) 0%, rgba(0, 232, 162, 0) 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(155, 48, 255, 0.2) 0%, rgba(155, 48, 255, 0) 70%)',
        'glow-blue': 'radial-gradient(circle, rgba(56, 182, 255, 0.2) 0%, rgba(56, 182, 255, 0) 70%)',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
