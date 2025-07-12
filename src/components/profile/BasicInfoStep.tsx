import React from "react";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select.tsx";

import type { UserProfile } from "../../hooks/useUserProfile.ts";

interface BasicInfoStepProps {
  formData: Pick<UserProfile, "name" | "height" | "weight" | "bodyType">;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof UserProfile, value: string) => void;
}

export const BasicInfoStep = (
  { formData, handleChange, handleSelectChange }: BasicInfoStepProps,
) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight"
            type="number"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bodyType">Body Type</Label>
        <Select
          value={formData.bodyType}
          onValueChange={(value) => handleSelectChange("bodyType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ectomorph">Ectomorph (Slim)</SelectItem>
            <SelectItem value="mesomorph">Mesomorph (Athletic)</SelectItem>
            <SelectItem value="endomorph">Endomorph (Stocky)</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
