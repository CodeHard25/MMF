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

interface HairInfoStepProps {
  formData: Pick<UserProfile, "scalpType" | "hairTexture">;
  handleSelectChange: (name: keyof UserProfile, value: string) => void;
}

export const HairInfoStep = (
  { formData, handleSelectChange }: HairInfoStepProps,
) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="scalpType">Scalp Type</Label>
        <Select
          value={formData.scalpType}
          onValueChange={(value) => handleSelectChange("scalpType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select scalp type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oily">Oily</SelectItem>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="flaky">Flaky/Dandruff</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="sensitive">Sensitive</SelectItem>
            <SelectItem value="acne-prone">Acne-Prone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="hairTexture">Hair Texture</Label>
        <Select
          value={formData.hairTexture}
          onValueChange={(value) => handleSelectChange("hairTexture", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hair texture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="straight">Straight</SelectItem>
            <SelectItem value="wavy">Wavy</SelectItem>
            <SelectItem value="curly">Curly</SelectItem>
            <SelectItem value="coily">Coily</SelectItem>
            <SelectItem value="thin">Thin/Fine</SelectItem>
            <SelectItem value="thick">Thick</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2">
        <Label className="block mb-2">Upload Hair Photo (Optional)</Label>
        <div className="border-2 border-dashed border-elevate-purple/40 rounded-md p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop a photo, or click to select
          </p>
          <input
            type="file"
            className="hidden"
            id="hair-photo"
            accept="image/*"
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                // TODO: Implement hair photo upload to fashion-images bucket
                // Path: profile-photos/hair/
                console.log("Hair photo selected:", file.name);
                alert("Hair photo upload will be implemented soon!");
              }
            }}
          />
          <Button
            onClick={() =>
              typeof globalThis !== "undefined" &&
              globalThis.document?.getElementById("hair-photo")?.click()}
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
