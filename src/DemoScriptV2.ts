export interface DemoMessage {
  id: number;
  agent: 'Scout' | 'Muse' | 'Echo' | 'Atlas' | 'Operator';
  content: string;
  delay: number; // milliseconds before showing this message
  actions?: {
    type: 'highlight' | 'update' | 'visual';
    target?: string;
    value?: any;
  }[];
}

export interface DemoScene {
  id: string;
  name: string;
  messages: DemoMessage[];
  explainer?: {
    title: string;
    description: string;
  };
  clickUpUpdates?: {
    delay: number;
    updates: {
      field: string;
      value: any;
      animate: boolean;
    }[];
  }[];
}

export const demoScript: DemoScene[] = [
  {
    id: 'user-request',
    name: 'User Initiates',
    explainer: {
      title: '🚀 User-Driven Workflow',
      description: 'Watch how the user leads the conversation, asking for specific help. The AI agents respond to real needs, not pre-programmed tasks.'
    },
    messages: [
      {
        id: 1,
        agent: 'Operator',
        content: "I need help with this social media campaign for EcoBottle Co. We're launching an eco-friendly water bottle targeting millennials and Gen Z.",
        delay: 800
      },
      {
        id: 2,
        agent: 'Scout',
        content: "I'm analyzing your task now. I can see you need a comprehensive social media strategy with a 6-week timeline, content calendar, and influencer partnerships.",
        delay: 1500,
        actions: [
          { type: 'highlight', target: 'task-description' }
        ]
      },
      {
        id: 3,
        agent: 'Operator',
        content: "Exactly! Can you research what our competitors are doing? I usually spend hours on this.",
        delay: 1400
      },
      {
        id: 4,
        agent: 'Scout',
        content: "On it! Scanning competitor campaigns across Instagram, TikTok, and LinkedIn...",
        delay: 1200
      },
      {
        id: 5,
        agent: 'Scout',
        content: "Found it: Your top competitor posts 2x daily at 9am, #RefillRevolution is trending.",
        delay: 1800,
        actions: [
          { type: 'visual', target: 'data-visualization' }
        ]
      },
      {
        id: 6,
        agent: 'Operator',
        content: "This is gold! What used to take me half a day is done in seconds. Now, can we create a content calendar based on these insights?",
        delay: 1600
      }
    ]
  },
  {
    id: 'content-planning',
    name: 'Content Strategy',
    explainer: {
      title: '✍️ Hours → Minutes',
      description: 'The user asks for specific deliverables. Watch how quickly the agents produce professional work that would take hours manually.'
    },
    messages: [
      {
        id: 7,
        agent: 'Muse',
        content: "I'll coordinate the content strategy. Based on Scout's research, we should focus on morning posts, video-first content, and leverage the #RefillRevolution trend.",
        delay: 1500
      },
      {
        id: 8,
        agent: 'Echo',
        content: "I'm creating your 2-week launch calendar now. Drafting themed content that aligns with peak engagement times and trending hashtags.",
        delay: 1400
      },
      {
        id: 9,
        agent: 'Echo',
        content: "Monday 9am launch post: 'Meet EcoBottle - Your sustainability companion'",
        delay: 1600
      },
      {
        id: 10,
        agent: 'Operator',
        content: "Perfect! Can you write the actual copy for Monday's launch? Make it friendly but professional - this usually takes me 2-3 hours.",
        delay: 1500
      },
      {
        id: 11,
        agent: 'Echo',
        content: "'Meet EcoBottle 💧 Every refill saves 3 plastic bottles. Join the #RefillRevolution'",
        delay: 1800
      },
      {
        id: 12,
        agent: 'Operator',
        content: "The tone is perfect! You nailed our brand voice. This would've taken me hours, and honestly, yours might be better than what I would've written.",
        delay: 1600
      }
    ],
    clickUpUpdates: [
      {
        delay: 2500,
        updates: [
          { field: 'status', value: 'IN PROGRESS', animate: true },
          { field: 'subtask-1', value: 'Content Calendar - Week 1', animate: true },
          { field: 'progress', value: 25, animate: true }
        ]
      }
    ]
  },
  {
    id: 'influencer-research',
    name: 'Influencer Strategy',
    explainer: {
      title: '🔍 Days of Research → Minutes',
      description: 'The user needs influencer partnerships. Watch how AI instantly analyzes thousands of profiles that would take days to review manually.'
    },
    messages: [
      {
        id: 13,
        agent: 'Operator',
        content: "Now I need help finding influencers. This is where I usually lose days going down rabbit holes. Can you help?",
        delay: 1200
      },
      {
        id: 14,
        agent: 'Scout',
        content: "I'll analyze influencers based on engagement rates, audience overlap, and brand alignment. Scanning eco-conscious creators now...",
        delay: 1400
      },
      {
        id: 15,
        agent: 'Scout',
        content: "Best match: @SustainableSara (89K followers, 5.8% engagement, perfect audience fit)",
        delay: 1800
      },
      {
        id: 16,
        agent: 'Muse',
        content: "Her typical rate: $800/post. You have negotiation leverage with that engagement rate.",
        delay: 1500
      },
      {
        id: 17,
        agent: 'Operator',
        content: "This is incredible intel! You just saved me DAYS of research and gave me negotiation leverage with the rate info. What about TikTok specifically?",
        delay: 1600
      }
    ],
    clickUpUpdates: [
      {
        delay: 3000,
        updates: [
          { field: 'subtask-2', value: 'Influencer Partnerships', animate: true },
          { field: 'progress', value: 40, animate: true }
        ]
      }
    ]
  },
  {
    id: 'platform-specific',
    name: 'TikTok Strategy',
    explainer: {
      title: '📱 Expert Knowledge On-Demand',
      description: 'The user admits knowledge gaps. AI provides instant expertise that would require hiring consultants or extensive training.'
    },
    messages: [
      {
        id: 18,
        agent: 'Echo',
        content: "TikTok is crucial for Gen Z. I'll adapt our content for the platform: 15-second sustainability tips, unboxing videos, and refill station tours.",
        delay: 1500
      },
      {
        id: 19,
        agent: 'Scout',
        content: "TikTok insight: Post at 7pm EST for Gen Z. #EcoTok has 2.3B views.",
        delay: 1500
      },
      {
        id: 20,
        agent: 'Operator',
        content: "I had no idea about these timings! This platform always intimidated me. Can you create a TikTok-specific hook for our launch?",
        delay: 1400
      },
      {
        id: 21,
        agent: 'Echo',
        content: "TikTok hook: 'POV: You're saving the ocean one sip at a time'",
        delay: 1600
      },
      {
        id: 22,
        agent: 'Operator',
        content: "That's exactly the TikTok vibe! I wouldn't have known how to create this hook. You're making me look like a social media expert.",
        delay: 1500
      }
    ]
  },
  {
    id: 'compliance-check',
    name: 'Quality & Compliance',
    explainer: {
      title: '🛡️ Instant Compliance = No Delays',
      description: 'The user needs compliance checking. What typically requires legal review cycles happens instantly, preventing costly delays.'
    },
    messages: [
      {
        id: 23,
        agent: 'Operator',
        content: "Before we go further, can someone check if all our claims are compliant? Legal reviews usually delay us by a week.",
        delay: 1300
      },
      {
        id: 24,
        agent: 'Atlas',
        content: "I'll review everything for compliance now. Checking FTC guidelines, environmental claim regulations, and brand standards...",
        delay: 1400
      },
      {
        id: 25,
        agent: 'Atlas',
        content: "✓ All claims verified. Ready to publish - no legal issues!",
        delay: 1600
      },
      {
        id: 26,
        agent: 'Operator',
        content: "Amazing! You just eliminated a week of back-and-forth with legal. This changes everything about how fast we can move.",
        delay: 1500
      }
    ],
    clickUpUpdates: [
      {
        delay: 2500,
        updates: [
          { field: 'subtask-3', value: 'Compliance Review ✓', animate: true },
          { field: 'progress', value: 60, animate: true }
        ]
      }
    ]
  },
  {
    id: 'wrap-up',
    name: 'Results Summary',
    explainer: {
      title: '✅ 3 Days → 15 Minutes',
      description: 'The user has accomplished days of work in minutes. They\'re not replaced - they\'re empowered to focus on strategy while AI handles execution.'
    },
    messages: [
      {
        id: 27,
        agent: 'Muse',
        content: "Campaign ready: Content created, influencer found, TikTok strategy set, compliance cleared!",
        delay: 1600
      },
      {
        id: 28,
        agent: 'Operator',
        content: "In 15 minutes, we did what usually takes me 3 full days! And the quality is better because you caught things I would've missed.",
        delay: 1500
      },
      {
        id: 29,
        agent: 'Operator',
        content: "This isn't replacing my job - it's making me 10x more effective. I can now focus on creative strategy instead of drowning in research and compliance. This is the future of work!",
        delay: 2000
      },
      {
        id: 30,
        agent: 'Muse',
        content: "Exactly! You bring the vision and creativity, we handle the heavy lifting. Together, we've created something neither could do alone. Ready to tackle the next phase when you are!",
        delay: 1800
      }
    ],
    clickUpUpdates: [
      {
        delay: 1000,
        updates: [
          { field: 'progress', value: 75, animate: true }
        ]
      }
    ]
  }
];

export const getDemoScene = (sceneId: string): DemoScene | undefined => {
  return demoScript.find(scene => scene.id === sceneId);
};

export const getNextScene = (currentSceneId: string): DemoScene | undefined => {
  const currentIndex = demoScript.findIndex(scene => scene.id === currentSceneId);
  if (currentIndex === -1 || currentIndex === demoScript.length - 1) {
    return undefined;
  }
  return demoScript[currentIndex + 1];
};