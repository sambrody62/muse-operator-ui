import React, { useState, useEffect } from 'react';
import './App.css';
import ChromeExtensionButton from './ChromeExtensionButton';
import DemoClickUpPage from './DemoClickUpPage';
import DemoMuseOperatorUI from './DemoMuseOperatorUI';
import DemoExplainerBubble from './DemoExplainerBubble';
import DemoEndOverlay from './DemoEndOverlay';
import KnowledgeFactoryPage from './KnowledgeFactoryPage';
import { demoScript } from './DemoScriptV2';
import { useLocalAudio } from './hooks/useLocalAudio';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

function DemoApp() {
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showExplainer, setShowExplainer] = useState(true);
  const [speechComplete, setSpeechComplete] = useState(false);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [showKnowledgeFactory, setShowKnowledgeFactory] = useState(false);
  
  // Initialize local audio playback with callback when speech ends
  const { speak: speakAudio, stop: stopAudio } = useLocalAudio(
    () => setSpeechComplete(true) // Called when narration finishes
  );
  
  // Initialize background music
  const { play: playMusic, stop: stopMusic, setVolume: setMusicVolume } = useBackgroundMusic();

  const handleExtensionClick = () => {
    setIsMuseVisible(!isMuseVisible);
    if (!isMuseVisible) {
      // Start showing explainer immediately when panel opens
      setShowExplainer(true);
      // Start background music when demo begins
      playMusic();
    } else {
      setShowExplainer(false);
      // Stop music when closing demo
      stopMusic();
    }
  };

  const handleClickUpUpdate = (updates: any[]) => {
    setClickUpUpdates(updates);
    // Clear updates after they've been processed
    setTimeout(() => setClickUpUpdates([]), 100);
  };

  const handleSceneChange = (sceneIndex: number) => {
    setCurrentSceneIndex(sceneIndex);
    
    // Check if we've reached the last scene
    if (sceneIndex === demoScript.length - 1) {
      // Show overlay after a delay when last scene starts
      setTimeout(() => {
        setShowEndOverlay(true);
      }, 15000); // Show after 15 seconds (adjust based on last scene duration)
    }
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
      
      // Stop any ongoing audio
      stopAudio();
      
      // Start narration immediately
      const timer = setTimeout(() => {
        console.log('Playing local audio for scene:', currentScene.id);
        speakAudio(currentScene.id);
      }, 100); // Minimal delay for UI to render
      
      return () => {
        clearTimeout(timer);
        // Don't stop TTS in cleanup - only stop if scene actually changes
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, showExplainer, isMuseVisible]); // Intentionally exclude function deps to prevent loops

  // If showing Knowledge Factory page, render that instead
  if (showKnowledgeFactory) {
    return <KnowledgeFactoryPage onBack={() => setShowKnowledgeFactory(false)} />;
  }

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
      
      {/* End of Demo Overlay */}
      <DemoEndOverlay 
        isVisible={showEndOverlay}
        onClose={() => setShowEndOverlay(false)}
        onLearnMore={() => {
          setShowEndOverlay(false);
          // Stop the original background music before transitioning
          stopMusic();
          setShowKnowledgeFactory(true);
        }}
      />
    </div>
  );
}

export default DemoApp;