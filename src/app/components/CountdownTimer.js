'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NumberCard = ({ value, label }) => {
  const padded = String(value).padStart(2, '0');

  return (
    <motion.div 
      className="relative w-24 h-32"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          className="absolute inset-0"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="relative h-full">
            <div className="absolute inset-0 rounded-xl themed-container shadow-dynamic">
              <div className="h-full flex items-center justify-center">
                <span className="font-spooky text-4xl text-white">{padded}</span>
              </div>
              <div className="flip-shine"/>
            </div>

            {/* Center line with glow */}
           

            {/* Label */}
            <motion.div 
              className="absolute -bottom-8 left-0 right-0 text-center"
              animate={{ y: [0, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-elegant text-sm text-accent tracking-wider">
                {label}
              </span>
            </motion.div>

            {/* Animated emoji */}
            <motion.div
              className="absolute -top-8 -right-2 text-2xl"
              animate={{ 
                y: [-2, 2, -2],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              
              <motion.div
                className="absolute inset-0 blur-sm opacity-50"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-03-21T16:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 rounded-xl">
      <motion.h3 
        className="font-spooky text-yellow-200 text-4xl text-center mb-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
       🎃 Countdown 🎃
      </motion.h3>

      <div className="flex items-center justify-center gap-8">
        <NumberCard value={timeLeft.days} label="DAYS"  />
        <NumberCard value={timeLeft.hours} label="HOURS"  />
        <NumberCard value={timeLeft.minutes} label="MINUTES"  />
        <NumberCard value={timeLeft.seconds} label="SECONDS"  />
      </div>

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.span 
          className="font-body text-gray-200  inline-block"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Don&apos;t be late for this spooktacular date!
        </motion.span>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
