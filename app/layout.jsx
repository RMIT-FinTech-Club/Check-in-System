import './css/globals.css'
import Footer from '../components/Footer.jsx'

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='m-0'>
        <main className='content'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
