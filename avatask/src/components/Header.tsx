'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  projectName?: string;

}

interface TeamOption {
  id: string;
  name: string;
}



const Header: React.FC<HeaderProps> = ({ 
  projectName = "Team 1"
}) => {
  const { theme } = useTheme();

  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(projectName);
  // Sample team options
  const teamOptions: TeamOption[] = [
    { id: 'team1', name: 'Team 1' },
    { id: 'team2', name: 'Team 2' },
    { id: 'team3', name: 'Team 3' },
    { id: 'team4', name: 'Team 4' }
  ];
  

  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      
      const teamDropdownRef = document.getElementById('team-dropdown');
      const teamButtonRef = document.getElementById('team-button');
      
      if (teamDropdownRef && teamButtonRef && !teamDropdownRef.contains(target) && !teamButtonRef.contains(target)) {
        setIsTeamDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      className={`p-2 mx-4 my-2 flex justify-between items-center rounded-2xl shadow-lg transition-all duration-500 ${theme === 'dark' ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-20'} backdrop-filter backdrop-blur-md`} 
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="px-4 py-2 relative">
        <div 
          id="team-button"
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsTeamDropdownOpen(!isTeamDropdownOpen);

          }}
        >
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-300`}>
            {selectedTeam}
          </h1>
          <ChevronDown 
            size={20} 
            className={`ml-2 transition-transform duration-300 ${isTeamDropdownOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
          />
        </div>
        
        {/* Team Dropdown */}
        <AnimatePresence>
          {isTeamDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              id="team-dropdown"
              className={`absolute top-full left-0 mt-2 w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden z-[100]`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Switch Workspace</h3>
                {teamOptions.map(team => (
                  <div 
                    key={team.id}
                    className={`p-2 rounded-md cursor-pointer ${selectedTeam === team.name ? (theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100') : ''} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                      setSelectedTeam(team.name);
                      setIsTeamDropdownOpen(false);
                    }}
                  >
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{team.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center space-x-4 px-4 py-2">
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        <div 
          className={`w-10 h-10 rounded-full overflow-hidden shadow-md border-2 transition-colors duration-500 ${theme === 'dark' ? 'border-gray-700' : 'border-white'}`}
        >
          <Image 
            src="/icons/1.png" 
            alt="User Profile" 
            width={40} 
            height={40} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
