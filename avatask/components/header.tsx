// components/Header.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Victor_Mono } from "next/font/google";
import localFont from "next/font/local";

const victor = Victor_Mono({ subsets: ["latin"] });
const cool = localFont({ src:"../fonts/coolvetica.woff", });

export default function Header() {
  return (
    <>
      {/* Left Pill - AVATASK */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          fixed top-4 left-0
          z-50
          mx-4
          px-4 py-2
          flex items-center
        "
      >
        <Link href="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`text-3xl font-bold text-black tracking-wide ${cool.className}`}
          >
            Avatask
          </motion.div>
        </Link>
      </motion.nav>

      {/* Right Pill - GitHub */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          fixed top-4 right-0
          z-50
          mx-4
          bg-gray/10 backdrop-blur-md
          border border-purple/20
          rounded-full
          shadow-lg
          px-4 py-2
          flex items-center
        "
      >
        <div className="flex items-center">
          <Link 
            href="https://github.com " 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-black/80 hover:text-blue ${victor.className} transition-colors duration-200`}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`text-sm ${victor.className} font-medium`}
            >
              GitHub Repo
            </motion.span>
          </Link>
        </div>
      </motion.nav>
    </>
  )
}