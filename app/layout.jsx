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
        <footer className='flex justify-around border border-solid border-gray-300'>
          {/* Copyright and Club's name */}
          <div className='flex justify-start w-2/3 mx-10'>
            <span className='flex items-center mx-2'><img src='./../copyright.svg' alt='copyright' /></span>
            <h3 className='font-normal text-base my-2'>2023 Technology Department RMIT FinTech Club. All rights reserved</h3>
          </div>
          {/* Social media */}
          <div className='flex justify-center w-1/3 mx-5'>
            <span className='flex items-center mx-4'><img src="./../facebook.svg" alt='facebook'/></span>
            <span className='flex items-center mx-4'><img src="./../tiktok.svg" alt='tiktok'/></span>
            <span className='flex items-center mx-4'><img src="./../instagram.svg" alt='instagram'/></span>
          </div>
        </footer>
      </body>
    </html>
  )
}
