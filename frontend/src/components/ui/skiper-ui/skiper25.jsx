import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useMusicContext } from "@/context/MusicContext";

const MusicButton = ({ music }) => {
      return (
            <div className="flex h-full w-full flex-col items-center justify-center">
                  <MusicToggleButton music={music} />
            </div>
      );
};

export { MusicButton };

export const MusicToggleButton = ({ music }) => {
      const bars = 5;
      const MotionDiv = motion.div;
      const currentPlayingRef = useRef(null);
      const { currentPlayingUrl, setPlayingMusic, stopCurrentMusic, setMusicLoading } = useMusicContext();

      const getRandomHeights = () => {
            return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
      };

      const [heights, setHeights] = useState(Array(bars).fill(0.1));

      const [isPlaying, setIsPlaying] = useState(false);

      useEffect(() => {
            currentPlayingRef.current = currentPlayingUrl;
      }, [currentPlayingUrl]);

      const clearIfCurrentTrack = () => {
            if (currentPlayingRef.current === music) {
                  stopCurrentMusic({ invokeStop: false });
            }
      };

      const [play, { stop }] = useSound(music, {
            loop: true,
            onplay: () => {
                  setIsPlaying(true);
                  setHeights(getRandomHeights());
                  setPlayingMusic(music, stop);
            },
            onend: () => {
                  setIsPlaying(false);
                  setHeights(Array(bars).fill(0.1));
                  clearIfCurrentTrack();
            },
            onpause: () => {
                  setIsPlaying(false);
                  setHeights(Array(bars).fill(0.1));
                  clearIfCurrentTrack();
            },
            onstop: () => {
                  setIsPlaying(false);
                  setHeights(Array(bars).fill(0.1));
                  clearIfCurrentTrack();
            },
            soundEnabled: true,
      });

      useEffect(() => {
            if (isPlaying) {
                  const waveformIntervalId = setInterval(() => {
                        setHeights(getRandomHeights());
                  }, 100);

                  return () => {
                        clearInterval(waveformIntervalId);
                  };
            }
      }, [isPlaying]);

      useEffect(() => {
            if (currentPlayingUrl !== music && isPlaying) {
                  stop();
            }
      }, [currentPlayingUrl, isPlaying, music, stop]);

      const handleClick = () => {
            if (isPlaying) {
                  stop();
                  stopCurrentMusic({ invokeStop: false });
                  return;
            }
            setMusicLoading(music);
            if (currentPlayingUrl && currentPlayingUrl !== music) {
                  stopCurrentMusic();
            }
            play();
      };

      return (
            <>
                  <MotionDiv onClick={handleClick} key="audio" initial={{ padding: "0px 5px" }} whileHover={{ padding: "0px 7px " }} whileTap={{ padding: "2px 2px " }} transition={{ duration: 1, bounce: 0.2, type: "spring" }} className="bg-background cursor-pointer rounded-full p-2">
                        <MotionDiv
                              initial={{ opacity: 0, filter: "blur(4px)" }}
                              animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                              }}
                              exit={{ opacity: 0, filter: "blur(4px)" }}
                              transition={{ type: "spring", bounce: 0.35 }}
                              className="flex h-[18px] w-full items-center gap-1 rounded-full"
                        >
                              {/* Waveform visualization */}
                              {heights.map((height, index) => (
                                    <MotionDiv
                                          key={index}
                                          className="bg-foreground w-px rounded-full"
                                          initial={{ height: 1 }}
                                          animate={{
                                                height: Math.max(4, height * 14),
                                          }}
                                          transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 10,
                                          }}
                                    />
                              ))}
                        </MotionDiv>
                  </MotionDiv>
            </>
      );
};
