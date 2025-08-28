import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

export interface TTSOptions {
  voiceId?: string;
  model?: string;
  voiceSettings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export const useTextToSpeech = (apiKey: string, onSpeechEnd?: () => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fallback to browser's Speech Synthesis API
  const speakFallback = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        if (onSpeechEnd) onSpeechEnd();
      };
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  }, [onSpeechEnd]);

  const speak = useCallback(async (text: string, options?: TTSOptions) => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Cancel browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // If no API key, use fallback
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('ElevenLabs API key not configured, using browser TTS');
      return speakFallback(text);
    }
    
    console.log('Starting ElevenLabs TTS with API key:', apiKey.substring(0, 10) + '...');

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setIsPlaying(false);

    try {
      // Use custom voice ID
      const voiceId = options?.voiceId || 'ashjVK50jp28G73AUTnb';
      
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: options?.model || 'eleven_monolingual_v1',
          voice_settings: options?.voiceSettings || {
            stability: 0.35,  // Lower for more variation/energy
            similarity_boost: 0.75,  // Higher for consistent voice
            style: 0.65,  // Higher for more expressive/upbeat delivery
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          responseType: 'blob',
          signal: abortController.signal,
          timeout: 30000, // 30 second timeout
        }
      );

      if (abortController.signal.aborted) return;

      // Create audio element from response
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audioRef.current = audio;
      audio.volume = 0.8; // Set reasonable volume

      audio.onloadeddata = () => {
        setIsLoading(false);
        if (!abortController.signal.aborted) {
          setIsPlaying(true);
          audio.play().catch(err => {
            console.error('Audio playback failed:', err);
            // Try fallback
            speakFallback(text);
          });
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        if (onSpeechEnd) onSpeechEnd();
      };

      audio.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        console.error('Audio playback error, trying fallback');
        // Try fallback
        speakFallback(text);
      };

    } catch (error) {
      setIsLoading(false);
      setIsPlaying(false);
      
      if (axios.isCancel(error)) {
        console.log('TTS request cancelled');
      } else {
        console.error('ElevenLabs TTS Error:', error);
        // Try fallback on error
        speakFallback(text);
      }
    }
  }, [apiKey, speakFallback]);

  const stop = useCallback(() => {
    // Stop ElevenLabs audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Stop browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // Abort pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  return { speak, stop, isPlaying, isLoading };
};