import React, { useState } from 'react';
import './App.css';
import ChromeExtensionButton from './ChromeExtensionButton';
import DemoClickUpPage from './DemoClickUpPage';
import DemoMuseOperatorUI from './DemoMuseOperatorUI';
import DemoExplainerBubble from './DemoExplainerBubble';
import { demoScript } from './DemoScriptV2';

function DemoApp() {
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showExplainer, setShowExplainer] = useState(true);

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