'use client';
import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  projectName?: string;
  organizationName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  projectName = "Project Team Spirit", 
  organizationName = "Acme, Inc" 
}) => {
  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">{projectName}</h1>
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-black bg-white bg-opacity-20 px-3 py-1 rounded-lg">
          <span className="mr-2">{organizationName}</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <Image 
            src="/icons/1.png" 
            alt="User Profile" 
            width={40} 
            height={40} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
