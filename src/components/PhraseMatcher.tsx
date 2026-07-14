import React, { useState, useEffect } from 'react';
import { phrasePairs } from '../data/modulesData';
import { PhrasePair } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export default function PhraseMatcher() {
  const [casualCards, setCasualCards] = useState<PhrasePair[]>([]);
  const [polishedCards, setPolishedCards] = useState<PhrasePair[]>([]);
  
  const [selectedCasualId, setSelectedCasualId] = useState<string | null>(null);
  const [selectedPolishedId, setSelectedPolishedId] = useState<string | null>(null);
  
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);
  const [activeExplanation, setActiveExplanation] = useState<PhrasePair | null>(null);
  const [score, setScore] = useState<number>(0);

  // Shuffle card lists on startup
  useEffect(() => {
    initializeCards();
  }, []);

  const initializeCards = () => {
    const shuffledCasual = [...phrasePairs].sort(() => Math.random() - 0.5);
    const shuffledPolished = [...phrasePairs].sort(() => Math.random() - 0.5);
    setCasualCards(shuffledCasual);
    setPolishedCards(shuffledPolished);
    setSelectedCasualId(null);
    setSelectedPolishedId(null);
    setMatchedIds([]);
    setWrongMatch(false);
    setActiveExplanation(null);
    setScore(0);
  };

  const handleCasualSelect = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedCasualId(id);
    
    // If a polished card was already selected, check match
    if (selectedPolishedId) {
      checkMatch(id, selectedPolishedId);
    }
  };

  const handlePolishedSelect = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedPolishedId(id);
    
    // If a casual card was already selected, check match
    if (selectedCasualId) {
      checkMatch(selectedCasualId, id);
    }
  };

  const checkMatch = (casualId: string, polishedId: string) => {
    if (casualId === polishedId) {
      // SUCCESSFUL MATCH!
      setMatchedIds(prev => [...prev, casualId]);
      setScore(prev => prev + 10);
      const matchedPair = phrasePairs.find(p => p.id === casualId)!;
      setActiveExplanation(matchedPair);
      
      // Reset selections
      setSelectedCasualId(null);
      setSelectedPolishedId(null);
    } else {
      // MISMATCH!
      setWrongMatch(true);
      setScore(prev => Math.max(0, prev - 2));
      setTimeout(() => {
        setSelectedCasualId(null);
        setSelectedPolishedId(null);
        setWrongMatch(false);
      }, 800);
    }
  };

  const totalPairs = phrasePairs.length;
  const isFinished = matchedIds.length === totalPairs;

  return (
    <div id="phrase-matcher-container" className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none shadow-none overflow-hidden flex flex-col xl:flex-row min-h-[600px]">
      
      {/* Game board Panel (Left/Center) */}
      <div id="matcher-board" className="flex-1 p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b-2 border-[#1A1A1A] pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono">
              Linguistic Laboratory
            </span>
            <h3 className="text-3xl font-bold font-serif italic text-[#1A1A1A] mt-2">English Polisher Matcher</h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans">
              Match direct or casual phrases with their polished, highly assertive counterparts.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-[#EAE8D5] border-2 border-[#1A1A1A] px-4 py-2 rounded-none shrink-0 text-[#1A1A1A]">
            <div className="text-center font-mono">
              <span className="text-[10px] font-bold text-[#1A1A1A]/60 block uppercase">MATCHED</span>
              <span className="text-sm font-bold text-[#1A1A1A]">{matchedIds.length} / {totalPairs}</span>
            </div>
            <div className="w-[1.5px] h-6 bg-[#1A1A1A]/20" />
            <div className="text-center font-mono">
              <span className="text-[10px] font-bold text-[#1A1A1A]/60 block uppercase">LAB POINTS</span>
              <span className="text-sm font-extrabold text-[#D44D26]">{score}</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              
              {/* Casual Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-[#1A1A1A] pb-2 text-[#1A1A1A] font-mono">
                  <div className="w-2.5 h-2.5 rounded-none bg-[#D44D26] border border-[#1A1A1A]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Direct / Casual Phrasing</span>
                </div>
                
                <div className="space-y-2.5">
                  {casualCards.map(card => {
                    const isSelected = selectedCasualId === card.id;
                    const isMatched = matchedIds.includes(card.id);
                    
                    return (
                      <button
                        key={`casual-${card.id}`}
                        id={`casual-card-${card.id}`}
                        disabled={isMatched}
                        onClick={() => handleCasualSelect(card.id)}
                        className={`w-full text-left p-4 rounded-none border-2 leading-relaxed transition-all relative cursor-pointer text-xs ${
                          isMatched
                            ? 'bg-[#EAE8D5]/40 border-[#1A1A1A]/30 text-[#1A1A1A]/40 line-through decoration-[#D44D26]/60 decoration-2 cursor-not-allowed font-medium'
                            : isSelected
                              ? wrongMatch 
                                ? 'bg-[#D44D26] border-[#1A1A1A] text-white shadow-none animate-shake font-bold' 
                                : 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF0] shadow-none font-bold'
                              : 'bg-[#FDFCF0] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#EAE8D5]'
                        }`}
                      >
                        {card.casual}
                        {isMatched && (
                          <span className="absolute top-2.5 right-3 text-[9px] font-bold text-white uppercase tracking-widest bg-[#D44D26] border border-[#1A1A1A] px-2 py-0.5 rounded-none flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> MATCHED
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Polished Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-[#1A1A1A] pb-2 text-[#1A1A1A] font-mono">
                  <div className="w-2.5 h-2.5 rounded-none bg-[#1A1A1A] border border-[#1A1A1A]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Polished / Assertive Counterpart</span>
                </div>
                
                <div className="space-y-2.5">
                  {polishedCards.map(card => {
                    const isSelected = selectedPolishedId === card.id;
                    const isMatched = matchedIds.includes(card.id);
                    
                    return (
                      <button
                        key={`polished-${card.id}`}
                        id={`polished-card-${card.id}`}
                        disabled={isMatched}
                        onClick={() => handlePolishedSelect(card.id)}
                        className={`w-full text-left p-4 rounded-none border-2 leading-relaxed transition-all relative cursor-pointer text-xs ${
                          isMatched
                            ? 'bg-[#EAE8D5]/40 border-[#1A1A1A]/30 text-[#1A1A1A]/40 line-through decoration-[#D44D26]/60 decoration-2 cursor-not-allowed font-medium'
                            : isSelected
                              ? wrongMatch
                                ? 'bg-[#D44D26] border-[#1A1A1A] text-white shadow-none animate-shake font-bold'
                                : 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF0] shadow-none font-bold'
                              : 'bg-[#FDFCF0] border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#EAE8D5]'
                        }`}
                      >
                        {card.polished}
                        {isMatched && (
                          <span className="absolute top-2.5 right-3 text-[9px] font-bold text-white uppercase tracking-widest bg-[#D44D26] border border-[#1A1A1A] px-2 py-0.5 rounded-none flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> SECURED
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          ) : (
            /* Matcher Complete Frame */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 px-6 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 bg-[#D44D26] border-2 border-[#1A1A1A] rounded-none flex items-center justify-center text-white shadow-none">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D44D26] font-mono">Vocabulary Mastered</span>
                <h4 className="text-3xl font-bold font-serif italic text-[#1A1A1A]">English Polisher Complete!</h4>
                <p className="text-xs text-[#1A1A1A]/70 max-w-sm mx-auto font-sans leading-relaxed">
                  You successfully rephrased every casual comment into high-contrast assertive communication.
                </p>
              </div>

              <div className="bg-[#EAE8D5] border-2 border-[#1A1A1A] px-6 py-4 rounded-none flex items-center gap-4 font-mono text-[#1A1A1A]">
                <div>
                  <span className="text-[10px] text-[#1A1A1A]/60 block font-bold">TOTAL SCORE</span>
                  <span className="text-2xl font-extrabold text-[#D44D26]">{score} Lab Points</span>
                </div>
              </div>

              <button
                id="reset-phrase-btn"
                onClick={initializeCards}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFCF0] border-2 border-[#1A1A1A] px-6 py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Play/Shuffle Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Explanation Side Panel (Right) - 30% width on XL screen */}
      <div id="matcher-explanation-sidebar" className="w-full xl:w-[380px] bg-[#EAE8D5] border-t-2 xl:border-t-0 xl:border-l-2 border-[#1A1A1A] p-6 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeExplanation ? (
            <motion.div
              key={activeExplanation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b-2 border-[#1A1A1A]/10 pb-2">
                  <Sparkles className="w-5 h-5 text-[#D44D26] shrink-0 animate-pulse" />
                  <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest font-mono">Linguistic Analysis</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none space-y-1">
                    <span className="text-[9px] font-bold text-[#D44D26] uppercase tracking-widest font-mono">Casual / Direct Version</span>
                    <p className="text-xs text-[#1A1A1A] font-bold font-serif italic">"{activeExplanation.casual}"</p>
                  </div>
                  
                  <div className="p-3 bg-[#FDFCF0] border-2 border-[#D44D26] rounded-none space-y-1">
                    <span className="text-[9px] font-bold text-[#D44D26] uppercase tracking-widest font-mono">Assertive Polished Version</span>
                    <p className="text-xs text-[#1A1A1A] font-extrabold font-serif italic">"{activeExplanation.polished}"</p>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-widest font-mono">Context of Usage:</span>
                  <p className="text-xs text-[#1A1A1A] leading-normal bg-[#FDFCF0] p-3 rounded-none border-2 border-[#1A1A1A] font-sans">
                    {activeExplanation.context}
                  </p>
                </div>

                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-widest font-mono">Why it works:</span>
                  <p className="text-xs text-[#1A1A1A] font-bold leading-relaxed bg-[#FDFCF0] p-3.5 rounded-none border-2 border-[#D44D26] font-sans">
                    {activeExplanation.whyItWorks}
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-[#1A1A1A]/60 font-mono italic pt-6 border-t border-[#1A1A1A]/10 mt-6 flex gap-1.5 items-start">
                <Info className="w-3.5 h-3.5 text-[#D44D26] mt-0.5 shrink-0" />
                <span>Select other cards to inspect more communication breakdowns.</span>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-3 min-h-[250px]">
              <HelpCircle className="w-12 h-12 text-[#D44D26] stroke-[1.5]" />
              <div className="space-y-1">
                <h4 className="text-base font-bold font-serif italic text-[#1A1A1A]">No Match Selected</h4>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-sans leading-relaxed">
                  Click a direct/casual phrase on the left, then click its corresponding assertive phrase on the right. Correct matches reveal linguistic insights.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
