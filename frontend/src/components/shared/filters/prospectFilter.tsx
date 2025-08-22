"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Filter, X, Check } from "lucide-react"
import FundingStageFilter from "./FundingStageFilter"

// Type definitions
interface FilterSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
  selectedValue?: string
  hasSelection?: boolean
}

export interface ProspectFilterValues {
  icpId: number
  minRevenue: number
  maxRevenue: number
  fundingStage: number
  technology: string
  fundingAmount: number
}

interface ProspectFilterProps {
  onFilterChange?: (filters: ProspectFilterValues) => void
  onApply?: () => void
  pageType?: "companies" | "employees"
}

interface ExpandedSections {
  [key: string]: boolean
}

// Individual filter section component
const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
  selectedValue,
  hasSelection = false,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 transition-colors duration-150 group rounded-t-lg"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{title}</span>
            {hasSelection && (
              <div className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">1</span>
              </div>
            )}
          </div>
          {selectedValue && <div className="text-xs text-gray-500 truncate">{selectedValue}</div>}
        </div>
        <div className="ml-2 flex-shrink-0">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-200" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 overflow-hidden">
          <div className="p-4 max-h-80 overflow-y-auto">{children}</div>
        </div>
      )}
    </div>
  )
}

// Main ProspectFilter component
const ProspectFilter: React.FC<ProspectFilterProps> = ({ onFilterChange, onApply, pageType = "companies" }) => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    funding: true, // Start with funding section expanded
  })

  const [filters, setFilters] = useState<ProspectFilterValues>({
    icpId: 0,
    minRevenue: 0,
    maxRevenue: 0,
    fundingStage: 0,
    technology: "",
    fundingAmount: 0,
  })

  // Helper function to get funding stage label
  const getFundingStageLabel = (stageId: number): string => {
    const stages: Record<number, string> = {
      0: "All Stages",
      1: "Seed",
      2: "Series A",
      3: "Series B",
      4: "Series C+",
      5: "IPO",
      6: "Private Equity",
    }
    return stages[stageId] || "All Stages"
  }

  // Check if any filters are applied
  const hasActiveFilters = (): boolean => {
    return (
      filters.fundingStage !== 0 ||
      filters.minRevenue > 0 ||
      filters.maxRevenue > 0 ||
      filters.technology !== "" ||
      filters.fundingAmount > 0
    )
  }

  // Clear all filters
  const clearAllFilters = (): void => {
    setFilters({
      icpId: 0,
      minRevenue: 0,
      maxRevenue: 0,
      fundingStage: 0,
      technology: "",
      fundingAmount: 0,
    })
  }

  // Safe filter updater
  const updateFilter = <K extends keyof ProspectFilterValues>(key: K, value: ProspectFilterValues[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Trigger parent callback when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }, [filters, onFilterChange])

  const toggleSection = (sectionKey: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  return (
    <div className="w-[450px] bg-white border-r border-gray-200 flex flex-col h-full min-h-0 flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Filter className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Filter {pageType}</h3>
            <p className="text-xs text-gray-500 mt-0.5">Refine your search results</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 max-h-full">
        <div className="p-4 space-y-1">
          {/* Funding Stage Filter */}
          <FilterSection
            title="Funding Stage"
            isExpanded={expandedSections.funding}
            onToggle={() => toggleSection("funding")}
            selectedValue={filters.fundingStage !== 0 ? getFundingStageLabel(filters.fundingStage) : undefined}
            hasSelection={filters.fundingStage !== 0}
          >
            <FundingStageFilter value={filters.fundingStage} onChange={(val) => updateFilter("fundingStage", val)} />
          </FilterSection>

          <FilterSection
            title="Revenue Range"
            isExpanded={expandedSections.revenue}
            onToggle={() => toggleSection("revenue")}
            hasSelection={filters.minRevenue > 0 || filters.maxRevenue > 0}
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Minimum Revenue</label>
                <select
                  value={filters.minRevenue}
                  onChange={(e) => updateFilter("minRevenue", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Any</option>
                  <option value={1000000}>$1M+</option>
                  <option value={10000000}>$10M+</option>
                  <option value={50000000}>$50M+</option>
                  <option value={100000000}>$100M+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Maximum Revenue</label>
                <select
                  value={filters.maxRevenue}
                  onChange={(e) => updateFilter("maxRevenue", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Any</option>
                  <option value={10000000}>$10M</option>
                  <option value={50000000}>$50M</option>
                  <option value={100000000}>$100M</option>
                  <option value={500000000}>$500M</option>
                </select>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Industry"
            isExpanded={expandedSections.industry}
            onToggle={() => toggleSection("industry")}
            hasSelection={filters.technology !== ""}
          >
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search industries..."
                  value={filters.technology}
                  onChange={(e) => updateFilter("technology", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {["Technology", "Healthcare", "Finance", "E-commerce", "Manufacturing"].map((industry) => (
                  <label key={industry} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.technology === industry}
                      onChange={(e) => updateFilter("technology", e.target.checked ? industry : "")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Employee Count"
            isExpanded={expandedSections.employees}
            onToggle={() => toggleSection("employees")}
          >
            <div className="space-y-2">
              {["1-10", "11-50", "51-200", "201-1000", "1000+"].map((range) => (
                <label key={range} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">{range} employees</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
        <div className="flex gap-3">
          <button
            onClick={clearAllFilters}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg font-medium border border-gray-300 transition-colors duration-150 flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </button>

          <button
            onClick={onApply}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm"
          >
            <Filter className="h-4 w-4" />
            Apply
          </button>
        </div>

        {hasActiveFilters() && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Active filters:</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                {
                  [
                    filters.fundingStage !== 0,
                    filters.minRevenue > 0,
                    filters.maxRevenue > 0,
                    filters.technology !== "",
                    filters.fundingAmount > 0,
                  ].filter(Boolean).length
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProspectFilter
