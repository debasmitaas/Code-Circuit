"use client";
import React, { useState, useEffect } from 'react';

interface FloatingLandingProps {
  leftSrc?: string;
  leftbottomSrc?: string;
  rightSrc?: string;
  rightbottomSrc?:string;
}

const FloatingLanding: React.FC<FloatingLandingProps> = ({
  leftSrc = '/img-left.png',
  leftbottomSrc = '/img-left-bottom.png',
  rightSrc = '/img-right.png',
  rightbottomSrc = '/img-right-bottom.png',

}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger slide-in animations on component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Top Left floating element - slides in from left */}
      <div
        className={`absolute bg-contain bg-no-repeat bg-center transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
        }`}
        style={{
          backgroundImage: `url('${leftSrc}')`,
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          left: 'clamp(1%, 1vw, 10%)',
          top: '40%',
          transform: `translateY(-50%) scaleX(-1) ${isLoaded ? 'translateX(0)' : 'translateX(-100%)'}`,
          animationName: isLoaded ? 'floatLeft' : 'none',
          animationDuration: isLoaded ? '6s' : 'auto',
          animationTimingFunction: isLoaded ? 'ease-in-out' : 'auto',
          animationIterationCount: isLoaded ? 'infinite' : 'auto',
          animationDelay: isLoaded ? '1s' : 'auto',
        }}
        aria-hidden="true"
      />
      
      {/* Bottom-left element - slides in from left with delay */}
      {leftbottomSrc && (
        <div
          className={`absolute bg-contain bg-no-repeat bg-center transition-all duration-1200 delay-300 ease-out ${
            isLoaded 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-0'
          }`}
          style={{
            backgroundImage: `url('${leftbottomSrc}')`,
            width: 'clamp(100px, 15vw, 250px)',
            height: 'clamp(100px, 15vw, 250px)',
            left: '13%',
            top: '65%',
            transform: `translate(-50%) ${isLoaded ? 'translateX(0)' : 'translateX(-100%)'}`,
            animationName: isLoaded ? 'floatleftbottom' : 'none',
            animationDuration: isLoaded ? '5s' : 'auto',
            animationTimingFunction: isLoaded ? 'ease-in-out' : 'auto',
            animationIterationCount: isLoaded ? 'infinite' : 'auto',
            animationDelay: isLoaded ? '1.3s' : 'auto',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* top Right floating element */}
      <div
        className={`absolute bg-contain bg-no-repeat bg-center transition-all duration-1100 delay-200 ease-out ${
          isLoaded 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        }`}
        style={{
          backgroundImage: `url('${rightSrc}')`,
          width: 'clamp(80px, 20vw, 250px)',
          height: 'clamp(80px, 20vw, 250px)',
          right: 'clamp(5%, 0.1vw, 10%)',
          top: '30%',
          transform: `translateY(-50%) ${isLoaded ? 'translateX(0)' : 'translateX(100%)'}`,
          animationName: isLoaded ? 'floatRight' : 'none',
          animationDuration: isLoaded ? '6s' : 'auto',
          animationTimingFunction: isLoaded ? 'ease-in-out' : 'auto',
          animationIterationCount: isLoaded ? 'infinite' : 'auto',
          animationDelay: isLoaded ? '1.2s' : 'auto',
        }}
        aria-hidden="true"
      />

      {/* bottom-right element */}
      <div
        className={`absolute bg-contain bg-no-repeat bg-center transition-all duration-1100 delay-200 ease-out ${
          isLoaded 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        }`}
        style={{
          backgroundImage: `url('${rightbottomSrc}')`,
          width: 'clamp(90px, 10vw, 250px)',
          height: 'clamp(90px, 10vw, 250px)',
          right: 'clamp(5%, 0.1vw, 10%)',
          top: '80%',
          transform: `translateY(-50%) ${isLoaded ? 'translateX(0)' : 'translateX(100%)'}`,
          animationName: isLoaded ? 'floatRightbottom' : 'none',
          animationDuration: isLoaded ? '6s' : 'auto',
          animationTimingFunction: isLoaded ? 'ease-in-out' : 'auto',
          animationIterationCount: isLoaded ? 'infinite' : 'auto',
          animationDelay: isLoaded ? '1.2s' : 'auto',
        }}
        aria-hidden="true"
      />
      
      {/* Add keyframes animation directly in the component for better portability */}
      <style jsx>{`
        @keyframes floatLeft {
          0% { transform: translateY(-50%) translateY(0) rotate(0) scaleX(-1); }
          50% { transform: translateY(-50%) translateY(-15px) rotate(5deg) scaleX(-1); }
          100% { transform: translateY(-50%) translateY(0) rotate(0) scaleX(-1); }
        }

        @keyframes floatRight {
          0% { transform: translateY(-50%) translateY(0) rotate(0); }
          50% { transform: translateY(-50%) translateY(-15px) rotate(-5deg); }
          100% { transform: translateY(-50%) translateY(0) rotate(0); }
        }
        @keyframes floatRightbottom {
          0% { transform: translateY(-50%) translateY(0) rotate(0); }
          50% { transform: translateY(-50%) translateY(-25px) rotate(8deg); }
          100% { transform: translateY(-50%) translateY(0) rotate(0); }
        }

        @keyframes floatleftbottom {
          0% { transform: translate(-50%) translateY(0); }
          50% { transform: translate(-50%) translateY(-20px); }
          100% { transform: translate(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FloatingLanding;