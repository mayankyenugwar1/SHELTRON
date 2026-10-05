import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ShelterParameters, SimulationResults } from '../types';
import { ErrorBoundary } from './ErrorBoundary';

interface Shelter3DViewerProps {
  params: ShelterParameters;
  simulation?: SimulationResults;
  wireframeMode?: boolean;
  showHeatmap?: boolean;
}

// Architectural Tree (Realistic, Non-cartoonish)
function ArchitecturalTreeViewer({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.75, 0.32, 7]} />
        <meshStandardMaterial color="#3A5A40" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.6, 0.32, 7]} />
        <meshStandardMaterial color="#486D4C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.98, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.42, 0.3, 7]} />
        <meshStandardMaterial color="#588157" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Architectural Linear Planter with ornamental hedge
function ArchitecturalPlanterViewer({ position, size = [2.2, 0.3, 0.35] }: { position: [number, number, number]; size?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#2B343B" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, size[1] + 0.12, 0]} castShadow>
        <boxGeometry args={[size[0] - 0.1, 0.22, size[2] - 0.1]} />
        <meshStandardMaterial color="#4F7744" roughness={0.85} />
      </mesh>
    </group>
  );
}

function ShelterStructure({
  params,
  simulation,
  showHeatmap
}: {
  params: ShelterParameters;
  simulation?: SimulationResults;
  showHeatmap?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Dynamic temperatures
  const roofTemp = simulation?.surface_temp_roof_c ?? 38;
  const wallTemp = simulation?.surface_temp_walls_c ?? 32;
  const indoorTemp = simulation?.indoor_temp_c ?? 26;

  // Thermal heatmap color interpolation: 20C (cool green/blue) -> 45C (hot orange/red)
  const getTempColor = (t: number) => {
    if (!showHeatmap) {
      if (params.wall_material.includes("Earth") || params.wall_material.includes("CSEB") || params.wall_material.includes("Rammed")) return "#D6C6B6";
      if (params.wall_material.includes("AAC")) return "#E8ECEF";
      if (params.wall_material.includes("Bamboo")) return "#D8C7A0";
      if (params.wall_material.includes("Brick")) return "#B45309";
      return "#CBD5E1";
    }
    const norm = Math.min(1, Math.max(0, (t - 22) / 20));
    return new THREE.Color().setHSL(0.65 - norm * 0.65, 0.85, 0.52).getStyle();
  };

  const getRoofColor = () => {
    if (!showHeatmap) {
      if (params.roof_material.includes("Terracotta")) return "#C85A32";
      if (params.roof_material.includes("Green") || params.roof_material.includes("Sedum")) return "#3A5A40";
      if (params.roof_material.includes("Cool") || params.roof_material.includes("Membrane")) return "#F8FAFC";
      if (params.roof_material.includes("Metal") || params.roof_material.includes("GI")) return "#94A3B8";
      return "#475569";
    }
    const norm = Math.min(1, Math.max(0, (roofTemp - 22) / 25));
    return new THREE.Color().setHSL(0.65 - norm * 0.65, 0.9, 0.5).getStyle();
  };

  const wallColor = getTempColor(wallTemp);
  const roofColor = getRoofColor();
  const rad = (params.orientation_deg * Math.PI) / 180;

  // Triangular gable pediment matching roof pitch (no corner protrusion)
  const gableShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.90, 0);
    shape.lineTo(0, 0.55);
    shape.lineTo(1.90, 0);
    shape.closePath();
    return shape;
  }, []);

  const wwrScale = Math.min(2.0, Math.max(0.7, params.window_to_wall_ratio_pct / 18));
  const overhangDepth = Math.max(0.3, params.shading_overhang_m);
  const isSloped = params.roof_type.includes("Sloped") || params.roof_material.includes("Terracotta");
  const isSolarPergola = params.roof_material.includes("Cool") || params.roof_type.includes("Solar") || params.roof_type.includes("Flat");
  const isGreenRoof = params.roof_material.includes("Green") || params.roof_material.includes("Sedum");
  const isVaulted = params.roof_type.includes("Vaulted") || params.roof_type.includes("Curved");
  const isButterfly = params.roof_type.includes("Butterfly");

  return (
    <group ref={groupRef} rotation={[0, rad, 0]}>
      {/* 1. Architectural Site Base & Stepped Terrace Plinth */}
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[10.5, 0.3, 7.8]} />
          <meshStandardMaterial color="#EAE6DE" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[10.7, 0.05, 8.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.16, 3.2]} receiveShadow>
          <boxGeometry args={[2.0, 0.04, 1.2]} />
          <meshStandardMaterial color="#D8D4CC" roughness={0.75} />
        </mesh>
      </group>

      {/* Building Base Plinth */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 0.2, 4.4]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.7} />
      </mesh>

      {/* 2. Main Walls */}
      {/* North Wall */}
      <mesh position={[0, 1.35, -2.05]} castShadow receiveShadow>
        <boxGeometry args={[6.0, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* East & West Walls */}
      <mesh position={[2.85, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.4, 3.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      <mesh position={[-2.85, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.4, 3.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* South Wall with Entrance and Window */}
      <mesh position={[-2.1, 1.35, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      <mesh position={[2.1, 1.35, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Door */}
      <mesh position={[-0.9, 1.05, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.9, 0.12]} />
        <meshStandardMaterial color="#5C3B1E" roughness={0.65} />
      </mesh>
      <mesh position={[-0.9, 2.25, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.5, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Window Sill & Lintel */}
      <mesh position={[0.7, 0.55, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.3 * wwrScale, 0.8, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      <mesh position={[0.7, 2.25, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.3 * wwrScale, 0.5, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Window Frame and Glazing */}
      <mesh position={[0.7, 1.4, 2.06]}>
        <boxGeometry args={[1.3 * wwrScale + 0.06, 1.1 + 0.06, 0.08]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.7, 1.4, 2.07]}>
        <boxGeometry args={[1.3 * wwrScale, 1.1, 0.04]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.88}
          roughness={0.08}
          metalness={0.15}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Shading Overhang (Chajja) */}
      <group position={[0.7, 2.05, 2.1 + overhangDepth * 0.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6 * wwrScale, 0.08, overhangDepth * 0.8]} />
          <meshStandardMaterial color="#475569" roughness={0.4} />
        </mesh>
        {[-0.6 * wwrScale, 0.6 * wwrScale].map((x, i) => (
          <mesh key={i} position={[x, -0.15, -overhangDepth * 0.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.04, 0.35, 0.04]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* 3. DYNAMIC ARCHITECTURAL ROOF ARCHETYPES (Sit correctly on wall tops at y=2.55) */}
      {isSloped && (
        <group position={[0, 2.55, 0]}>
          {/* 1. Interior Horizontal Ceiling Slab / Tie-Beam Deck (Faces down toward living space) */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>

          {/* 2. Exposed Structural Timber Wall Plates & Cross Tie-Beams */}
          {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
            <mesh key={i} position={[x, 0.12, 0]} castShadow>
              <boxGeometry args={[0.08, 0.09, 4.4]} />
              <meshStandardMaterial color="#5C3B1E" roughness={0.7} />
            </mesh>
          ))}

          {/* 3. East & West Triangular Gable Enclosure Walls & Attic Cross-Ventilation */}
          <mesh position={[2.72, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <extrudeGeometry args={[gableShape, { depth: 0.26, bevelEnabled: false }]} />
            <meshStandardMaterial color={wallColor} roughness={0.75} />
          </mesh>
          <mesh position={[-2.98, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <extrudeGeometry args={[gableShape, { depth: 0.26, bevelEnabled: false }]} />
            <meshStandardMaterial color={wallColor} roughness={0.75} />
          </mesh>
          {/* Gable Central Attic Cross-Ventilation Grilles */}
          <mesh position={[2.99, 0.32, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          <mesh position={[-2.99, 0.32, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>

          {/* 4. Double-Skin Ventilated Air Cavity & Radiant Barrier Sub-Deck */}
          <mesh position={[0, 0.38, -1.15]} rotation={[-0.22, 0, 0]}>
            <boxGeometry args={[6.5, 0.02, 2.45]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.38, 1.15]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[6.5, 0.02, 2.45]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
          </mesh>

          {/* 5. Exterior Sloped Roof Planes (Sloping DOWN from Ridge to Eaves) */}
          {/* North Roof Plane (Slopes down towards north eaves) */}
          <mesh position={[0, 0.44, -1.15]} rotation={[-0.22, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.6, 0.11, 2.52]} />
            <meshStandardMaterial color={roofColor} roughness={0.55} />
          </mesh>
          {/* South Roof Plane (Slopes down towards south eaves) */}
          <mesh position={[0, 0.44, 1.15]} rotation={[0.22, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.6, 0.11, 2.52]} />
            <meshStandardMaterial color={roofColor} roughness={0.55} />
          </mesh>

          {/* 6. Continuous Ventilated Ridge Cap Sealing the Apex */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[6.64, 0.08, 0.38]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
        </group>
      )}

      {isSolarPergola && (
        <group position={[0, 2.55, 0]}>
          {/* Interior Ceiling Slab */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>
          {/* High-Albedo Cool Roof Base with Parapet Edge */}
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.6, 0.14, 4.6]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.35} />
          </mesh>
          {/* Low Perimeter Parapet Curb */}
          <mesh position={[0, 0.24, 2.22]}>
            <boxGeometry args={[6.6, 0.14, 0.16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.24, -2.22]}>
            <boxGeometry args={[6.6, 0.14, 0.16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.6} />
          </mesh>
          <mesh position={[3.22, 0.24, 0]}>
            <boxGeometry args={[0.16, 0.14, 4.3]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.6} />
          </mesh>
          <mesh position={[-3.22, 0.24, 0]}>
            <boxGeometry args={[0.16, 0.14, 4.3]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.6} />
          </mesh>

          {/* Elevated Steel Pergola Frame */}
          {[
            [-2.6, 1.8],
            [2.6, 1.8],
            [-2.6, -1.8],
            [2.6, -1.8]
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 0.6, z]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
            </mesh>
          ))}
          {/* Photovoltaic Solar Panels */}
          <group position={[0, 1.05, 0]} rotation={[-0.06, 0, 0]}>
            {[-1.8, -0.6, 0.6, 1.8].map((x, i) =>
              [-1.0, 1.0].map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0, z]} castShadow>
                  <boxGeometry args={[1.0, 0.03, 1.4]} />
                  <meshStandardMaterial color="#0B132B" metalness={0.85} roughness={0.2} />
                </mesh>
              ))
            )}
          </group>
        </group>
      )}

      {isGreenRoof && (
        <group position={[0, 2.55, 0]}>
          {/* Interior Ceiling Slab */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>
          {/* Roof Structural Deck */}
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.6, 0.14, 4.6]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
          {/* Living Sedum Vegetated Grass Layer */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <boxGeometry args={[6.3, 0.10, 4.3]} />
            <meshStandardMaterial color="#3A5A40" roughness={0.9} />
          </mesh>
          {/* Gravel Ballast Drainage Edge */}
          <mesh position={[0, 0.20, 2.22]}>
            <boxGeometry args={[6.6, 0.08, 0.18]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.95} />
          </mesh>
          <mesh position={[0, 0.20, -2.22]}>
            <boxGeometry args={[6.6, 0.08, 0.18]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.95} />
          </mesh>
        </group>
      )}

      {isVaulted && (
        <group position={[0, 2.55, 0]}>
          {/* Interior Ceiling / Tie-Beam Base */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 1.8, 5.8, 32, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#556B2F" roughness={0.55} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {isButterfly && (
        <group position={[0, 2.55, 0]}>
          {/* Interior Ceiling Slab */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>
          {/* Left Wing (Slopes down inward to central valley gutter) */}
          <mesh position={[-1.7, 0.35, 0]} rotation={[0, 0, -0.22]} castShadow receiveShadow>
            <boxGeometry args={[3.5, 0.12, 4.8]} />
            <meshStandardMaterial color="#3E6B5C" roughness={0.5} />
          </mesh>
          {/* Right Wing (Slopes down inward to central valley gutter) */}
          <mesh position={[1.7, 0.35, 0]} rotation={[0, 0, 0.22]} castShadow receiveShadow>
            <boxGeometry args={[3.5, 0.12, 4.8]} />
            <meshStandardMaterial color="#3E6B5C" roughness={0.5} />
          </mesh>
          {/* Central Valley Rainwater Gutter */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.4, 0.12, 4.9]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} />
          </mesh>
        </group>
      )}

      {/* Fallback standard flat roof if none matched */}
      {!isSloped && !isSolarPergola && !isGreenRoof && !isVaulted && !isButterfly && (
        <group position={[0, 2.55, 0]}>
          {/* Interior Ceiling Slab */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.08, 0.08, 4.3]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.6, 0.14, 4.6]} />
            <meshStandardMaterial color={roofColor} roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* Realistic Landscaping Buffer */}
      {params.natural_cooling_buffer && (
        <>
          <ArchitecturalTreeViewer position={[-4.2, 0, -1.8]} scale={1.05} />
          <ArchitecturalTreeViewer position={[4.2, 0, -1.5]} scale={1.0} />
          <ArchitecturalPlanterViewer position={[-2.6, 0, 3.0]} size={[2.0, 0.35, 0.35]} />
          <ArchitecturalPlanterViewer position={[2.6, 0, 3.0]} size={[2.0, 0.35, 0.35]} />
        </>
      )}

      {/* Internal Thermal Indicator Floating Bead */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={indoorTemp > 30 ? "#FB923C" : "#38BDF8"} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export const Shelter3DViewer: React.FC<Shelter3DViewerProps> = ({
  params,
  simulation,
  showHeatmap = false
}) => {
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setCameraZoomed(false);
  };

  return (
    <ErrorBoundary
      fallbackTitle="3D preview unavailable"
      fallbackMessage="WebGL is unavailable or encountered a graphics context failure. Displaying lightweight 2D fallback."
    >
      <div className="relative w-full h-full min-h-[420px] bg-gradient-to-b from-[#eaf2e6] via-[#f3f7f0] to-[#fbfdfa] rounded-2xl overflow-hidden border border-[#cbdcc5] shadow-inner">
        <Canvas
          shadows
          camera={{ position: [8.5, 6, cameraZoomed ? 8 : 10.5], fov: 38 }}
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-2">
              <span className="text-3xl">📐</span>
              <p className="font-bold text-sm text-slate-700">3D preview unavailable</p>
              <p className="text-xs text-slate-500">Hardware WebGL acceleration is disabled in this environment.</p>
            </div>
          }
        >
          <ambientLight intensity={0.8} color="#F4FAF0" />
          <directionalLight
            position={[10, 16, 8]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#FFFBEB"
          />
          <directionalLight position={[-8, 10, -6]} intensity={0.4} color="#D1E7DD" />
          <pointLight position={[0, 2, 0]} intensity={0.6} color="#FEF3C7" distance={6} />

          <ShelterStructure params={params} simulation={simulation} showHeatmap={showHeatmap} />

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={4}
            maxDistance={22}
          />
        </Canvas>

        {/* Overlay Heads-up Display */}
        <div className="absolute top-4 left-4 bg-[#fffdf7]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#cbdcc5] shadow-xs text-xs space-y-0.5">
          <div className="flex items-center gap-2 font-black text-[#123b2a]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3d7042] animate-pulse" />
            <span>Interactive 3D Digital Twin</span>
          </div>
          <div className="text-[#3b6b52] flex gap-2.5 text-[11px] font-semibold">
            <span>Orient: <b className="text-[#123b2a]">{params.orientation_deg}°</b></span>
            <span>•</span>
            <span>WWR: <b className="text-[#123b2a]">{params.window_to_wall_ratio_pct}%</b></span>
            <span>•</span>
            <span>Chajja: <b className="text-[#123b2a]">{params.shading_overhang_m}m</b></span>
          </div>
        </div>

        {/* Right-Side Interactive View Controls */}
        <div className="absolute top-4 right-4 flex flex-col items-center gap-2 bg-[#fffdf7]/95 backdrop-blur-md p-2 rounded-2xl border border-[#cbdcc5] shadow-xs text-[11px]">
          <button
            onClick={handleReset}
            className="flex flex-col items-center gap-0.5 p-1 rounded-xl hover:bg-[#eaf6e8] text-[#123b2a] cursor-pointer transition-colors"
            title="Reset Camera View"
          >
            <span className="text-sm">↺</span>
            <span className="text-[9px] font-bold">Reset</span>
          </button>
          <button
            onClick={() => setCameraZoomed(prev => !prev)}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl hover:bg-[#eaf6e8] text-[#123b2a] cursor-pointer transition-colors ${cameraZoomed ? 'bg-[#eaf6e8]' : ''}`}
            title="Toggle Zoom Focus"
          >
            <span className="text-sm">🔍</span>
            <span className="text-[9px] font-bold">Zoom</span>
          </button>
          <button
            onClick={() => setAutoRotate(prev => !prev)}
            className={`flex flex-col items-center gap-0.5 p-1 rounded-xl hover:bg-[#eaf6e8] text-[#123b2a] cursor-pointer transition-colors ${autoRotate ? 'bg-[#eaf6e8]' : ''}`}
            title="Toggle Auto-Rotation"
          >
            <span className="text-sm">⟳</span>
            <span className="text-[9px] font-bold">Rotate</span>
          </button>
        </div>

        {/* Bottom-Left Compass Indicator */}
        <div className="absolute bottom-4 left-4 bg-[#fffdf7]/95 backdrop-blur-md p-2 rounded-2xl border border-[#cbdcc5] shadow-sm flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#cbdcc5] bg-[#f4faf0] flex items-center justify-center relative shadow-inner">
            <div className="text-[9px] font-black text-[#123b2a] absolute top-0.5">N</div>
            <div className="text-[8px] font-bold text-[#3b6b52] absolute bottom-0.5">S</div>
            <div className="text-[8px] font-bold text-[#3b6b52] absolute right-1">E</div>
            <div className="text-[8px] font-bold text-[#3b6b52] absolute left-1">W</div>
            <div
              className="w-1 h-7 bg-gradient-to-t from-[#3b6b52] to-[#123b2a] rounded-full transition-transform duration-300"
              style={{ transform: `rotate(${params.orientation_deg}deg)` }}
            />
          </div>
        </div>

        {/* Heatmap Legend */}
        {showHeatmap && (
          <div className="absolute bottom-4 right-4 bg-[#fffdf7]/95 backdrop-blur-md p-3 rounded-xl border border-[#cbdcc5] shadow-md text-xs space-y-1.5 w-48">
            <div className="font-bold text-[#123b2a]">Thermal Heatmap (°C)</div>
            <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-amber-400 to-rose-600" />
            <div className="flex justify-between text-[10px] text-[#3b6b52] font-semibold">
              <span>20°C (Cool)</span>
              <span>32°C</span>
              <span>45°C (Extreme)</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-20 text-[10px] text-[#3b6b52] bg-[#fffdf7]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-[#cbdcc5]">
          Drag to Orbit • Scroll to Zoom
        </div>
      </div>
    </ErrorBoundary>
  );
};
