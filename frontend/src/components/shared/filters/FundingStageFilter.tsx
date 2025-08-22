import React from 'react';

// Funding Stage Filter Types
interface FundingStage {
  id: number;
  label: string;
}

interface FundingStageFilterProps {
  value: number;
  onChange: (value: number) => void;
}

const FundingStageFilter: React.FC<FundingStageFilterProps> = ({ value, onChange }) => {
  const stages: FundingStage[] = [
    { id: 0, label: 'All Stages' },
    { id: 1, label: 'Seed' },
    { id: 2, label: 'Series A' },
    { id: 3, label: 'Series B' },
    { id: 4, label: 'Series C+' },
    { id: 5, label: 'IPO' },
    { id: 6, label: 'Private Equity' }
  ];

  return (
    <div className="space-y-2">
      {stages.map((stage: FundingStage) => (
        <label key={stage.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <input
            type="radio"
            name="fundingStage"
            value={stage.id}
            checked={value === stage.id}
            onChange={() => onChange(stage.id)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{stage.label}</span>
        </label>
      ))}
    </div>
  );
};

export default FundingStageFilter;
export type { FundingStageFilterProps, FundingStage };