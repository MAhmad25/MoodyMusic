import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useMusicContext } from "@/context/MusicContext";
import { Loader } from "../loader";

const MusicButton = ({ music }) => {
      return (
            <div className="flex h-full w-full flex-col  items-center justify-center">
                  <MusicToggleButton music={music} />
            </div>
      );
};

export { MusicButton };

export const MusicToggleButton = ({ music }) => {
      const bars = 5;
      const MotionDiv = motion.div;
      const currentPlayingRef = useRef(null);
      const playAfterLoadRef = useRef(false);
      const { currentPlayingUrl, loadingUrl, setPlayingMusic, stopCurrentMusic, setMusicLoading, clearMusicLoading } = useMusicContext();

      const getRandomHeights = () => {
            return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
      };

      const [heights, setHeights] = useState(Array(bars).fill(0.1));

      const [isPlaying, setIsPlaying] = useState(false);

      const isLoadingThisTrack = loadingUrl === music && !isPlaying;

      useEffect(() => {
            currentPlayingRef.current = currentPlayingUrl;
      }, [currentPlayingUrl]);

      const clearIfCurrentTrack = () => {
            if (currentPlayingRef.current === music) {
                  stopCurrentMusic({ invokeStop: false });
            }
      };

      const [play, { stop, sound }] = useSound(music, {
            loop: true,
            onplay: () => {
                  playAfterLoadRef.current = false;
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
            onloaderror: () => {
                  playAfterLoadRef.current = false;
                  clearMusicLoading();
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

      useEffect(() => {
            if (loadingUrl !== music) {
                  playAfterLoadRef.current = false;
            }
      }, [loadingUrl, music]);

      useEffect(() => {
            if (!sound || !playAfterLoadRef.current) return;
            if (loadingUrl !== music) return;
            if (isPlaying) return;
            play();
      }, [sound, music, loadingUrl, play, isPlaying]);

      const handleClick = () => {
            if (isPlaying) {
                  playAfterLoadRef.current = false;
                  stop();
                  stopCurrentMusic({ invokeStop: false });
                  return;
            }
            if (isLoadingThisTrack) {
                  return;
            }
            if (currentPlayingUrl && currentPlayingUrl !== music) {
                  stopCurrentMusic();
            }
            playAfterLoadRef.current = true;
            setMusicLoading(music);
            play();
      };

      return (
            <>
                  <MotionDiv
                        onClick={handleClick}
                        key="audio"
                        initial={{ padding: "0px 5px" }}
                        whileHover={isLoadingThisTrack ? undefined : { padding: "0px 7px " }}
                        whileTap={isLoadingThisTrack ? undefined : { padding: "2px 2px " }}
                        transition={{ duration: 1, bounce: 0.2, type: "spring" }}
                        aria-busy={isLoadingThisTrack}
                        className={`bg-background relative rounded-full p-2 ${isLoadingThisTrack ? "pointer-events-none cursor-default" : "cursor-pointer"}`}
                  >
                        <MotionDiv
                              initial={{ opacity: 0, filter: "blur(4px)" }}
                              animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                              }}
                              exit={{ opacity: 0, filter: "blur(4px)" }}
                              transition={{ type: "spring", bounce: 0.35 }}
                              className="flex h-[18px] w-full min-w-[40px] items-center justify-center gap-1 rounded-full"
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
                        {isLoadingThisTrack ? (
                              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80">
                                    <Loader />
                              </div>
                        ) : null}
                  </MotionDiv>
            </>
      );
};
