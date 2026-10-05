import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { DemoTourGuide } from '../../components/DemoTourGuide';

import { ErrorBoundary } from '../../components/ErrorBoundary';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { id: 'app', label: 'Overview', path: '/app', icon: '🏛️' },
    { id: 'create', label: '1. Site & Req', path: '/app/create', icon: '📐' },
    { id: 'climate', label: '2. Climate', path: '/app/climate', icon: '🗺️' },
    { id: 'materials', label: '3. Materials & Comfort', path: '/app/materials', icon: '🧱' },
    { id: 'design', label: '4. 3D Twin', path: '/app/design/studio', icon: '🏛️' },
    { id: 'simulation', label: '5. Thermal Sim', path: '/app/simulation', icon: '🌡️' },
    { id: 'what-if', label: '6. What-If', path: '/app/what-if', icon: '⚡' },
    { id: 'compare', label: '7. Compare', path: '/app/compare', icon: '⚖️' },
    { id: 'result', label: '8. Result', path: '/app/result', icon: '📄' },
  ];

  return (
    <>
      {/* Sticky Demo Tour Guide Bar when Demo Mode is active */}
      <DemoTourGuide />

      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Workflow Step Progression Bar */}
        <StepIndicator
          steps={steps}
          currentPath={location.pathname}
          onNavigate={(path) => navigate(path)}
        />

        {/* Nested App Route Content with Module Error Boundary */}
        <div className="animate-fadeIn">
          <ErrorBoundary
            key={location.pathname}
            fallbackTitle="Something went wrong in this module."
            fallbackMessage="An unexpected issue occurred while rendering this SHELTRON stage. Click retry to recover."
            onReset={() => navigate(location.pathname)}
          >
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
