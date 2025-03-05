import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

interface BottomNavigationProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLDivElement>, value: string) => void;
  children: React.ReactNode;
}

interface BottomNavigationActionProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  value,
  onChange,
  children
}) => {
  return (
    <div className="flex justify-around items-center h-16 bg-white">
      {children}
    </div>
  );
};

export const BottomNavigationAction: React.FC<BottomNavigationActionProps> = ({
  label,
  value,
  icon
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = location.pathname === value;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(value);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center w-full h-full cursor-pointer ${
        isSelected ? 'text-green-500' : 'text-gray-500'
      }`}
      onClick={handleClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      {isSelected && (
        <motion.div
          className="absolute bottom-0 w-full h-0.5 bg-green-500"
          layoutId="bottomNav"
        />
      )}
    </motion.div>
  );
};