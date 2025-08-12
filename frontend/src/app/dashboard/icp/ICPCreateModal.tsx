"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ICPCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export default function ICPCreateModal({ open, onOpenChange, onCreated }: ICPCreateModalProps) {
  const steps = [
    { id: "businessType", label: "What is your business type?" },
    { id: "industry", label: "What is your industry?" },
    { id: "zsfdg", label: "What is 345g industry?" },
    { id: "srreg", label: "What is dsfg industry?" },
  ];

  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleSkip = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    await fetch("/api/icps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_type: businessType,
        industry,
      }),
    });

    onCreated();
    onOpenChange(false);
    setStep(0); // reset for next open
  };

  const renderStepField = () => {
    switch (steps[step].id) {
      case "businessType":
        return (
          <div>
            <Label>{steps[step].label}</Label>
            <Input
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            />
          </div>
        );
      case "industry":
        return (
          <div>
            <Label>{steps[step].label}</Label>
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New ICP</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStepField()}

          <div className="flex justify-between">
            {step < steps.length - 1 && (
              <Button type="button" variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            )}

            {step < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
