import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../app/globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'PetHouse',
  description: 'Adopt pets near you securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0B132B] text-gray-100 flex flex-col min-h-screen antialiased">
        <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}