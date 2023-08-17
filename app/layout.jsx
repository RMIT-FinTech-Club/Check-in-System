import './css/globals.css'

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
  label: 'Effortless student check-in made simple with real-time tracking and notifications'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='content'>
        {children}
        <footer className='flex justify-between'>
          {/* Copyright and Club's name */}
          <div className='flex justify-start w-3/4'>
            <span className='flex items-center mx-2'><img src='./../copyright.svg' alt='copyright' /></span>
            <h3 className='font-normal text-base m-0'>2023 Technology Department RMIT FinTech Club. All rights reserved</h3>
          </div>
          {/* Social media */}
          <div className='w-1/4 flex justify-end'>
            <span className='flex items-center mx-2'><img src="./../facebook.svg" alt='facebook'/></span>
            <span className='flex items-center mx-2'><img src="./../tiktok.svg" alt='tiktok'/></span>
            <span className='flex items-center mx-2'><img src="./../instagram.svg" alt='instagram'/></span>
          </div>
        </footer>
      </body>
    </html>
  )
}
