import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShelterProject } from '../context/ProjectContext';
import { DEMO_FLOW_STEPS } from '../data/defaults';
import { Button } from './ui';
import { Sparkles, ArrowRight, ArrowLeft, X, Info } from 'lucide-react';

export const DemoTourGuide: React.FC = () => {
  const { isDemoMode, demoStep, setDemoStep, exitDemoMode, site } = useShelterProject();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isDemoMode) return null;

  // Determine current step based on route or state
  const currentStepIdx = DEMO_FLOW_STEPS.findIndex(s => s.path === location.pathname);
  const activeIdx = currentStepIdx >= 0 ? currentStepIdx : demoStep;
  const currentStep = DEMO_FLOW_STEPS[activeIdx] || DEMO_FLOW_STEPS[0];

  const handleNext = () => {
    const nextIdx = Math.min(DEMO_FLOW_STEPS.length - 1, activeIdx + 1);
    setDemoStep(nextIdx);
    navigate(DEMO_FLOW_STEPS[nextIdx].path);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeIdx - 1);
    setDemoStep(prevIdx);
    navigate(DEMO_FLOW_STEPS[prevIdx].path);
  };

  const handleStepJump = (idx: number) => {
    setDemoStep(idx);
    navigate(DEMO_FLOW_STEPS[idx].path);
  };

  return (
    <div className="sticky top-[61px] z-30 bg-slate-900 text-white px-4 py-3 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Info & Current Step */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white tracking-tight">
                Judge Demo Mode: {site.location_name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-700 font-mono">
                SHELTRON Pipeline — Stage {activeIdx + 1} of {DEMO_FLOW_STEPS.length}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {currentStep.desc}
            </p>
          </div>
        </div>

        {/* Center: Step Navigation Pills */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
          {DEMO_FLOW_STEPS.map((step, idx) => {
            const isCurrent = idx === activeIdx;
            const isCompleted = idx < activeIdx;
            return (
              <button
                key={step.id}
                onClick={() => handleStepJump(idx)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-600 text-white font-bold shadow-xs'
                    : isCompleted
                    ? 'text-emerald-400 hover:text-white hover:bg-slate-850'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <span>{step.icon}</span>
                <span>{idx + 1}. {step.title.split(' ')[0]}</span>
                {isCompleted && <span className="text-emerald-400 text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Previous / Next & Exit */}
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={activeIdx === 0}
              className="text-slate-200 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white text-xs px-2.5 py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1 inline" />
              Prev
            </Button>

            {activeIdx < DEMO_FLOW_STEPS.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-3 py-1 shadow-xs"
              >
                <span>Next: {DEMO_FLOW_STEPS[activeIdx + 1].title.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 inline" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/app/result')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1"
              >
                <span>Complete Dossier ✓</span>
              </Button>
            )}
          </div>

          <button
            onClick={exitDemoMode}
            title="Exit Demo Mode"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Required Prototype Simulation Data Footnote Label */}
      <div className="max-w-7xl mx-auto pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-sky-400/90">
          <Info className="w-3 h-3 text-sky-400" />
          * Demo Mode uses prototype simulation data & deterministic bioclimatic physics (SP 41 / ECBC 2017)
        </span>
        <span className="hidden sm:inline text-slate-400">
          Residential • 4 Occupants • 63 m² • Budget ₹3,80,000 (Medium)
        </span>
      </div>
    </div>
  );
};
