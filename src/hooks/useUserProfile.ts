import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext.tsx";
import { supabase } from "../integrations/supabase/client.ts";

export interface UserProfile {
  name: string;
  height: string;
  weight: string;
  bodyType: string;
  skinTone: string;
  skinType: string;
  scalpType: string;
  hairTexture: string;
}

interface UserProfileData {
  id: string;
  user_id: string;
  full_name: string | null;
  height: number | null;
  weight: number | null;
  body_type: string | null;
  skin_tone: string | null;
  skin_type: string | null;
  scalp_type: string | null;
  hair_texture: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [existingProfile, setExistingProfile] = useState<UserProfile | null>(
    null,
  );

  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    height: "",
    weight: "",
    bodyType: "",
    skinTone: "",
    skinType: "",
    scalpType: "",
    hairTexture: "",
  });

  useEffect(() => {
    if (user?.id) {
      fetchExistingProfile();
    }
  }, [user?.id]);

  const fetchExistingProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      if (data) {
        const profile = data as UserProfileData;
        const profileData: UserProfile = {
          name: profile.full_name ?? "",
          height: profile.height?.toString() ?? "",
          weight: profile.weight?.toString() ?? "",
          bodyType: profile.body_type ?? "",
          skinTone: profile.skin_tone ?? "",
          skinType: profile.skin_type ?? "",
          scalpType: profile.scalp_type ?? "",
          hairTexture: profile.hair_texture ?? "",
        };
        setFormData(profileData);
        setExistingProfile(profileData);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as { name?: string; value?: string };
    const name = target.name ?? "";
    const value = target.value ?? "";
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("Please log in to save your profile");
      return false;
    }

    setLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        full_name: formData.name,
        height: formData.height ? parseInt(formData.height) : null,
        weight: formData.weight ? parseInt(formData.weight) : null,
        body_type: formData.bodyType,
        skin_tone: formData.skinTone,
        skin_type: formData.skinType,
        scalp_type: formData.scalpType,
        hair_texture: formData.hairTexture,
        updated_at: new Date().toISOString(),
      };

      const { error } = existingProfile
        ? await supabase
          .from("user_profiles")
          .update(profileData)
          .eq("user_id", user.id)
        : await supabase
          .from("user_profiles")
          .insert([profileData]);

      if (error) throw error;

      toast.success(existingProfile ? "Profile updated!" : "Profile created!");
      setExistingProfile(formData);
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error saving profile. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    existingProfile,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
