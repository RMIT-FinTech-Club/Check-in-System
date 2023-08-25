import './css/globals.css';
import Footer from './components/Footer';
import StyledComponentsRegistry from '../lib/AntdRegistry';

export const metadata = {
  title: 'Checker',
  description: 'Streamlined Student Check-In Solution',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='m-0 p-0'>
        <main className='content'>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </main>
        <Footer />
      </body>
    </html>
  )
}
