export default function Header() {
  return (
      <header className="header flex justify-between items-center bg-black p-4">
          <div>
              {/* Replace this with your actual logo */}
              <img src="/logo.svg" alt="Checker Logo" className="h-8" />
          </div>
          <div className="flex items-center">
              <a href="https://www.facebook.com/yourpage" className="mx-2">
                  {/* Replace this with the path to your actual Facebook SVG */}
                  <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://github.com/yourprofile" className="mx-2">
                  {/* Replace this with the path to your actual GitHub SVG */}
                  <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/yourprofile" className="mx-2">
                  {/* Replace this with the path to your actual Instagram SVG */}
                  <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
          </div>
      </header>
  );
}
