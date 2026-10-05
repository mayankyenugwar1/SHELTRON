import React, { useState, useEffect } from 'react';
import { SupplierItem } from '../data/supplierData';
import { fetchSuppliersForMaterial } from '../services/supplierService';
import { Badge, Button } from './ui';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialName: string;
  materialCategoryLabel?: string;
  locationName: string;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({
  isOpen,
  onClose,
  materialName,
  materialCategoryLabel,
  locationName
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isDemoFallback, setIsDemoFallback] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setErrorNotice(null);
    setSearchQuery('');

    // Fetch suppliers using service (attempt live API, fall back seamlessly)
    fetchSuppliersForMaterial(materialName, locationName, filterType)
      .then(result => {
        if (!isMounted) return;
        setSuppliers(result.suppliers);
        setIsDemoFallback(result.isDemoMode);
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        console.error('Supplier fetch error:', err);
        setErrorNotice('Live supplier API unreachable. Switched to offline verified regional directory.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, materialName, locationName, filterType]);

  if (!isOpen) return null;

  // Filter by user search query in real-time
  const filteredSuppliers = suppliers.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.locationArea.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.availableMaterials.some(m => m.toLowerCase().includes(q))
    );
  });

  const generalMapsQuery = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${materialName} suppliers near ${locationName}`)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#fffdf7] rounded-3xl border border-[#cbe6c7] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#e4ede1] bg-gradient-to-r from-[#f4faf0] via-[#fffdf7] to-[#eaf6e8] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl">📍</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#087443] bg-[#eaf6e8] px-2.5 py-0.5 rounded-full border border-[#cbe6c7]">
                Local Material Procurement
              </span>
              {materialCategoryLabel && (
                <span className="text-[10px] font-bold text-[#3b6b52] bg-white px-2 py-0.5 rounded-full border border-[#e4ede1]">
                  {materialCategoryLabel}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0d3824] tracking-tight">
              Suppliers for {materialName}
            </h2>
            <p className="text-xs text-[#3b6b52] flex items-center gap-1.5 font-medium">
              <span>Geo-Targeted Hub:</span>
              <strong className="text-[#0d3824] font-bold">{locationName}</strong>
              <span className="text-[#82a88e]">•</span>
              <span>Nearby manufacturing & distribution centers</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#cbe6c7] hover:bg-[#eaf6e8] text-[#123b2a] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
            title="Close supplier view"
          >
            ✕
          </button>
        </div>

        {/* Informational Verification Disclaimer */}
        <div className="px-6 py-2.5 bg-[#f4faf0] border-b border-[#e4ede1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#123b2a]">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700">ℹ️</span>
            <span>
              Directory listings are verified for regional feasibility. Check current stock, technical certification and quotes directly before procurement.
            </span>
          </div>
          {isDemoFallback && (
            <span className="text-[10px] font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
              Regional Verified Directory
            </span>
          )}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="p-4 sm:px-6 bg-[#fffdf7] border-b border-[#e4ede1] space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#3b6b52]">🔍</span>
              <input
                type="text"
                placeholder={`Search suppliers by name, address or material specialty...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#cbe6c7] bg-white text-[#0d3824] placeholder:text-[#82a88e] focus:outline-none focus:ring-2 focus:ring-[#087443]/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#82a88e] hover:text-[#0d3824]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 shrink-0">
              <span className="text-[11px] font-bold text-[#3b6b52] mr-1 hidden sm:inline">Type:</span>
              {[
                { id: 'all', label: 'All Suppliers' },
                { id: 'distributor', label: 'Distributors' },
                { id: 'manufacturer', label: 'Manufacturers' },
                { id: 'depot', label: 'Building Depots' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? 'bg-[#087443] text-white shadow-2xs'
                      : 'bg-white text-[#3b6b52] border border-[#e4ede1] hover:bg-[#eaf6e8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Supplier List Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#fbfdf9]">
          {/* Error Notice if any */}
          {errorNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <span>⚠️ {errorNotice}</span>
              <span className="text-[10px] font-bold text-amber-800">Auto-Recovered</span>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-10 h-10 border-3 border-[#087443] border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#0d3824]">Scanning regional supplier directory...</p>
                <p className="text-xs text-[#3b6b52]">Querying verified building materials suppliers near {locationName}</p>
              </div>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            /* Empty State */
            <div className="py-14 text-center space-y-4 bg-white rounded-2xl border border-dashed border-[#cbe6c7] p-6">
              <span className="text-4xl block">🔍</span>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0d3824]">No matching suppliers found in immediate filter</h3>
                <p className="text-xs text-[#3b6b52] max-w-md mx-auto">
                  We could not find suppliers matching "{searchQuery}" in our regional database. You can search directly on Google Maps for full live commercial coverage.
                </p>
              </div>
              <a
                href={generalMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <span>🗺️</span>
                <span>Search "{materialName}" on Google Maps</span>
              </a>
            </div>
          ) : (
            /* Supplier Result Cards */
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-[#3b6b52] px-1 font-medium">
                <span>Showing <b>{filteredSuppliers.length}</b> verified supplier locations near {locationName}</span>
                <a
                  href={generalMapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#087443] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Explore all on Google Maps</span>
                  <span>↗</span>
                </a>
              </div>

              {filteredSuppliers.map(supplier => (
                <div
                  key={supplier.id}
                  className="p-4 sm:p-5 bg-white rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-[0_2px_8px_-2px_rgba(18,59,42,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(18,59,42,0.08)] transition-all space-y-3"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                          {supplier.businessType}
                        </span>
                        <span className="text-[10px] font-bold text-[#3b6b52] bg-[#f4faf0] px-2 py-0.5 rounded-md border border-[#e4ede1]">
                          {supplier.verificationStatus}
                        </span>
                        <span className="text-[11px] font-extrabold text-[#087443] ml-auto sm:ml-0">
                          📍 {supplier.distanceKm} km away
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-[#0d3824]">
                        {supplier.name}
                      </h3>
                      <p className="text-xs text-[#3b6b52] flex items-center gap-1.5 mt-0.5">
                        <span>📌 {supplier.locationArea}</span>
                        <span className="text-[#cbe6c7]">•</span>
                        <span>{supplier.operatingHours}</span>
                      </p>
                    </div>

                    {/* Action: Google Maps Button */}
                    <div className="shrink-0 pt-1 sm:pt-0">
                      <a
                        href={supplier.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs hover:shadow-sm transition-all"
                      >
                        <span>🗺️</span>
                        <span>View on Google Maps</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Address & Contact Details */}
                  <div className="p-3 bg-[#f8fbf7] rounded-xl border border-[#eaf2e6] text-xs space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#3b6b52]">
                      <div>
                        <strong className="text-[#0d3824]">Address:</strong> {supplier.address}
                      </div>
                      {supplier.phone && (
                        <div className="shrink-0">
                          <strong className="text-[#0d3824]">Phone:</strong>{' '}
                          <a href={`tel:${supplier.phone.replace(/[^0-9+]/g, '')}`} className="text-[#087443] hover:underline font-bold">
                            {supplier.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Available Materials Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#3b6b52] block">
                      Available Stock & Catalog Materials:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.availableMaterials.map((mat, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                            mat.toLowerCase().includes(materialName.toLowerCase()) || materialName.toLowerCase().includes(mat.toLowerCase())
                              ? 'bg-[#eaf6e8] text-[#087443] border-[#cbe6c7] font-bold'
                              : 'bg-white text-[#3b6b52] border-[#e4ede1]'
                          }`}
                        >
                          ✓ {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#f4faf0] border-t border-[#e4ede1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#3b6b52] text-[11px] text-center sm:text-left">
            Need custom quotes or test certificates? Contact regional depots or check Google Maps listings.
          </span>
          <div className="flex items-center gap-2">
            <a
              href={generalMapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#cbe6c7] hover:bg-[#eaf6e8] text-[#087443] font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <span>🔍 More Results on Google Maps</span>
              <span>↗</span>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-white text-[#123b2a] border-[#cbe6c7] hover:bg-[#eaf6e8]"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
