import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
import { ICPFilter, ICPProfile } from './icpFilter';

// Type definitions
interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count?: number;
}

interface ICPFilterProps {
  onICPSelect: (value: string) => void;
  placeholder: string;
  className: string;
}

interface ProspectFilterProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
  pageType?: 'companies' | 'employees';
  ICPFilter?: React.ComponentType<ICPFilterProps>;
}

interface ExpandedSections {
  [key: string]: boolean;
}

// Individual filter section component
const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  isExpanded, 
  onToggle, 
  children, 
  count = 0 
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-0 text-left hover:bg-gray-50 transition-colors duration-150 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {title}
          </span>
          {count > 0 && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="pb-4 pl-0">
          {children}
        </div>
      )}
    </div>
  );
};

// Main ProspectFilter component
const ProspectFilter: React.FC<ProspectFilterProps> = ({ 
  onFilterChange, 
  pageType = 'companies',
}) => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    icp: true, // Start with ICP section expanded
  });

  const [filters, setFilters] = useState<Record<string, unknown>>({
    icp: null,
  });

  const toggleSection = (sectionKey: string): void => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleICPSelection = (icp: ICPProfile | null): void => {
    const newFilters = { ...filters, icp };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilter = (filterKey: string): void => {
    const newFilters = { ...filters, [filterKey]: '' };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = (): void => {
    const clearedFilters = Object.keys(filters).reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const activeFilterCount = Object.values(filters).filter((value: unknown) => value && value !== '').length;

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Filter {pageType === 'companies' ? 'Companies' : 'People'}
            </h3>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="text-xs text-gray-600 mb-2">Active filters:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]: [string, unknown]) => {
              if (!value) return null;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                >
                  <span className="capitalize">{key}: {String(value)}</span>
                  <button
                    onClick={() => clearFilter(key)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-0">
          
          {/* ICP Filter Section */}
          <FilterSection
            title="Ideal Customer Profile"
            isExpanded={expandedSections.icp}
            onToggle={() => toggleSection('icp')}
            count={filters.icp ? 1 : 0}
          >
            <ICPFilter
              onICPSelect={handleICPSelection}
              placeholder="Select an ICP..."
              className="w-full" icpService={{
                listICPsByUser: function (): Promise<ICPProfile[]> {
                  throw new Error('Function not implemented.');
                }
              }}            />
          </FilterSection>

          {/* Placeholder for future filter sections */}
          <FilterSection
            title="Industry"
            isExpanded={expandedSections.industry}
            onToggle={() => toggleSection('industry')}
            count={0}
          >
            <div className="text-sm text-gray-500 italic">
              Coming soon...
            </div>
          </FilterSection>

          <FilterSection
            title={pageType === 'companies' ? 'Company Size' : 'Department'}
            isExpanded={expandedSections.size}
            onToggle={() => toggleSection('size')}
            count={0}
          >
            <div className="text-sm text-gray-500 italic">
              Coming soon...
            </div>
          </FilterSection>

          <FilterSection
            title="Location"
            isExpanded={expandedSections.location}
            onToggle={() => toggleSection('location')}
            count={0}
          >
            <div className="text-sm text-gray-500 italic">
              Coming soon...
            </div>
          </FilterSection>

        </div>
      </div>
    </div>
  );
};

export default ProspectFilter;
export type { ProspectFilterProps, ICPFilterProps };