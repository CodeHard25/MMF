import React from "react";
import { Button } from "../ui/button.tsx";
import { Label } from "../ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.tsx";

import type { UserProfile } from "../../hooks/useUserProfile.ts";

interface SkinInfoStepProps {
  formData: Pick<UserProfile, "skinTone" | "skinType">;
  handleSelectChange: (name: keyof UserProfile, value: string) => void;
}

export const SkinInfoStep = (
  { formData, handleSelectChange }: SkinInfoStepProps,
) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="skinTone">Skin Tone</Label>
        <Select
          value={formData.skinTone}
          onValueChange={(value) => handleSelectChange("skinTone", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select skin tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very-fair">Very Fair</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="olive">Olive</SelectItem>
            <SelectItem value="brown">Brown</SelectItem>
            <SelectItem value="dark-brown">Dark Brown</SelectItem>
            <SelectItem value="very-dark">Very Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="skinType">Skin Type</Label>
        <Select
          value={formData.skinType}
          onValueChange={(value) => handleSelectChange("skinType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select skin type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oily">Oily</SelectItem>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="combination">Combination</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="acne-prone">Acne-Prone</SelectItem>
            <SelectItem value="sensitive">Sensitive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2">
        <Label className="block mb-2">Upload Skin Photo (Optional)</Label>
        <div className="border-2 border-dashed border-elevate-purple/40 rounded-md p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop a photo, or click to select
          </p>
          <input
            type="file"
            className="hidden"
            id="skin-photo"
            accept="image/*"
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                // TODO: Implement skin photo upload to fashion-images bucket
                // Path: profile-photos/skin/
                console.log("Skin photo selected:", file.name);
                alert("Skin photo upload will be implemented soon!");
              }
            }}
          />
          <Button
            onClick={() =>
              typeof globalThis !== "undefined" &&
              globalThis.document?.getElementById("skin-photo")?.click()}
            variant="outline"
            className="mt-2"
          >
            Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );
};
