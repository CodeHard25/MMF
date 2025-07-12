import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import { cn, optimizedImageUrl } from "../lib/utils.ts";

interface StyleCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  className?: string;
}

const StyleCard = (
  { title, description, image, onClick, className }: StyleCardProps,
) => {
  const optimizedImage = optimizedImageUrl(image, 600, 80);

  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group border-elevate-beige-dark/20 bg-light-beige-gradient dark:bg-dark-brown-gradient",
        className,
      )}
      onClick={onClick}
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={optimizedImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl font-bold text-elevate-brown-dark dark:text-elevate-beige">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        <p className="text-sm text-elevate-brown-chocolate dark:text-elevate-beige-light font-medium line-clamp-2">
          {description}
        </p>
        <Button className="w-full bg-gradient-to-r from-elevate-brown-light to-elevate-brown hover:from-elevate-brown hover:to-elevate-brown-dark text-white font-semibold">
          Explore Style
        </Button>
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(StyleCard);
