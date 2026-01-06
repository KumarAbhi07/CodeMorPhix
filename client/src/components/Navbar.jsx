const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-b border-purple-500/30 px-6 py-4 shadow-2xl backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-950 px-3 py-2 rounded-lg">
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CM</span>
            </div>
          </div>
          <div>
            <span className="text-xl font-bold text-white">CodeMorphix</span>
            <p className="text-xs text-purple-400">AI Code Intelligence</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-300 hover:text-purple-400 transition relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#analyze" className="text-gray-300 hover:text-purple-400 transition relative group">
            Analyze
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#features" className="text-gray-300 hover:text-purple-400 transition relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#about" className="text-gray-300 hover:text-purple-400 transition relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        {/* CTA Button */}
        <button className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative px-6 py-2 bg-slate-950 rounded-lg font-semibold text-white">
            Get Started
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
