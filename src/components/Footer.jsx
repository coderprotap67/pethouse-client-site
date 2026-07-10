import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#080E20] border-t border-[#3A506B]/20 py-10 mt-12 text-center text-sm text-gray-400">
      <div className="container mx-auto px-4 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-300 font-medium">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-cyan-400" />
            <span>support@pethouse.com</span>
          </div>
          <span className="hidden sm:inline text-[#3A506B]">|</span>
          <div className="flex items-center gap-2">
            <FaPhone className="text-cyan-400" />
            <span>+1 (555) 019-2834</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 text-xl">
          <a 
            href="https://github.com/coderprotap67" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-white transition-colors"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/protap-chakma-53185630a/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-cyan-400 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61591796121562" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-blue-400 transition-colors"
            title="Facebook"
          >
            <FaFacebook />
          </a>
          <a 
            href="https://instagram.com/prota_p67" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-pink-400 transition-colors"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="space-y-1 pt-4 border-t border-[#3A506B]/10">
          <p className="font-semibold text-gray-300">PetHouse Adoption Portal © 2026</p>
          <p className="max-w-md mx-auto text-gray-500 text-xs">
            Connecting loving homes with pets in need. Support, Care, and Secure adoption.
          </p>
        </div>

      </div>
    </footer>
  );
}