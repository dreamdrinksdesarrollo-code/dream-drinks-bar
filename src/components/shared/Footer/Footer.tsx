'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t border-gray-800">

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} DreamDrinks. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                Desarrollado por{' '}
                <Link 
                  href="https://github.com/juanpersoglia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  Juan Salvador Persoglia
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
