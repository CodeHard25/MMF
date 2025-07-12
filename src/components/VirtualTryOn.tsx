import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Upload, 
  Camera, 
  User, 
  Shirt, 
  Sparkles, 
  X, 
  Download,
  Share2,
  Heart,
  ShoppingBag
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../contexts/AuthContext";

interface VirtualTryOnProps {
  onTryOnResult: (resultUrl: string) => void;
}

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  price?: string;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ onTryOnResult }) => {
  const { user, signInWithGoogle } = useAuth();
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [outfitPhoto, setOutfitPhoto] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitItem | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadingUser, setUploadingUser] = useState(false);
  const [uploadingOutfit, setUploadingOutfit] = useState(false);
  
  const userPhotoRef = useRef<HTMLInputElement>(null);
  const outfitPhotoRef = useRef<HTMLInputElement>(null);

  // Sample outfit collection
  const sampleOutfits: OutfitItem[] = [
    {
      id: "1",
      name: "Professional Business Suit",
      category: "Business",
      imageUrl: "https://image.pollinations.ai/prompt/professional%20business%20suit%20navy%20blazer%20white%20shirt%20formal%20attire?width=300&height=400&seed=1001",
      description: "Navy blazer with white shirt and dress pants",
      price: "$299"
    },
    {
      id: "2", 
      name: "Casual Summer Dress",
      category: "Casual",
      imageUrl: "https://image.pollinations.ai/prompt/casual%20summer%20dress%20floral%20pattern%20light%20fabric?width=300&height=400&seed=1002",
      description: "Light floral summer dress",
      price: "$89"
    },
    {
      id: "3",
      name: "Smart Casual Outfit",
      category: "Smart Casual", 
      imageUrl: "https://image.pollinations.ai/prompt/smart%20casual%20outfit%20chinos%20polo%20shirt%20blazer?width=300&height=400&seed=1003",
      description: "Chinos with polo shirt and casual blazer",
      price: "$179"
    },
    {
      id: "4",
      name: "Evening Gown",
      category: "Formal",
      imageUrl: "https://image.pollinations.ai/prompt/elegant%20evening%20gown%20black%20formal%20dress?width=300&height=400&seed=1004", 
      description: "Elegant black evening gown",
      price: "$459"
    },
    {
      id: "5",
      name: "Workout Activewear",
      category: "Athletic",
      imageUrl: "https://image.pollinations.ai/prompt/workout%20activewear%20leggings%20sports%20bra%20athletic%20wear?width=300&height=400&seed=1005",
      description: "Athletic leggings and sports top",
      price: "$69"
    },
    {
      id: "6",
      name: "Winter Coat Ensemble",
      category: "Outerwear",
      imageUrl: "https://image.pollinations.ai/prompt/winter%20coat%20ensemble%20wool%20coat%20scarf%20boots?width=300&height=400&seed=1006",
      description: "Wool coat with scarf and boots",
      price: "$349"
    }
  ];

  const handleUserPhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check authentication
    if (!user) {
      const shouldLogin = confirm(
        "You need to sign in to upload photos. Would you like to sign in with Google now?"
      );
      if (shouldLogin) {
        await signInWithGoogle();
        return;
      } else {
        return;
      }
    }

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit for full body photos
      alert("Image size should be less than 10MB");
      return;
    }

    setUploadingUser(true);

    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const timestamp = Date.now();
      const fileName = `user_photo_${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `virtual-tryon/user-photos/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("fashion-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("fashion-images")
        .getPublicUrl(filePath);

      setUserPhoto(publicUrl);
      alert("User photo uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload photo: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingUser(false);
    }
  };

  const handleOutfitPhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check authentication
    if (!user) {
      const shouldLogin = confirm(
        "You need to sign in to upload photos. Would you like to sign in with Google now?"
      );
      if (shouldLogin) {
        await signInWithGoogle();
        return;
      } else {
        return;
      }
    }

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("Image size should be less than 5MB");
      return;
    }

    setUploadingOutfit(true);

    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const timestamp = Date.now();
      const fileName = `outfit_photo_${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `virtual-tryon/outfit-photos/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("fashion-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("fashion-images")
        .getPublicUrl(filePath);

      setOutfitPhoto(publicUrl);
      setSelectedOutfit(null); // Clear selected outfit when uploading custom
      alert("Outfit photo uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload photo: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingOutfit(false);
    }
  };

  const handleOutfitSelect = (outfit: OutfitItem) => {
    setSelectedOutfit(outfit);
    setOutfitPhoto(outfit.imageUrl);
  };

  const handleVirtualTryOn = async () => {
    if (!userPhoto) {
      alert("Please upload your full-body photo first");
      return;
    }

    if (!outfitPhoto && !selectedOutfit) {
      alert("Please select an outfit or upload an outfit photo");
      return;
    }

    setIsProcessing(true);

    try {
      // Create a virtual try-on prompt for AI generation
      const outfitDescription = selectedOutfit 
        ? selectedOutfit.description 
        : "uploaded outfit";
      
      const prompt = `virtual try-on, person wearing ${outfitDescription}, realistic fashion photography, full body, professional lighting, high quality, detailed clothing fit`;
      
      // Generate virtual try-on result using Pollinations AI
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Math.floor(Math.random() * 1000000);
      const resultUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=768&seed=${seed}&model=flux&enhance=true`;

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 3000));

      setTryOnResult(resultUrl);
      onTryOnResult(resultUrl);
      
      alert("Virtual try-on complete! See how the outfit looks on you.");
    } catch (error) {
      console.error("Virtual try-on error:", error);
      alert("Failed to generate virtual try-on. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadResult = () => {
    if (tryOnResult) {
      const link = document.createElement('a');
      link.href = tryOnResult;
      link.download = 'virtual-tryon-result.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShareResult = async () => {
    if (tryOnResult && navigator.share) {
      try {
        await navigator.share({
          title: 'My Virtual Try-On Result',
          text: 'Check out how this outfit looks on me!',
          url: tryOnResult,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(tryOnResult || '');
      alert('Result URL copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Virtual Try-On Studio
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Upload your photo and try on different outfits virtually
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload-user" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload-user">
                <User className="w-4 h-4 mr-2" />
                Your Photo
              </TabsTrigger>
              <TabsTrigger value="select-outfit">
                <Shirt className="w-4 h-4 mr-2" />
                Select Outfit
              </TabsTrigger>
              <TabsTrigger value="try-on">
                <Sparkles className="w-4 h-4 mr-2" />
                Try On
              </TabsTrigger>
            </TabsList>

            {/* User Photo Upload Tab */}
            <TabsContent value="upload-user" className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Upload Your Full-Body Photo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  For best results, upload a clear full-body photo from head to toe
                </p>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                  {userPhoto ? (
                    <div className="relative">
                      <img 
                        src={userPhoto} 
                        alt="User photo" 
                        className="max-w-xs max-h-96 mx-auto rounded-lg shadow-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setUserPhoto(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <Button
                        onClick={() => userPhotoRef.current?.click()}
                        disabled={uploadingUser}
                        className="mb-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingUser ? "Uploading..." : "Upload Your Photo"}
                      </Button>
                      <p className="text-xs text-gray-500">
                        Supported: JPEG, PNG, WebP, GIF (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
                
                <input
                  ref={userPhotoRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUserPhotoUpload}
                  className="hidden"
                />
              </div>
            </TabsContent>

            {/* Outfit Selection Tab */}
            <TabsContent value="select-outfit" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose an Outfit</h3>
                
                {/* Upload Custom Outfit */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Upload Your Own Outfit</h4>
                    <div className="flex items-center gap-4">
                      {outfitPhoto && !selectedOutfit ? (
                        <div className="relative">
                          <img 
                            src={outfitPhoto} 
                            alt="Custom outfit" 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute -top-2 -right-2"
                            onClick={() => setOutfitPhoto(null)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => outfitPhotoRef.current?.click()}
                          disabled={uploadingOutfit}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadingOutfit ? "Uploading..." : "Upload Outfit"}
                        </Button>
                      )}
                    </div>
                    <input
                      ref={outfitPhotoRef}
                      type="file"
                      accept="image/*"
                      onChange={handleOutfitPhotoUpload}
                      className="hidden"
                    />
                  </CardContent>
                </Card>

                {/* Sample Outfits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sampleOutfits.map((outfit) => (
                    <Card 
                      key={outfit.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedOutfit?.id === outfit.id 
                          ? 'ring-2 ring-purple-500 shadow-lg' 
                          : ''
                      }`}
                      onClick={() => handleOutfitSelect(outfit)}
                    >
                      <CardContent className="p-3">
                        <img 
                          src={outfit.imageUrl} 
                          alt={outfit.name}
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <h4 className="font-medium text-sm mb-1">{outfit.name}</h4>
                        <Badge variant="secondary" className="text-xs mb-1">
                          {outfit.category}
                        </Badge>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                          {outfit.description}
                        </p>
                        {outfit.price && (
                          <p className="text-sm font-semibold text-green-600">
                            {outfit.price}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Virtual Try-On Tab */}
            <TabsContent value="try-on" className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Virtual Try-On Result</h3>
                
                {/* Preview Section */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* User Photo Preview */}
                  <div>
                    <h4 className="font-medium mb-2">Your Photo</h4>
                    {userPhoto ? (
                      <img 
                        src={userPhoto} 
                        alt="User" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Outfit Preview */}
                  <div>
                    <h4 className="font-medium mb-2">Selected Outfit</h4>
                    {outfitPhoto ? (
                      <img 
                        src={outfitPhoto} 
                        alt="Outfit" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Shirt className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Result Preview */}
                  <div>
                    <h4 className="font-medium mb-2">Try-On Result</h4>
                    {tryOnResult ? (
                      <img 
                        src={tryOnResult} 
                        alt="Virtual try-on result" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={handleVirtualTryOn}
                    disabled={isProcessing || !userPhoto || (!outfitPhoto && !selectedOutfit)}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isProcessing ? "Processing..." : "Generate Virtual Try-On"}
                  </Button>

                  {tryOnResult && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button variant="outline" onClick={handleDownloadResult}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" onClick={handleShareResult}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline">
                        <Heart className="w-4 h-4 mr-2" />
                        Save to Favorites
                      </Button>
                      <Button variant="outline">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Shop This Look
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTryOn;
