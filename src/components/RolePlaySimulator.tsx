import React, { useState } from 'react';
import { rolePlayScenarios } from '../data/modulesData';
import { RolePlayScenario, Choice } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, Target, Award, ArrowRight, RefreshCw, Star, MessageSquareCode, ShieldAlert } from 'lucide-react';

export default function RolePlaySimulator() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(rolePlayScenarios[0].id);
  const [currentNodeId, setCurrentNodeId] = useState<string>('intro');
  const [scores, setScores] = useState({ empathy: 50, clarity: 50, professionalism: 50 });
  const [history, setHistory] = useState<{ choiceText: string; scoreChange: any; analysis: string; feedback: string }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentScenario = rolePlayScenarios.find(s => s.id === selectedScenarioId) || rolePlayScenarios[0];
  const currentNode = currentScenario.nodes[currentNodeId] || currentScenario.nodes['intro'];

  const handleChoiceSelect = (choice: Choice) => {
    // Update scores with clamping between 0 and 100
    const newScores = {
      empathy: Math.max(0, Math.min(100, scores.empathy + choice.scoreChange.empathy)),
      clarity: Math.max(0, Math.min(100, scores.clarity + choice.scoreChange.clarity)),
      professionalism: Math.max(0, Math.min(100, scores.professionalism + choice.scoreChange.professionalism)),
    };

    setScores(newScores);
    setHistory(prev => [
      ...prev,
      {
        choiceText: choice.text,
        scoreChange: choice.scoreChange,
        analysis: choice.analysis,
        feedback: choice.feedback,
      }
    ]);

    if (choice.nextNodeId === 'END' || !currentScenario.nodes[choice.nextNodeId] || currentScenario.nodes[choice.nextNodeId].choices.length === 0) {
      // It's a terminal node
      setIsFinished(true);
      if (choice.nextNodeId !== 'END') {
        setCurrentNodeId(choice.nextNodeId);
      }
    } else {
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  const resetSimulator = () => {
    setCurrentNodeId('intro');
    setScores({ empathy: 50, clarity: 50, professionalism: 50 });
    setHistory([]);
    setIsFinished(false);
  };

  // Calculate Overall Rating Grade
  const avgScore = Math.round((scores.empathy + scores.clarity + scores.professionalism) / 3);
  let grade = 'C';
  let gradeColor = 'text-[#D44D26]';
  let feedbackText = 'Keep practicing! Focus on active listening and avoiding aggressive/passive framing.';
  
  if (avgScore >= 85) {
    grade = 'A+';
    gradeColor = 'text-[#D44D26]';
    feedbackText = 'Exceptional soft skills! You project supreme confidence, construct professional boundaries, and prioritize active listening.';
  } else if (avgScore >= 70) {
    grade = 'B';
    gradeColor = 'text-[#1A1A1A]';
    feedbackText = 'Solid communication. With minor adjustments to your boundary assertiveness, you will make an outstanding leader.';
  }

  return (
    <div id="roleplay-simulator-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Scenario Select & Character Bio Panel (3 Cols) */}
      <div id="roleplay-bio-sidebar" className="lg:col-span-4 bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-6 space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono">
            Active Roleplay Lab
          </span>
          <h3 className="text-3xl font-bold font-serif italic text-[#1A1A1A] mt-3">Dialogue Simulator</h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 font-sans">
            Choose a mock scenario to test your English verbal skills and emotional intelligence.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider">Choose Scenario</label>
          <div className="space-y-2">
            {rolePlayScenarios.map(sc => (
              <button
                key={sc.id}
                id={`scenario-tab-${sc.id}`}
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setCurrentNodeId('intro');
                  setScores({ empathy: 50, clarity: 50, professionalism: 50 });
                  setHistory([]);
                  setIsFinished(false);
                }}
                className={`w-full text-left p-3.5 rounded-none border-2 text-xs transition-all cursor-pointer ${
                  selectedScenarioId === sc.id
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF0] font-bold shadow-none'
                    : 'bg-[#FDFCF0] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#EAE8D5] shadow-none'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{sc.title}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-none font-mono uppercase border ${
                    selectedScenarioId === sc.id 
                      ? 'bg-[#D44D26] text-white border-[#FDFCF0]' 
                      : 'bg-[#EAE8D5] text-[#1A1A1A] border-[#1A1A1A]'
                  }`}>
                    {sc.difficulty}
                  </span>
                </div>
                <p className={`text-[10px] mt-1 leading-normal ${selectedScenarioId === sc.id ? 'text-[#FDFCF0]/80' : 'text-[#1A1A1A]/60'}`}>
                  Topic: {sc.topic}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Character Card */}
        <div className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={currentScenario.character.avatar}
              alt={currentScenario.character.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-none object-cover border-2 border-[#1A1A1A]"
            />
            <div>
              <h4 className="text-base font-bold font-serif italic text-[#1A1A1A]">{currentScenario.character.name}</h4>
              <p className="text-[10px] font-bold text-[#D44D26] uppercase tracking-wider font-mono">{currentScenario.character.role}</p>
            </div>
          </div>
          <div className="border-t-2 border-[#1A1A1A] pt-3">
            <p className="text-xs text-[#1A1A1A]/80 italic leading-relaxed">
              "{currentScenario.character.bio}"
            </p>
          </div>
          <div className="bg-[#EAE8D5] p-3 border-2 border-[#1A1A1A] rounded-none text-[10px] text-[#1A1A1A] leading-relaxed">
            <span className="font-bold text-[#1A1A1A] font-mono uppercase tracking-wider block mb-1">Target Outcome:</span>
            {currentScenario.expectedOutcome}
          </div>
        </div>
      </div>

      {/* Main Dialogue Console (8 Cols) */}
      <div id="roleplay-console" className="lg:col-span-8 flex flex-col space-y-6">
        
        {/* Dynamic Metric Dashboard */}
        <div className="bg-[#FDFCF0] border-2 border-[#1A1A1A] p-5 shadow-none rounded-none grid grid-cols-3 gap-4 text-[#1A1A1A]">
          
          {/* Empathy Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1 font-bold font-mono uppercase tracking-wider text-[11px]">
                <Heart className="w-3.5 h-3.5 text-[#D44D26] fill-[#D44D26]" />
                Empathy
              </span>
              <span className="font-bold font-mono">{scores.empathy}%</span>
            </div>
            <div className="h-3 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
              <motion.div 
                className="h-full bg-[#D44D26] rounded-none" 
                animate={{ width: `${scores.empathy}%` }} 
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Clarity Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1 font-bold font-mono uppercase tracking-wider text-[11px]">
                <Target className="w-3.5 h-3.5 text-[#1A1A1A]" />
                Vocal Clarity
              </span>
              <span className="font-bold font-mono">{scores.clarity}%</span>
            </div>
            <div className="h-3 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
              <motion.div 
                className="h-full bg-[#1A1A1A] rounded-none" 
                animate={{ width: `${scores.clarity}%` }} 
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Professionalism Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1 font-bold font-mono uppercase tracking-wider text-[11px]">
                <Award className="w-3.5 h-3.5 text-[#D44D26]" />
                Professionalism
              </span>
              <span className="font-bold font-mono">{scores.professionalism}%</span>
            </div>
            <div className="h-3 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
              <motion.div 
                className="h-full bg-[#D44D26] opacity-80 rounded-none" 
                animate={{ width: `${scores.professionalism}%` }} 
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

        </div>

        {/* Dynamic Screen View */}
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none shadow-none overflow-hidden flex flex-col"
            >
              {/* Active Conversation Bubble */}
              <div className="p-6 bg-[#EAE8D5] border-b-2 border-[#1A1A1A] flex gap-4 items-start">
                <img
                  src={currentScenario.character.avatar}
                  alt={currentScenario.character.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-none object-cover shrink-0 border-2 border-[#1A1A1A] shadow-none"
                />
                <div className="space-y-1 bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-4.5 shadow-none relative w-full">
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-[#FDFCF0] border-l-2 border-b-2 border-[#1A1A1A] rotate-45" />
                  <span className="text-[9px] font-bold text-[#D44D26] uppercase tracking-widest font-mono block mb-1">{currentScenario.character.name} says:</span>
                  <p className="text-sm text-[#1A1A1A] font-serif font-bold italic leading-relaxed">
                    {currentNode.characterResponse}
                  </p>
                </div>
              </div>

              {/* Multiple Choice List */}
              <div id="choices-container" className="p-6 space-y-3 bg-[#FDFCF0]">
                <span className="text-xs font-bold text-[#1A1A1A] font-mono uppercase tracking-wider block mb-2">Select your spoken response:</span>
                
                {currentNode.choices.map((choice, idx) => (
                  <button
                    key={choice.id}
                    id={`choice-btn-${idx}`}
                    onClick={() => handleChoiceSelect(choice)}
                    className="w-full text-left p-4 rounded-none border-2 border-[#1A1A1A] bg-[#FDFCF0] hover:bg-[#EAE8D5] text-xs font-semibold text-[#1A1A1A] transition-all flex items-start gap-3 group shadow-none cursor-pointer"
                  >
                    <span className="bg-[#EAE8D5] text-[#1A1A1A] border border-[#1A1A1A] font-mono font-bold w-6 h-6 rounded-none flex items-center justify-center shrink-0 group-hover:bg-[#1A1A1A] group-hover:text-[#FDFCF0] transition-colors">
                      {idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <p className="leading-relaxed text-[#1A1A1A]">{choice.text}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#D44D26] shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

            </motion.div>
          ) : (
            /* Finished Scorecard Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FDFCF0] border-4 border-[#D44D26] rounded-none p-8 shadow-none flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-[#D44D26] border-2 border-[#1A1A1A] rounded-none flex items-center justify-center text-white">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D44D26] font-mono">Performance Scorecard</span>
                <h3 className="text-3xl font-bold font-serif italic text-[#1A1A1A]">Scenario Completed!</h3>
                <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto">
                  You finished "{currentScenario.title}". The Language Lab analyst has graded your performance.
                </p>
              </div>

              {/* Big Grade Badge & Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-xl border-2 border-[#1A1A1A] rounded-none p-6 bg-[#EAE8D5] text-[#1A1A1A]">
                
                {/* Grade */}
                <div className="flex flex-col justify-center items-center md:border-r-2 border-[#1A1A1A]/20 p-2">
                  <span className="text-[9px] font-bold text-[#1A1A1A]/60 font-mono uppercase tracking-widest">FINAL GRADE</span>
                  <span className={`text-4xl font-extrabold ${gradeColor} tracking-tight`}>{grade}</span>
                </div>

                {/* Metric 1 */}
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[9px] font-bold text-[#1A1A1A]/60 font-mono uppercase tracking-widest flex items-center gap-1"><Heart className="w-3 h-3 text-[#D44D26] fill-[#D44D26]" /> EMPATHY</span>
                  <span className="text-lg font-bold text-[#1A1A1A] mt-1 font-mono">{scores.empathy} / 100</span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[9px] font-bold text-[#1A1A1A]/60 font-mono uppercase tracking-widest flex items-center gap-1"><Target className="w-3 h-3 text-[#1A1A1A]" /> CLARITY</span>
                  <span className="text-lg font-bold text-[#1A1A1A] mt-1 font-mono">{scores.clarity} / 100</span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[9px] font-bold text-[#1A1A1A]/60 font-mono uppercase tracking-widest flex items-center gap-1"><Star className="w-3 h-3 text-[#D44D26]" /> PROF.</span>
                  <span className="text-lg font-bold text-[#1A1A1A] mt-1 font-mono">{scores.professionalism} / 100</span>
                </div>

              </div>

              {/* Feedback Summary Paragraph */}
              <div className="p-5 bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none max-w-xl text-left">
                <span className="text-[10px] font-bold text-[#D44D26] font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <MessageSquareCode className="w-3.5 h-3.5" />
                  Communication Analyst Summary
                </span>
                <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed font-sans">
                  {feedbackText} Your balanced score reflects your ability to digest constraints and speak confidently.
                </p>
              </div>

              {/* Action */}
              <button
                id="restart-sim-btn"
                onClick={resetSimulator}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFCF0] border-2 border-[#1A1A1A] px-6 py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Retry This Scenario
              </button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Choice Log / History Timeline (Analyst review) */}
        {history.length > 0 && (
          <div className="bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-6 text-[#1A1A1A]">
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-4 flex items-center gap-1.5 pb-2 border-b border-[#1A1A1A]/10 font-mono">
              <MessageSquareCode className="w-4 h-4 text-[#D44D26]" />
              Dialogue Analysis Log
            </h4>
            
            <div className="space-y-4">
              {history.map((log, index) => (
                <div key={index} className="border-l-2 border-[#1A1A1A] pl-4 space-y-2 relative">
                  {/* Indicator Dot */}
                  <div className="absolute w-2.5 h-2.5 rounded-none bg-[#D44D26] border border-[#1A1A1A] -left-[6px] top-1" />
                  
                  <div className="text-xs font-bold text-[#1A1A1A] flex flex-wrap items-center gap-2">
                    <span className="font-mono uppercase text-[10px] tracking-wider text-[#1A1A1A]/70">You said:</span>
                    <span className="text-[#1A1A1A] font-serif font-bold italic">"{log.choiceText}"</span>
                  </div>

                  <div className="flex gap-4 text-[10px] font-mono font-bold text-[#1A1A1A]/80">
                    <span className={log.scoreChange.empathy >= 0 ? 'text-emerald-800' : 'text-[#D44D26]'}>
                      Empathy: {log.scoreChange.empathy >= 0 ? '+' : ''}{log.scoreChange.empathy}
                    </span>
                    <span className={log.scoreChange.clarity >= 0 ? 'text-emerald-800' : 'text-[#D44D26]'}>
                      Clarity: {log.scoreChange.clarity >= 0 ? '+' : ''}{log.scoreChange.clarity}
                    </span>
                    <span className={log.scoreChange.professionalism >= 0 ? 'text-emerald-800' : 'text-[#D44D26]'}>
                      Professionalism: {log.scoreChange.professionalism >= 0 ? '+' : ''}{log.scoreChange.professionalism}
                    </span>
                  </div>

                  <p className="text-xs text-[#1A1A1A] leading-relaxed bg-[#FDFCF0] p-3 border-2 border-[#1A1A1A] rounded-none">
                    <span className="font-bold text-[#D44D26] font-mono uppercase text-[9px] tracking-wider block mb-1">Why this response:</span> {log.analysis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
