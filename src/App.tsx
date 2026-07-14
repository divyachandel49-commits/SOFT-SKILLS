import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Mic, 
  MessageSquareCode, 
  Activity, 
  CheckCircle2, 
  Sliders, 
  Award, 
  ChevronRight, 
  Clock, 
  ThumbsUp, 
  BookOpenCheck,
  Menu,
  X
} from 'lucide-react';

// Subcomponents import
import InteractiveModules from './components/InteractiveModules';
import SpeechPacer from './components/SpeechPacer';
import RolePlaySimulator from './components/RolePlaySimulator';
import StyleAssessment from './components/StyleAssessment';
import PhraseMatcher from './components/PhraseMatcher';
import FillerCounter from './components/FillerCounter';

type TabId = 'curriculum' | 'teleprompter' | 'roleplay' | 'assessment' | 'polisher' | 'filler';

interface TabItem {
  id: TabId;
  label: string;
  subtitle: string;
  icon: React.ElementType;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const tabs: TabItem[] = [
    { 
      id: 'curriculum', 
      label: 'Core Curriculum', 
      subtitle: 'Conceptual modules with good vs bad examples',
      icon: BookOpen 
    },
    { 
      id: 'teleprompter', 
      label: 'Speech Teleprompter', 
      subtitle: 'Dynamic scroll & words per minute trainer',
      icon: Mic 
    },
    { 
      id: 'roleplay', 
      label: 'Dialogue Simulator', 
      subtitle: 'Interactive branching workplace scenarios',
      icon: MessageSquareCode 
    },
    { 
      id: 'assessment', 
      label: 'Style Assessment', 
      subtitle: 'Situational evaluation profile',
      icon: Activity 
    },
    { 
      id: 'polisher', 
      label: 'English Polisher', 
      subtitle: 'Polite and assertive phrasing card lab',
      icon: CheckCircle2 
    },
    { 
      id: 'filler', 
      label: 'Vocal Filler Audit', 
      subtitle: 'Live presentation self-auditing tool',
      icon: Sliders 
    }
  ];

  // Render subcomponents based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'curriculum':
        return <InteractiveModules />;
      case 'teleprompter':
        return <SpeechPacer />;
      case 'roleplay':
        return <RolePlaySimulator />;
      case 'assessment':
        return <StyleAssessment />;
      case 'polisher':
        return <PhraseMatcher />;
      case 'filler':
        return <FillerCounter />;
      default:
        return <InteractiveModules />;
    }
  };

  const activeTabDetails = tabs.find(t => t.id === activeTab)!;

  return (
    <div id="app-wrapper" className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] flex flex-col font-sans border-[12px] border-[#1A1A1A]">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#FDFCF0] border-b-2 border-[#1A1A1A] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#D44D26] text-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-sm font-bold font-serif text-[#1A1A1A] tracking-tight leading-tight sm:text-lg italic">
                Lumina Communication Lab
              </h1>
              <p className="text-[10px] text-[#D44D26] font-bold tracking-widest uppercase">
                English & Soft Skills Training Portal
              </p>
            </div>
          </div>

          {/* Student Stats panel - desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 border-2 border-[#1A1A1A] rounded-none px-3.5 py-1.5 bg-[#EAE8D5]">
              <BookOpenCheck className="w-4 h-4 text-[#D44D26]" />
              <div className="text-left leading-none">
                <span className="text-[9px] font-bold text-[#1A1A1A]/60 block uppercase font-mono">Completed</span>
                <span className="text-xs font-bold text-[#1A1A1A]">3 / 5 Modules</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-2 border-[#1A1A1A] rounded-none px-3.5 py-1.5 bg-[#EAE8D5]">
              <Clock className="w-4 h-4 text-[#1A1A1A]" />
              <div className="text-left leading-none">
                <span className="text-[9px] font-bold text-[#1A1A1A]/60 block uppercase font-mono">Time Spent</span>
                <span className="text-xs font-bold text-[#1A1A1A]">2h 45m</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-2 border-[#1A1A1A] rounded-none px-3.5 py-1.5 bg-[#D44D26] text-[#FDFCF0]">
              <ThumbsUp className="w-4 h-4 text-[#FDFCF0]" />
              <div className="text-left leading-none">
                <span className="text-[9px] font-bold text-[#FDFCF0]/80 block uppercase font-mono">Confidence Stance</span>
                <span className="text-xs font-bold text-[#FDFCF0]">Assertive (92%)</span>
              </div>
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-[#EAE8D5] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-none transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-8">
        
        {/* Desktop Sidebar menu */}
        <aside id="desktop-sidebar" className="hidden lg:block lg:w-80 space-y-6 shrink-0">
          <div className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-5 space-y-4">
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest border-b-2 border-[#1A1A1A] pb-2.5">
              Laboratory Modules
            </h3>
            
            <nav id="sidebar-nav" className="space-y-1.5">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`sidebar-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-none text-xs transition-all flex items-center gap-3 group cursor-pointer ${
                      isActive
                        ? 'bg-[#1A1A1A] font-bold text-[#FDFCF0] shadow-none font-serif italic'
                        : 'bg-transparent hover:bg-[#EAE8D5] text-[#1A1A1A] hover:line-through'
                    }`}
                  >
                    <span className={`p-1.5 rounded-none transition-colors border ${
                      isActive 
                        ? 'bg-[#D44D26] text-[#FDFCF0] border-[#1A1A1A]' 
                        : 'bg-[#EAE8D5] text-[#1A1A1A] border-transparent group-hover:bg-[#D44D26] group-hover:text-white'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <div className="flex-1 leading-normal truncate">
                      <p className="font-sans leading-none">{tab.label}</p>
                      <p className={`text-[9px] mt-0.5 truncate ${isActive ? 'text-[#EAE8D5]' : 'text-[#1A1A1A]/60 font-medium'}`}>
                        {tab.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all ${
                      isActive ? 'text-[#EAE8D5] translate-x-0.5' : 'text-[#1A1A1A]'
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick instructions/rules of communication card */}
          <div className="bg-[#D44D26] text-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAE8D5]">
              Golden Rules of Communication
            </h4>
            <div className="space-y-3 font-sans">
              <div className="text-xs leading-relaxed space-y-1">
                <span className="font-bold text-[#FDFCF0] block">1. The 3-Second Pausing Rule</span>
                <p className="text-[#FDFCF0]/90 text-[11px]">Before replying to high-stress critiques, wait 3 seconds to regulate vocal excitement.</p>
              </div>
              <div className="text-xs leading-relaxed space-y-1 border-t border-[#FDFCF0]/30 pt-2.5">
                <span className="font-bold text-[#FDFCF0] block">2. Empathy First Alignment</span>
                <p className="text-[#FDFCF0]/90 text-[11px]">Mirror your peer's final words before providing your corrective advice.</p>
              </div>
              <div className="text-xs leading-relaxed space-y-1 border-t border-[#FDFCF0]/30 pt-2.5">
                <span className="font-bold text-[#FDFCF0] block">3. Re-frame Accountability</span>
                <p className="text-[#FDFCF0]/90 text-[11px]">Remove self-deprecating apologies; replace with polite, outcome-driven deadlines.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile menu modal overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-30 flex justify-end"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-4/5 max-w-sm bg-[#FDFCF0] h-full p-6 space-y-6 border-l-4 border-[#1A1A1A] flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b-2 border-[#1A1A1A] pb-4">
                    <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Lab Menu</span>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1 hover:bg-[#EAE8D5] text-[#1A1A1A] rounded-none border border-[#1A1A1A] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-2">
                    {tabs.map(tab => {
                      const isActive = activeTab === tab.id;
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          id={`mobile-tab-${tab.id}`}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3.5 rounded-none text-xs transition-all flex items-center gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-[#1A1A1A] font-bold text-[#FDFCF0] font-serif italic'
                              : 'hover:bg-[#EAE8D5] text-[#1A1A1A] hover:line-through'
                          }`}
                        >
                          <IconComponent className="w-4.5 h-4.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-bold leading-none">{tab.label}</p>
                            <p className={`text-[9px] mt-0.5 truncate ${isActive ? 'text-[#EAE8D5]' : 'text-[#1A1A1A]/60 font-medium'}`}>
                              {tab.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Simulated metrics for mobile drawer */}
                <div className="border-t-2 border-[#1A1A1A] pt-4 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-[10px] text-[#1A1A1A]/70">
                    <span>COMPLETED TRACKS</span>
                    <span className="text-[#1A1A1A] font-bold">3 / 5</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#1A1A1A]/70">
                    <span>ACCUMULATED TIME</span>
                    <span className="text-[#1A1A1A] font-bold">2h 45m</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#1A1A1A]/70">
                    <span>ORAL CLARITY GRADE</span>
                    <span className="text-[#D44D26] font-bold">Assertive (92%)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Viewframe (9 Cols / 75% width) */}
        <main id="main-lab-stage" className="flex-1 flex flex-col space-y-6">
          
          {/* Active section title & description banner */}
          <div className="bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D44D26] uppercase tracking-widest font-mono">
                Active Studio Staging
              </span>
              <h2 className="text-2xl font-bold font-serif text-[#1A1A1A] mt-1 leading-tight italic">{activeTabDetails.label}</h2>
              <p className="text-xs text-[#1A1A1A]/80 font-sans mt-0.5 leading-relaxed">{activeTabDetails.subtitle}</p>
            </div>

            {/* Quick status badge */}
            <div className="self-start sm:self-center px-3 py-1.5 bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-none text-[9px] font-bold text-[#FDFCF0] uppercase tracking-widest flex items-center gap-1.5 shrink-0 font-mono">
              <div className="w-2 h-2 rounded-full bg-[#D44D26] animate-pulse" />
              Interactive Lab Mode
            </div>
          </div>

          {/* Display Subcomponent with transition */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

      </div>

      {/* Footer Area */}
      <footer className="bg-[#1A1A1A] text-[#FDFCF0] border-t-2 border-[#1A1A1A] py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-semibold font-serif italic text-base">
            University of Language & Arts — Soft Skills Lab .04
          </p>
          <p className="text-[10px] text-[#EAE8D5]/70 font-sans tracking-[0.1em] uppercase">
            Established 2024 • Workspace updated 2026
          </p>
          <p className="text-[10px] text-[#EAE8D5]/50 max-w-2xl mx-auto font-sans">
            This workspace provides interactive client-side simulators, dialogue branches, and pacing teleprompters calibrated for academic and professional English language studies.
          </p>
        </div>
      </footer>

    </div>
  );
}
