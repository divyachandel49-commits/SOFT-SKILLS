import React, { useState } from 'react';
import { assessmentQuestions } from '../data/modulesData';
import { AssessmentQuestion, CommunicationStyle } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HelpCircle, ArrowRight, RefreshCw, Eye, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StyleAssessment() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [styleScores, setStyleScores] = useState<Record<CommunicationStyle, number>>({
    Assertive: 0,
    Passive: 0,
    Aggressive: 0,
    'Passive-Aggressive': 0,
  });
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string; style: CommunicationStyle; feedback: string }[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);

  const totalQuestions = assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[currentIdx];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleNext = () => {
    if (!selectedOptionId) return;

    const chosenOption = currentQuestion.options.find(o => o.id === selectedOptionId)!;
    
    // Accumulate points for chosen style
    setStyleScores(prev => ({
      ...prev,
      [chosenOption.style]: prev[chosenOption.style] + chosenOption.points
    }));

    setAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        optionId: selectedOptionId,
        style: chosenOption.style,
        feedback: chosenOption.feedback
      }
    ]);

    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionId(null);
    } else {
      setIsDone(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setStyleScores({
      Assertive: 0,
      Passive: 0,
      Aggressive: 0,
      'Passive-Aggressive': 0,
    });
    setAnswers([]);
    setIsDone(false);
  };

  // Determine Dominant Style
  const getDominantStyle = (): { style: CommunicationStyle; description: string; advice: string } => {
    let dominant: CommunicationStyle = 'Assertive';
    let maxScore = -1;
    
    (Object.keys(styleScores) as CommunicationStyle[]).forEach(style => {
      if (styleScores[style] > maxScore) {
        maxScore = styleScores[style];
        dominant = style;
      }
    });

    switch (dominant as string) {
      case 'Assertive':
        return {
          style: 'Assertive',
          description: 'You communicate your thoughts and needs clearly, confidently, and with high respect for others. You maintain boundaries, hold comfortable vocal patterns, and actively listen without fear of constructive conflict.',
          advice: 'Outstanding. Keep refining your style by mentoring others and practicing executive-level English phrasing. Continue to utilize reflective listening in collaborative sessions.'
        };
      case 'Passive':
        return {
          style: 'Passive',
          description: 'You tend to suppress your own boundaries, priorities, and voice to avoid conflict or keep peers pleased. This can lead to personal overload and missed opportunities to share your highly valuable expertise.',
          advice: 'Focus on eliminating apologetic framing and wordy modifications (e.g. deleting "just checking" or "I might be wrong, but..."). Use structured "I-statements" to state your boundaries directly.'
        };
      case 'Aggressive':
        return {
          style: 'Aggressive',
          description: 'You focus on winning and asserting your goals, but often at the cost of team collaboration, trust, and psychological safety. Your language can come across as blaming or demanding.',
          advice: 'Focus heavily on active listening and Reflective Summarizing. Try waiting a full 2 seconds after a peer speaks before responding. Reframe critiques as collaborative questions instead of absolute statements.'
        };
      case 'Passive-Aggressive':
        return {
          style: 'Passive-Aggressive',
          description: 'You feel frustrated or overloaded but express it through indirect, sarcasm, or non-cooperative behaviors rather than direct conversation. This creates silent toxicity and confuses teammates.',
          advice: 'Practice direct, honest, and courageous communication. Stating your boundary calmly using the "Empathy + Boundary" formula (e.g., "I appreciate the emergency, but my priority is...") will solve problems much faster.'
        };
    }
  };

  const dominantProfile = getDominantStyle();

  return (
    <div id="style-assessment-container" className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none shadow-none overflow-hidden max-w-4xl mx-auto">
      
      {/* Header Cover Banner */}
      <div className="bg-[#EAE8D5] border-b-2 border-[#1A1A1A] p-8 text-[#1A1A1A] relative">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono inline-block">
            Diagnostic Toolkit
          </span>
          <h3 className="text-3xl font-bold font-serif italic text-[#1A1A1A] mt-3">Communication Style Assessment</h3>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
            Answer these situational workplace and English Lab scenarios to discover your dominant style (Assertive, Passive, Aggressive, or Passive-Aggressive) and learn how to refine it.
          </p>
        </div>
        <div className="absolute top-8 right-8 hidden md:block">
          <ShieldCheck className="w-16 h-16 text-[#D44D26]/20" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isDone ? (
          /* Active Question Frame */
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 space-y-6"
          >
            {/* Progress indicator */}
            <div className="flex justify-between items-center text-xs text-[#1A1A1A]/70 font-mono">
              <span className="font-bold text-[#D44D26] uppercase">Question {currentIdx + 1} of {totalQuestions}</span>
              <span>{Math.round(((currentIdx + 1) / totalQuestions) * 100)}% Complete</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
              <div 
                className="h-full bg-[#D44D26] rounded-none transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Context & Scenario */}
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-[#1A1A1A] px-2.5 py-1 rounded-none font-mono">
                Topic Context: {currentQuestion.context}
              </span>
              <h4 className="text-lg font-bold text-[#1A1A1A] leading-relaxed font-serif italic">
                {currentQuestion.scenario}
              </h4>
            </div>

            {/* Options List */}
            <div id="assessment-options" className="space-y-3.5">
              {currentQuestion.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    id={`assessment-option-btn-${option.id}`}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-left p-4 rounded-none border-2 transition-all text-xs flex items-start gap-3.5 cursor-pointer shadow-none ${
                      isSelected
                        ? 'bg-[#EAE8D5] border-[#1A1A1A] font-bold text-[#1A1A1A]'
                        : 'bg-[#FDFCF0] border-[#1A1A1A] text-[#1A1A1A]/80 hover:bg-[#EAE8D5]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-none border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected 
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCF0]' 
                        : 'border-[#1A1A1A] bg-[#FDFCF0]'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-[#FDFCF0] rounded-none animate-scale" />}
                    </div>
                    <p className={`leading-relaxed font-sans ${isSelected ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/90'}`}>{option.text}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Option Feedback/Analysis Box */}
            {selectedOptionId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-none bg-[#EAE8D5] border-2 border-[#1A1A1A] flex gap-3 items-start text-[#1A1A1A]"
              >
                <Eye className="w-4 h-4 text-[#D44D26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-[#D44D26] font-mono uppercase tracking-widest block">Communication Style Category</span>
                  <p className="text-xs text-[#1A1A1A] leading-normal font-sans font-medium mt-0.5">
                    {currentQuestion.options.find(o => o.id === selectedOptionId)?.feedback}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation footer */}
            <div className="flex justify-end pt-4 border-t-2 border-[#1A1A1A]">
              <button
                id="assessment-next-btn"
                onClick={handleNext}
                disabled={!selectedOptionId}
                className={`flex items-center gap-2 px-6 py-3 rounded-none font-bold text-xs transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFCF0] border-2 border-[#1A1A1A] shadow-none'
                    : 'bg-[#EAE8D5] text-[#1A1A1A]/40 border-2 border-[#1A1A1A]/20 cursor-not-allowed'
                }`}
              >
                {currentIdx + 1 === totalQuestions ? 'Finish Evaluation' : 'Next Scenario'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Report Card Frame */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 space-y-8"
          >
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#D44D26] border border-[#1A1A1A] px-2.5 py-1 rounded-none font-mono inline-block">
                Your Communication Profile
              </span>
              <h4 className="text-3xl font-bold font-serif italic text-[#1A1A1A]">Assessment Complete!</h4>
              <p className="text-xs text-[#1A1A1A]/70 max-w-md mx-auto">
                Based on your situational decision responses, the analyzer has mapped your primary communication stance.
              </p>
            </div>

            {/* Profile Bento Box Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Dominant Card (7 Cols) */}
              <div className="md:col-span-7 bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D44D26] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#D44D26] uppercase tracking-wider font-mono">Dominant Model</span>
                  </div>
                  
                  <h3 className="text-4xl font-extrabold font-serif italic text-[#1A1A1A] tracking-tight flex items-baseline gap-2">
                    {dominantProfile.style}
                    <span className="text-xs font-bold text-[#D44D26] font-mono uppercase">Profile</span>
                  </h3>
                  
                  <p className="text-xs text-[#1A1A1A] leading-relaxed font-sans font-medium">
                    {dominantProfile.description}
                  </p>
                </div>

                <div className="border-t-2 border-[#1A1A1A] pt-4 mt-6 space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/70 uppercase tracking-widest font-mono block">Actionable Advisor Tips:</span>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed italic bg-[#FDFCF0] p-4 border-2 border-[#1A1A1A] rounded-none font-bold">
                    "{dominantProfile.advice}"
                  </p>
                </div>
              </div>

              {/* Breakdown List (5 Cols) */}
              <div className="md:col-span-5 bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-6 flex flex-col justify-between space-y-6 shadow-none">
                <div>
                  <h4 className="text-base font-bold font-serif italic text-[#1A1A1A] uppercase tracking-wider mb-1">Communication Matrix</h4>
                  <p className="text-[10px] text-[#1A1A1A]/60 font-mono">Relative points accumulated by category during simulation</p>
                </div>

                <div className="space-y-4">
                  {(Object.keys(styleScores) as CommunicationStyle[]).map(style => {
                    const styleScore = styleScores[style];
                    const isDominant = style === dominantProfile.style;
                    
                    return (
                      <div key={style} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-bold ${isDominant ? 'text-[#D44D26] font-bold' : 'text-[#1A1A1A]'}`}>
                            {style} {isDominant && '🏆'}
                          </span>
                          <span className="font-mono text-[#1A1A1A]">{styleScore} pts</span>
                        </div>
                        <div className="h-3 bg-[#EAE8D5] border border-[#1A1A1A] rounded-none overflow-hidden">
                          <div 
                            className={`h-full rounded-none transition-all duration-500 ${isDominant ? 'bg-[#D44D26]' : 'bg-[#1A1A1A] opacity-40'}`}
                            style={{ width: `${Math.max(5, Math.min(100, (styleScore / (totalQuestions * 25)) * 100))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10px] text-[#1A1A1A] leading-relaxed flex gap-1.5 bg-[#EAE8D5] p-3 border-2 border-[#1A1A1A] rounded-none">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D44D26] shrink-0 mt-0.5" />
                  <span>Assertiveness is the golden soft skill for professional English. It balances individual agency with respectful team inclusion.</span>
                </div>
              </div>

            </div>

            {/* Detailed answers breakdown panel */}
            <div className="border-t-2 border-[#1A1A1A] pt-6">
              <h4 className="text-lg font-bold font-serif italic text-[#1A1A1A] uppercase tracking-wide mb-4">Diagnostic Review Details</h4>
              <div className="space-y-3.5">
                {answers.map((ans, idx) => {
                  const q = assessmentQuestions.find(q => q.id === ans.questionId)!;
                  const chosenOpt = q.options.find(o => o.id === ans.optionId)!;
                  
                  return (
                    <div key={idx} className="p-4 bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none text-xs flex gap-3.5 text-[#1A1A1A]">
                      <div className="bg-[#FDFCF0] border border-[#1A1A1A] text-[#1A1A1A] rounded-none font-mono font-bold w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="font-bold font-serif italic text-[#1A1A1A] text-sm leading-relaxed">{q.scenario}</p>
                        <p className="text-[#1A1A1A]/70 mt-1.5 italic font-sans">You chose: "{chosenOpt.text}"</p>
                        <div className="flex gap-2 items-center mt-2.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border border-[#1A1A1A] ${
                            ans.style === 'Assertive' 
                              ? 'bg-emerald-800 text-white' 
                              : 'bg-[#D44D26] text-white'
                          }`}>
                            Style: {ans.style}
                          </span>
                          <span className="text-[#1A1A1A]/30 text-[10px]">|</span>
                          <span className="text-[#1A1A1A] text-[10px] leading-relaxed font-sans font-semibold">{ans.feedback}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bottom */}
            <div className="flex justify-center border-t-2 border-[#1A1A1A] pt-6">
              <button
                id="assessment-reset-btn"
                onClick={handleReset}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFCF0] border-2 border-[#1A1A1A] px-6 py-3.5 rounded-none font-bold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-none"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Style Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
