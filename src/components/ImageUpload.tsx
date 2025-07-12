import React, { useRef, useState } from "react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Card, CardContent } from "./ui/card.tsx";
import { Camera, Sparkles, Upload, X } from "lucide-react";
import { supabase } from "../integrations/supabase/client.ts";
import { useAuth } from "../contexts/AuthContext.tsx";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  onImageGenerate: (shouldGenerate: boolean) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageGenerate,
  disabled = false,
}) => {
  const { user, signInWithGoogle } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generateImages, setGenerateImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    console.log("File selected:", file.name, file.type, file.size);

    // Check if user is authenticated
    if (!user) {
      const shouldLogin = confirm(
        "You need to sign in to upload photos. Would you like to sign in with Google now?",
      );
      if (shouldLogin) {
        await signInWithGoogle();
        return;
      } else {
        return;
      }
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create a unique file name with timestamp
      const fileExt = file.name.split(".").pop() || "jpg";
      const timestamp = Date.now();
      const fileName = `${timestamp}_${
        Math.random().toString(36).substring(7)
      }.${fileExt}`;
      const filePath = `fashion-uploads/${fileName}`;

      console.log("Uploading to path:", filePath);

      // First, check if bucket exists and try to create it if it doesn't
      const { data: buckets, error: bucketsError } = await supabase.storage
        .listBuckets();
      console.log("Available buckets:", buckets, bucketsError);

      const bucketExists = buckets?.some((bucket) =>
        bucket.id === "fashion-images"
      );

      if (!bucketExists) {
        console.log("Bucket does not exist, attempting to create...");

        // Try to create the bucket
        const { data: createBucketData, error: createBucketError } =
          await supabase.storage
            .createBucket("fashion-images", {
              public: true,
              fileSizeLimit: 5242880, // 5MB
              allowedMimeTypes: [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
              ],
            });

        console.log(
          "Create bucket result:",
          createBucketData,
          createBucketError,
        );

        if (createBucketError) {
          console.log(
            "Could not create bucket, will try upload anyway:",
            createBucketError,
          );
        }
      }

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("fashion-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("Upload result:", uploadData, uploadError);

      if (uploadError) {
        // If bucket doesn't exist, provide helpful message
        if (
          uploadError.message?.includes("bucket") ||
          uploadError.message?.includes("not found")
        ) {
          throw new Error(
            'Storage bucket not found. Please create the "fashion-images" bucket in your Supabase dashboard under Storage.',
          );
        }
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("fashion-images")
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrl);

      setUploadedImage(publicUrl);
      onImageUpload(publicUrl);

      // Show success message
      alert("Photo uploaded successfully! Now ask me to analyze it.");
    } catch (error) {
      console.error("Upload error:", error);

      // Provide more specific error messages
      const errorMessage = (error as Error)?.message || "Unknown error";
      if (errorMessage.includes("bucket")) {
        alert(
          'Storage bucket not found. Please create the "fashion-images" bucket in your Supabase dashboard under Storage → Buckets.',
        );
      } else if (
        errorMessage.includes("policy") ||
        errorMessage.includes("permission")
      ) {
        alert(
          "Permission denied. Please make sure you are logged in and have upload permissions.",
        );
      } else if (errorMessage.includes("size")) {
        alert("File too large. Please choose an image smaller than 5MB.");
      } else {
        alert(
          `Failed to upload image: ${errorMessage}. Please try again or contact support.`,
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    onImageUpload("");
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
  };

  const toggleImageGeneration = () => {
    const newValue = !generateImages;
    setGenerateImages(newValue);
    onImageGenerate(newValue);
  };

  return (
    <div className="space-y-3">
      {/* Image Upload Section */}
      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
        <CardContent className="p-4">
          {uploadedImage
            ? (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  onClick={handleRemoveImage}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )
            : (
              <div className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Camera className="w-8 h-8 text-gray-400" />
                  <div>
                    <Button
                      onClick={() =>
                        (fileInputRef.current as HTMLInputElement)?.click()}
                      variant="outline"
                      disabled={disabled || uploading}
                      className="mb-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </Button>
                    <p className="text-xs text-gray-500">
                      Upload your photo for personalized styling advice
                    </p>
                  </div>
                </div>
              </div>
            )}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Image Generation Toggle */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-sm">AI Image Generation</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate visual outfit suggestions
                </p>
              </div>
            </div>
            <Button
              onClick={toggleImageGeneration}
              variant={generateImages ? "default" : "outline"}
              size="sm"
              disabled={disabled}
              className={generateImages
                ? "bg-purple-600 hover:bg-purple-700"
                : ""}
            >
              {generateImages ? "ON" : "OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => {
            setGenerateImages(true);
            onImageGenerate(true);
          }}
        >
          <Sparkles className="w-4 h-4 mr-1" />
          Generate Outfit
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => (fileInputRef.current as HTMLInputElement)?.click()}
        >
          <Camera className="w-4 h-4 mr-1" />
          Add Photo
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
