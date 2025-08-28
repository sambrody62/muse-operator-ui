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
    const audioPath = `/audio/scene-${sceneId}.mp3`;
    console.log('Loading audio:', audioPath);
    
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    
    // Set volume higher so it's audible
    audio.volume = 0.7;
    
    audio.onloadeddata = () => {
      console.log('Audio loaded, attempting to play');
      setIsPlaying(true);
      audio.play()
        .then(() => console.log('Audio playing successfully'))
        .catch(err => {
          console.error('Audio playback failed:', err);
          console.error('This often happens due to browser autoplay policies.');
          console.error('User interaction may be required first.');
          setIsPlaying(false);
        });
    };

    audio.onended = () => {
      console.log('Audio playback ended');
      setIsPlaying(false);
      audioRef.current = null;
      if (onSpeechEnd) onSpeechEnd();
    };

    audio.onerror = (e) => {
      console.error('Failed to load audio file:', audioPath);
      console.error('Error details:', e);
      setIsPlaying(false);
      audioRef.current = null;
      // Call onSpeechEnd anyway to continue demo
      if (onSpeechEnd) onSpeechEnd();
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