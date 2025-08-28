import { useState, useCallback, useRef } from 'react';

interface UseLocalAudioReturn {
  speak: (sceneId: string) => void;
  stop: () => void;
  isPlaying: boolean;
}

export const useLocalAudio = (onSpeechEnd?: () => void): UseLocalAudioReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback((sceneId: string) => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create new audio element with local file
    const audio = new Audio(`/audio/scene-${sceneId}.mp3`);
    audioRef.current = audio;
    
    // Set low volume for background narration
    audio.volume = 0.3;
    
    audio.onloadeddata = () => {
      setIsPlaying(true);
      audio.play().catch(err => {
        console.error('Audio playback failed:', err);
        setIsPlaying(false);
      });
    };

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
      if (onSpeechEnd) onSpeechEnd();
    };

    audio.onerror = () => {
      console.error('Failed to load audio file:', sceneId);
      setIsPlaying(false);
      audioRef.current = null;
    };
  }, [onSpeechEnd]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  return { speak, stop, isPlaying };
};