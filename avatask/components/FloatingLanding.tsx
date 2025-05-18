"use client";
import React from 'react';

interface FloatingLandingProps {
  leftSrc?: string;
  leftbottomSrc?: string;
  rightSrc?: string;
}

const FloatingLanding: React.FC<FloatingLandingProps> = ({
  leftSrc = '/img-left.png',
  leftbottomSrc = '/img-left-bottom.png',
  rightSrc = '/img-right.png',
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/*Top Left floating element */}
      <div
        className="absolute bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${leftSrc}')`,
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          left: 'clamp(1%, 1vw, 10%)',
          top: '40%',
          transform: 'translateY(-50%) scaleX(-1)' ,
          animation: 'floatLeft 6s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      
      {/* Bottom-left element */}
      {leftbottomSrc && (
        <div
          className="absolute bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('${leftbottomSrc}')`,
            width: 'clamp(100px, 15vw, 250px)',
            height: 'clamp(100px, 15vw, 250px)',
            left: '13%',
            top: '65%',
            transform: 'translate(-50%)',
            animation: 'floatleftbottom 5s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Right floating element */}
      <div
        className="absolute bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${rightSrc}')`,
          width: 'clamp(90px, 20vw, 250px)',
          height: 'clamp(90px, 20vw, 250px)',
          right: 'clamp(5%, 1vw, 10%)',
          top: '50%',
          transform: 'translateY(-50%)',
          animation: 'floatRight 6s ease-in-out infinite',
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