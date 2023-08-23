import './css/globals.css'

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
  label: 'Effortless student check-in made simple with real-time tracking and notifications'
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
