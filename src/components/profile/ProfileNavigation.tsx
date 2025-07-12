import React from "react";
import { Button } from "../ui/button.tsx";

interface ProfileNavigationProps {
  step: number;
  loading: boolean;
  existingProfile: any;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export const ProfileNavigation = ({
  step,
  loading,
  existingProfile,
  onNext,
  onBack,
  onSubmit,
}: ProfileNavigationProps) => {
  return (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
      )}

      {step < 3
        ? (
          <Button
            className="elevate-button ml-auto"
            onClick={onNext}
            disabled={loading}
          >
            Next
          </Button>
        )
        : (
          <Button
            className="elevate-button ml-auto"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : existingProfile
              ? "Update Profile"
              : "Complete Profile"}
          </Button>
        )}
    </div>
  );
};
