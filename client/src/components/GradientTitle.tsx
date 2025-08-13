import React from 'react';

interface GradientTitleProps {
  className?: string;
  animated?: boolean;
}

const GradientTitle: React.FC<GradientTitleProps> = ({ 
  className = '', 
  animated = false 
}) => {
  const baseClasses = "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-bold transition-all duration-300 hover:from-blue-500 hover:via-purple-500 hover:to-blue-700";
  const animatedClasses = animated ? "animate-pulse" : "";
  
  return (
    <span className={`${className} cursor-pointer`}>
      <span className={`${baseClasses} ${animatedClasses}`}>
        vAIb
      </span>
    </span>
  );
};

export default GradientTitle; 