import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/quiz" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Take Quiz
          </Link>
          {/* Added missing closing tag for the div */}
        </div>
        {/* Added missing closing tag for the container div */}
        {/* Added missing closing tag for the nav element */}
      </div>
    </nav>
  )
}

export default Navbar
