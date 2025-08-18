import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { icpService } from "@/services/icpService";
import { toast } from 'sonner';
import { 
  BUSINESS_TYPE_OPTIONS, 
  COMPANY_SIZE_OPTIONS, 
  BUYER_ROLE_OPTIONS,
  type BusinessTypeValue,
  type CompanySizeValue,
  type BuyerRoleValue
} from "@/constants/icpConstants";
import { ICPProfile } from "@/models/icp";

interface ICPEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icpData: Partial<ICPProfile> | null; 
  onUpdated: () => void;
}

export default function ICPEditModal({ open, onOpenChange, icpData, onUpdated }: ICPEditModalProps) {
  const [formData, setFormData] = useState({
    businessType: "",
    industry: "",
    companySize: "",
    buyerRoles: "",
    problemStatement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (icpData) {
      setFormData({
        businessType: (icpData.business_type ?? "").toString(),
        industry: icpData.industry ?? "",
        companySize: (icpData.company_size ?? "").toString(),
        buyerRoles: (icpData.buyer_roles ?? "").toString(),
        problemStatement: icpData.problem_statement || "",
      });
    }
  }, [icpData]);

   if (!open || !icpData) {
    return null;
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await icpService.updateICP(icpData.id ?? "", {
        business_type: parseInt(formData.businessType) as BusinessTypeValue,
        industry: formData.industry,
        company_size: parseInt(formData.companySize) as CompanySizeValue,
        buyer_roles: parseInt(formData.buyerRoles) as BuyerRoleValue,
        problem_statement: formData.problemStatement || undefined,
      });

      if (response) {
        toast.success("ICP updated successfully!");
        onUpdated();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Error updating ICP: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-lg">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl flex items-center gap-2">
              <span>Ideal Customer Profile</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select 
              value={formData.businessType}
              onValueChange={(value) => updateFormData("businessType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => updateFormData("industry", e.target.value)}
              placeholder="e.g., Technology, Healthcare"
              className="w-full"
            />
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select 
              value={formData.companySize}
              onValueChange={(value) => updateFormData("companySize", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buyer Role */}
          <div className="space-y-2">
            <Label htmlFor="buyerRoles">Target Buyer Role</Label>
            <Select 
              value={formData.buyerRoles}
              onValueChange={(value) => updateFormData("buyerRoles", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select buyer role" />
              </SelectTrigger>
              <SelectContent>
                {BUYER_ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <Label htmlFor="problemStatement">Problem Statement <span className="text-muted-foreground text-sm">(Optional)</span></Label>
            <Textarea
              id="problemStatement"
              value={formData.problemStatement}
              onChange={(e) => updateFormData("problemStatement", e.target.value)}
              placeholder="Describe the main problem your ideal customer faces..."
              rows={3}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Check className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}