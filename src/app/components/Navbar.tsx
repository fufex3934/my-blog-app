import Link from "next/link";

export default function Navbar() {


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          My Blog
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/posts/create" className="hover:text-gray-400">
            Create Post
          </Link>

    
        </div>
      </div>
    </nav>
  );
}
