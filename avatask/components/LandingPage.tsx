"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Avatask – Team To-Do List",
  description: "Organize tasks with avatars and priority color tags",
};

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${inter.className} min-h-screen flex flex-col items-center justify-center bg-gray-50`}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Large centered heading and tagline */}
        <h1 className="text-6xl md:text-4xl lg:text-8xl font-bold text-gray-800 mb-6">
          Team tasks,
          <br />
          visualized better.
        </h1>

        <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto">
          Organize tasks with avatars and priority color tags.
        </p>

        {/* Call to action button with Framer Motion */}
        <div className="mt-12 flex justify-center">
         <Link href="/main_page"> <motion.button
            className="border-2 border-black text-black hover:bg-black hover:text-white font-medium py-4 px-12 rounded-full text-xl flex items-center gap-2"
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
        </div>
      </div>
    </div>
  );
}
