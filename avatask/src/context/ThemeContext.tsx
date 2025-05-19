'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always initialize with light theme
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  
  // Force light mode on first load
  useEffect(() => {
    // Set to light mode and save to localStorage
    setTheme('light');
    localStorage.setItem('theme', 'light');
    
    // Also remove any dark mode classes from the document
    document.documentElement.classList.remove('dark');
    
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    console.log('Toggling theme from:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('New theme:', newTheme);
      return newTheme;
    });
  }, [theme]);

  // Only render children when mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
