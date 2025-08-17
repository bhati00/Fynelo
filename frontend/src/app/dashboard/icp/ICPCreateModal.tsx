import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
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
type Option = { value: number; label: string };

interface ICPCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

interface FormData {
  businessType: BusinessTypeValue | "";
  industry: string;
  companySize: CompanySizeValue | "";
  buyerRoles: BuyerRoleValue | "";
  problemStatement?: string;
}

export default function ICPCreateModal({ open, onOpenChange, onCreated }: ICPCreateModalProps) {
  const steps = [
    { id: "businessType", label: "Business Type", description: "What type of business do you run?" },
    { id: "industry", label: "Industry", description: "What industry are you in?" },
    { id: "companySize", label: "Company Size", description: "How many employees do you have?" },
    { id: "buyerRoles", label: "Target Buyer Role", description: "Who typically makes purchasing decisions?" },
    { id: "problemStatement", label: "Problem Statement", description: "What problem does your product solve? (Optional)" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessType: 1 as BusinessTypeValue,
    industry: "",
    companySize: 1 as CompanySizeValue,
    buyerRoles: 1 as BuyerRoleValue,
    problemStatement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isCurrentStepValid = () => {
    const stepId = steps[currentStep].id as keyof FormData;
    if (stepId === "problemStatement") return true; // Optional field
    
    const value = formData[stepId];
    if (stepId === "industry") {
      return typeof value === "string" && value.trim() !== "";
    }
    return value !== "";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await icpService.createICP({
        business_type: formData.businessType as BusinessTypeValue,
        industry: formData.industry,
        company_size: formData.companySize as CompanySizeValue,
        buyer_roles: formData.buyerRoles as BuyerRoleValue,
        problem_statement: formData.problemStatement || undefined,
      });

      if (response && response.id) {
        toast.success("ICP created successfully!");
        onCreated();
        handleClose();
      }
    } catch (error) {
      toast.error("Error creating ICP:" + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after a delay to prevent UI flash
    setTimeout(() => {
      setCurrentStep(0);
      setFormData({
        businessType: "",
        industry: "",
        companySize: "",
        buyerRoles: "",
        problemStatement: "",
      });
    }, 150);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case "businessType":
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Business Type</Label>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            </div>
            <Select 
              value={formData.businessType.toString()} 
              onValueChange={(value) => updateFormData("businessType", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPE_OPTIONS.map((option : Option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "industry":
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Industry</Label>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            </div>
            <Input
              placeholder="e.g., Technology, Healthcare, Finance..."
              value={formData.industry}
              onChange={(e) => updateFormData("industry", e.target.value)}
            />
          </div>
        );

      case "companySize":
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Company Size</Label>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            </div>
            <Select 
              value={formData.companySize.toString()} 
              onValueChange={(value) => updateFormData("companySize", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZE_OPTIONS.map((option : Option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "buyerRoles":
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Target Buyer Role</Label>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            </div>
            <Select 
              value={formData.buyerRoles.toString()} 
              onValueChange={(value) => updateFormData("buyerRoles", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select buyer role" />
              </SelectTrigger>
              <SelectContent>
                {BUYER_ROLE_OPTIONS.map((option : Option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "problemStatement":
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Problem Statement (Optional)</Label>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            </div>
            <Textarea
              placeholder="Describe the main problem your ideal customer faces..."
              value={formData.problemStatement}
              onChange={(e) => updateFormData("problemStatement", e.target.value)}
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl">Create Ideal Customer Profile</DialogTitle>
          
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            
            {currentStep < steps.length - 1 && steps[currentStep].id === "problemStatement" && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
          </div>

          <div>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Create ICP
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}