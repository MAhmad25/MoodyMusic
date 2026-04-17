import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
      const [currentPlayingUrl, setCurrentPlayingUrl] = useState(null);
      const [loadingUrl, setLoadingUrl] = useState(null);
      const currentPlayingUrlRef = useRef(null);
      const stopFunctionRef = useRef(null);

      const stopCurrentMusic = useCallback((options = {}) => {
            const { invokeStop = true } = options;
            if (invokeStop && stopFunctionRef.current) {
                  stopFunctionRef.current();
            }
            currentPlayingUrlRef.current = null;
            stopFunctionRef.current = null;
            setCurrentPlayingUrl(null);
            setLoadingUrl(null);
      }, []);

      const setPlayingMusic = useCallback((url, stop) => {
            if (stopFunctionRef.current && currentPlayingUrlRef.current !== url) {
                  stopFunctionRef.current();
            }
            currentPlayingUrlRef.current = url;
            stopFunctionRef.current = stop;
            setCurrentPlayingUrl(url);
            setLoadingUrl(null);
      }, []);

      const setMusicLoading = useCallback((url) => {
            setLoadingUrl(url);
      }, []);

      const clearMusicLoading = useCallback(() => {
            setLoadingUrl(null);
      }, []);

      const states = {
            currentPlayingUrl,
            loadingUrl,
            setPlayingMusic,
            stopCurrentMusic,
            setMusicLoading,
            clearMusicLoading,
      };
      return <MusicContext.Provider value={states}>{children}</MusicContext.Provider>;
};

export const useMusicContext = () => {
      const context = useContext(MusicContext);
      if (!context) {
            throw new Error("useMusicContext must be used within MusicProvider");
      }
      return context;
};
