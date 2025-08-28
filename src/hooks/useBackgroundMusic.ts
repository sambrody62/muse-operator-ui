import { useState, useCallback, useRef, useEffect } from 'react';

interface UseBackgroundMusicReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
}

export const useBackgroundMusic = (musicPath: string = '/audio/background-music.mp3'): UseBackgroundMusicReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on mount
    const audio = new Audio(musicPath);
    audio.loop = false; // Don't loop - play once only
    audio.volume = 0.14; // Reduced by 30% from 0.2 for quieter background
    audioRef.current = audio;

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicPath]);

  const play = useCallback(() => {
    if (audioRef.current) {
      console.log('Starting background music');
      audioRef.current.play()
        .then(() => console.log('Background music playing'))
        .catch(err => {
          console.error('Failed to play background music:', err);
          console.log('User interaction may be required');
        });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return { play, pause, stop, setVolume, isPlaying };
};