export interface DemoMessage {
  id: number;
  agent: 'Scout' | 'Muse' | 'Echo' | 'Atlas' | 'Operator';
  content: string;
  delay: number; // milliseconds before showing this message
  actions?: {
    type: 'highlight' | 'update' | 'button' | 'visual';
    target?: string;
    value?: any;
  }[];
  options?: {
    label: string;
    action: string;
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
    id: 'initialization',
    name: 'Extension Activation',
    explainer: {
      title: '🚀 Your AI Team Activates',
      description: 'Watch how AI agents become your force multipliers. What used to take hours of manual research is done in seconds. You stay in control while AI handles the heavy lifting.'
    },
    messages: [
      {
        id: 1,
        agent: 'Scout',
        content: "I'm analyzing your EcoBottle Co campaign task. I can see you need a social media strategy for eco-conscious millennials and Gen Z...",
        delay: 1000,
        actions: [
          { type: 'visual', target: 'scanning-animation' }
        ]
      },
      {
        id: 2,
        agent: 'Scout',
        content: "I've identified key requirements:\n• 6-week campaign timeline\n• Target: Millennials & Gen Z\n• Deliverables: Content calendar, influencer partnerships, budget allocation\n• Due: December 15th",
        delay: 3000,
        actions: [
          { type: 'highlight', target: 'task-dates' },
          { type: 'highlight', target: 'task-description' }
        ]
      },
      {
        id: 3,
        agent: 'Scout',
        content: "I'm gathering competitor data and market insights. One moment...",
        delay: 2000,
        actions: [
          { type: 'visual', target: 'research-animation' }
        ]
      },
      {
        id: 4,
        agent: 'Operator',
        content: "This is already saving me hours of research! Usually I'd spend half a day just gathering this competitive data.",
        delay: 2500
      }
    ]
  },
  {
    id: 'strategic-overview',
    name: 'Muse Strategic Planning',
    explainer: {
      title: '🧠 10x Faster Planning',
      description: 'Your strategic thinking + AI execution speed = superhuman productivity. Muse creates in minutes what typically takes hours, letting you focus on high-value decisions.'
    },
    messages: [
      {
        id: 4,
        agent: 'Muse',
        content: "Based on Scout's research, I recommend a three-phase approach: Awareness, Engagement, and Conversion. The eco-conscious market responds best to authentic storytelling.",
        delay: 2500,
        actions: [
          { type: 'visual', target: 'timeline-visual' }
        ]
      },
      {
        id: 5,
        agent: 'Muse',
        content: "Should we start with the content calendar or influencer strategy first?",
        delay: 2000,
        options: [
          { label: 'Content Calendar', action: 'content-calendar' },
          { label: 'Influencer Strategy', action: 'influencer-strategy' }
        ]
      },
      {
        id: 6,
        agent: 'Operator',
        content: "Content Calendar first - that's our immediate priority. The fact that you understand our workflow already is incredible!",
        delay: 1500
      }
    ]
  },
  {
    id: 'content-creation',
    name: 'Echo Content Generation',
    explainer: {
      title: '✍️ 2-3 Hours → 30 Seconds',
      description: 'Echo generates professional content instantly. You\'re not replaced - you\'re empowered. Edit, approve, and move on to strategic work while AI handles the drafting.'
    },
    messages: [
      {
        id: 6,
        agent: 'Muse',
        content: "Perfect choice. Echo, can you help create compelling content themes?",
        delay: 500
      },
      {
        id: 7,
        agent: 'Echo',
        content: "I'll create a themed content approach. Here's what resonates with eco-conscious audiences:\n\n**Week 1: Launch & Awareness**\n• Monday: \"Meet Your New Sustainable Companion\" (Product reveal)\n• Wednesday: \"5 Plastic Bottles Saved with Every Refill\" (Impact stats)\n• Friday: \"Join the #RefillRevolution\" (Community challenge)",
        delay: 2500,
        actions: [
          { type: 'visual', target: 'content-preview' }
        ]
      },
      {
        id: 8,
        agent: 'Echo',
        content: "I can generate the actual post copy for each of these. Shall I proceed?",
        delay: 2000,
        options: [
          { label: 'Generate Copy', action: 'generate-copy' },
          { label: 'Modify Themes', action: 'modify-themes' }
        ]
      },
      {
        id: 9,
        agent: 'Operator',
        content: "Yes, generate the copy! This would normally take me 2-3 hours to write. Can you make sure it matches our brand voice - friendly but professional?",
        delay: 1500
      },
      {
        id: 10,
        agent: 'Echo',
        content: "Absolutely! I've analyzed your brand guidelines. Creating copy that's approachable yet authoritative, with focus on sustainability impact. This will be ready in seconds instead of hours.",
        delay: 2000
      }
    ],
    clickUpUpdates: [
      {
        delay: 3500,
        updates: [
          { field: 'subtask-1', value: 'Week 1: Launch & Awareness Content', animate: true },
          { field: 'subtask-2', value: 'Week 2: Engagement Content', animate: true },
          { field: 'progress', value: 20, animate: true }
        ]
      }
    ]
  },
  {
    id: 'clickup-sync',
    name: 'Task Updates',
    explainer: {
      title: '🔄 Zero Manual Updates',
      description: 'No more context switching! Agents update ClickUp automatically as work progresses. You save 30+ minutes per day just on task management alone.'
    },
    messages: [
      {
        id: 11,
        agent: 'Muse',
        content: "I'm updating your ClickUp task with this structure...",
        delay: 1000,
        actions: [
          { type: 'update', target: 'status', value: 'IN PROGRESS' },
          { type: 'update', target: 'subtasks', value: '+2' }
        ]
      },
      {
        id: 12,
        agent: 'Operator',
        content: "Amazing - I love that it automatically updates ClickUp! No more manual task management. This is like having a whole team working with me.",
        delay: 2000
      }
    ],
    clickUpUpdates: [
      {
        delay: 1500,
        updates: [
          { field: 'status', value: 'IN PROGRESS', animate: true },
          { field: 'progress', value: 40, animate: true }
        ]
      }
    ]
  },
  {
    id: 'competitive-insights',
    name: 'Scout Data Analysis',
    explainer: {
      title: '📊 Days of Research → Minutes',
      description: 'Scout analyzes competitors, trends, and data across the entire web. What takes days of manual research is delivered in minutes, with better coverage than humanly possible.'
    },
    messages: [
      {
        id: 10,
        agent: 'Scout',
        content: "Quick update: I found that your competitors post 3x daily, but engagement peaks at 2 posts. Also, #EcoWarrior and #SustainableLiving are trending up 40% this month.",
        delay: 2000,
        actions: [
          { type: 'visual', target: 'data-chart' }
        ]
      },
      {
        id: 14,
        agent: 'Scout',
        content: "Should I research influencer partnerships next?",
        delay: 2000,
        options: [
          { label: 'Yes, research influencers', action: 'research-influencers' },
          { label: 'Focus on content first', action: 'focus-content' }
        ]
      },
      {
        id: 15,
        agent: 'Operator',
        content: "Yes! I used to spend days finding the right influencers. If you can narrow it down to aligned partners, that's a huge time saver.",
        delay: 1500
      },
      {
        id: 16,
        agent: 'Scout',
        content: "On it! I'll analyze engagement rates, audience demographics, and brand alignment. What would take days of manual research will be ready in minutes.",
        delay: 2000
      }
    ]
  },
  {
    id: 'user-question',
    name: 'TikTok Strategy',
    explainer: {
      title: '💬 Natural Interaction',
      description: 'You can jump in anytime with questions. The agents understand context and adapt their work based on your input. Here, they pivot to address TikTok strategy.'
    },
    messages: [
      {
        id: 17,
        agent: 'Operator',
        content: "What about TikTok strategy? I'm not as familiar with that platform but know we need to be there.",
        delay: 1000
      },
      {
        id: 13,
        agent: 'Muse',
        content: "Great question! TikTok is crucial for Gen Z reach.",
        delay: 1500
      },
      {
        id: 14,
        agent: 'Echo',
        content: "I can adapt our content for TikTok's format - quick tips, unboxing videos, and sustainability challenges work best.",
        delay: 2000
      },
      {
        id: 20,
        agent: 'Scout',
        content: "67% of eco-conscious Gen Z discover products on TikTok. Peak times are 6-10am and 7-11pm.",
        delay: 2500,
        actions: [
          { type: 'visual', target: 'tiktok-stats' }
        ]
      },
      {
        id: 21,
        agent: 'Operator',
        content: "This is exactly the data-driven approach I needed! You're helping me make informed decisions instead of guessing. I feel so much more confident about this campaign now.",
        delay: 2000
      }
    ],
    clickUpUpdates: [
      {
        delay: 4000,
        updates: [
          { field: 'subtask-3', value: 'TikTok Content Strategy', animate: true },
          { field: 'progress', value: 50, animate: true }
        ]
      }
    ]
  },
  {
    id: 'quality-check',
    name: 'Atlas Review',
    explainer: {
      title: '🛡️ Instant Compliance Check',
      description: 'Atlas eliminates days of legal review cycles. Instant compliance checking means you ship faster with confidence. No more bottlenecks, no more delays.'
    },
    messages: [
      {
        id: 16,
        agent: 'Atlas',
        content: "I've reviewed the content calendar for brand consistency and compliance. All good, but I recommend adding sustainability certifications to posts for credibility.",
        delay: 2000,
        actions: [
          { type: 'visual', target: 'checklist' }
        ]
      },
      {
        id: 23,
        agent: 'Atlas',
        content: "The campaign meets all brand guidelines. ✓ Brand voice consistent ✓ Legal compliance checked ✓ Sustainability claims verified",
        delay: 2500
      },
      {
        id: 24,
        agent: 'Operator',
        content: "Having automatic compliance checking is a game-changer! This usually requires multiple review rounds with legal. You're saving me days of back-and-forth.",
        delay: 2000
      }
    ]
  },
  {
    id: 'completion',
    name: 'Summary & Next Steps',
    explainer: {
      title: '✅ 2-3 Days Work in 10 Minutes',
      description: 'You\'ve just accomplished days of work in minutes. You\'re not being replaced - you\'re being amplified. Focus on strategy, creativity, and relationships while AI handles the rest.'
    },
    messages: [
      {
        id: 18,
        agent: 'Muse',
        content: "Excellent progress! We've created:\n✓ 2-week content calendar\n✓ Platform strategy\n✓ Posting schedule\n✓ Initial content themes",
        delay: 2000,
        actions: [
          { type: 'visual', target: 'success-animation' }
        ]
      },
      {
        id: 26,
        agent: 'Muse',
        content: "Your ClickUp task is now 50% complete. Next, we should tackle influencer partnerships. Ready when you are!",
        delay: 2500
      },
      {
        id: 27,
        agent: 'Operator',
        content: "In just 10 minutes, we've accomplished what usually takes me 2-3 DAYS! This isn't replacing my job - it's making me 10x more effective. I can focus on strategy and creativity while you handle the time-consuming research and drafting. This is the future of work!",
        delay: 3000
      }
    ],
    clickUpUpdates: [
      {
        delay: 1000,
        updates: [
          { field: 'progress', value: 50, animate: true }
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