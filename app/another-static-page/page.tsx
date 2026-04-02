import Image from "next/image";
import { getAssetPath } from '@/lib/utils';

export default function AnotherStaticPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src={getAssetPath('/next.svg')}
            alt="Next.js logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Static Pages</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="/" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors">Home</a>
          <a href="/landing-page" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors">Landing Page</a>
          <a href="#" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors">Features</a>
          <a href="#" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors">Contact</a>
        </nav>
        <button className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <span className="px-3 py-1 bg-zinc-200 text-zinc-800 rounded-full text-sm font-medium mb-4 dark:bg-zinc-700 dark:text-zinc-200">
          Another Static Page
        </span>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight text-zinc-900 dark:text-zinc-50 mb-6">
          This is <span className="text-green-600">Another</span> Static Page
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10">
          A second example of a beautiful static page built with Next.js. This page demonstrates how you can create multiple static pages in your application.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            Learn More
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Feature One</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                This is a feature description that explains what this feature does and why it's important for users.
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Feature Two</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Another feature description that highlights the benefits and value this feature brings to users.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">About This Page</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              This is a second static page example that demonstrates how to create multiple pages in a Next.js application. 
              You can add as many static pages as you need in the /app/static-pages directory.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Each static page can have its own unique design and content while maintaining consistent styling through your global CSS and components.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image
              className="dark:invert"
              src={getAssetPath('/next.svg')}
              alt="Next.js logo"
              width={24}
              height={24}
            />
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Static Pages</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Privacy</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Terms</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          © {new Date().getFullYear()} Static Pages. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
