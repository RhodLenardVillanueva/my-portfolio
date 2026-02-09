import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 500 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            500
          </h1>
          <p className="text-2xl font-semibold text-white mb-2">Server Error</p>
          <p className="text-gray-400">
            Something went wrong on our end. We're working to fix it.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
            <svg
              className="w-32 h-32 relative z-10 text-red-500/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-600/30"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
