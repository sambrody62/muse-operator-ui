import React, { useState, useEffect } from 'react';
import './App.css';
import ChromeExtensionButton from './ChromeExtensionButton';
import DemoClickUpPage from './DemoClickUpPage';
import DemoMuseOperatorUI from './DemoMuseOperatorUI';
import DemoExplainerBubble from './DemoExplainerBubble';
import { demoScript } from './DemoScriptV2';
import { useTextToSpeech } from './hooks/useTextToSpeech';

function DemoApp() {
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showExplainer, setShowExplainer] = useState(true);
  const [speechComplete, setSpeechComplete] = useState(false);
  
  // Initialize text-to-speech with callback when speech ends
  const elevenLabsApiKey = process.env.REACT_APP_ELEVENLABS_API_KEY || '';
  const { speak: speakText, stop: stopTTS, isPlaying: isTTSPlaying } = useTextToSpeech(
    elevenLabsApiKey,
    () => setSpeechComplete(true) // Called when narration finishes
  );

  const handleExtensionClick = () => {
    setIsMuseVisible(!isMuseVisible);
    if (!isMuseVisible) {
      // Start showing explainer when panel opens
      setTimeout(() => setShowExplainer(true), 500);
    } else {
      setShowExplainer(false);
    }
  };

  const handleClickUpUpdate = (updates: any[]) => {
    setClickUpUpdates(updates);
    // Clear updates after they've been processed
    setTimeout(() => setClickUpUpdates([]), 100);
  };

  const handleSceneChange = (sceneIndex: number) => {
    setCurrentSceneIndex(sceneIndex);
  };

  const currentScene = demoScript[currentSceneIndex];
  
  // Trigger TTS when scene changes
  useEffect(() => {
    console.log('TTS Effect triggered:', {
      hasExplainer: !!currentScene?.explainer,
      showExplainer,
      isMuseVisible,
      sceneIndex: currentSceneIndex
    });
    
    if (currentScene?.explainer && showExplainer && isMuseVisible) {
      // Reset speech complete flag
      setSpeechComplete(false);
      
      // Stop any ongoing speech
      stopTTS();
      
      // Small delay to let UI settle
      const timer = setTimeout(() => {
        // Clean the description text for speech
        const textToSpeak = currentScene.explainer!.description
          .replace(/[🔍🧠✍️🛡️🤝]/g, '') // Remove emojis
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        console.log('API Key present:', !!elevenLabsApiKey);
        console.log('Speaking explainer text:', textToSpeak);
        speakText(textToSpeak);
      }, 1000); // 1 second delay after scene change
      
      return () => {
        clearTimeout(timer);
        // Don't stop TTS in cleanup - only stop if scene actually changes
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, showExplainer, isMuseVisible]); // Intentionally exclude function deps to prevent loops

  return (
    <div className="relative h-screen bg-gray-100 overflow-hidden">
      {/* Chrome Extension Button */}
      <ChromeExtensionButton 
        onClick={handleExtensionClick}
        isActive={isMuseVisible}
      />

      {/* ClickUp Page - Always full width */}
      <div className="w-full h-full">
        <DemoClickUpPage updates={clickUpUpdates} />
      </div>

      {/* Muse Operator UI - Overlay */}
      <div className={`absolute top-0 right-0 h-full transition-all duration-500 ${
        isMuseVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <DemoMuseOperatorUI 
          isVisible={isMuseVisible}
          onClickUpUpdate={handleClickUpUpdate}
          onSceneChange={handleSceneChange}
          speechComplete={speechComplete}
          onSpeechHandled={() => setSpeechComplete(false)}
        />
      </div>

      {/* Explainer Bubble */}
      {currentScene?.explainer && (
        <DemoExplainerBubble
          title={currentScene.explainer.title}
          description={currentScene.explainer.description}
          step={currentSceneIndex + 1}
          totalSteps={demoScript.length}
          isVisible={showExplainer && isMuseVisible}
          onClose={() => setShowExplainer(false)}
        />
      )}
    </div>
  );
}

export default DemoApp;