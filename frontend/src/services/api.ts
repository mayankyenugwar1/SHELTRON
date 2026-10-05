import { SiteRequirements, ClimateData, ShelterParameters, SimulationResults, DesignRecommendation, WhatIfResponse } from '../types';

/**
 * Centralized API base URL resolution.
 * - In development: defaults to '/api' (proxied by Vite to http://127.0.0.1:8000) or VITE_API_URL.
 * - In production: uses VITE_API_URL configured on Netlify (e.g. https://<backend-service>.onrender.com).
 */
export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || typeof envUrl !== 'string' || envUrl.trim() === '') {
    return '/api';
  }
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
}

export const API_BASE = getApiBaseUrl();

export const sheltronApi = {
  async getLocations(): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE}/locations`);
      const data = await res.json();
      return data.locations;
    } catch {
      return ["Nashik, Maharashtra", "Jodhpur, Rajasthan", "Chennai, Tamil Nadu", "New Delhi, Delhi NCR", "Bengaluru, Karnataka", "Leh, Ladakh", "Guwahati, Assam"];
    }
  },

  async getClimate(site: SiteRequirements): Promise<ClimateData> {
    const res = await fetch(`${API_BASE}/climate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(site)
    });
    return res.json();
  },

  async getRecommendations(site: SiteRequirements): Promise<{
    climate: ClimateData;
    recommendations: DesignRecommendation;
    recommended_parameters: ShelterParameters;
  }> {
    const res = await fetch(`${API_BASE}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(site)
    });
    return res.json();
  },

  async getMaterials(): Promise<any> {
    const res = await fetch(`${API_BASE}/materials`);
    return res.json();
  },

  async runSimulation(site: SiteRequirements, climate: ClimateData, params: ShelterParameters): Promise<SimulationResults> {
    const res = await fetch(`${API_BASE}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site, climate, params })
    });
    return res.json();
  },

  async runWhatIf(site: SiteRequirements, baselineParams: ShelterParameters, modifiedParams: ShelterParameters): Promise<WhatIfResponse> {
    const res = await fetch(`${API_BASE}/what-if`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site,
        baseline_params: baselineParams,
        modified_params: modifiedParams
      })
    });
    return res.json();
  },

  async runOptimize(site: SiteRequirements, currentParams: ShelterParameters): Promise<any> {
    const res = await fetch(`${API_BASE}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site,
        current_params: currentParams
      })
    });
    return res.json();
  }
};
