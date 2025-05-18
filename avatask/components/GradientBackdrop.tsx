"use client";
import React from 'react';

const GradientBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
  );
};

export default GradientBackdrop;