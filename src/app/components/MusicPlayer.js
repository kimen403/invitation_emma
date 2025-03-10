"use client";
import { Howl } from "howler";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

let backgroundMusic = null;
let musicState = { isPlaying: false };

export const playBackgroundMusic = () => {
  if (!backgroundMusic) {
    backgroundMusic = new Howl({
      src: ["/music/background-music.mp3"],
      loop: true,
      volume: 0.5,
      html5: true,
      onload: () => {
        backgroundMusic.play();
        musicState.isPlaying = true;
        window.dispatchEvent(
          new CustomEvent("musicStateChange", { detail: true })
        );
      },
      onplay: () => {
        musicState.isPlaying = true;
        window.dispatchEvent(
          new CustomEvent("musicStateChange", { detail: true })
        );
      },
      onpause: () => {
        musicState.isPlaying = false;
        window.dispatchEvent(
          new CustomEvent("musicStateChange", { detail: false })
        );
      },
      onstop: () => {
        musicState.isPlaying = false;
        window.dispatchEvent(
          new CustomEvent("musicStateChange", { detail: false })
        );
      },
    });
  } else {
    backgroundMusic.play();
    musicState.isPlaying = true;
    window.dispatchEvent(new CustomEvent("musicStateChange", { detail: true }));
  }
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMusicStateChange = (e) => {
      setIsPlaying(e.detail);
    };

    window.addEventListener("musicStateChange", handleMusicStateChange);

    if (backgroundMusic) {
      setIsPlaying(musicState.isPlaying);
    }

    return () => {
      window.removeEventListener("musicStateChange", handleMusicStateChange);
    };
  }, []);

  const toggleMusic = () => {
    if (!backgroundMusic) {
      playBackgroundMusic();
      return;
    }

    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
  };

  return (
    <motion.button
      onClick={toggleMusic}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-20 right-4 p-3 rounded-full z-50 backdrop-blur-sm"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        backgroundColor: isPlaying
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        boxShadow: isHovered
          ? "0 0 20px rgba(236, 72, 153, 0.5)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      title={isPlaying ? "Jeda Musik" : "Putar Musik"}
      aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isPlaying ? "pause" : "play"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            duration: 0.25,
          }}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-500  "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicPlayer;
