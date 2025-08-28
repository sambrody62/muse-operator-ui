import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, CheckCircle, ExternalLink, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const MuseOperatorUI = () => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, agent: 'Operator', content: 'I need help creating a social media strategy for our new eco-friendly water bottle launch. Target audience is millennials and Gen Z.' },
    { id: 2, agent: 'Muse', content: 'Perfect! For eco-conscious millennials and Gen Z, I recommend focusing on sustainability storytelling, user-generated content, and partnering with environmental influencers. Best platforms: Instagram, TikTok, and LinkedIn.' },
    { id: 3, agent: 'Operator', content: 'Great insights! Can you research what competitors are doing in this space?' },
    { id: 4, agent: 'Scout', content: 'I found 12 successful eco-product launches this year. Key insights: #PlasticFree hashtag has 2.3M posts, sustainability content gets 40% higher engagement, and morning posts (8-10 AM) perform best.' },
    { id: 5, agent: 'Operator', content: 'Interesting data! Echo, can you create some campaign concepts based on this research?' },
    { id: 6, agent: 'Echo', content: 'Based on the research, I\'ve crafted 3 campaign concepts: "Hydrate Responsibly" (lifestyle focus), "Small Bottle, Big Impact" (environmental impact), and "Refill Revolution" (community building). Which direction resonates?' },
    { id: 7, agent: 'Operator', content: 'I love "Refill Revolution" - it feels like a movement. Can we develop that concept further?' },
    { id: 8, agent: 'Muse', content: 'Excellent choice! "Refill Revolution" creates community engagement. Strategy: Launch with user challenges, create a branded hashtag, partner with gyms and universities, and showcase refill stations globally.' },
    { id: 9, agent: 'Operator', content: 'Love the gym partnerships idea! Scout, what do you think about potential partnerships?' },
    { id: 10, agent: 'Scout', content: 'Research shows community-driven campaigns increase brand loyalty by 67%. Found 8 potential gym partnerships and 15 universities with sustainability programs already in place.' },
    { id: 11, agent: 'Operator', content: 'Perfect! Echo, can you write the actual campaign copy for this concept?' },
    { id: 12, agent: 'Echo', content: 'Created the campaign copy: "Join the #RefillRevolution 🌍 Every refill is a statement. Every sip saves the planet. Ready to revolutionize your hydration?" Plus 20 supporting social posts and captions.' },
    { id: 13, agent: 'Operator', content: 'This is fantastic work! What about launch timeline and budget allocation?' },
    { id: 14, agent: 'Muse', content: 'Recommended 6-week launch: Week 1-2 teaser content, Week 3-4 official launch with influencers, Week 5-6 user-generated content push. Budget: 40% influencers, 35% paid ads, 25% content creation.' },
    { id: 15, agent: 'Operator', content: 'How does this budget compare to competitors? Scout, any insights?' },
    { id: 16, agent: 'Scout', content: 'Analyzed competitor launch budgets - your allocation is optimal. Micro-influencers (10K-100K followers) in sustainability niche cost $200-800 per post and generate 3x better engagement than macro-influencers.' },
    { id: 17, agent: 'Operator', content: 'Excellent! Echo, can you prepare the launch week content calendar?' },
    { id: 18, agent: 'Echo', content: 'I\'ve prepared launch week content calendar with daily posts, story templates, and influencer brief. Each piece reinforces the "revolution" messaging while highlighting product benefits and sustainability mission.' },
    { id: 19, agent: 'Operator', content: 'This is exactly what I needed! Great teamwork everyone. Let\'s move forward with the Refill Revolution campaign.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [talkingAgent, setTalkingAgent] = useState<number | null>(null); // Start with no agent active
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ClickUp context from URL detection
  const clickupContext = {
    client: 'EcoBottle Co',
    task: 'Social Media Strategy Launch',
    fullTask: 'Develop comprehensive social media strategy for eco-friendly water bottle launch targeting millennials and Gen Z. Deliverables include platform strategy, content calendar, influencer partnerships, community building approach, and budget allocation across 6-week campaign timeline.',
    taskId: 'EC-3021',
    confidence: 0.99
  };

  const agents = [
    { 
      id: 1, 
      name: 'Muse',
      role: 'Strategy',
      emoji: '🧠'
    },
    { 
      id: 2, 
      name: 'Scout',
      role: 'Research',
      emoji: '🕵️‍♂️'
    },
    { 
      id: 3, 
      name: 'Echo',
      role: 'Copy',
      emoji: '✍️'
    },
    { 
      id: 4, 
      name: 'Atlas',
      role: 'QA',
      emoji: '🛡️'
    },
    { 
      id: 5, 
      name: 'Beacon',
      role: 'Translation',
      emoji: '🌍'
    }
  ];

  // Get agent ID from agent name
  const getAgentId = (agentName: string) => {
    const agentMap: Record<string, number> = {
      'Muse': 1,
      'Scout': 2,
      'Echo': 3,
      'Atlas': 4,
      'Beacon': 5,
      'Operator': -1 // No glow for operator
    };
    return agentMap[agentName] ?? 1; // Default to Muse if unknown
  };

  // Handle scroll to detect which agent's message is in the middle
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerMiddle = containerRect.top + containerRect.height / 2;
      
      // Find all message elements
      const messageElements = container.querySelectorAll('[data-agent-message]');
      
      let closestElement: Element | null = null;
      let closestDistance = Infinity;
      
      messageElements.forEach((element: Element) => {
        const rect = element.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(elementMiddle - containerMiddle);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      });
      
      if (closestElement !== null) {
        const agentName = (closestElement as Element).getAttribute('data-agent-message') || '';
        const agentId = getAgentId(agentName);
        
        // Only set talking agent if it's an actual agent (not Operator)
        if (agentId !== -1) {
          setTalkingAgent(agentId);
        } else {
          // Operator message - no agent should glow
          setTalkingAgent(null);
        }
      } else {
        // No messages in view - no agent should glow
        setTalkingAgent(null);
      }
    };
    
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [messages]); // Re-run when messages change

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

  const getAgentDotColor = (agentName: string) => {
    const dotColorMap: Record<string, string> = {
      'Muse': 'bg-fuchsia-500',
      'Scout': 'bg-emerald-500',
      'Echo': 'bg-blue-500',
      'Atlas': 'bg-orange-500',
      'Beacon': 'bg-cyan-500'
    };
    return dotColorMap[agentName] || 'bg-slate-400';
  };

  const getAgentIcon = (agentName: string) => {
    const iconMap: Record<string, string> = {
      'Muse': '🧠',
      'Scout': '🕵️‍♂️',
      'Echo': '✍️',
      'Atlas': '🛡️',
      'Beacon': '🌍',
      'Operator': '👤'
    };
    return iconMap[agentName] || '👤';
  };

  const getAgentMessageColor = (agentName: string) => {
    const agentColorMap: Record<string, string> = {
      'Muse': 'bg-fuchsia-100 border-fuchsia-200',
      'Scout': 'bg-emerald-100 border-emerald-200',
      'Echo': 'bg-blue-100 border-blue-200',
      'Atlas': 'bg-orange-100 border-orange-200',
      'Beacon': 'bg-cyan-100 border-cyan-200',
      'Operator': 'bg-slate-100 border-slate-200'
    };
    return agentColorMap[agentName] || 'bg-white border-slate-200';
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        agent: 'Operator',
        content: newMessage
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <div className={`${isExpanded ? 'w-[25vw]' : 'w-80'} h-screen bg-white text-slate-900 flex flex-col font-inter shadow-2xl relative transition-all duration-300`}>
      {/* Expand/Collapse Arrow */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white border border-slate-200 rounded-l-lg px-2 py-4 shadow-lg hover:shadow-xl transition-all hover:bg-slate-50 z-50"
        style={{ left: '-32px' }}
      >
        {isExpanded ? (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        )}
      </button>
      {/* Header - Bright and Clean */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">        
        {/* Task Name with Clickable Details */}
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
          
          {/* Expandable Details */}
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
                <span className="text-xs text-slate-600 font-medium">Synced • {(clickupContext.confidence * 100).toFixed(0)}% confidence</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collaboration Graph - Collapsible */}
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
          <div className="space-y-3">
            <div className={`h-24 bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-sm transition-all duration-300 overflow-hidden flex items-center justify-center`}>
              <div className={`flex items-center ${isExpanded ? 'gap-14' : 'gap-3'}`}>
                {agents.map((agent) => {
                  const iconSize = isExpanded ? 'w-10 h-10' : 'w-8 h-8';
                  const emojiSize = isExpanded ? 'text-xl' : 'text-base';
                  
                  return (
                    <div
                      key={agent.id}
                      className="flex flex-col items-center"
                    >
                      <div className={`${iconSize} rounded-xl border-2 flex items-center justify-center shadow-lg bg-white border-slate-300 ${
                        talkingAgent === agent.id ? getAgentGlow(agent.name) : ''
                      }`}>
                        <span className={emojiSize}>{agent.emoji}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 ${getAgentDotColor(agent.name)} shadow-sm`}></div>
                      
                      {/* Agent name and stats */}
                      <div className="mt-1 text-center">
                        <div className={`${isExpanded ? 'text-sm' : 'text-xs'} font-semibold text-slate-700 whitespace-nowrap`}>{agent.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Area - Clean and Bright */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
        {/* Conversation - Maximum Space with Bright Design */}
        <div className="flex-1 overflow-y-auto px-4 py-4 relative" ref={scrollContainerRef}>
          {/* Optional: Visual indicator for middle zone (remove for production) */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 hover:opacity-100 transition-opacity z-10" />
          
          <div className="space-y-4">
            {messages.map((message) => {
              const agentEmoji = getAgentIcon(message.agent);
              return (
                <div 
                  key={message.id} 
                  className="flex gap-3 group transition-all duration-300"
                  data-agent-message={message.agent}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-base">{agentEmoji}</span>
                  </div>
                  <div className={`flex-1 min-w-0 rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow ${getAgentMessageColor(message.agent)}`}>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {message.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Input - Modern and Clean */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Direct your agents..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 px-4 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl group"
            >
              <span className="text-white text-base group-hover:scale-110 group-active:scale-100 transition-all duration-200" style={{textShadow: 'none'}} onMouseEnter={(e) => (e.target as HTMLElement).style.textShadow = '4px 4px 12px rgba(0,0,0,0.8)'} onMouseLeave={(e) => (e.target as HTMLElement).style.textShadow = 'none'}>➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseOperatorUI;