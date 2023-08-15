import './css/globals.css'
import { Button } from 'antd'

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        {children}
        <footer className='content'>
          <Button type='primary'>Test</Button>
        </footer>
      </body>
    </html>
  )
}
