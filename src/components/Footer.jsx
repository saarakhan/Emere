const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 mb-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-sm">Made by Saara Khan</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <a href="https://github.com/saarakhan" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">
            GitHub
          </a>
          <a href="https://linkedin.com/in/saarakhan001" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
