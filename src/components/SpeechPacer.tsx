import React, { useState, useEffect, useRef } from 'react';
import { teleprompterScripts } from '../data/modulesData';
import { TeleprompterScript } from '../types';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Sliders, Type, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SpeechPacer() {
  const [selectedScriptId, setSelectedScriptId] = useState<string>(teleprompterScripts[0].id);
  const [customText, setCustomText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(24); // px
  const [scrollSpeed, setScrollSpeed] = useState<number>(30); // scale 1-100
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  // Load selected script or use custom
  const currentScript: TeleprompterScript = isCustomMode 
    ? {
        id: 'custom',
        title: 'Your Custom Speech',
        category: 'Self Practice',
        text: customText || 'Type your practice speech here to use the teleprompter...',
        targetWpm: 140,
        pacingHints: []
      }
    : teleprompterScripts.find(s => s.id === selectedScriptId) || teleprompterScripts[0];

  const wordsArray = currentScript.text.split(' ');
  const totalWords = wordsArray.length;

  // Words Read Estimator based on average reading rate & elapsed time
  const estimatedWordsRead = Math.min(
    totalWords,
    Math.round((currentScript.targetWpm / 60) * elapsedSeconds)
  );

  // Current actual WPM
  const currentActualWpm = elapsedSeconds > 0 
    ? Math.round((estimatedWordsRead / elapsedSeconds) * 60) 
    : 0;

  // Handle play/pause timer
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

  // Handle teleprompter auto-scrolling
  useEffect(() => {
    if (isPlaying && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollStep = () => {
        if (!isPlaying) return;
        // Scroll speed calculation: translate slider 1-100 into standard pixel increments
        const pxIncrement = (scrollSpeed / 100) * 0.8;
        container.scrollTop += pxIncrement;
        scrollIntervalRef.current = requestAnimationFrame(scrollStep);
      };
      scrollIntervalRef.current = requestAnimationFrame(scrollStep);
    } else {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
      }
    };
  }, [isPlaying, scrollSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Format time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Find active pacing hint
  const activeHint = currentScript.pacingHints.find(hint => {
    // Show hint if estimated words read is near the target word index
    return Math.abs(estimatedWordsRead - hint.wordIndex) < 5 && elapsedSeconds > 2;
  });

  return (
    <div id="speech-pacer-container" className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none shadow-none overflow-hidden flex flex-col md:flex-row h-[700px]">
      
      {/* Settings Panel */}
      <div id="pacer-sidebar" className="w-full md:w-80 bg-[#EAE8D5] border-r-2 border-[#1A1A1A] p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono">
              Pacing & Vocalics
            </span>
            <h3 className="text-2xl font-bold font-serif italic text-[#1A1A1A] mt-2.5">Speech Pacing Lab</h3>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Read along with the teleprompter and match the professional target pacing (130-150 WPM).
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex bg-[#FDFCF0] p-1 border border-[#1A1A1A] rounded-none">
            <button
              id="script-preset-btn"
              onClick={() => { setIsCustomMode(false); handleReset(); }}
              className={`flex-1 text-xs font-bold py-2 rounded-none transition-all cursor-pointer ${!isCustomMode ? 'bg-[#1A1A1A] text-[#FDFCF0] font-serif italic' : 'text-[#1A1A1A]/60 hover:line-through'}`}
            >
              Preset Scripts
            </button>
            <button
              id="custom-script-btn"
              onClick={() => { setIsCustomMode(true); handleReset(); }}
              className={`flex-1 text-xs font-bold py-2 rounded-none transition-all cursor-pointer ${isCustomMode ? 'bg-[#1A1A1A] text-[#FDFCF0] font-serif italic' : 'text-[#1A1A1A]/60 hover:line-through'}`}
            >
              Custom Text
            </button>
          </div>

          {!isCustomMode ? (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A1A1A] block font-mono uppercase tracking-wider">Select Practice Script</label>
              <select
                id="script-select"
                value={selectedScriptId}
                onChange={(e) => { setSelectedScriptId(e.target.value); handleReset(); }}
                className="w-full px-3 py-2 bg-[#FDFCF0] rounded-none border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] focus:outline-none font-mono"
              >
                {teleprompterScripts.map(script => (
                  <option key={script.id} value={script.id}>{script.title}</option>
                ))}
              </select>
              <div className="bg-[#FDFCF0] p-3 border-2 border-[#1A1A1A] rounded-none">
                <p className="text-xs font-bold text-[#1A1A1A]">Category: <span className="text-[#D44D26] font-serif italic">{currentScript.category}</span></p>
                <p className="text-xs text-[#1A1A1A]/70 mt-1 font-mono">Target Speed: <span className="font-bold text-[#1A1A1A]">{currentScript.targetWpm} WPM</span></p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A1A1A] block font-mono uppercase tracking-wider">Paste Your Presentation Text</label>
              <textarea
                id="custom-script-textarea"
                rows={6}
                value={customText}
                onChange={(e) => { setCustomText(e.target.value); handleReset(); }}
                placeholder="Type or paste your own script here to train your pacing..."
                className="w-full px-3 py-2 bg-[#FDFCF0] rounded-none border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] focus:outline-none resize-none font-sans"
              />
            </div>
          )}

          {/* Display Controls */}
          <div className="space-y-4 border-t border-[#1A1A1A]/20 pt-4">
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sliders className="w-3.5 h-3.5 text-[#D44D26]" />
              Teleprompter Setup
            </h4>

            {/* Font Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#1A1A1A] font-bold font-mono">
                <span className="flex items-center gap-1"><Type className="w-3.5 h-3.5 text-[#D44D26]" /> Font Size</span>
                <span>{fontSize}px</span>
              </div>
              <input
                id="font-size-slider"
                type="range"
                min="18"
                max="36"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-[#D44D26]"
              />
            </div>

            {/* Scroll Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#1A1A1A] font-bold font-mono">
                <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 rotate-90 text-[#D44D26]" /> Scroll Speed</span>
                <span>{scrollSpeed}%</span>
              </div>
              <input
                id="scroll-speed-slider"
                type="range"
                min="10"
                max="80"
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className="w-full accent-[#D44D26]"
              />
            </div>
          </div>
        </div>

        {/* Diagnostic Metrics */}
        <div className="border-t border-[#1A1A1A]/20 pt-4 mt-6">
          <div className="bg-[#FDFCF0] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-none p-4 space-y-3.5 font-mono">
            <div className="flex justify-between items-center text-xs text-[#1A1A1A]/60">
              <span>ELAPSED TIME</span>
              <span className="text-[#D44D26] font-bold text-sm">{formatTime(elapsedSeconds)}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-[#1A1A1A]/60">
              <span>EST. WORDS READ</span>
              <span className="text-[#1A1A1A] font-bold">{estimatedWordsRead} / {totalWords}</span>
            </div>

            <div className="h-2.5 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
              <div 
                className="h-full bg-[#D44D26] transition-all duration-300" 
                style={{ width: `${(estimatedWordsRead / totalWords) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-[#1A1A1A]/60">
              <span>EST. CURRENT PACE</span>
              <span className={`font-bold text-sm ${currentActualWpm > currentScript.targetWpm + 15 ? 'text-[#D44D26]' : currentActualWpm < currentScript.targetWpm - 15 ? 'text-amber-600' : 'text-emerald-700'}`}>
                {currentActualWpm} WPM
              </span>
            </div>

            <div className="text-[10px] text-[#1A1A1A]/70 leading-normal border-t border-[#1A1A1A]/20 pt-2 flex items-center gap-1 font-sans">
              <Info className="w-3 h-3 text-[#D44D26] shrink-0" />
              <span>Target: {currentScript.targetWpm} WPM. (Ideal pace for clarity).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Teleprompter Display Screen */}
      <div id="prompter-display" className="flex-1 flex flex-col bg-[#FDFCF0] relative overflow-hidden">
        
        {/* Horizontal reading line guide overlay */}
        <div className="absolute top-1/2 left-0 right-0 h-16 bg-[#EAE8D5]/20 border-y-2 border-[#1A1A1A]/30 pointer-events-none flex items-center px-4 justify-between">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D44D26]/80 font-mono">Reading Target Guide</div>
          <div className="w-2.5 h-2.5 rounded-none bg-[#D44D26] animate-pulse border border-[#1A1A1A]" />
        </div>

        {/* Synchronized Pacing/Vocalic Hints */}
        <div className="h-14 bg-[#EAE8D5] border-b-2 border-[#1A1A1A] px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#D44D26] border border-[#1A1A1A] rounded-none" />
            <span className="text-xs text-[#1A1A1A] font-bold font-mono uppercase tracking-wider">Synchronized Tutor Feedback</span>
          </div>
          
          <AnimatePresence mode="wait">
            {activeHint ? (
              <motion.div
                key={activeHint.hint}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-1.5 text-xs bg-[#D44D26] text-white border border-[#1A1A1A] px-3 py-1 rounded-none font-mono"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-white shrink-0 animate-bounce" />
                <span className="font-bold">{activeHint.hint}</span>
              </motion.div>
            ) : (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-xs text-[#1A1A1A]/50 font-mono italic"
              >
                Tutor monitoring vocal pace...
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable Script Area */}
        <div
          id="prompter-scroll-viewport"
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-10 md:px-20 py-48 text-center scroll-smooth scrollbar-thin"
        >
          <div 
            className="text-[#1A1A1A]/30 transition-all duration-300 select-none text-center font-bold tracking-wide space-y-4 max-w-3xl mx-auto"
            style={{ fontSize: `${fontSize}px` }}
          >
            {wordsArray.map((word, index) => {
              const isRead = index < estimatedWordsRead;
              const isCurrent = index === estimatedWordsRead;
              
              return (
                <span 
                  key={index} 
                  className={`inline-block mr-3 transition-colors duration-200 px-1 rounded-none ${
                    isCurrent 
                      ? 'bg-[#D44D26] text-white font-serif italic scale-105 border border-[#1A1A1A]' 
                      : isRead 
                        ? 'text-[#1A1A1A] opacity-60 line-through decoration-[#D44D26]/60 decoration-2' 
                        : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-[#EAE8D5] border-t-2 border-[#1A1A1A] p-6 flex justify-between items-center z-10">
          <div className="flex gap-2">
            <button
              id="teleprompter-play-pause"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-[#D44D26] text-white hover:bg-[#D44D26]/90' 
                  : 'bg-[#1A1A1A] text-[#FDFCF0] hover:bg-[#1A1A1A]/90'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'Pause Trainer' : 'Start Reading'}
            </button>
            <button
              id="teleprompter-reset"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#1A1A1A] hover:bg-[#FDFCF0] text-[#1A1A1A] bg-[#FDFCF0] rounded-none font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Timer
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs text-[#1A1A1A]/70 font-mono">
            {elapsedSeconds > totalWords / (currentScript.targetWpm / 60) ? (
              <span className="flex items-center gap-1 text-[#D44D26] bg-[#FDFCF0] border-2 border-[#1A1A1A] px-3 py-1.5 rounded-none">
                <CheckCircle className="w-3.5 h-3.5" />
                COMPLETED! Check your pace report.
              </span>
            ) : isPlaying ? (
              <span className="animate-pulse flex items-center gap-1 text-[#1A1A1A] bg-[#FDFCF0] border-2 border-[#1A1A1A] px-3 py-1.5 rounded-none">
                <div className="w-2 h-2 bg-[#D44D26] border border-[#1A1A1A]" />
                Vocal engine tracking speech...
              </span>
            ) : (
              <span>Ready to monitor. Click Start when ready.</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
