"use client";

import type React from "react";
import { useState } from "react";
import { Filter } from "lucide-react";

export interface ProspectFilterValues {
  icpId: number;
  minRevenue: number;
  maxRevenue: number;
  fundingStage: number;
  technology: string;
  fundingAmount: number;
}

interface ProspectFilterProps {
  onFilterChange: (filters: ProspectFilterValues) => void;
  onApply: () => void;
  pageType: "companies" | "prospects";
}

const ProspectFilter: React.FC<ProspectFilterProps> = ({
  onFilterChange,
  onApply,
  pageType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ProspectFilterValues>({
    icpId: 0,
    minRevenue: 0,
    maxRevenue: 0,
    fundingStage: 0,
    technology: "",
    fundingAmount: 0,
  });

  const handleFilterChange = (
    key: keyof ProspectFilterValues,
    value: unknown
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters: ProspectFilterValues = {
      icpId: 0,
      minRevenue: 0,
      maxRevenue: 0,
      fundingStage: 0,
      technology: "",
      fundingAmount: 0,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div
      className="card flex flex-col"
      style={{ maxHeight: "73vh", maxWidth: "390px", minWidth: "250px" }}
    >
      {/* Header */}
      <div
        className="p-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="heading-3 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </h3>
          <button onClick={clearFilters} className="btn-primary">
            Clear All
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* ICP Selection */}
        <div>
          <label className="block text-small font-medium mb-2 text-body">
            Ideal Customer Profile
          </label>
          <select
            className="input w-full"
            value={filters.icpId}
            onChange={(e) =>
              handleFilterChange("icpId", Number.parseInt(e.target.value))
            }
          >
            <option value={0}>All ICPs</option>
            <option value={1}>Tech Startups</option>
            <option value={2}>Enterprise SaaS</option>
            <option value={3}>Healthcare</option>
          </select>
        </div>

        {/* Revenue Range */}
        <div>
          <label className="block text-small font-medium mb-2 text-body">
            Revenue Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input"
              value={filters.minRevenue || ""}
              onChange={(e) =>
                handleFilterChange(
                  "minRevenue",
                  Number.parseInt(e.target.value) || 0
                )
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="input"
              value={filters.maxRevenue || ""}
              onChange={(e) =>
                handleFilterChange(
                  "maxRevenue",
                  Number.parseInt(e.target.value) || 0
                )
              }
            />
          </div>
        </div>

        {/* Funding Stage */}
        <div>
          <label className="block text-small font-medium mb-2 text-body">
            Funding Stage
          </label>
          <select
            className="input w-full"
            value={filters.fundingStage}
            onChange={(e) =>
              handleFilterChange(
                "fundingStage",
                Number.parseInt(e.target.value)
              )
            }
          >
            <option value={0}>All Stages</option>
            <option value={1}>Pre-Seed</option>
            <option value={2}>Seed</option>
            <option value={3}>Series A</option>
            <option value={4}>Series B+</option>
          </select>
        </div>

        {/* Technology */}
        <div>
          <label className="block text-small font-medium mb-2 text-body">
            Technology Stack
          </label>
          <input
            type="text"
            placeholder="e.g., React, Python, AWS"
            className="input w-full"
            value={filters.technology}
            onChange={(e) => handleFilterChange("technology", e.target.value)}
          />
        </div>

        {/* Funding Amount */}
        <div>
          <label className="block text-small font-medium mb-2 text-body">
            Funding Amount (Min)
          </label>
          <input
            type="number"
            placeholder="Minimum funding amount"
            className="input w-full"
            value={filters.fundingAmount || ""}
            onChange={(e) =>
              handleFilterChange(
                "fundingAmount",
                Number.parseInt(e.target.value) || 0
              )
            }
          />
        </div>
      </div>

      {/* Fixed Footer Button */}
      <div className="p-4 border-t ">
        <button onClick={handleApply} className="btn-brand w-full">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProspectFilter;
