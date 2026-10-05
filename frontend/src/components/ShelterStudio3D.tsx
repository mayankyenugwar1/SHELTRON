import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ShelterParameters, SimulationResults } from '../types';

interface ShelterStudio3DProps {
  params: ShelterParameters;
  simulation?: SimulationResults | null;
  showLabels?: boolean;
  orbitControlsRef: React.RefObject<any>;
}

// Architectural Tree (Non-cartoonish, stylized architectural maquette)
function StudioArchitecturalTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Natural tapered bark trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.85} />
      </mesh>
      {/* Tiered architectural foliage layers */}
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

// Architectural Linear Planter with lush ornamental grasses
function StudioPlanter({ position, size = [2.2, 0.3, 0.35] }: { position: [number, number, number]; size?: [number, number, number] }) {
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

function StudioStructure({
  params,
  simulation: _simulation,
  showLabels
}: {
  params: ShelterParameters;
  simulation?: SimulationResults | null;
  showLabels?: boolean;
}) {
  const rad = (params.orientation_deg * Math.PI) / 180;

  // Triangular gable pediment matching roof pitch (no corner protrusion)
  const gableShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.18, 0);
    shape.lineTo(-2.18, 0.05);
    shape.lineTo(0, 0.54);
    shape.lineTo(2.18, 0.05);
    shape.lineTo(2.18, 0);
    shape.closePath();
    return shape;
  }, []);

  // Material Colors
  const getWallColor = () => {
    if (params.wall_material.includes("Earth") || params.wall_material.includes("CSEB") || params.wall_material.includes("Rammed")) return "#D6C6B6";
    if (params.wall_material.includes("AAC")) return "#E8ECEF";
    if (params.wall_material.includes("Bamboo")) return "#D8C7A0";
    if (params.wall_material.includes("Brick")) return "#B45309";
    return "#CBD5E1";
  };

  const getRoofColor = () => {
    if (params.roof_material.includes("Terracotta")) return "#C85A32";
    if (params.roof_material.includes("Green") || params.roof_material.includes("Sedum")) return "#3A5A40";
    if (params.roof_material.includes("Cool") || params.roof_material.includes("Membrane")) return "#F8FAFC";
    if (params.roof_material.includes("Metal") || params.roof_material.includes("GI")) return "#94A3B8";
    return "#475569";
  };

  const wallColor = getWallColor();
  const roofColor = getRoofColor();

  // Dynamic geometric dimensions
  const wwrScale = Math.min(2.0, Math.max(0.7, params.window_to_wall_ratio_pct / 18));
  const overhangDepth = Math.max(0.3, params.shading_overhang_m);
  const isSloped = params.roof_type.includes("Sloped") || params.roof_material.includes("Terracotta");
  const isSolarPergola = params.roof_material.includes("Cool") || params.roof_type.includes("Solar") || params.roof_type.includes("Flat");
  const isGreenRoof = params.roof_material.includes("Green") || params.roof_material.includes("Sedum");
  const isVaulted = params.roof_type.includes("Vaulted") || params.roof_type.includes("Curved");
  const isButterfly = params.roof_type.includes("Butterfly");

  return (
    <group rotation={[0, rad, 0]}>
      {/* 1. Architectural Site Podium & Stepped Plinth */}
      <group position={[0, -0.2, 0]}>
        {/* Main Limestone Terrace Platform */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[10.5, 0.3, 7.8]} />
          <meshStandardMaterial color="#EAE6DE" roughness={0.8} />
        </mesh>
        {/* Recessed shadow line */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[10.7, 0.05, 8.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.9} />
        </mesh>
        {/* Paved entrance stepping path */}
        <mesh position={[0, 0.16, 3.2]} receiveShadow>
          <boxGeometry args={[2.0, 0.04, 1.2]} />
          <meshStandardMaterial color="#D8D4CC" roughness={0.75} />
        </mesh>
      </group>

      {/* Landscaping: Architectural trees and linear planter boxes */}
      <StudioArchitecturalTree position={[-4.2, 0, -1.8]} scale={1.05} />
      <StudioArchitecturalTree position={[4.2, 0, -1.5]} scale={1.0} />
      <StudioPlanter position={[-2.6, 0, 3.0]} size={[2.0, 0.35, 0.35]} />
      <StudioPlanter position={[2.6, 0, 3.0]} size={[2.0, 0.35, 0.35]} />

      {/* Building Base Plinth */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 0.2, 4.4]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.7} />
      </mesh>

      {/* 2. Four Main Exterior Walls with Architectural Thickness */}
      {/* North Wall */}
      <mesh position={[0, 1.35, -2.05]} castShadow receiveShadow>
        <boxGeometry args={[6.0, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* East Wall */}
      <mesh position={[2.85, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.4, 3.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* West Wall with Vertical Timber Accent Slats */}
      <mesh position={[-2.85, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.4, 3.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      <group position={[-3.02, 1.35, 0]}>
        {/* Horizontal Top & Bottom Mounting Rails */}
        <mesh position={[0, 1.12, 0]} castShadow>
          <boxGeometry args={[0.04, 0.04, 2.6]} />
          <meshStandardMaterial color="#5C3B1E" roughness={0.7} />
        </mesh>
        <mesh position={[0, -1.12, 0]} castShadow>
          <boxGeometry args={[0.04, 0.04, 2.6]} />
          <meshStandardMaterial color="#5C3B1E" roughness={0.7} />
        </mesh>
        {[-1.2, -0.6, 0, 0.6, 1.2].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.08]} />
            <meshStandardMaterial color="#8A5A36" roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* South Wall (Segmented around Door and Glazed Window) */}
      {/* Left Wall Segment */}
      <mesh position={[-2.1, 1.35, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      {/* Right Wall Segment */}
      <mesh position={[2.1, 1.35, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.4, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Architectural Entrance Door (Timber with dark bronze frame and handle) */}
      <group position={[-0.9, 1.15, 2.05]}>
        {/* Door Casing / Frame */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.96, 2.02, 0.14]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Door Leaf */}
        <mesh position={[0, 0, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.88, 1.94, 0.08]} />
          <meshStandardMaterial color="#5C3B1E" roughness={0.65} />
        </mesh>
        {/* Bronze Kickplate */}
        <mesh position={[0, -0.84, 0.09]}>
          <boxGeometry args={[0.84, 0.18, 0.02]} />
          <meshStandardMaterial color="#78350F" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.35, 0, 0.11]}>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
      {/* Door Lintel */}
      <mesh position={[-0.9, 2.35, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.40, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Center Window Aperture with Architectural Frame, Mullion and Sill Ledge */}
      {/* Sill and Lintel */}
      <mesh position={[0.7, 0.525, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.3 * wwrScale, 0.75, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>
      <mesh position={[0.7, 2.275, 2.05]} castShadow receiveShadow>
        <boxGeometry args={[1.3 * wwrScale, 0.55, 0.3]} />
        <meshStandardMaterial color={wallColor} roughness={0.75} />
      </mesh>

      {/* Architectural Projected Window Sill Ledge */}
      <mesh position={[0.7, 0.89, 2.21]} castShadow>
        <boxGeometry args={[1.3 * wwrScale + 0.12, 0.05, 0.12]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.65} />
      </mesh>

      {/* Window Frame (Dark Bronze Aluminum) */}
      <mesh position={[0.7, 1.45, 2.06]}>
        <boxGeometry args={[1.3 * wwrScale + 0.06, 1.1 + 0.06, 0.08]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Translucent Double Glazing */}
      <mesh position={[0.7, 1.45, 2.07]}>
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
      {/* Architectural Vertical Window Mullion Bar */}
      <mesh position={[0.7, 1.45, 2.10]}>
        <boxGeometry args={[0.035, 1.08, 0.04]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Climate-Adaptive Horizontal Shading Brise-Soleil */}
      <group position={[0.7, 2.05, 2.20]}>
        {/* Side Structural Outrigger Cantilever Arms */}
        {[-0.65 * wwrScale - 0.08, 0.65 * wwrScale + 0.08].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {/* Horizontal Cantilever Arm */}
            <mesh position={[0, 0, overhangDepth * 0.45]} castShadow>
              <boxGeometry args={[0.04, 0.06, overhangDepth * 0.9]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* 45-degree Diagonal Support Strut to Wall */}
            <mesh position={[0, -0.16, overhangDepth * 0.35]} rotation={[0.45, 0, 0]} castShadow>
              <boxGeometry args={[0.035, 0.38, 0.035]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Multi-Blade Horizontal Aerodynamic Shading Louvers */}
        {[0.25, 0.55, 0.85].map((ratio, i) => (
          <mesh
            key={i}
            position={[0, 0, overhangDepth * ratio]}
            rotation={[-0.18, 0, 0]}
            castShadow
          >
            <boxGeometry args={[1.3 * wwrScale + 0.16, 0.02, overhangDepth * 0.28]} />
            <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}

        {/* Front Structural Tie/Fascia Bar */}
        <mesh position={[0, 0.01, overhangDepth * 0.9]} castShadow>
          <boxGeometry args={[1.3 * wwrScale + 0.22, 0.04, 0.04]} />
          <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* 3. DYNAMIC ARCHITECTURAL ROOF ARCHETYPES (Sit correctly on wall tops at y=2.55) */}
      {isSloped && (
        <group position={[0, 2.55, 0]}>
          {/* 1. Interior Horizontal Ceiling Slab / Tie-Beam Deck (Faces down toward living space) */}
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[6.04, 0.08, 4.36]} />
            <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
          </mesh>

          {/* 2. Exposed Structural Timber Wall Plates & Cross Tie-Beams */}
          {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
            <mesh key={i} position={[x, 0.10, 0]} castShadow>
              <boxGeometry args={[0.08, 0.08, 4.36]} />
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
          <mesh position={[2.99, 0.34, 0]}>
            <boxGeometry args={[0.04, 0.16, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
          <mesh position={[-2.99, 0.34, 0]}>
            <boxGeometry args={[0.04, 0.16, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>

          {/* 4. Structural Sloping Timber Rafters (Support framing beneath the deck) */}
          {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
            <React.Fragment key={`rafter-${i}`}>
              <mesh position={[x, 0.28, -1.16]} rotation={[-0.22, 0, 0]} castShadow>
                <boxGeometry args={[0.06, 0.06, 2.36]} />
                <meshStandardMaterial color="#6A4A28" roughness={0.7} />
              </mesh>
              <mesh position={[x, 0.28, 1.16]} rotation={[0.22, 0, 0]} castShadow>
                <boxGeometry args={[0.06, 0.06, 2.36]} />
                <meshStandardMaterial color="#6A4A28" roughness={0.7} />
              </mesh>
            </React.Fragment>
          ))}

          {/* 5. Double-Skin Secondary Roof: Thermal Radiant Sub-Deck / Sarking Board */}
          {/* Sits right on rafters; clearly visible from below eave overhang */}
          <mesh position={[0, 0.33, -1.16]} rotation={[-0.22, 0, 0]}>
            <boxGeometry args={[6.26, 0.03, 2.36]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.33, 1.16]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[6.26, 0.03, 2.36]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.3} />
          </mesh>

          {/* 6. Double-Skin Ventilated Air Cavity: Spacer Battens Creating Stack-Effect Airflow */}
          {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
            <React.Fragment key={`batten-${i}`}>
              <mesh position={[x, 0.365, -1.16]} rotation={[-0.22, 0, 0]}>
                <boxGeometry args={[0.04, 0.04, 2.36]} />
                <meshStandardMaterial color="#4A3525" roughness={0.7} />
              </mesh>
              <mesh position={[x, 0.365, 1.16]} rotation={[0.22, 0, 0]}>
                <boxGeometry args={[0.04, 0.04, 2.36]} />
                <meshStandardMaterial color="#4A3525" roughness={0.7} />
              </mesh>
            </React.Fragment>
          ))}

          {/* 7. Exterior Primary Roof Planes: Sloped Terracotta Tiles on Top */}
          {/* North Roof Plane (Slopes down towards north eaves) */}
          <mesh position={[0, 0.42, -1.16]} rotation={[-0.22, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.36, 0.07, 2.42]} />
            <meshStandardMaterial color={roofColor} roughness={0.55} />
          </mesh>
          {/* South Roof Plane (Slopes down towards south eaves) */}
          <mesh position={[0, 0.42, 1.16]} rotation={[0.22, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.36, 0.07, 2.42]} />
            <meshStandardMaterial color={roofColor} roughness={0.55} />
          </mesh>

          {/* Eaves Fascia Board Trim along North and South Drip Edges */}
          <mesh position={[0, 0.16, -2.34]} rotation={[-0.22, 0, 0]}>
            <boxGeometry args={[6.36, 0.06, 0.03]} />
            <meshStandardMaterial color="#78350F" roughness={0.65} />
          </mesh>
          <mesh position={[0, 0.16, 2.34]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[6.36, 0.06, 0.03]} />
            <meshStandardMaterial color="#78350F" roughness={0.65} />
          </mesh>

          {/* 8. Continuous Aerodynamic Ventilated Ridge Cap Sealing the Apex */}
          {/* Ventilation shadow reveal underneath */}
          <mesh position={[0, 0.67, 0]}>
            <boxGeometry args={[6.36, 0.03, 0.28]} />
            <meshStandardMaterial color="#0F172A" roughness={0.9} />
          </mesh>
          {/* Ridge Cap */}
          <mesh position={[0, 0.71, 0]} castShadow>
            <boxGeometry args={[6.40, 0.07, 0.36]} />
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

      {/* Material Labels when active */}
      {showLabels && (
        <>
          <Html position={[0, 3.4, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Roof: {params.roof_material.split('(')[0]}
            </div>
          </Html>
          <Html position={[0.7, 2.2, 2.3 + overhangDepth * 0.4]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              {params.shading_overhang_m}m Shading Eaves
            </div>
          </Html>
          <Html position={[-3.0, 1.5, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Wall: {params.wall_material.split('(')[0]}
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

export const ShelterStudio3D: React.FC<ShelterStudio3DProps> = ({
  params,
  simulation,
  showLabels = true,
  orbitControlsRef
}) => {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 5.5, 9.5], fov: 38 }}
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
      <pointLight position={[0, 2, 0]} intensity={0.7} color="#FEF3C7" distance={6} />

      <StudioStructure params={params} simulation={simulation} showLabels={showLabels} />

      <OrbitControls
        ref={orbitControlsRef}
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={4}
        maxDistance={22}
      />
    </Canvas>
  );
};
