import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from './BottomNavigation';
import { Home, Camera, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const getPageIndex = (pathname: string) => {
    const routes = ['/timeline', '/shooter', '/profile'];
    return routes.indexOf(pathname);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main
        className="pb-16"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        custom={getPageIndex(location.pathname)}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <Outlet />
      </motion.main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <BottomNavigation
          value={location.pathname}
          onChange={(_, newValue) => navigate(newValue)}
        >
          <BottomNavigationAction
            label="Timeline"
            value="/timeline"
            icon={<Home size={24} />}
          />
          <BottomNavigationAction
            label="Shooter"
            value="/shooter"
            icon={<Camera size={24} />}
          />
          <BottomNavigationAction
            label="Profil"
            value="/profile"
            icon={<User size={24} />}
          />
        </BottomNavigation>
      </nav>
    </div>
  );
};

export default Layout;