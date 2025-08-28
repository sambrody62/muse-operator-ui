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
    id: 'scout-research',
    name: 'Scout Research',
    explainer: {
      title: '🔍 Scout: Market Research',
      description: 'Scout analyzes competitors and market trends in seconds, saving you 4-6 hours of manual research.'
    },
    messages: [
      {
        id: 1,
        agent: 'Operator',
        content: "I need competitive analysis for our EcoBottle campaign targeting Gen Z and millennials. This usually takes me half a day.",
        delay: 800
      },
      {
        id: 2,
        agent: 'Scout',
        content: "✅ Research complete: Top competitors post 2x daily (9am/7pm), #RefillRevolution trending (2.3B views), Gen Z peaks on TikTok at 7pm, Instagram Reels getting 3x more engagement than posts.",
        delay: 2000,
        actions: [
          { type: 'visual', target: 'data-visualization' }
        ]
      },
      {
        id: 3,
        agent: 'Operator',
        content: "Perfect! You just saved me 6 hours of research and found insights I would've missed.",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-1', value: '✓ Market Research', animate: true },
          { field: 'progress', value: 25, animate: true }
        ]
      }
    ]
  },
  {
    id: 'muse-strategy',
    name: 'Muse Strategy',
    explainer: {
      title: '🧠 Muse: Campaign Strategy',
      description: 'Muse creates comprehensive strategies instantly, replacing 1-2 days of strategic planning.'
    },
    messages: [
      {
        id: 4,
        agent: 'Operator',
        content: "Create a campaign strategy using Scout's research. I need a clear roadmap - this normally takes me days to develop.",
        delay: 800
      },
      {
        id: 5,
        agent: 'Muse',
        content: "✅ 6-week strategy ready: Week 1-2: Build awareness with teaser content. Week 3-4: Engage community with UGC challenges. Week 5-6: Drive conversions with influencer partnerships. Budget split: 40% paid ads, 30% influencers, 30% content creation.",
        delay: 2000
      },
      {
        id: 6,
        agent: 'Operator',
        content: "This strategic framework would've taken me 2 days to create. Now I can focus on the creative vision!",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-2', value: '✓ Campaign Strategy', animate: true },
          { field: 'progress', value: 50, animate: true }
        ]
      }
    ]
  },
  {
    id: 'echo-content',
    name: 'Echo Content',
    explainer: {
      title: '✍️ Echo: Content Creation',
      description: 'Echo writes perfect brand copy instantly, eliminating hours of writing and revisions.'
    },
    messages: [
      {
        id: 7,
        agent: 'Operator',
        content: "Generate the launch content and social copy. Getting the tone right usually takes me 3+ hours of rewrites.",
        delay: 800
      },
      {
        id: 8,
        agent: 'Echo',
        content: "✅ Launch content ready: 'Meet EcoBottle 💧 Every refill saves 3 plastic bottles from our oceans. Join 50,000+ changemakers making waves for our planet. Your daily choice, their future. #RefillRevolution #EcoTok'",
        delay: 2000
      },
      {
        id: 9,
        agent: 'Operator',
        content: "The tone is perfect! You captured our brand voice better than my own drafts. 3 hours → 30 seconds.",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-3', value: '✓ Content Creation', animate: true },
          { field: 'progress', value: 75, animate: true }
        ]
      }
    ]
  },
  {
    id: 'atlas-compliance',
    name: 'Atlas Compliance',
    explainer: {
      title: '🛡️ Atlas: Compliance Review',
      description: 'Atlas validates legal compliance instantly, replacing 1-2 weeks of legal review cycles.'
    },
    messages: [
      {
        id: 10,
        agent: 'Operator',
        content: "Review everything for legal compliance. Our legal team usually takes 1-2 weeks for this.",
        delay: 800
      },
      {
        id: 11,
        agent: 'Atlas',
        content: "✅ Compliance verified: '3 bottles saved' claim substantiated by EPA data. 'Eco-friendly' meets FTC Green Guides. All hashtags trademark-clear. Zero legal risks identified. Ready to publish.",
        delay: 2000
      },
      {
        id: 12,
        agent: 'Operator',
        content: "You just eliminated 2 weeks of legal back-and-forth! We can launch immediately.",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-4', value: '✓ Compliance Check', animate: true },
          { field: 'progress', value: 100, animate: true },
          { field: 'status', value: 'READY TO LAUNCH', animate: true }
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