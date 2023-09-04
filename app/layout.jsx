import './css/globals.css';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from './../lib/AntdRegistry';

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
  label: 'Effortless student check-in made simple with real-time tracking and notifications'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body className='min-h-screen flex flex-col'>
      <main className='flex-grow flex justify-center items-center pt-20'>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </main>
      <Footer />
    </body>
    </html>
  )
}
