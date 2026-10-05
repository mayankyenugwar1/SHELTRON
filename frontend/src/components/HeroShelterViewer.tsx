import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

export type DesignArchetype = 'villa' | 'solar' | 'gable' | 'vaulted' | 'butterfly';

interface DesignPresetInfo {
  id: DesignArchetype;
  name: string;
  badge: string;
  roofType: string;
  passiveDrop: string;
  coolingStrategy: string;
  description: string;
}

export const DESIGN_PRESETS: Record<DesignArchetype, DesignPresetInfo> = {
  villa: {
    id: 'villa',
    name: 'Bioclimatic Courtyard Villa',
    badge: '🏡 Courtyard Villa',
    roofType: 'Sloped Double-Skin Terracotta',
    passiveDrop: '18.4°C Drop',
    coolingStrategy: 'Stack-Effect Courtyard & Louvers',
    description: 'Ventilated double-skin terracotta roof, recessed shaded glazing with horizontal brise-soleil louvers, and natural cooling terrace.'
  },
  solar: {
    id: 'solar',
    name: 'Modern Solar Parasol Eco-Shelter',
    badge: '☀️ Solar Parasol',
    roofType: 'Elevated PV Canopy Pergola',
    passiveDrop: '16.8°C Drop',
    coolingStrategy: 'Self-Shading Solar Array & High SRI',
    description: 'Overhead photovoltaic pergola shading a flat high-albedo cool roof with floor-to-ceiling recessed glazing and vertical timber screens.'
  },
  gable: {
    id: 'gable',
    name: 'Vernacular Gabled Longhouse',
    badge: '🏛️ Tropical Gable',
    roofType: 'Steep Tropical Gable with Deep Eaves',
    passiveDrop: '19.2°C Drop',
    coolingStrategy: 'Colonnade Veranda & Ridge Vent',
    description: 'Classic high-pitched gable roof with 1.4m wraparound veranda overhangs supported by structural timber posts and perforated jaali airflow screens.'
  },
  vaulted: {
    id: 'vaulted',
    name: 'Aerodynamic Vaulted Eco-Pod',
    badge: '🛡️ Vaulted Pod',
    roofType: 'Curved Aerodynamic Wind-Vault',
    passiveDrop: '17.6°C Drop',
    coolingStrategy: 'Stilt Airflow & Cyclone Deflection',
    description: 'Curved barrel-vault envelope on flood-resilient structural stilts, maximizing passive sub-floor airflow and resisting extreme tropical storms.'
  },
  butterfly: {
    id: 'butterfly',
    name: 'Butterfly Wing Passive Pavilion',
    badge: '🏫 Butterfly Pavilion',
    roofType: 'Inverted-V Rainwater Harvesting Wing',
    passiveDrop: '20.1°C Drop',
    coolingStrategy: 'Thermosiphon Clerestory Flushing',
    description: 'Inward-sloping butterfly roof directing rainwater into central bio-storage while inducing strong convective draft through high perimeter clerestories.'
  }
};

/* ------------------------------------------------------------------
   ARCHITECTURAL LANDSCAPING (Clean, Realistic, Non-Cartoonish)
------------------------------------------------------------------ */

// Modern architectural tree with tiered foliage disks & tapered trunk
function ArchitecturalTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Tapered natural bark trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.09, 1.8, 8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.85} />
      </mesh>
      
      {/* Tiered architectural foliage layers (refined matte tones) */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.35, 7]} />
        <meshStandardMaterial color="#3A5A40" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.75, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.65, 0.35, 7]} />
        <meshStandardMaterial color="#486D4C" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.48, 0.32, 7]} />
        <meshStandardMaterial color="#588157" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.28, 0.28, 7]} />
        <meshStandardMaterial color="#6B9065" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Sleek architectural linear planter with ornamental foliage
function ArchitecturalPlanter({ position, size = [2.4, 0.3, 0.4] }: { position: [number, number, number]; size?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Dark charcoal basalt trough */}
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#2B343B" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, size[1], 0]}>
        <boxGeometry args={[size[0] - 0.08, 0.02, size[2] - 0.08]} />
        <meshStandardMaterial color="#2A1B10" roughness={0.95} />
      </mesh>
      {/* Layered ornamental foliage hedge */}
      <mesh position={[0, size[1] + 0.15, 0]} castShadow>
        <boxGeometry args={[size[0] - 0.12, 0.25, size[2] - 0.12]} />
        <meshStandardMaterial color="#4F7744" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Architectural Site Podium & Ground
function ArchitecturalSiteBase() {
  return (
    <group position={[0, -0.25, 0]}>
      {/* Main architectural limestone podium terrace */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[11.5, 0.3, 8.5]} />
        <meshStandardMaterial color="#EAE6DE" roughness={0.8} />
      </mesh>

      {/* Recessed shadow gap reveal */}
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[11.7, 0.06, 8.7]} />
        <meshStandardMaterial color="#2D3748" roughness={0.9} />
      </mesh>

      {/* Paved entrance stepping slabs */}
      <mesh position={[0, 0.16, 3.4]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 1.2]} />
        <meshStandardMaterial color="#D8D4CC" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.16, 2.4]} receiveShadow>
        <boxGeometry args={[2.4, 0.04, 0.6]} />
        <meshStandardMaterial color="#D8D4CC" roughness={0.75} />
      </mesh>

      {/* Sleek architectural water feature / reflecting basin with dark coping */}
      <group position={[3.2, 0.16, 2.2]}>
        {/* Basin Coping Rim */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[1.8, 0.06, 1.4]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {/* Translucent Reflective Water */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.6, 0.04, 1.2]} />
          <meshPhysicalMaterial
            color="#2563EB"
            roughness={0.05}
            metalness={0.1}
            transmission={0.8}
            opacity={0.85}
            transparent
            reflectivity={0.9}
          />
        </mesh>
      </group>

      {/* Subtle surrounding grass lawn border */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#709761" roughness={0.95} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------
   ARCHETYPE 1: BIOCLIMATIC COURTYARD VILLA
------------------------------------------------------------------ */
function BioclimaticVilla({ showLabels }: { showLabels: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Main High Thermal Mass Wall (Warm Sandstone / CSEB) */}
      {/* South Wall with large recessed shaded opening */}
      <mesh position={[-1.7, 1.2, 1.7]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.4, 0.28]} />
        <meshStandardMaterial color="#D6C6B6" roughness={0.75} />
      </mesh>
      <mesh position={[1.7, 1.2, 1.7]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.4, 0.28]} />
        <meshStandardMaterial color="#D6C6B6" roughness={0.75} />
      </mesh>
      {/* Lintel Beam */}
      <mesh position={[0, 2.15, 1.7]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 0.5, 0.32]} />
        <meshStandardMaterial color="#C4B3A2" roughness={0.8} />
      </mesh>
      {/* North Wall */}
      <mesh position={[0, 1.2, -1.8]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 2.4, 0.28]} />
        <meshStandardMaterial color="#D6C6B6" roughness={0.75} />
      </mesh>
      {/* East & West Walls */}
      <mesh position={[2.65, 1.2, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 2.4, 3.5]} />
        <meshStandardMaterial color="#D6C6B6" roughness={0.75} />
      </mesh>
      <mesh position={[-2.65, 1.2, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 2.4, 3.5]} />
        <meshStandardMaterial color="#D6C6B6" roughness={0.75} />
      </mesh>

      {/* Recessed Anodized Window Frame */}
      <mesh position={[0, 1.05, 1.65]}>
        <boxGeometry args={[1.8, 1.6, 0.08]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* High-Performance Double Glazing */}
      <mesh position={[0, 1.05, 1.66]}>
        <boxGeometry args={[1.68, 1.48, 0.04]} />
        <meshPhysicalMaterial
          color="#BAE6FD"
          transmission={0.88}
          roughness={0.08}
          reflectivity={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Brise-Soleil / Architectural Timber Louvers */}
      <group position={[0, 1.05, 1.85]}>
        {[-0.5, -0.2, 0.1, 0.4, 0.7].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow>
            <boxGeometry args={[1.9, 0.04, 0.32]} />
            <meshStandardMaterial color="#8A5A36" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Sloped Double-Skin Terracotta Roof with Exposed Rafters */}
      <group position={[0, 2.4, 0]}>
        {/* Interior Horizontal Ceiling Slab */}
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <boxGeometry args={[5.6, 0.08, 3.8]} />
          <meshStandardMaterial color="#EAE6DF" roughness={0.8} />
        </mesh>
        {/* Structural Timber Rafters */}
        {[-2.2, -1.1, 0, 1.1, 2.2].map((x, i) => (
          <mesh key={i} position={[x, 0.12, 0]} castShadow>
            <boxGeometry args={[0.08, 0.10, 4.4]} />
            <meshStandardMaterial color="#5C3B1E" roughness={0.7} />
          </mesh>
        ))}
        {/* Secondary Roof Radiant Sub-Deck */}
        <mesh position={[0, 0.32, 1.15]} rotation={[0.22, 0, 0]}>
          <boxGeometry args={[5.9, 0.03, 2.36]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.32, -1.15]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[5.9, 0.03, 2.36]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.3} />
        </mesh>

        {/* Counter-Battens Creating Ventilated Air Gap */}
        {[-2.2, -1.1, 0, 1.1, 2.2].map((x, i) => (
          <React.Fragment key={`hero-batten-${i}`}>
            <mesh position={[x, 0.355, 1.15]} rotation={[0.22, 0, 0]}>
              <boxGeometry args={[0.04, 0.04, 2.36]} />
              <meshStandardMaterial color="#4A3525" roughness={0.7} />
            </mesh>
            <mesh position={[x, 0.355, -1.15]} rotation={[-0.22, 0, 0]}>
              <boxGeometry args={[0.04, 0.04, 2.36]} />
              <meshStandardMaterial color="#4A3525" roughness={0.7} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Primary Exterior Terracotta Roof Plane */}
        {/* South Roof Plane (Slopes DOWN from ridge to south eaves) */}
        <mesh position={[0, 0.41, 1.15]} rotation={[0.22, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.07, 2.42]} />
          <meshStandardMaterial color="#C85A32" roughness={0.55} />
        </mesh>
        {/* North Roof Plane (Slopes DOWN from ridge to north eaves) */}
        <mesh position={[0, 0.41, -1.15]} rotation={[-0.22, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.07, 2.42]} />
          <meshStandardMaterial color="#C85A32" roughness={0.55} />
        </mesh>

        {/* Eaves Fascia Trim */}
        <mesh position={[0, 0.16, 2.32]} rotation={[0.22, 0, 0]}>
          <boxGeometry args={[6.0, 0.06, 0.03]} />
          <meshStandardMaterial color="#78350F" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.16, -2.32]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[6.0, 0.06, 0.03]} />
          <meshStandardMaterial color="#78350F" roughness={0.65} />
        </mesh>

        {/* Continuous Ridge Aerodynamic Ventilator */}
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[6.0, 0.03, 0.28]} />
          <meshStandardMaterial color="#0F172A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.70, 0]} castShadow>
          <boxGeometry args={[6.04, 0.07, 0.36]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
      </group>

      {/* Vertical Timber Slat Accent Partition (West side) */}
      <group position={[-2.82, 1.2, 0]}>
        {[-1.2, -0.6, 0, 0.6, 1.2].map((z, i) => (
          <mesh key={i} position={[0, 0, z]} castShadow>
            <boxGeometry args={[0.06, 2.3, 0.08]} />
            <meshStandardMaterial color="#A0673B" roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* Labels */}
      {showLabels && (
        <>
          <Html position={[0, 3.2, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Ventilated Terracotta Ridge Cap
            </div>
          </Html>
          <Html position={[0, 1.1, 2.1]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Horizontal Shading Brise-Soleil
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   ARCHETYPE 2: MODERN SOLAR PARASOL ECO-SHELTER
------------------------------------------------------------------ */
function SolarParasolShelter({ showLabels }: { showLabels: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Clean Off-White AAC Masonry Base Volume */}
      <mesh position={[0, 1.15, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 2.3, 3.8]} />
        <meshStandardMaterial color="#E8ECEF" roughness={0.7} />
      </mesh>

      {/* Corner Floor-to-Ceiling Architectural Glass (South-West) */}
      <mesh position={[1.4, 1.15, 1.82]}>
        <boxGeometry args={[2.0, 2.0, 0.06]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.88}
          roughness={0.06}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Slim Dark Charcoal Mullions */}
      <mesh position={[1.4, 1.15, 1.86]}>
        <boxGeometry args={[2.04, 2.04, 0.02]} />
        <meshStandardMaterial color="#0F172A" metalness={0.85} roughness={0.25} wireframe />
      </mesh>

      {/* Recessed Timber Slat Feature Wall on East side */}
      <group position={[-1.6, 1.15, 1.83]}>
        {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 1.9, 0.04]} />
            <meshStandardMaterial color="#966036" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Flat High-Albedo Cool Roof Base with White SRI Coating */}
      <mesh position={[0, 2.36, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 0.15, 4.2]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
      </mesh>

      {/* Elevated Steel Pergola Structure */}
      {/* 4 Steel I-Columns */}
      {[
        [-2.5, 1.9],
        [2.5, 1.9],
        [-2.5, -2.1],
        [2.5, -2.1]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 2.8, z]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Steel Pergola Rafters */}
      {[-1.6, 0, 1.6].map((x, i) => (
        <mesh key={i} position={[x, 3.25, -0.1]} castShadow>
          <boxGeometry args={[0.05, 0.08, 4.6]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Photovoltaic Solar Panel Array Grid (Dark Navy/Black with metallic grid) */}
      <group position={[0, 3.32, -0.1]} rotation={[-0.08, 0, 0]}>
        {[-1.8, -0.9, 0, 0.9, 1.8].map((x, i) =>
          [-1.2, 0, 1.2].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, 0, z]} castShadow>
              <boxGeometry args={[0.82, 0.03, 1.1]} />
              <meshStandardMaterial color="#0B132B" metalness={0.85} roughness={0.2} />
            </mesh>
          ))
        )}
      </group>

      {/* Vertical Rainwater Downspout */}
      <mesh position={[-2.6, 1.2, -1.9]}>
        <cylinderGeometry args={[0.035, 0.035, 2.4, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Labels */}
      {showLabels && (
        <>
          <Html position={[0, 3.7, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              4.8 kW Photovoltaic Parasol Canopy
            </div>
          </Html>
          <Html position={[1.4, 1.2, 1.9]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Low-E Double Glazed Ribbon Facade
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   ARCHETYPE 3: VERNACULAR GABLED LONGHOUSE
------------------------------------------------------------------ */
function VernacularGableShelter({ showLabels }: { showLabels: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Plinth Platform with Brick Border */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 0.3, 4.8]} />
        <meshStandardMaterial color="#B08968" roughness={0.85} />
      </mesh>

      {/* Enclosed Core Room (Earthen Brick / Rammed Earth) */}
      <mesh position={[0, 1.35, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 2.1, 2.8]} />
        <meshStandardMaterial color="#BC6C25" roughness={0.8} />
      </mesh>

      {/* Traditional Wood Framed Entrance & Window */}
      <mesh position={[-0.8, 1.0, 1.01]}>
        <boxGeometry args={[0.9, 1.8, 0.05]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.7} />
      </mesh>
      <mesh position={[1.1, 1.3, 1.01]}>
        <boxGeometry args={[1.2, 1.0, 0.05]} />
        <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Front Shaded Veranda Colonnade (4 Timber Posts) */}
      {[-2.5, -0.8, 0.8, 2.5].map((x, i) => (
        <mesh key={i} position={[x, 1.35, 1.9]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 2.1, 8]} />
          <meshStandardMaterial color="#6B4423" roughness={0.75} />
        </mesh>
      ))}

      {/* Transverse Timber Colonnade Beam */}
      <mesh position={[0, 2.4, 1.9]} castShadow>
        <boxGeometry args={[5.6, 0.12, 0.16]} />
        <meshStandardMaterial color="#6B4423" roughness={0.75} />
      </mesh>

      {/* Steep Gable Roof (South-facing slope covering veranda) */}
      <mesh position={[0, 2.7, 0.65]} rotation={[0.42, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.6, 0.1, 3.2]} />
        <meshStandardMaterial color="#A24936" roughness={0.6} />
      </mesh>
      {/* North-facing slope */}
      <mesh position={[0, 2.7, -1.45]} rotation={[-0.42, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.6, 0.1, 3.2]} />
        <meshStandardMaterial color="#A24936" roughness={0.6} />
      </mesh>

      {/* Gable Triangular End Walls (Perforated Timber Jaali) */}
      <mesh position={[2.61, 2.8, -0.4]}>
        <boxGeometry args={[0.08, 0.9, 2.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.7} />
      </mesh>
      <mesh position={[-2.61, 2.8, -0.4]}>
        <boxGeometry args={[0.08, 0.9, 2.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.7} />
      </mesh>

      {/* Ridge Ventilator Beam */}
      <mesh position={[0, 3.32, -0.4]} castShadow>
        <boxGeometry args={[6.6, 0.12, 0.28]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.6} />
      </mesh>

      {/* Labels */}
      {showLabels && (
        <>
          <Html position={[0, 1.8, 2.1]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Deep 1.4m Veranda Colonnade
            </div>
          </Html>
          <Html position={[2.7, 2.9, -0.4]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Perforated Jaali Ventilation Screen
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   ARCHETYPE 4: AERODYNAMIC VAULTED ECO-POD (Disaster-Resilient)
------------------------------------------------------------------ */
function VaultedEcoPod({ showLabels }: { showLabels: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* 6 Heavy-Duty Structural Stilts (Flood Resilience) */}
      {[
        [-2.0, 1.3],
        [0, 1.3],
        [2.0, 1.3],
        [-2.0, -1.3],
        [0, -1.3],
        [2.0, -1.3]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.09, 0.11, 0.9, 12]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
      ))}

      {/* Elevated Timber Platform Floor */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.15, 3.4]} />
        <meshStandardMaterial color="#78350F" roughness={0.7} />
      </mesh>

      {/* Access Steps / Ramp */}
      <group position={[0, 0.35, 1.95]}>
        {[0, 1, 2].map((step) => (
          <mesh key={step} position={[0, step * 0.18, -step * 0.22]} receiveShadow>
            <boxGeometry args={[1.2, 0.16, 0.3]} />
            <meshStandardMaterial color="#A16207" roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Vaulted Half-Cylinder Aerodynamic Envelope */}
      {/* Outer Curved Roof Skin */}
      <mesh position={[0, 1.9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[1.7, 1.7, 4.8, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#556B2F" roughness={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Vault Bulkhead End Walls */}
      {/* Front Face with Circular Glazed Portal & Louvers */}
      <mesh position={[0, 1.7, 2.38]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.7, 0.15]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>
      {/* Circular Porch Window */}
      <mesh position={[0, 1.9, 2.47]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.06, 24]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.85}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Rear Bulkhead Face */}
      <mesh position={[0, 1.7, -2.38]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.7, 0.15]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>

      {/* Aerodynamic Wind Deflection Lip Trim */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[5.0, 0.08, 3.2]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Labels */}
      {showLabels && (
        <>
          <Html position={[0, 0.35, 1.3]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              0.8m Elevated Flood-Resilient Stilts
            </div>
          </Html>
          <Html position={[0, 3.2, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Aerodynamic Cyclone-Deflecting Vault
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   ARCHETYPE 5: BUTTERFLY WING PASSIVE PAVILION
------------------------------------------------------------------ */
function ButterflyPavilion({ showLabels }: { showLabels: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      {/* High-Ceiling Masonry Side Wings */}
      <mesh position={[-2.4, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.5, 4.0]} />
        <meshStandardMaterial color="#D8C8B8" roughness={0.7} />
      </mesh>
      <mesh position={[2.4, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.5, 4.0]} />
        <meshStandardMaterial color="#D8C8B8" roughness={0.7} />
      </mesh>
      {/* Rear Wall */}
      <mesh position={[0, 1.25, -1.9]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 2.5, 0.28]} />
        <meshStandardMaterial color="#D8C8B8" roughness={0.7} />
      </mesh>

      {/* Front Entrance with Slender Steel Columns & Large Glazing */}
      <mesh position={[0, 1.0, 1.9]}>
        <boxGeometry args={[3.2, 1.8, 0.06]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.88}
          roughness={0.06}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Slender V-Strut Steel Columns */}
      {[-1.4, 1.4].map((x, i) => (
        <mesh key={i} position={[x, 1.35, 1.95]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.6, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Inward Inverted Butterfly Roof (V-Shape Wing) */}
      {/* Left Wing (Slopes inward down to center) */}
      <mesh position={[-1.5, 2.65, 0]} rotation={[0, 0, -0.22]} castShadow receiveShadow>
        <boxGeometry args={[3.3, 0.12, 4.8]} />
        <meshStandardMaterial color="#3E6B5C" roughness={0.5} />
      </mesh>
      {/* Right Wing (Slopes inward down to center) */}
      <mesh position={[1.5, 2.65, 0]} rotation={[0, 0, 0.22]} castShadow receiveShadow>
        <boxGeometry args={[3.3, 0.12, 4.8]} />
        <meshStandardMaterial color="#3E6B5C" roughness={0.5} />
      </mesh>

      {/* Central Rainwater Valley Gutter / Inverted Ridge Beam */}
      <mesh position={[0, 2.25, 0]} castShadow>
        <boxGeometry args={[0.4, 0.18, 4.9]} />
        <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* High North & South Clerestory Ribbon Glazing under the High Outer Wings */}
      <mesh position={[-2.4, 2.7, 0]}>
        <boxGeometry args={[0.05, 0.5, 3.8]} />
        <meshPhysicalMaterial color="#BAE6FD" transmission={0.9} roughness={0.1} transparent opacity={0.75} />
      </mesh>
      <mesh position={[2.4, 2.7, 0]}>
        <boxGeometry args={[0.05, 0.5, 3.8]} />
        <meshPhysicalMaterial color="#BAE6FD" transmission={0.9} roughness={0.1} transparent opacity={0.75} />
      </mesh>

      {/* Central Rainwater Hopper Downpipe */}
      <mesh position={[0, 1.1, -2.1]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Labels */}
      {showLabels && (
        <>
          <Html position={[0, 2.3, 2.2]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              Central Rainwater Harvesting Valley
            </div>
          </Html>
          <Html position={[-2.6, 2.8, 0]} center distanceFactor={14}>
            <div className="bg-[#123b2a]/95 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-[#c2dcb3] shadow-md pointer-events-none whitespace-nowrap">
              High Convective Stack-Flushing Vents
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------
   MAIN ARCHITECTURAL MODEL CONTROLLER
------------------------------------------------------------------ */
function BioclimaticDigitalTwinModel({
  designType,
  showLabels
}: {
  designType: DesignArchetype;
  showLabels: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth architectural rotation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.12) * 0.08 + 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Site Base & Paved Podium */}
      <ArchitecturalSiteBase />

      {/* Architectural Landscaping (Realistic, Non-Cartoonish) */}
      <ArchitecturalTree position={[-4.5, 0, -1.8]} scale={1.15} />
      <ArchitecturalTree position={[-4.2, 0, 1.8]} scale={0.9} />
      <ArchitecturalTree position={[4.6, 0, -1.6]} scale={1.05} />

      {/* Sleek Modern Planters along the podium edge */}
      <ArchitecturalPlanter position={[-2.8, 0, 3.4]} size={[2.2, 0.35, 0.4]} />
      <ArchitecturalPlanter position={[2.8, 0, 3.4]} size={[2.2, 0.35, 0.4]} />

      {/* Render Active Architectural Design Archetype */}
      {designType === 'villa' && <BioclimaticVilla showLabels={showLabels} />}
      {designType === 'solar' && <SolarParasolShelter showLabels={showLabels} />}
      {designType === 'gable' && <VernacularGableShelter showLabels={showLabels} />}
      {designType === 'vaulted' && <VaultedEcoPod showLabels={showLabels} />}
      {designType === 'butterfly' && <ButterflyPavilion showLabels={showLabels} />}
    </group>
  );
}

/* ------------------------------------------------------------------
   HERO SHELTER VIEWER EXPORT
------------------------------------------------------------------ */
export const HeroShelterViewer: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState<DesignArchetype>('villa');
  const [autoRotate, setAutoRotate] = useState(true);
  const [labelsEnabled, setLabelsEnabled] = useState(true);
  const [cameraDistance, setCameraDistance] = useState<number>(10);
  const controlsRef = useRef<any>(null);

  const activePreset = DESIGN_PRESETS[selectedDesign];

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setCameraDistance(10);
  };

  const handleToggleZoom = () => {
    setCameraDistance(prev => (prev === 10 ? 7.5 : 10));
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[560px] rounded-[32px] overflow-hidden bg-gradient-to-b from-[#eaf2e6] via-[#f3f7f0] to-[#fbfdfa] border border-[#cbdcc5] shadow-[0_12px_40px_rgb(18,59,42,0.08)] flex flex-col justify-between">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [8, 5.5, cameraDistance], fov: 36 }}
        >
          {/* Architectural Studio Lighting */}
          <ambientLight intensity={0.75} color="#F4FAF0" />
          <directionalLight
            position={[10, 16, 8]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
            color="#FFFBEB"
          />
          <directionalLight position={[-8, 10, -6]} intensity={0.4} color="#D1E7DD" />
          <pointLight position={[0, 2, 0]} intensity={0.8} color="#FEF3C7" distance={6} />

          {/* Bioclimatic Digital Twin */}
          <BioclimaticDigitalTwinModel
            designType={selectedDesign}
            showLabels={labelsEnabled}
          />

          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* TOP BAR: Floating Info Pill + Design Archetype Selector */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
        
        {/* Left Floating Info Pill */}
        <div className="bg-[#fffdf8]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#cbdcc5] shadow-xs text-xs space-y-0.5 pointer-events-auto">
          <div className="flex items-center gap-2 font-black text-[#123b2a]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3d7042] shadow-xs animate-pulse" />
            <span>Interactive 3D Bioclimatic Twin</span>
            <span className="text-[10px] font-semibold text-[#507d56] bg-[#eef6ec] px-1.5 py-0.5 rounded-md border border-[#cde0ca]">
              {activePreset.name}
            </span>
          </div>
          <div className="text-[11px] text-[#2d563e] flex items-center gap-2 font-semibold">
            <span>{activePreset.roofType}</span>
            <span>•</span>
            <span className="text-[#1e6b35] font-black">{activePreset.passiveDrop}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-500 font-medium">{activePreset.coolingStrategy}</span>
          </div>
        </div>

        {/* Top-Right Interactive View Controls (Labels, Reset, Zoom, Rotate) */}
        <div className="hidden sm:flex items-center gap-2 bg-[#fffdf8]/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#cbdcc5] shadow-xs text-xs pointer-events-auto">
          {/* Labels Toggle */}
          <button
            onClick={() => setLabelsEnabled(!labelsEnabled)}
            className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              labelsEnabled ? 'bg-[#123b2a] text-white shadow-2xs' : 'text-[#305740] hover:bg-[#eaf4e7]'
            }`}
            title="Toggle Architectural Labels"
          >
            <span>🏷️</span>
            <span>Labels</span>
          </button>

          <div className="w-px h-4 bg-[#cbdcc5]" />

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="p-1.5 hover:bg-[#eaf4e7] rounded-xl text-[#123b2a] font-bold transition-colors cursor-pointer"
            title="Reset Camera View"
          >
            ↺
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={handleToggleZoom}
            className={`px-2 py-1 hover:bg-[#eaf4e7] rounded-xl text-[#123b2a] font-bold transition-colors cursor-pointer ${
              cameraDistance < 10 ? 'bg-[#eaf4e7] text-[#123b2a]' : ''
            }`}
            title="Toggle Zoom Focus"
          >
            🔍 {cameraDistance < 10 ? 'Wide' : 'Focus'}
          </button>

          {/* Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
              autoRotate ? 'bg-[#eaf4e7] text-[#123b2a]' : 'text-slate-400 hover:bg-slate-100'
            }`}
            title="Toggle Orbital Auto-Rotation"
          >
            ⟳ {autoRotate ? 'Pause' : 'Rotate'}
          </button>
        </div>
      </div>

      {/* BOTTOM BAR: Design Variety Selector & Navigation Guide */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* DESIGN VARIETY TABS (Allows users to explore 5 distinct bioclimatic architectural designs!) */}
        <div className="bg-[#fffdf8]/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#cbdcc5] shadow-xs flex items-center flex-wrap gap-1 pointer-events-auto">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#3d7042] px-2 hidden lg:inline">
            Archetypes:
          </span>
          {(Object.keys(DESIGN_PRESETS) as DesignArchetype[]).map((key) => {
            const preset = DESIGN_PRESETS[key];
            const isSelected = selectedDesign === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedDesign(key)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#123b2a] text-white shadow-xs'
                    : 'text-[#285038] hover:bg-[#eef6ec]'
                }`}
              >
                <span>{preset.badge.split(' ')[0]}</span>
                <span>{preset.badge.split(' ').slice(1).join(' ')}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom-Right Guide Pill */}
        <div className="bg-[#fffdf8]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#cbdcc5] shadow-xs text-[11px] text-[#305740] font-semibold pointer-events-none flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#123b2a]" />
          <span>Architectural Digital Twin • Drag to Orbit</span>
        </div>
      </div>
    </div>
  );
};
