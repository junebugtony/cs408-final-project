"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  let menuIcon;
  if (isMenuOpen) {
    menuIcon = <XMarkIcon className="h-8 w-8 text-black" />;
  } else {
    menuIcon = <Bars3Icon className="h-8 w-8 text-black" />;
  }

  let menuClass;
  if (isMenuOpen) {
    menuClass = 'flex';
  } else {
    menuClass = 'hidden';
  }

  return (
    <header className="flex items-center justify-between sticky top-0 z-50 p-4 bg-white shadow-md border-b border-gray-300">

      {/* Mobile menu toggle button */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {menuIcon}
        </button>
      </div>

      {/* Navigation links */}
      <nav
        className={`${menuClass} flex-col lg:flex-row lg:flex space-y-4 lg:space-y-0 lg:space-x-6 ml-auto absolute lg:static top-16 right-4 lg:top-auto
         bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none rounded-lg lg:rounded-none`}
      >
        <Link href="/" onClick={handleLinkClick}>
          <button className="bg-transparent text-black text-lg font-bold hover:text-green-500 hover:scale-110 duration-300 px-4 py-2">Your Library</button>
        </Link>
        <Link href="/addSongs" onClick={handleLinkClick}>
          <button className="bg-transparent text-black text-lg font-bold hover:text-green-500 hover:scale-110 duration-300 px-4 py-2">Add Songs</button>
        </Link>
      </nav>
    </header>
  );
}