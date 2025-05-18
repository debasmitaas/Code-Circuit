"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Inter } from "next/font/google";
import { Victor_Mono } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import FloatingLanding from '../components/FloatingLanding';
import GradientBackdrop from '../components/GradientBackdrop';
import Header from "../components/header";
import localFont from "next/font/local";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });
//Victor
const victor =Victor_Mono({subsets: ["latin"]});

//Mona-Sans Font
const Monasans = localFont({src:"../fonts/MonaSans-Bold.woff",
  
});


export const metadata = {
  title: "Avatask – Team To-Do List",
  description: "Organize tasks with avatars and priority color tags",
};

// Typewriter component
const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0,
  onComplete 
}: { 
  text: string; 
  speed?: number; 
  delay?: number;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else if (onComplete && currentIndex === text.length) {
        onComplete();
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, delay, onComplete]);

  return <span>{displayText}</span>;
};

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  return (
    <>
      <GradientBackdrop />
      <div
        className={`${inter.className} min-h-screen flex flex-col items-center justify-center relative overflow-hidden`}
      >
       <Header/>
        {/* Position FloatingLanding first so it appears behind */}
        <FloatingLanding />
       
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Large centered heading with typewriter effect */}
          <h1 className={`text-6xl md:text-4xl lg:text-8xl ${Monasans.className} text-gray-800 mb-6 min-h-[200px] flex flex-col items-center justify-center`}>
            <div>
              <TypewriterText 
                text="Team tasks," 
                speed={80}
                delay={500}
                onComplete={() => setShowSecondLine(true)}
              />
            </div>
            {showSecondLine && (
              <div>
                <TypewriterText 
                  text="visualized better." 
                  speed={80}
                  delay={200}
                  onComplete={() => setShowSubtitle(true)}
                />
              </div>
            )}
          </h1>
          
          {/* Subtitle with fade-in animation */}
          <motion.p 
            className={`text-2xl md:text-3xl ${victor.className} text-gray-600 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showSubtitle ? 1 : 0, 
              y: showSubtitle ? 0 : 20 
            }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setShowButton(true)}
          >
            Organize tasks with avatars and priority color tags.
          </motion.p>
          
          {/* Call to action button with slide-up animation */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: showButton ? 1 : 0, 
              y: showButton ? 0 : 30 
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/todo">
              <motion.button
                className="border-2 border-black text-black font-medium py-4 px-12 rounded-full text-xl flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{
                  backgroundColor: "#000",
                  color: "#fff",
                  transition: { duration: 0.3 },
                }}
              >
                Try it out
                <motion.div
                  animate={{ rotate: isHovered ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowUpRight size={25} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}