'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsTransitioning(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleThemeChange}
        className={`fixed top-4 right-4 p-3 rounded-full z-[60] hover:rotate-[360deg] transition-transform duration-700 
          ${theme === 'dark' 
            ? 'bg-purple-900/90 hover:bg-purple-800/90 shadow-lg shadow-purple-900/50' 
            : 'bg-red-900/90 hover:bg-red-800/90 shadow-lg shadow-red-900/50'}`}
        aria-label={theme === 'dark' ? 'Switch to Blood Moon' : 'Switch to Dark Night'}
        title={theme === 'dark' ? 'Blood Moon' : 'Dark Night'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="relative"
          >
            {theme === 'dark' ? (
              <motion.div
                className="text-2xl relative"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                🌕
                <motion.span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-xs"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                className="text-2xl"
                animate={{ 
                  y: [-2, 2, -2],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🦇
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Theme indicator ring */}
        <div className={`absolute -inset-1 rounded-full border-2 border-current opacity-20 ${
          theme === 'dark' ? 'border-purple-400' : 'border-red-400'
        }`} />
        
        {/* Theme indicator dot */}
        <motion.div 
          className={`absolute w-2 h-2 rounded-full ${
            theme === 'dark' ? 'bg-purple-400' : 'bg-red-400'
          }`}
          style={{ top: '-8px', left: '50%', transform: 'translateX(-50%)' }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Theme transition */}
      {isTransitioning && (
        <motion.div
          className={`fixed inset-0 z-50 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-purple-900/50 to-black/50'
              : 'bg-gradient-to-b from-red-900/50 to-black/50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
};

export default ThemeToggle;
