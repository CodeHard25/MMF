import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile.ts";
import { BasicInfoStep } from "./profile/BasicInfoStep.tsx";
import { SkinInfoStep } from "./profile/SkinInfoStep.tsx";
import { HairInfoStep } from "./profile/HairInfoStep.tsx";
import { ProfileNavigation } from "./profile/ProfileNavigation.tsx";

const UserProfileModal = () => {
  const [step, setStep] = useState(1);
  const {
    formData,
    loading,
    existingProfile,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useUserProfile();

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      // Could add additional logic here if needed
    }
  };

  return (
    <div className="py-4">
      {step === 1 && (
        <BasicInfoStep
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      )}

      {step === 2 && (
        <SkinInfoStep
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
      )}

      {step === 3 && (
        <HairInfoStep
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
      )}

      <ProfileNavigation
        step={step}
        loading={loading}
        existingProfile={existingProfile}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UserProfileModal;
