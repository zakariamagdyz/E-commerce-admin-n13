import { Gochi_Hand, Inter } from 'next/font/google'

export const InterFont = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const GochiHandFont = Gochi_Hand({
  subsets: ['latin'],
  variable: '--font-gochi-hand',
  weight: '400',
})
