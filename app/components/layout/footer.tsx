import React from 'react';
import Link from 'next/link';


const Footer: React.FC = () => {
  
  return (
    <footer className="bg-[#F5E0D8] text-[#333] py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between">
      <div className="text-sm">&copy; 2024. All rights reserved.</div>
      <nav className="flex items-center gap-6">
        <Link href="/contact" className="hover:underline" prefetch={false}>
          contact me ;3
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;