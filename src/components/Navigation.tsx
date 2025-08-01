import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Jukeblocks</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-purple-200 transition-colors">
              Rearrange
            </a>
            <a href="#" className="hover:text-purple-200 transition-colors">
              Convert
            </a>
            
            {/* Theme Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="flex items-center space-x-1 hover:text-purple-200 transition-colors"
              >
                <span>Themes</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isThemeDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-100">Light</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-100">Dark</a>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-purple-200 transition-colors">
              Login
            </a>
            <a href="#" className="hover:text-purple-200 transition-colors">
              Register
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-400 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:text-purple-200 transition-colors">Rearrange</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Convert</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Light Theme</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Dark Theme</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Login</a>
              <a href="#" className="hover:text-purple-200 transition-colors">Register</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};