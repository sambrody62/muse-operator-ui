import React, { useEffect, useState, useRef } from "react";

/**
 * Demo-ready React component you can run directly in a React + Tailwind project.
 * Includes an automatic tooltip walkthrough with manual controls.
 */

const defaultDataSources = [
  { id: "fireflies", name: "Meetings", color: "#FF6B6B", icon: "🎙️" },
  { id: "funnel", name: "Numbers", color: "#4ECDC4", icon: "📊" },
  { id: "foreplay", name: "Ads", color: "#45B7D1", icon: "🎯" },
  { id: "drive", name: "Files", color: "#96CEB4", icon: "📁" },
];

const defaultAgents = [
  { id: "scout", name: "Scout", role: "Research", color: "#8B5CF6" },
  { id: "muse", name: "Muse", role: "Ideas", color: "#EC4899" },
  { id: "echo", name: "Echo", role: "Copy", color: "#3B82F6" },
  { id: "atlas", name: "Atlas", role: "QA", color: "#10B981" },
  { id: "beacon", name: "Beacon", role: "Localization", color: "#F59E0B" },
];

const processingChambers = [
  { id: "db", name: "Database" },
  { id: "llm", name: "Finetuned LLM" },
  { id: "agent", name: "Agent Data" },
  { id: "ladder", name: "Ladder Data" },
];

interface KnowledgeFactoryPageProps {
  title?: string;
  dataSources?: typeof defaultDataSources;
  agents?: typeof defaultAgents;
}

export default function KnowledgeFactoryPage({
  title = "Nucleus Creative Engine",
  dataSources = defaultDataSources,
  agents = defaultAgents,
}: KnowledgeFactoryPageProps) {
  const [isPaused, setIsPaused] = useState(false);
  const steps = ["inputs", "nucleus", "boxes", "agents", "wrap"] as const;
  type Step = typeof steps[number];
  const [stepIndex, setStepIndex] = useState(0);
  const [showWalk, setShowWalk] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and play background music when walkthrough starts
  useEffect(() => {
    if (showWalk && !audioRef.current) {
      audioRef.current = new Audio('/audio/background-music.mp3');
      audioRef.current.volume = 0.14; // Same volume as main demo
      audioRef.current.loop = false;
      audioRef.current.play().catch(err => console.log('Failed to play background music:', err));
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [showWalk]);

  useEffect(() => {
    if (!showWalk) return;
    const advance = setTimeout(() => {
      if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
      else setShowWalk(false);
    }, 4000);
    return () => clearTimeout(advance);
  }, [stepIndex, showWalk, steps.length]);

  const currentStep: Step = steps[stepIndex];

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @keyframes packetOut { 0%{opacity:0; transform:translateX(0);} 20%{opacity:1;} 80%{opacity:1;} 100%{opacity:0; transform:translateX(200px);} }
        @keyframes packetIn { 0%{opacity:0; transform:translateX(0);} 20%{opacity:1;} 80%{opacity:1;} 100%{opacity:0; transform:translateX(-200px);} }
        @keyframes nucleusPulse { 0%,100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(147,197,253,0.6)); } 50% { transform: scale(1.07); filter: drop-shadow(0 0 35px rgba(147,197,253,0.9)); } }
        .packet-out { animation: packetOut 2s linear infinite; }
        .packet-in { animation: packetIn 2s linear infinite; }
        .nucleus-alive { animation: nucleusPulse 4s ease-in-out infinite; background: radial-gradient(circle at 30% 30%, rgba(59,130,246,0.6), rgba(147,51,234,0.4) 70%, rgba(30,58,138,0.3)); }
      `}</style>

      <div className="mx-auto max-w-6xl rounded-xl border border-slate-700 bg-slate-900/40 p-6">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white">{title}</h2>
          <p className="text-slate-300">Sources and helpers flow directly into Nucleus</p>
        </div>

        <div className="relative min-h-[660px]">
          {/* Left Inputs */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-4">
            {dataSources.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className="flex h-12 w-28 items-center justify-center rounded-lg border text-white" style={{borderColor:s.color, backgroundColor:`${s.color}20`}}>
                  <span className="mr-2 text-xl">{s.icon}</span>{s.name}
                </div>
                <div className="h-2 w-64 bg-slate-700 relative overflow-hidden rounded">
                  {!isPaused && (
                    <div className="packet-out absolute left-0 h-2 w-6 rounded" style={{backgroundColor:s.color, animationDelay:`${i*0.5}s`}}></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Agents */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-4">
            {agents.map((a,i)=>(
              <div key={a.id} className="flex items-center gap-2">
                <div className="h-2 w-64 bg-slate-700 relative overflow-hidden rounded">
                  {!isPaused && (
                    <div className="packet-in absolute right-0 h-2 w-6 rounded" style={{backgroundColor:a.color, animationDelay:`${i*0.5}s`}}></div>
                  )}
                </div>
                <div className="flex h-12 w-28 items-center justify-center rounded-lg border text-white" style={{borderColor:a.color, backgroundColor:`${a.color}20`}}>
                  {a.name}
                </div>
              </div>
            ))}
          </div>

          {/* Nucleus Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="flex h-40 w-40 items-center justify-center rounded-full text-white text-2xl font-bold shadow-xl nucleus-alive">
                Nucleus
              </div>
              {processingChambers.map((c,index)=>{
                const angle = (index*90-45)*Math.PI/180;
                const radius = 160;
                const x = Math.cos(angle)*radius;
                const y = Math.sin(angle)*radius;
                return (
                  <div key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:`calc(50% + ${x}px)`, top:`calc(50% + ${y}px)`}}>
                    <div className="h-20 w-28 flex items-center justify-center rounded-lg border border-blue-400 bg-slate-800/80 text-white text-xs font-semibold">
                      {c.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tooltip Walkthrough */}
          {showWalk && (
            <div className="absolute inset-0 pointer-events-none">
              {currentStep === "inputs" && (
                <div className="absolute left-6 top-24 max-w-sm rounded-lg border border-blue-400/60 bg-black/70 p-3 text-sm text-blue-100">
                  <strong className="block text-blue-300 mb-1">1/5 · Context In</strong>
                  Nucleus gathers context from meetings, numbers, ads, and files so you can focus on strategy and creativity.
                </div>
              )}
              {currentStep === "nucleus" && (
                <div className="absolute left-1/2 top-[22%] -translate-x-1/2 max-w-sm rounded-lg border border-blue-400/60 bg-black/70 p-3 text-sm text-blue-100">
                  <strong className="block text-blue-300 mb-1">2/5 · The Creative Partner</strong>
                  Nucleus is like your co-pilot — a creative prediction engine that supports you by suggesting ideas rooted in real data.
                </div>
              )}
              {currentStep === "boxes" && (
                <div className="absolute left-1/2 bottom-[28%] -translate-x-1/2 max-w-md rounded-lg border border-blue-400/60 bg-black/70 p-3 text-sm text-blue-100">
                  <strong className="block text-blue-300 mb-1">3/5 · What Fuels It</strong>
                  Nucleus builds on a strong foundation — databases, fine-tuned models, agent knowledge, and Ladder data — so you don't have to start from scratch.
                </div>
              )}
              {currentStep === "agents" && (
                <div className="absolute right-6 top-24 max-w-sm rounded-lg border border-blue-400/60 bg-black/70 p-3 text-sm text-blue-100">
                  <strong className="block text-blue-300 mb-1">4/5 · Teamwork</strong>
                  Nucleus works alongside Scout, Muse, Echo, Atlas, and Beacon. It shares insights, takes in feedback, and makes each of your outputs stronger. Every output from these agents also makes Nucleus smarter over time.
                </div>
              )}
              {currentStep === "wrap" && (
                <div className="absolute left-1/2 bottom-6 -translate-x-1/2 max-w-xl rounded-lg border border-blue-400/60 bg-black/70 p-3 text-sm text-blue-100">
                  <strong className="block text-blue-300 mb-1">5/5 · Why It Matters</strong>
                  Every time you and your team give feedback, Nucleus learns. That means your job gets easier, your campaigns get smarter, and your creative impact grows.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-slate-300 text-sm">Step {stepIndex + 1} of {steps.length}</span>
          <button onClick={()=>setIsPaused(p=>!p)} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {isPaused?"▶️ Resume":"⏸️ Pause"} Flow
          </button>
          <button onClick={()=>{ 
            setShowWalk(true); 
            setStepIndex(0);
            // Restart music when replaying
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(err => console.log('Failed to replay music:', err));
            }
          }} className="rounded-lg border border-blue-400/60 bg-black/40 px-3 py-2 text-blue-200 hover:bg-black/60 text-sm">
            ↺ Replay Walkthrough
          </button>
          <button onClick={()=> setStepIndex(Math.max(0, stepIndex-1))} disabled={stepIndex===0} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700 text-sm disabled:opacity-40">
            ◀ Prev
          </button>
          <button onClick={()=> setStepIndex(Math.min(steps.length-1, stepIndex+1))} disabled={stepIndex===steps.length-1} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 hover:bg-slate-700 text-sm disabled:opacity-40">
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}