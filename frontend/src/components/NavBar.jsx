// import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 items-center mt-4">
              <Link  to="/" className="text-green-700 text-xl font-bold">RecipeApp</Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Home
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Signup
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Login
              </Link>
              <Link to="/create-recipe" className="text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Create Recipe
              </Link>
              <Link to="/logout" className="text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Logout
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button type="button" className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-600" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
            Signup
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
            Login
          </Link>
          <Link to="/create-recipe" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
            Create Recipe
          </Link>
          <Link to="/logout" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
