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
import { toast, Toaster } from 'sonner';

interface ICPCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

interface FormData {
  businessType: string;
  industry: string;
  companySize: string;
  buyerRoles: string;
  problemStatement?: string;
}

const BUSINESS_TYPES = [
  "B2B SaaS",
  "E-commerce",
  "Consulting",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Financial Services",
  "Real Estate",
  "Other"
];

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees", 
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees"
];

const BUYER_ROLES = [
  "CEO/Founder",
  "CTO/VP Engineering",
  "Marketing Director/CMO",
  "Sales Director/VP Sales",
  "Operations Manager",
  "HR Director",
  "Finance Director/CFO",
  "Product Manager",
  "IT Manager",
  "Other"
];

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
    businessType: "",
    industry: "",
    companySize: "",
    buyerRoles: "",
    problemStatement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
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
    return formData[stepId].trim() !== "";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await icpService.createICP({
          business_type: formData.businessType,
          industry: formData.industry,
          company_size: formData.companySize,
          buyer_roles: formData.buyerRoles,
          problem_statement: formData.problemStatement || undefined,
        });
      

      if (response  && response.id) {
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
            <Select value={formData.businessType} onValueChange={(value) => updateFormData("businessType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
            <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
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
            <Select value={formData.buyerRoles} onValueChange={(value) => updateFormData("buyerRoles", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select buyer role" />
              </SelectTrigger>
              <SelectContent>
                {BUYER_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
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