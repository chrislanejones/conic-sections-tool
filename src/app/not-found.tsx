import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="text-8xl mb-4">📐</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for doesn't exist. Let's get you back to
          exploring conic sections!
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus-visible-ring"
        >
          Return to Conic Sections
        </Link>
      </div>
    </div>
  );
}
