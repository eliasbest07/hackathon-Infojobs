import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import AlwaysBaner from './components/AlwaysBanner';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InfoJobs Hackathon',
  description: 'by BTM Studio Elias Montilla',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<Head>
          <link rel="shortcut icon" href="/public/favicon.ico" />
         
</Head>
      <body className={inter.className}>{
      <>
    
      <AlwaysBaner/>
      {children}
      </>
      }</body>
    </html>
  )
}
