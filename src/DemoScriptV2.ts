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
      title: 'Scout: Market Research',
      description: 'Meet Sarah, a marketing manager drowning in deadlines. She needs competitive research that usually takes her entire morning. Watch as Scout instantly analyzes thousands of social posts, finding exactly what competitors are doing right now.'
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
          { field: 'progress', value: 20, animate: true },
          { field: 'document', value: '📊 Market Research Report', animate: true }
        ]
      }
    ]
  },
  {
    id: 'muse-strategy',
    name: 'Muse Strategy',
    explainer: {
      title: 'Muse: Campaign Strategy',
      description: 'Sarah just saved six hours on research, but now she faces another challenge. She needs a complete campaign strategy by lunch. Her boss expects a detailed roadmap that would normally take two full days to develop. Enter Muse, the strategic mastermind.'
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
          { field: 'progress', value: 40, animate: true },
          { field: 'document', value: '📋 Campaign Strategy Document', animate: true }
        ]
      }
    ]
  },
  {
    id: 'echo-scout-collab',
    name: 'Agent Collaboration',
    explainer: {
      title: 'Agents Working Together',
      description: 'Something amazing happens next. Sarah needs personalized influencer outreach, but Echo realizes she needs specific research first. Watch as Echo asks Scout for help, and they collaborate in real time. This is where AI teamwork becomes magical.'
    },
    messages: [
      {
        id: 7,
        agent: 'Operator',
        content: "I need influencer outreach messages that actually convert. This usually takes me all day to research and write.",
        delay: 800
      },
      {
        id: 8,
        agent: 'Echo',
        content: "I'll write personalized outreach messages. Scout, can you quickly research top eco-influencers and their content styles?",
        delay: 1500
      },
      {
        id: 9,
        agent: 'Scout',
        content: "✅ Found 3 perfect matches: @SustainableSara (lifestyle focus, loves storytelling), @EcoWarriorMike (data-driven content), @GreenGenZ (humor and memes). All have 5%+ engagement rates.",
        delay: 2000
      },
      {
        id: 10,
        agent: 'Echo',
        content: "Perfect! ✅ Personalized messages ready: Sara gets storytelling angle about our founder's journey. Mike gets impact data (1M bottles saved). GenZ gets meme-worthy collab idea. Each message tailored to their voice.",
        delay: 2000
      },
      {
        id: 11,
        agent: 'Operator',
        content: "This agent teamwork is incredible! You researched AND wrote personalized outreach in 30 seconds. This saves me an entire day!",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-3', value: '✓ Influencer Outreach', animate: true },
          { field: 'progress', value: 60, animate: true },
          { field: 'document', value: '✉️ Influencer Outreach Templates', animate: true }
        ]
      }
    ]
  },
  {
    id: 'echo-content',
    name: 'Echo Content',
    explainer: {
      title: 'Echo: Content Creation',
      description: 'The clock is ticking. Sarah has strategy and influencer outreach ready, but she still needs launch content. Writing the perfect brand message usually means three hours of drafts, revisions, and second guessing. Echo is about to change everything.'
    },
    messages: [
      {
        id: 12,
        agent: 'Operator',
        content: "Generate the launch content and social copy. Getting the tone right usually takes me 3+ hours of rewrites.",
        delay: 800
      },
      {
        id: 13,
        agent: 'Echo',
        content: "✅ Launch content ready: 'Meet EcoBottle 💧 Every refill saves 3 plastic bottles from our oceans. Join 50,000+ changemakers making waves for our planet. Your daily choice, their future. #RefillRevolution #EcoTok'",
        delay: 2000
      },
      {
        id: 14,
        agent: 'Operator',
        content: "The tone is perfect! You captured our brand voice better than my own drafts. 3 hours → 30 seconds.",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-4', value: '✓ Content Creation', animate: true },
          { field: 'progress', value: 80, animate: true }
        ]
      }
    ]
  },
  {
    id: 'atlas-compliance',
    name: 'Atlas Compliance',
    explainer: {
      title: 'Atlas: Compliance Review',
      description: 'Sarah has everything ready, but there is one final hurdle. Legal compliance. Usually this means sending everything to legal and waiting two weeks for approval. One wrong claim could mean starting over. Atlas, the guardian of compliance, steps in for the final check.'
    },
    messages: [
      {
        id: 15,
        agent: 'Operator',
        content: "Review everything for legal compliance. Our legal team usually takes 1-2 weeks for this.",
        delay: 800
      },
      {
        id: 16,
        agent: 'Atlas',
        content: "✅ Compliance verified: '3 bottles saved' claim substantiated by EPA data. 'Eco-friendly' meets FTC Green Guides. All hashtags trademark-clear. Zero legal risks identified. Ready to publish.",
        delay: 2000
      },
      {
        id: 17,
        agent: 'Operator',
        content: "You just eliminated 2 weeks of legal back-and-forth! We can launch immediately.",
        delay: 1200
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'subtask-5', value: '✓ Compliance Check', animate: true },
          { field: 'progress', value: 85, animate: true }
        ]
      }
    ]
  },
  {
    id: 'system-complete',
    name: 'System Integration',
    explainer: {
      title: 'The Complete Picture',
      description: 'Watch Sarah\'s transformation. What normally takes three full days just happened in fifteen minutes. Every document created, every strategy perfected, every task completed. Sarah isn\'t just meeting deadlines anymore - she\'s setting the pace. This is Sarah supercharged. This is the future of work where human creativity meets AI acceleration.'
    },
    messages: [
      {
        id: 18,
        agent: 'Operator',
        content: "This is amazing - I have complete strategies, researched content, and compliance-checked materials all ready to go. What used to consume my entire week is done!",
        delay: 800
      },
      {
        id: 19,
        agent: 'Muse',
        content: "✅ Your complete campaign is live: Market research documented, strategy deployed, influencer templates personalized, content approved, all systems synchronized. You're operating at 10x speed with higher quality than ever.",
        delay: 2000
      },
      {
        id: 20,
        agent: 'Operator',
        content: "I can focus on the big picture now - the creative vision, the client relationships, the strategic decisions that actually need my expertise. My productivity just went through the roof!",
        delay: 1800
      }
    ],
    clickUpUpdates: [
      {
        delay: 2000,
        updates: [
          { field: 'status', value: 'COMPLETED', animate: true },
          { field: 'progress', value: 100, animate: true },
          { field: 'subtask-6', value: '✓ Campaign Live', animate: true }
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