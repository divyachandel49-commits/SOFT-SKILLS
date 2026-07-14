import React, { useState } from 'react';
import { modules } from '../data/modulesData';
import { ModuleItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Ear, Sparkles, FileText, Users, CheckCircle, XCircle, Lightbulb, ChevronRight, Compass } from 'lucide-react';

// Dynamic Icon Mapper
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Mic':
      return <Mic className={className} />;
    case 'Ear':
      return <Ear className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Users':
      return <Users className={className} />;
    default:
      return <Compass className={className} />;
  }
};

export default function InteractiveModules() {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  return (
    <div id="interactive-modules-container" className="space-y-8">
      
      {/* Category Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {modules.map(module => {
          const isActive = activeModuleId === module.id;
          return (
            <button
              key={module.id}
              id={`module-tab-${module.id}`}
              onClick={() => setActiveModuleId(module.id)}
              className={`p-4 rounded-none border-2 text-left transition-all flex flex-col justify-between h-[120px] group cursor-pointer ${
                isActive
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF0] shadow-none'
                  : 'bg-[#FDFCF0] border-[#1A1A1A] hover:bg-[#EAE8D5] text-[#1A1A1A]'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <span className={`p-2 rounded-none transition-colors border ${
                  isActive ? 'bg-[#D44D26] text-white border-[#1A1A1A]' : 'bg-[#EAE8D5] text-[#1A1A1A] border-transparent group-hover:bg-[#D44D26] group-hover:text-white'
                }`}>
                  <IconMapper name={module.icon} className="w-5 h-5" />
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-[#EAE8D5]' : 'text-[#1A1A1A]/50 group-hover:translate-x-0.5'
                }`} />
              </div>
              <div>
                <h4 className="text-xs font-bold font-sans tracking-tight leading-tight truncate">{module.title}</h4>
                <p className={`text-[10px] font-bold mt-0.5 uppercase tracking-wider ${isActive ? 'text-[#EAE8D5]/80' : 'text-[#D44D26]'}`}>
                  {module.category}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main expanded detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModuleId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="bg-[#FDFCF0] border-2 border-[#1A1A1A] rounded-none p-6 lg:p-8 shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Overview text (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-[#D44D26] text-white border border-[#1A1A1A] rounded-none">
                  <IconMapper name={activeModule.icon} className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[10px] font-bold text-[#D44D26] uppercase tracking-widest font-mono block">Module Focus</span>
                  <h3 className="text-2xl font-bold font-serif text-[#1A1A1A] tracking-tight leading-tight italic">{activeModule.title}</h3>
                </div>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 font-sans italic leading-relaxed">
                "{activeModule.subtitle}"
              </p>
            </div>

            <p className="text-xs text-[#1A1A1A] leading-relaxed font-sans border-t border-[#1A1A1A]/20 pt-4">
              {activeModule.description}
            </p>

            {/* Benefits Section */}
            <div className="space-y-3 border-t border-[#1A1A1A]/20 pt-5">
              <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">Key Benefits</h4>
              <ul className="space-y-2.5">
                {activeModule.benefits.map((b, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-[#1A1A1A]">
                    <CheckCircle className="w-4 h-4 text-[#D44D26] shrink-0 mt-0.5" />
                    <span className="font-sans font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-4.5 space-y-3 text-left">
              <h4 className="text-xs font-bold text-[#D44D26] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Lightbulb className="w-4 h-4" />
                Instructor Quick Tips
              </h4>
              <ul className="space-y-2">
                {activeModule.quickTips.map((tip, index) => (
                  <li key={index} className="text-xs text-[#1A1A1A] leading-relaxed list-disc list-inside font-sans pl-1">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Principles Comparison (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 lg:border-l-2 lg:border-[#1A1A1A]/20 lg:pl-8">
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider font-mono">Core Communication Principles</h4>
            
            <div className="space-y-6">
              {activeModule.principles.map((pr, idx) => (
                <div key={idx} className="space-y-3.5 pb-6 border-b border-[#1A1A1A]/20 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none bg-[#1A1A1A] text-[#FDFCF0] font-mono text-[10px] font-bold flex items-center justify-center border border-[#1A1A1A]">
                      {idx + 1}
                    </span>
                    <h5 className="text-sm font-bold font-serif italic text-[#1A1A1A]">{pr.title}</h5>
                  </div>
                  
                  <p className="text-xs text-[#1A1A1A]/80 font-sans leading-relaxed">
                    {pr.description}
                  </p>

                  {/* Good vs Bad comparative cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {/* Good Card */}
                    <div className="bg-[#FDFCF0] border-2 border-[#D44D26] rounded-none p-4 space-y-1.5 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#D44D26] uppercase tracking-widest font-mono">
                        <CheckCircle className="w-3.5 h-3.5" /> Correct / Polished
                      </div>
                      <p className="text-xs text-[#1A1A1A] font-bold italic font-sans leading-relaxed">
                        "{pr.exampleGood}"
                      </p>
                    </div>

                    {/* Bad Card */}
                    <div className="bg-[#EAE8D5] border-2 border-[#1A1A1A] rounded-none p-4 space-y-1.5 flex flex-col justify-between opacity-90">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest font-mono">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect / Weak
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 font-medium italic font-sans leading-relaxed">
                        "{pr.exampleBad}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
