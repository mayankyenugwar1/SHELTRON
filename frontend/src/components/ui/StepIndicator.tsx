import React from 'react';

export interface Step {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentPath: string;
  onNavigate?: (path: string) => void;
}

const renderStageIcon = (id: string, active: boolean) => {
  const strokeClass = active ? 'text-white' : 'text-[#465a2d]';
  switch (id) {
    case 'app':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'create':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22h20" />
          <path d="M4 22L19 7" />
          <path d="M19 7l2 2" />
          <path d="M8 18l2-2" />
          <path d="M11 15l2-2" />
          <path d="M14 12l2-2" />
          <path d="M4 22V6a2 2 0 0 1 2-2h1.5L20 16.5V20a2 2 0 0 1-2 2H4z" />
        </svg>
      );
    case 'climate':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'materials':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'design':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'simulation':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      );
    case 'what-if':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'compare':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="3" x2="12" y2="21" />
          <polyline points="6 8 12 6 18 8" />
          <path d="M6 8l-3 7h6l-3-7z" />
          <path d="M18 8l-3 7h6l-3-7z" />
        </svg>
      );
    case 'result':
      return (
        <svg className={`w-3.5 h-3.5 ${strokeClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    default:
      return null;
  }
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentPath,
  onNavigate
}) => {
  const isStepActive = (stepPath: string) => {
    if (currentPath === stepPath) return true;
    if ((stepPath === '/app/design' || stepPath === '/app/design/studio') && 
        (currentPath === '/app/design' || currentPath === '/app/design/studio' || currentPath === '/app/studio')) return true;
    if (stepPath === '/app/simulation' && (currentPath === '/app/heatmap' || currentPath === '/app/simulation')) return true;
    if (stepPath === '/app/result' && (currentPath === '/app/optimization' || currentPath === '/app/optimize' || currentPath === '/app/result')) return true;
    return false;
  };

  return (
    <div className="bg-[#fbfdfa] rounded-2xl sm:rounded-3xl border border-[#d8e2d4] shadow-[0_4px_20px_-4px_rgba(20,50,30,0.06)] px-4 sm:px-6 pt-2.5 pb-2 space-y-1.5">
      <nav className="flex items-center justify-between overflow-x-auto gap-1 sm:gap-2 scrollbar-none">
        {steps.map((step, idx) => {
          const active = isStepActive(step.path);
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onNavigate && onNavigate(step.path)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#465a2d] text-white shadow-xs'
                    : 'text-[#1e3421] hover:text-[#465a2d] hover:bg-[#eef5ea]'
                }`}
              >
                <span className="flex items-center select-none shrink-0">{renderStageIcon(step.id, active)}</span>
                <span>{step.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <span className="text-[#a4cca0] font-bold select-none text-[11px] px-0.5">→</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Stage Checkpoint Track matching reference image */}
      <div className="w-full px-2 sm:px-4 flex items-center relative pt-0.5 pb-0.5">
        <div className="w-full h-0.5 bg-[#dbe5d7] rounded-full relative">
          <div className="h-full bg-[#465a2d] rounded-full w-[22%]" />
        </div>
        <div className="absolute inset-x-2 sm:inset-x-4 flex items-center justify-between pointer-events-none">
          {steps.map((step, idx) => {
            const active = isStepActive(step.path);
            const isPassed = idx <= 1; // Stage 1 is active
            return (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  active
                    ? 'bg-[#465a2d] ring-2 ring-[#dbe5d7]'
                    : isPassed
                    ? 'bg-[#465a2d]'
                    : 'bg-[#cbd8c6]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
