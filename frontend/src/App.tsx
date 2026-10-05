import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { ProblemPage } from './pages/public/ProblemPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { ImpactPage } from './pages/public/ImpactPage';
import { TechnicalPage } from './pages/public/TechnicalPage';
import { ResearchPage } from './pages/public/ResearchPage';

// App pages
import { AppLayout } from './pages/app/AppLayout';
import { AppOverviewPage } from './pages/app/AppOverviewPage';
import { CreateProjectPage } from './pages/app/CreateProjectPage';
import { ClimatePage } from './pages/app/ClimatePage';
import { MaterialComfortPage } from './pages/app/MaterialComfortPage';
import { DesignPage } from './pages/app/DesignPage';
import { DesignStudioPage } from './pages/app/DesignStudioPage';
import { SimulationPage } from './pages/app/SimulationPage';
import { HeatmapPage } from './pages/app/HeatmapPage';
import { WhatIfPage } from './pages/app/WhatIfPage';
import { ComparePage } from './pages/app/ComparePage';
import { OptimizationPage } from './pages/app/OptimizationPage';
import { ResultPage } from './pages/app/ResultPage';

export function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-[#f6faf3] via-[#edf5eb] to-[#e4ede1] text-[#123b2a] flex flex-col font-sans antialiased relative overflow-x-hidden selection:bg-[#cbe6c7] selection:text-[#087443]">
          
          {/* Subtle flowing green landscape hills & wave shapes behind content */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
            {/* Soft wave hill background - subtle and soft, leaving title area clean & luminous */}
            <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" fill="none">
              <path d="M-100,340 C240,280 480,410 760,330 C1040,250 1260,350 1540,290 L1540,900 L-100,900 Z" fill="#d2e4ce" />
              <path d="M-100,450 C300,390 580,500 880,430 C1160,360 1360,460 1540,410 L1540,900 L-100,900 Z" fill="#c2d9be" opacity="0.7" />
              <path d="M-100,580 C360,520 680,630 980,560 C1240,490 1420,590 1540,540 L1540,900 L-100,900 Z" fill="#b0ccab" opacity="0.55" />
            </svg>

            {/* Top-Left Corner Botanical Cluster (Reduced size ~35%, soft opacity 55%, delicate far corner decoration) */}
            <div className="absolute -top-3 -left-3 w-52 sm:w-60 h-52 sm:h-60 opacity-55 pointer-events-none">
              <svg viewBox="0 0 260 260" className="w-full h-full drop-shadow-2xs" fill="none">
                <path d="M -10,-10 C 60,70 100,140 90,240" stroke="#375537" strokeWidth="3" strokeLinecap="round" />
                <path d="M 20,20 C 55,5 95,20 110,60 C 80,80 45,70 20,20 Z" fill="#4d6f49" />
                <path d="M 20,20 Q 65,45 110,60" stroke="#31492e" strokeWidth="1.2" />
                <path d="M 60,55 C 105,35 145,55 160,100 C 120,115 80,95 60,55 Z" fill="#5f835b" />
                <path d="M 60,55 Q 110,80 160,100" stroke="#3c5739" strokeWidth="1.2" />
                <path d="M 0,65 C -15,105 5,145 40,155 C 55,120 45,85 0,65 Z" fill="#446440" />
                <path d="M 35,105 C 75,90 115,105 125,145 C 95,165 55,150 35,105 Z" fill="#71966c" />
                <path d="M 75,135 C 120,115 160,135 170,175 C 135,195 95,175 75,135 Z" fill="#557751" />
                <path d="M 20,165 C 60,150 100,168 110,210 C 75,225 35,210 20,165 Z" fill="#82a57e" />
              </svg>
            </div>

            {/* Top-Right Corner Botanical Cluster (Reduced size ~35%, soft opacity 55%, delicate far corner decoration) */}
            <div className="absolute -top-3 -right-3 w-52 sm:w-60 h-52 sm:h-60 opacity-55 pointer-events-none">
              <svg viewBox="0 0 260 260" className="w-full h-full drop-shadow-2xs" fill="none">
                <path d="M 270,-10 C 200,70 160,140 170,240" stroke="#375537" strokeWidth="3" strokeLinecap="round" />
                <path d="M 240,20 C 205,5 165,20 150,60 C 180,80 215,70 240,20 Z" fill="#4d6f49" />
                <path d="M 240,20 Q 195,45 150,60" stroke="#31492e" strokeWidth="1.2" />
                <path d="M 200,55 C 155,35 115,55 100,100 C 140,115 180,95 200,55 Z" fill="#5f835b" />
                <path d="M 200,55 Q 150,80 100,100" stroke="#3c5739" strokeWidth="1.2" />
                <path d="M 260,65 C 275,105 255,145 220,155 C 205,120 215,85 260,65 Z" fill="#446440" />
                <path d="M 225,105 C 185,90 145,105 135,145 C 165,165 205,150 225,105 Z" fill="#71966c" />
                <path d="M 185,135 C 140,115 100,135 90,175 C 125,195 165,175 185,135 Z" fill="#557751" />
                <path d="M 240,165 C 200,150 160,168 150,210 C 185,225 225,210 240,165 Z" fill="#82a57e" />
              </svg>
            </div>

            {/* Bottom-Left Outer Corner Botanical Cluster (Small accent, low opacity 45%) */}
            <div className="absolute -bottom-3 -left-3 w-48 sm:w-56 h-48 sm:h-56 opacity-45 pointer-events-none">
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xs" fill="none">
                <path d="M -10,250 C 50,180 90,120 70,20" stroke="#375537" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 20,220 C 50,235 90,220 100,180 C 70,160 40,170 20,220 Z" fill="#4d6f49" />
                <path d="M 50,185 C 90,205 130,185 140,145 C 105,130 70,150 50,185 Z" fill="#5f835b" />
                <path d="M 10,165 C 0,130 15,95 45,85 C 60,115 50,145 10,165 Z" fill="#446440" />
                <path d="M 40,135 C 75,145 110,130 120,95 C 90,75 55,90 40,135 Z" fill="#71966c" />
                <path d="M 25,95 C 60,105 95,90 105,50 C 75,35 40,50 25,95 Z" fill="#82a57e" />
              </svg>
            </div>

            {/* Bottom-Right Outer Corner Botanical Cluster (Small accent, low opacity 45%) */}
            <div className="absolute -bottom-3 -right-3 w-48 sm:w-56 h-48 sm:h-56 opacity-45 pointer-events-none">
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xs" fill="none">
                <path d="M 250,250 C 190,180 150,120 170,20" stroke="#375537" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 220,220 C 190,235 150,220 140,180 C 170,160 200,170 220,220 Z" fill="#4d6f49" />
                <path d="M 190,185 C 150,205 110,185 100,145 C 135,130 170,150 190,185 Z" fill="#5f835b" />
                <path d="M 230,165 C 240,130 225,95 195,85 C 180,115 190,145 230,165 Z" fill="#446440" />
                <path d="M 200,135 C 165,145 130,130 120,95 C 150,75 185,90 200,135 Z" fill="#71966c" />
                <path d="M 215,95 C 180,105 145,90 135,50 C 165,35 200,50 215,95 Z" fill="#82a57e" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            <Navbar />
            
            <main className="flex-1">
            <Routes>
              {/* Public Marketing & Technical Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/problem" element={<ProblemPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/technical" element={<TechnicalPage />} />
              <Route path="/research" element={<ResearchPage />} />

              {/* Core Application Workflow Routes */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<AppOverviewPage />} />
                <Route path="site" element={<CreateProjectPage />} />
                <Route path="create" element={<CreateProjectPage />} />
                <Route path="climate" element={<ClimatePage />} />
                <Route path="materials" element={<MaterialComfortPage />} />
                <Route path="design" element={<DesignPage />} />
                <Route path="design/studio" element={<DesignStudioPage />} />
                <Route path="studio" element={<DesignStudioPage />} />
                <Route path="simulation" element={<SimulationPage />} />
                <Route path="heatmap" element={<HeatmapPage />} />
                <Route path="what-if" element={<WhatIfPage />} />
                <Route path="compare" element={<ComparePage />} />
                <Route path="optimize" element={<OptimizationPage />} />
                <Route path="result" element={<ResultPage />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
