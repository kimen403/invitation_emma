"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { playBackgroundMusic } from "./MusicPlayer";

const Modal = ({ onOpen, guest }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpen = () => {
    setIsTransitioning(true);
    playBackgroundMusic();
    setTimeout(() => {
      setIsVisible(false);
      if (onOpen) onOpen();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="themed-container rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden max-w-md mx-4 p-8"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('/pichture/vapirina1.png')",
                backgroundSize: "80%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.5,
                zIndex: 0,
              }}
            />
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="space-y-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h2 className="title-spooky mb-4 text-white">
                  Invitation Letter
                </h2>

                <div className="space-y-2">
                  <h3 className="font-magical text-3xl text-white">{guest}</h3>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 space-y-6 "
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={handleOpen}
                  className="themed-button font-spooky bg-red-300 text-xl text-amber-50 py-4 px-8 rounded-full transition-all duration-300 shadow-lg spooky-hover relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Enter If You Dare! </span>
                  <motion.div
                    className="absolute inset-0 text-amber-50 z-40"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Decorative corners */}
            <motion.div
              className="absolute left-2 top-2 text-lg"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              💀
            </motion.div>
            <motion.div
              className="absolute right-2 top-2 text-lg"
              animate={{ rotate: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              💀
            </motion.div>
            <motion.div
              className="absolute left-2 bottom-2 text-lg"
              animate={{ rotate: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              💀
            </motion.div>
            <motion.div
              className="absolute right-2 bottom-2 text-lg"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              💀
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
