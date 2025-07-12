// For Deno/SSR compatibility: extend global type for open
interface BrowserGlobalWithOpen extends Window {
  open: (
    url?: string,
    target?: string,
    features?: string,
    replace?: boolean,
  ) => Window | null;
}
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import { BookmarkIcon, ExternalLink, Heart, Tag } from "lucide-react";
import { toast } from "sonner";

interface OutfitItem {
  id: string;
  name: string;
  price: number;
  category: string;
  link: string;
  image: string;
}

interface Outfit {
  id: string;
  title: string;
  image: string;
  items: OutfitItem[];
}

interface OutfitCardProps {
  outfit: Outfit;
}

const OutfitCard = ({ outfit }: OutfitCardProps) => {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    toast.success(saved ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const calculateTotal = () => {
    return outfit.items.reduce((total, item) => total + item.price, 0);
  };

  const handleBuyClick = (link: string) => {
    const openFn = (globalThis.open as unknown) as (
      url?: string,
      target?: string,
      features?: string,
      replace?: boolean,
    ) => Window | null | undefined;
    if (typeof openFn === "function") {
      openFn(link, "_blank");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <img
              src={outfit.image}
              alt={outfit.title}
              className="w-full h-72 object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-elevate-navy/80 dark:hover:bg-elevate-navy rounded-full"
                onClick={handleLike}
              >
                <Heart
                  className={liked
                    ? "text-elevate-vibrant-red fill-elevate-vibrant-red"
                    : ""}
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-elevate-navy/80 dark:hover:bg-elevate-navy rounded-full"
                onClick={handleSave}
              >
                <BookmarkIcon
                  className={saved
                    ? "text-elevate-purple fill-elevate-purple"
                    : ""}
                  size={18}
                />
              </Button>
            </div>
          </div>

          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xl">{outfit.title}</CardTitle>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              {outfit.items.length} items • ${calculateTotal()} total
            </p>
            <Button className="elevate-button w-full">View Details</Button>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{outfit.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={outfit.image}
              alt={outfit.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Items in this outfit:</h3>

            <div className="space-y-4">
              {outfit.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBuyClick(item.link)}
                      className="flex items-center text-elevate-vibrant-green font-medium hover:underline mt-1"
                    >
                      <Tag size={16} className="mr-1" />
                      ${item.price} <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => handleBuyClick(item.link)}
                  >
                    Buy
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-lg font-semibold">${calculateTotal()}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                >
                  <BookmarkIcon
                    className={`mr-2 h-4 w-4 ${
                      saved ? "text-elevate-purple fill-elevate-purple" : ""
                    }`}
                  />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleLike}
                  className={liked
                    ? "bg-elevate-vibrant-red hover:bg-elevate-vibrant-red/90"
                    : ""}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${liked ? "fill-white" : ""}`}
                  />
                  {liked ? "Liked" : "Like"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutfitCard;
