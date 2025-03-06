'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const generateJaggedPath = (start, end, segments = 10) => {
  const path = [`M ${start.x} ${start.y}`];
  let currentX = start.x;
  let currentY = start.y;
  
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const segmentLength = Math.sqrt(dx * dx + dy * dy) / segments;
  const baseAngle = Math.atan2(dy, dx);
  
  for (let i = 1; i < segments; i++) {
    const progress = i / segments;
    const baseX = start.x + dx * progress;
    const baseY = start.y + dy * progress;
    
    // More extreme jagged effect
    const offset = segmentLength * (Math.random() - 0.5) * 1.5;
    const angleVariation = (Math.random() - 0.5) * Math.PI * 0.7;
    const angle = baseAngle + Math.PI/2 + angleVariation;
    
    const offsetX = Math.cos(angle) * offset;
    const offsetY = Math.sin(angle) * offset;
    
    currentX = baseX + offsetX;
    currentY = baseY + offsetY;
    
    // Add more zigzags
    if (Math.random() < 0.4) {
      // Double zigzag effect
      const zigX1 = currentX + (Math.random() - 0.5) * segmentLength;
      const zigY1 = currentY + (Math.random() - 0.5) * segmentLength;
      const zigX2 = currentX + (Math.random() - 0.5) * segmentLength * 0.5;
      const zigY2 = currentY + (Math.random() - 0.5) * segmentLength * 0.5;
      path.push(`L ${zigX1} ${zigY1}`);
      path.push(`L ${zigX2} ${zigY2}`);
      path.push(`L ${currentX} ${currentY}`);
    } else {
      // Enhanced bezier curve
      const controlX1 = currentX + (Math.random() - 0.5) * segmentLength;
      const controlY1 = currentY + (Math.random() - 0.5) * segmentLength;
      path.push(`Q ${controlX1} ${controlY1} ${currentX} ${currentY}`);
    }
  }
  
  path.push(`L ${end.x} ${end.y}`);
  return path.join(' ');
};

const generateBranch = (start, mainAngle, length, isSecondary = false) => {
  const branchAngle = mainAngle + (Math.random() - 0.5) * Math.PI * (isSecondary ? 0.8 : 0.6);
  const end = {
    x: start.x + Math.cos(branchAngle) * length,
    y: start.y + Math.sin(branchAngle) * length
  };
  return {
    path: generateJaggedPath(start, end, isSecondary ? 5 : 7),
    endpoint: end
  };
};

const SmallLightning = ({ position }) => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#9f7aea' : '#fcd34d';
  const size = Math.random() * 50 + 100;

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0.4, 0],
        scale: [0.8, 1.2, 1]
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut"
      }}
    >
      <div 
        className="lightning-flash"
        style={{
          background: `radial-gradient(circle at center, ${color}90 0%, transparent 70%)`,
          width: `${size}px`,
          height: `${size}px`
        }}
      />
    </motion.div>
  );
};

const LargeLightning = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#9f7aea' : '#fcd34d';
  const startX = Math.random() * window.innerWidth;
  const endX = startX + (Math.random() - 0.5) * window.innerWidth * 0.8;
  
  const mainStart = { x: startX, y: -50 };
  const mainEnd = { x: endX, y: window.innerHeight + 50 };
  const mainPath = generateJaggedPath(mainStart, mainEnd, 15);
  
  // Generate branches
  const branches = [];
  const mainAngle = Math.atan2(mainEnd.y - mainStart.y, mainEnd.x - mainStart.x);
  const branchCount = Math.floor(Math.random() * 5) + 5;
  
  for (let i = 1; i <= branchCount; i++) {
    const progress = i / (branchCount + 1);
    const startPoint = {
      x: mainStart.x + (mainEnd.x - mainStart.x) * progress,
      y: mainStart.y + (mainEnd.y - mainStart.y) * progress
    };
    
    const branchLength = Math.random() * 200 + 100;
    const { path, endpoint } = generateBranch(startPoint, mainAngle, branchLength);
    branches.push(path);
    
    if (Math.random() < 0.8) {
      const secondaryLength = branchLength * (Math.random() * 0.4 + 0.3);
      const secondaryBranch = generateBranch(endpoint, mainAngle, secondaryLength, true);
      branches.push(secondaryBranch.path);
      
      if (Math.random() < 0.5) {
        const tertiaryLength = secondaryLength * 0.5;
        const tertiaryBranch = generateBranch(secondaryBranch.endpoint, mainAngle, tertiaryLength, true);
        branches.push(tertiaryBranch.path);
      }
    }
  }

  return (
    <>
      <div 
        className="lightning-flash-overlay"
        style={{
          '--flash-x': `${(startX / window.innerWidth) * 100}%`,
          '--flash-y': `${Math.random() * 30}%`
        }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <svg className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <motion.path
            d={mainPath}
            stroke={color}
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut"
            }}
          />
          <motion.path
            d={mainPath}
            stroke={color}
            strokeWidth="12"
            fill="none"
            filter="url(#glow)"
            opacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0.4, 0.3, 0],
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut"
            }}
          />
          
          {branches.map((branch, index) => (
            <motion.path
              key={index}
              d={branch}
              stroke={color}
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0.8, 0.6, 0],
              }}
              transition={{
                duration: 0.15,
                delay: 0.03 + index * 0.02,
                ease: "easeOut"
              }}
            />
          ))}
        </svg>
      </motion.div>
    </>
  );
};

const LightningEffect = () => {
  const [smallLightnings, setSmallLightnings] = useState([]);
  const [showLargeLightning, setShowLargeLightning] = useState(false);

  useEffect(() => {
    let isActive = true;

    const createSmallLightning = (x, y) => {
      if (!isActive) return;
      const newLightning = {
        id: Date.now() + Math.random(),
        position: {
          x: x ?? Math.random() * (window.innerWidth - 150),
          y: y ?? Math.random() * (window.innerHeight - 150)
        }
      };
      setSmallLightnings(prev => [...prev, newLightning]);
      setTimeout(() => {
        if (isActive) {
          setSmallLightnings(prev => prev.filter(l => l.id !== newLightning.id));
        }
      }, 200);
    };

    const createClusteredLightnings = (count, centerX, centerY, radius = 200) => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          if (!isActive) return;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * radius;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          createSmallLightning(x, y);
        }, Math.random() * 100);
      }
    };

    const scheduleRandomEffects = () => {
      if (!isActive) return;
      const rand = Math.random();
      
      if (rand < 0.4) { // 40% chance of large lightning with cluster
        setShowLargeLightning(true);
        setTimeout(() => {
          if (isActive) {
            setShowLargeLightning(false);
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight;
            createClusteredLightnings(
              Math.floor(Math.random() * 4) + 3,
              centerX,
              centerY,
              200
            );
          }
        }, 250);
      } else { // 60% chance of scattered small lightnings
        const count = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < count; i++) {
          setTimeout(() => createSmallLightning(), Math.random() * 150);
        }
      }
    };

    // Initial effect
    scheduleRandomEffects();

    // Frequent main effects every 400-900ms
    const mainInterval = setInterval(scheduleRandomEffects, 400 + Math.random() * 500);

    // Additional small flashes every 200ms
    const flashInterval = setInterval(() => {
      if (Math.random() < 0.4) {
        createSmallLightning();
      }
    }, 400);

    return () => {
      isActive = false;
      clearInterval(mainInterval);
      clearInterval(flashInterval);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {smallLightnings.map(lightning => (
          <SmallLightning
            key={lightning.id}
            position={lightning.position}
          />
        ))}
      </AnimatePresence>
      {showLargeLightning && <LargeLightning />}
    </>
  );
};

export default LightningEffect;
