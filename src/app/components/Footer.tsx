export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; 2025 My Blog. All Rights Reserved.</p>
        <div className="mt-2">
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-gray-300"
          >
            Privacy Policy
          </a>
          {" | "}
          <a
            href="/terms"
            className="text-gray-400 hover:text-gray-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
