import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, CheckCircle, ExternalLink, Info, ChevronDown, ChevronUp, ChevronRight, Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { demoScript, DemoMessage, DemoScene, getNextScene } from './DemoScriptV2';

interface DemoMuseOperatorUIProps {
  onClickUpUpdate?: (updates: any[]) => void;
  onSceneChange?: (sceneIndex: number) => void;
  isVisible: boolean;
  speechComplete?: boolean;
  onSpeechHandled?: () => void;
}

const DemoMuseOperatorUI: React.FC<DemoMuseOperatorUIProps> = ({ onClickUpUpdate, onSceneChange, isVisible, speechComplete, onSpeechHandled }) => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [talkingAgent, setTalkingAgent] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState('');
  const [isAutoMode, setIsAutoMode] = useState(true);

  const clickupContext = {
    client: 'EcoBottle Co',
    task: 'Social Media Strategy Launch',
    fullTask: 'Develop comprehensive social media strategy for eco-friendly water bottle launch targeting millennials and Gen Z. Deliverables include platform strategy, content calendar, influencer partnerships, community building approach, and budget allocation across 6-week campaign timeline.',
    taskId: 'EC-3021',
    confidence: 0.99
  };

  const agents = [
    { id: 1, name: 'Scout', role: 'Research', emoji: '🔍' },
    { id: 2, name: 'Muse', role: 'Strategy', emoji: '🧠' },
    { id: 3, name: 'Echo', role: 'Copy', emoji: '✍️' },
    { id: 4, name: 'Atlas', role: 'QA', emoji: '🛡️' }
  ];

  // Auto-play demo when panel becomes visible
  useEffect(() => {
    if (isVisible && messages.length === 0 && isAutoMode) {
      setTimeout(() => {
        startDemo();
      }, 500);
    }
  }, [isVisible]);

  // Notify parent of scene changes
  useEffect(() => {
    if (onSceneChange) {
      onSceneChange(currentSceneIndex);
    }
  }, [currentSceneIndex, onSceneChange]);

  // Advance to next scene when speech is complete
  useEffect(() => {
    if (speechComplete && isPlaying) {
      const currentScene = demoScript[currentSceneIndex];
      // Check if we've shown all messages in the current scene
      if (!currentScene || currentMessageIndex >= currentScene.messages.length) {
        // All messages in scene are done, and speech is complete
        if (currentSceneIndex < demoScript.length - 1) {
          // Add a small delay for smooth transition
          const timer = setTimeout(() => {
            console.log('Audio complete, advancing from scene', currentSceneIndex, 'to', currentSceneIndex + 1);
            setCurrentSceneIndex(prev => prev + 1);
            setCurrentMessageIndex(0);
            setMessages([]); // Clear messages for new scene
            setTalkingAgent(null);
            if (onSpeechHandled) {
              onSpeechHandled(); // Reset the flag
            }
          }, 1500); // 1.5 second delay after speech ends
          return () => clearTimeout(timer);
        } else {
          // Last scene done
          setIsPlaying(false);
        }
      }
    }
  }, [speechComplete, isPlaying, currentSceneIndex, currentMessageIndex, onSpeechHandled]);

  // Process demo messages
  useEffect(() => {
    if (!isPlaying) return;

    const currentScene = demoScript[currentSceneIndex];
    if (!currentScene) {
      setIsPlaying(false);
      return;
    }

    // Set the main agent for this scene based on the scene ID
    const getSceneAgent = (sceneId: string) => {
      const agentMap: Record<string, string> = {
        'scout-research': 'Scout',
        'muse-strategy': 'Muse',
        'echo-scout-collab': 'Echo', // Echo leads the collaboration
        'echo-content': 'Echo',
        'atlas-compliance': 'Atlas',
        'system-complete': 'Muse' // Muse represents the whole system
      };
      return agentMap[sceneId] || null;
    };

    const currentMessage = currentScene.messages[currentMessageIndex];
    
    // Set the talking agent for the entire scene
    const sceneAgent = getSceneAgent(currentScene.id);
    if (sceneAgent && currentMessageIndex === 0) {
      setTalkingAgent(sceneAgent);
    }
    
    // For collaboration scene, update the talking agent based on who's speaking
    if (currentScene.id === 'echo-scout-collab' && currentMessage) {
      if (currentMessage.agent === 'Scout') {
        setTalkingAgent('Scout');
      } else if (currentMessage.agent === 'Echo') {
        setTalkingAgent('Echo');
      }
    }
    if (!currentMessage) {
      // Scene messages complete - now we just wait for audio to finish
      // The speechComplete effect above will handle advancing to next scene
      // Don't set any timers here - let audio drive the progression
      return;
    }

    // Add message after delay
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        agent: currentMessage.agent,
        content: currentMessage.content
      }]);

      // No more options - continuous flow

      // Process actions
      if (currentMessage.actions) {
        currentMessage.actions.forEach(action => {
          if (action.type === 'highlight') {
            highlightClickUpField(action.target!);
          } else if (action.type === 'update' && onClickUpUpdate) {
            onClickUpUpdate([{ field: action.target, value: action.value }]);
          }
        });
      }

      // Process ClickUp updates only on the first message of the scene
      if (currentMessageIndex === 0 && currentScene.clickUpUpdates && onClickUpUpdate) {
        currentScene.clickUpUpdates.forEach(update => {
          setTimeout(() => {
            onClickUpUpdate(update.updates);
          }, update.delay);
        });
      }

      // Smooth auto-scroll to bottom to keep latest messages visible
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }

      // Move to next message
      setCurrentMessageIndex(prev => prev + 1);
    }, currentMessage.delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIndex, currentMessageIndex, onClickUpUpdate]);

  const startDemo = () => {
    setIsPlaying(true);
    if (messages.length === 0) {
      setCurrentSceneIndex(0);
      setCurrentMessageIndex(0);
    }
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setMessages([]);
    setCurrentSceneIndex(0);
    setCurrentMessageIndex(0);
    setIsPlaying(false);
    setTalkingAgent(null);
  };

  const skipToNextScene = () => {
    if (currentSceneIndex < demoScript.length - 1) {
      // Clear talking agent when skipping
      setTalkingAgent(null);
      setCurrentSceneIndex(prev => prev + 1);
      setCurrentMessageIndex(0);
      if (!isPlaying) setIsPlaying(true);
    }
  };


  const highlightClickUpField = (fieldId: string) => {
    // This would trigger highlighting in the ClickUp component
    const element = document.querySelector(`[data-field="${fieldId}"]`);
    if (element) {
      element.classList.add('highlight-pulse');
      setTimeout(() => {
        element.classList.remove('highlight-pulse');
      }, 2000);
    }
  };

  const getAgentGlow = (agentName: string) => {
    const glowMap: Record<string, string> = {
      'Muse': 'animate-pulse shadow-xl shadow-fuchsia-300/60 ring-4 ring-fuchsia-300/40',
      'Scout': 'animate-pulse shadow-xl shadow-emerald-300/60 ring-4 ring-emerald-300/40',
      'Echo': 'animate-pulse shadow-xl shadow-blue-300/60 ring-4 ring-blue-300/40',
      'Atlas': 'animate-pulse shadow-xl shadow-orange-300/60 ring-4 ring-orange-300/40',
      'Beacon': 'animate-pulse shadow-xl shadow-cyan-300/60 ring-4 ring-cyan-300/40'
    };
    return glowMap[agentName] || '';
  };

  const getAgentMessageColor = (agentName: string) => {
    const colorMap: Record<string, string> = {
      'Muse': 'bg-fuchsia-50 border-fuchsia-200',
      'Scout': 'bg-emerald-50 border-emerald-200',
      'Echo': 'bg-blue-50 border-blue-200',
      'Atlas': 'bg-orange-50 border-orange-200',
      'Beacon': 'bg-cyan-50 border-cyan-200',
      'Operator': 'bg-gray-50 border-gray-200'
    };
    return colorMap[agentName] || 'bg-white border-gray-200';
  };

  const getAgentIcon = (agentName: string) => {
    const iconMap: Record<string, string> = {
      'Muse': '🧠',
      'Scout': '🔍',
      'Echo': '✍️',
      'Atlas': '🛡️',
      'Beacon': '🌍',
      'Operator': '👤'
    };
    return iconMap[agentName] || '👤';
  };

  if (!isVisible) return null;

  return (
    <div className="w-[25vw] h-screen bg-white text-slate-900 flex flex-col font-inter shadow-2xl relative transition-all duration-500">
      {/* Demo Controls - Hidden initially, show on hover */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg opacity-20 hover:opacity-100 transition-opacity duration-300">
        {!isPlaying ? (
          <button
            onClick={startDemo}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Play demo"
          >
            <Play className="w-4 h-4 text-green-600" />
          </button>
        ) : (
          <button
            onClick={pauseDemo}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Pause demo"
          >
            <Pause className="w-4 h-4 text-yellow-600" />
          </button>
        )}
        <button
          onClick={resetDemo}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset demo"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={skipToNextScene}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Skip to next scene"
        >
          <SkipForward className="w-4 h-4 text-blue-600" />
        </button>
        <div className="px-2 text-xs text-gray-500">
          Scene {currentSceneIndex + 1}/{demoScript.length}
        </div>
      </div>

      {/* Collapse Arrow */}
      <button
        className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white border border-slate-200 rounded-l-lg px-2 py-4 shadow-lg hover:shadow-xl transition-all hover:bg-slate-50 z-50"
        style={{ left: '-32px' }}
      >
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </button>

      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-800">
                {clickupContext.task}
              </span>
            </div>
            <button
              onClick={() => setShowTaskDetails(!showTaskDetails)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4 text-slate-500 hover:text-blue-500" />
            </button>
          </div>
          
          {showTaskDetails && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 animate-in slide-in-from-top-2 duration-200">
              <div className="mb-3">
                <div className="text-sm font-semibold text-blue-700">{clickupContext.client}</div>
                <div className="text-xs text-slate-600">Task ID: {clickupContext.taskId}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold text-slate-700 mb-2">Campaign Brief:</div>
                <p className="text-sm text-slate-700 leading-relaxed">{clickupContext.fullTask}</p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-blue-200">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-600 font-medium">Connected • Live Demo Mode</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agent Collaboration Graph */}
      <div className={`px-4 border-b border-slate-200 bg-white/60 ${showCollaboration ? 'py-4' : 'py-2'}`}>
        <button 
          onClick={() => setShowCollaboration(!showCollaboration)}
          className={`w-full flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg transition-colors ${showCollaboration ? 'mb-4' : 'mb-1'}`}
        >
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-violet-500" />
            Live Agent Team
          </h2>
          {showCollaboration ? 
            <ChevronUp className="w-4 h-4 text-slate-500" /> : 
            <ChevronDown className="w-4 h-4 text-slate-500" />
          }
        </button>
        
        {showCollaboration && (
          <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-200 shadow-sm flex items-center justify-center">
            <div className="flex items-center gap-3">
              {agents.map((agent) => (
                <div key={agent.id} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shadow-md bg-white border-slate-300 ${
                    talkingAgent === agent.name ? getAgentGlow(agent.name) : ''
                  }`}>
                    <span className="text-sm">{agent.emoji}</span>
                  </div>
                  <div className="mt-0.5">
                    <div className="text-xs font-semibold text-slate-700">{agent.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
        <div className="flex-1 overflow-y-auto px-4 py-4" ref={scrollContainerRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 group transition-all duration-300 ${
                message.agent === 'Operator' ? 'justify-end' : 'justify-start'
              }`}>
                {message.agent !== 'Operator' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-sm">{getAgentIcon(message.agent)}</span>
                  </div>
                )}
                <div className={`flex-1 max-w-[85%] rounded-xl p-3 border shadow-sm ${getAgentMessageColor(message.agent)}`}>
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
                {message.agent === 'Operator' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-sm">{getAgentIcon(message.agent)}</span>
                  </div>
                )}
              </div>
            ))}
            
          </div>
        </div>

        {/* Message Input (Disabled in Demo) */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Demo mode - auto-playing..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder-slate-400 disabled:opacity-50"
              disabled={isAutoMode}
            />
            <button
              className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={isAutoMode}
            >
              <span className="text-white text-base">➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoMuseOperatorUI;