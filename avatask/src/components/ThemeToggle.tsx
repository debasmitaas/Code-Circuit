'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-indigo-900' 
          : 'bg-indigo-300'
      }`}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Sun icon */}
      <Sun 
        size={18} 
        className={`absolute left-1.5 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-40' : 'opacity-100 text-yellow-500'
        }`} 
      />
      
      {/* Moon icon */}
      <Moon 
        size={18} 
        className={`absolute right-1.5 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100 text-blue-200' : 'opacity-40'
        }`} 
      />
      
      {/* Toggle handle */}
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-md"
        animate={{
          x: theme === 'dark' ? 32 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
