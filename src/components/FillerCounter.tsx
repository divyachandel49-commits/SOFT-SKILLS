import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, HelpCircle, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FillerTally {
  word: string;
  count: number;
  color: string;
}

export default function FillerCounter() {
  const [tallies, setTallies] = useState<Record<string, number>>({
    'Um / Uh': 0,
    'Like': 0,
    'You Know': 0,
    'So': 0,
    'Actually': 0,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop/start presentation timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleIncrement = (word: string) => {
    // Proactively start timer if not playing
    if (!isPlaying && elapsedSeconds === 0) {
      setIsPlaying(true);
    }
    setTallies(prev => ({ ...prev, [word]: prev[word] + 1 }));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    setTallies({
      'Um / Uh': 0,
      'Like': 0,
      'You Know': 0,
      'So': 0,
      'Actually': 0,
    });
  };

  const totalFillers = tallies['Um / Uh'] + tallies['Like'] + tallies['You Know'] + tallies['So'] + tallies['Actually'];

  // Calculate Fillers Per Minute (FPM)
  const fillersPerMinute = elapsedSeconds > 0 
    ? parseFloat(((totalFillers / elapsedSeconds) * 60).toFixed(1))
    : 0;

  // Format stopwatch
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Determine vocal warning level based on FPM
  const getFpmStatus = () => {
    if (totalFillers === 0) return { label: 'Silent Audit', color: 'text-[#1A1A1A] bg-[#FDFCF0] border-[#1A1A1A]' };
    if (fillersPerMinute < 3) return { label: 'Fluent & Clean (Excellent)', color: 'text-emerald-800 bg-[#FDFCF0] border-emerald-800' };
    if (fillersPerMinute < 7) return { label: 'Moderate Filler Usage', color: 'text-amber-800 bg-[#FDFCF0] border-amber-800' };
    return { label: 'Heavy Filler Load (Needs Practice)', color: 'text-[#D44D26] bg-[#FDFCF0] border-[#D44D26]' };
  };

  const fpmStatus = getFpmStatus();

  return (
    <div id="filler-counter-container" className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-6 lg:p-8 space-y-8">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b-2 border-[#1A1A1A] pb-5">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono">
            Real-time presentation audit
          </span>
          <h3 className="text-3xl font-bold font-serif italic text-[#1A1A1A] mt-2">Vocal Filler Counter</h3>
          <p className="text-xs text-[#1A1A1A]/70 font-sans">
            Audit your presentation speech. Tap the buttons below whenever you hear a filler word to track pacing and verbal clarity.
          </p>
        </div>
        
        {/* Stopwatch & Metrics Panel */}
        <div className="flex items-center gap-4 bg-[#EAE8D5] border-2 border-[#1A1A1A] px-5 py-3 rounded-none shrink-0 font-mono text-[#1A1A1A]">
          <div className="text-center">
            <span className="text-[9px] font-bold text-[#1A1A1A]/60 block uppercase">SPEECH TIMER</span>
            <span className="text-lg font-bold text-[#1A1A1A]">{formatTime(elapsedSeconds)}</span>
          </div>
          <div className="w-[1.5px] h-6 bg-[#1A1A1A]/20" />
          <div className="text-center">
            <span className="text-[9px] font-bold text-[#1A1A1A]/60 block uppercase font-mono">TOTAL FILLERS</span>
            <span className="text-lg font-bold text-[#1A1A1A]">{totalFillers}</span>
          </div>
          <div className="w-[1.5px] h-6 bg-[#1A1A1A]/20" />
          <div className="text-center">
            <span className="text-[9px] font-bold text-[#1A1A1A]/60 block uppercase">FILLERS / MIN</span>
            <span className="text-lg font-extrabold text-[#D44D26]">{fillersPerMinute}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Audit Push Buttons Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-[#1A1A1A] pb-2">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">Tactile Auditing Panel</span>
            <span className="text-[10px] text-[#1A1A1A]/60 font-mono">Tap to record word occurrence</span>
          </div>

          <div id="filler-buttons-grid" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.keys(tallies).map(word => (
              <motion.button
                key={word}
                id={`filler-btn-${word.replace(/\s+/g, '-').toLowerCase()}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleIncrement(word)}
                className="h-28 rounded-none border-2 border-[#1A1A1A] bg-[#FDFCF0] hover:bg-[#EAE8D5] text-[#1A1A1A] flex flex-col justify-between p-4 text-left transition-all relative overflow-hidden group shadow-none cursor-pointer"
              >
                <span className="text-base font-bold text-[#1A1A1A] font-serif italic tracking-tight truncate w-full">{word}</span>
                
                <div className="flex justify-between items-baseline w-full">
                  <span className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-semibold font-mono">Tally</span>
                  <span className="text-3xl font-black text-[#D44D26] font-mono tracking-tight group-hover:scale-110 transition-transform">
                    {tallies[word]}
                  </span>
                </div>
              </motion.button>
            ))}

            {/* Manual controls integrated in the grid */}
            <div className="flex flex-col gap-2 justify-between rounded-none">
              <button
                id="filler-timer-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 flex items-center justify-center gap-2 rounded-none text-xs font-bold uppercase tracking-wider border-2 border-[#1A1A1A] py-3 cursor-pointer transition-all ${
                  isPlaying 
                    ? 'bg-[#D44D26] text-white hover:bg-[#D44D26]/90' 
                    : 'bg-[#1A1A1A] text-[#FDFCF0] hover:bg-[#1A1A1A]/90'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                {isPlaying ? 'Pause Timer' : 'Start Timer'}
              </button>
              <button
                id="filler-reset-btn"
                onClick={handleReset}
                className="py-3 bg-[#FDFCF0] hover:bg-[#EAE8D5] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-none text-xs font-bold uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Audit
              </button>
            </div>
          </div>
        </div>

        {/* Audit Metrics & Analysis Card (5 Cols) */}
        <div id="filler-analysis-panel" className="lg:col-span-5 bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A]/20 pb-2">
              <BarChart2 className="w-4 h-4 text-[#D44D26]" />
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">Linguistic Analysis Report</span>
            </div>

            {/* Diagnostic warning alert depending on FPM */}
            <div className={`p-4 rounded-none border-2 border-[#1A1A1A] text-xs flex gap-2.5 items-start ${fpmStatus.color}`}>
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#D44D26]" />
              <div>
                <span className="font-bold block font-mono text-[11px] uppercase tracking-wider">Clarity Status:</span>
                <span className="font-sans leading-normal font-bold text-xs">{fpmStatus.label}</span>
              </div>
            </div>

            {/* Filler usage metrics progress bars */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest block font-mono">Percentage Distribution</span>
              {Object.keys(tallies).map(word => {
                const count = tallies[word];
                const percentage = totalFillers > 0 ? Math.round((count / totalFillers) * 100) : 0;
                
                return (
                  <div key={word} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#1A1A1A] font-serif italic">{word}</span>
                      <span className="text-[#1A1A1A]/70 font-mono text-[10px]">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-3 bg-[#FDFCF0] border border-[#1A1A1A] rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-[#D44D26] transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-[#1A1A1A]/80 leading-relaxed flex gap-1.5 bg-[#FDFCF0] p-4 border-2 border-[#1A1A1A] rounded-none mt-6">
            <HelpCircle className="w-4 h-4 text-[#D44D26] mt-0.5 shrink-0" />
            <span className="font-sans">
              <strong>English Lab Goal:</strong> Professional speakers average less than 3 fillers per minute. Reducing filler words increases vocal gravitas, giving your arguments more intellectual weight.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
