import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext.tsx";
import AuthGuard from "../components/AuthGuard.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import VirtualTryOn from "../components/VirtualTryOn.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { Camera, Heart, Share2, Shirt, Sparkles, Zap } from "lucide-react";

const VirtualTryOnPage: React.FC = () => {
  const [tryOnResults, setTryOnResults] = useState<string[]>([]);

  const handleTryOnResult = (resultUrl: string) => {
    setTryOnResults((prev) => [resultUrl, ...prev]);
  };

  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Full-Body Photo Upload",
      description: "Upload clear photos from head to toe for best results",
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      title: "Outfit Selection",
      description:
        "Choose from our collection or upload your own outfit photos",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Try-On",
      description:
        "Advanced AI technology creates realistic virtual try-on results",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get your virtual try-on results in seconds",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Save Favorites",
      description: "Save your favorite looks and outfits for later",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Share & Download",
      description: "Share your virtual try-on results with friends",
    },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400">
                Virtual Try-On Studio
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              Experience the future of fashion with our AI-powered virtual
              try-on technology. Upload your photo and see how any outfit looks
              on you instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm">
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Instant Results
              </Badge>
              <Badge variant="secondary" className="text-sm">
                High Quality
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Free to Use
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-purple-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Virtual Try-On Component */}
          <AuthGuard>
            <VirtualTryOn onTryOnResult={handleTryOnResult} />
          </AuthGuard>

          {/* Recent Results */}
          {tryOnResults.length > 0 && (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Your Recent Try-On Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tryOnResults.slice(0, 8).map((result, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={result}
                        alt={`Try-on result ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Badge variant="secondary">
                            Result {index + 1}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">
                    📸 Photo Guidelines
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Use a clear, well-lit full-body photo</li>
                    <li>• Stand straight with arms slightly away from body</li>
                    <li>• Wear fitted clothing for better results</li>
                    <li>• Use a plain background if possible</li>
                    <li>• Make sure your entire body is visible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">
                    👗 Outfit Selection
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Choose outfits with clear, visible details</li>
                    <li>• High-contrast colors work better</li>
                    <li>• Avoid overly complex patterns initially</li>
                    <li>• Try different styles to see what suits you</li>
                    <li>• Save your favorite combinations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default VirtualTryOnPage;
