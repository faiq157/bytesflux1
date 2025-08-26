import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | BytesFlux',
  description: 'The page you are looking for could not be found. Return to BytesFlux home page.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
          404
        </div>
        
        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Go Home
          </Link>
          
          <Link 
            href="/contact"
            className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
        
        {/* Additional Help */}
        <div className="mt-12 text-gray-400">
          <p className="mb-2">Need help? Try these links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="hover:text-blue-400 transition-colors">
              Our Services
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              About Us
            </Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-blue-400 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 