import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-12 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-teal-600" />
            <span>support@pethouse.com</span>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <FaPhone className="text-teal-600" />
            <span>+1 (555) 019-2834</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 text-xl">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-900 transition-colors"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-700 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Facebook"
          >
            <FaFacebook />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-pink-600 transition-colors"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="space-y-1 pt-4 border-t border-gray-50">
          <p className="font-semibold text-gray-700">PetHouse Adoption Portal © 2026</p>
          <p className="max-w-md mx-auto text-gray-400 text-xs">
            Connecting loving homes with pets in need. Support, Care, and Secure adoption.
          </p>
        </div>

      </div>
    </footer>
  );
}