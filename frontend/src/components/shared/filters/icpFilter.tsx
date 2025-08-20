"use client"
import * as React from "react"
import { Combobox, ComboboxItem } from "../../shared/SearchDropdown/searchDropdown" // Adjust import path as needed
import { icpService } from "@/services/icpService";

export interface ICPProfile {
  id: string;
  user_id: number;
  business_type: number;
  industry: string;
  company_size: number;
  buyer_roles: number;
  problem_statement: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface ICPFilterProps {
  icpService: {
    listICPsByUser: () => Promise<ICPProfile[]>;
  };
  onICPSelect?: (icp: ICPProfile | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function ICPFilter({
  onICPSelect,
  placeholder = "Select ICP...",
  className = "w-[300px]",
  disabled = false,
}: ICPFilterProps) {
  const [icps, setIcps] = React.useState<ICPProfile[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedICPId, setSelectedICPId] = React.useState<string>("");

  const fetchICPs = async () => {
    setIsLoading(true);
    try {
      const data = await icpService.listICPsByUser();
      setIcps(data);
    } catch (error) {
      console.error("Failed to fetch ICPs:", error);
      setIcps([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch ICPs on component mount
  React.useEffect(() => {
    fetchICPs();
  }, []);

  // Convert ICPs to ComboboxItem format
  const icpItems: ComboboxItem[] = icps.map((icp) => ({
    value: icp.id,
    label: `${icp.industry} - ${icp.problem_statement.substring(0, 50)}${
      icp.problem_statement.length > 50 ? "..." : ""
    }`,
  }));

  const handleValueChange = (value: string) => {
    setSelectedICPId(value);
    
    // Find the selected ICP and pass it to parent
    const selectedICP = value ? icps.find((icp) => icp.id === value) : null;
    onICPSelect?.(selectedICP || null);
  };

  const displayPlaceholder = isLoading ? "Loading ICPs..." : placeholder;

  return (
    <div className="space-y-2">
      <Combobox
        items={icpItems}
        value={selectedICPId}
        onValueChange={handleValueChange}
        placeholder={displayPlaceholder}
        searchPlaceholder="Search ICPs..."
        emptyMessage={isLoading ? "Loading..." : "No ICPs found."}
        className={className}
        disabled={disabled || isLoading}
      />
      
      {selectedICPId && (
        <div className="text-xs text-muted-foreground">
          Selected: {icps.find(icp => icp.id === selectedICPId)?.industry}
        </div>
      )}
    </div>
  );
}
