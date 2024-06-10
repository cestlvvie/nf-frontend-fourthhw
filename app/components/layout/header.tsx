import React from 'react';
import FlowerIcon from '../flowericon';
import PlusIcon from '../plusicon';
import Link from 'next/link';

const Header: React.FC = () => {
    return(
        <header className="bg-[#F5E0D8] text-[#333] shadow-sm py-4 px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center" prefetch={false}>
          <FlowerIcon className="mr-2 h-6 w-6" />
          {`aizh's little corner <3`}
        </Link>
        <Link href="/create" className="rounded-full bg-[#F5E0D8] flex items-center gap-2 hover:bg-white" >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </header>
    );
};

export default Header;