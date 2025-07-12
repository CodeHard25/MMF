import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import { cn } from "../lib/utils.ts";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  link: string;
  skinType?: string[];
  scalpType?: string[];
  rating: number;
  tags: string[];
}

const skinProducts: Product[] = [
  {
    id: "skin-1",
    name: "Gentle Foaming Cleanser",
    brand: "CeraVe",
    description:
      "A gentle foaming cleanser that removes excess oil without disrupting the skin barrier.",
    price: 15,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    link: "#",
    skinType: ["oily", "combination", "normal"],
    rating: 4.7,
    tags: ["cleanser", "daily-use"],
  },
  {
    id: "skin-2",
    name: "Hydrating Facial Moisturizer",
    brand: "Neutrogena",
    description:
      "Oil-free moisturizer that provides long-lasting hydration without clogging pores.",
    price: 18,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    link: "#",
    skinType: ["dry", "normal", "sensitive"],
    rating: 4.5,
    tags: ["moisturizer", "hydrating"],
  },
  {
    id: "skin-3",
    name: "Vitamin C Serum",
    brand: "The Ordinary",
    description:
      "Brightening serum that targets uneven skin tone and improves skin texture.",
    price: 29,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
    link: "#",
    skinType: ["all"],
    rating: 4.8,
    tags: ["serum", "brightening"],
  },
  {
    id: "skin-4",
    name: "Acne Spot Treatment",
    brand: "Paula's Choice",
    description:
      "Fast-acting spot treatment that reduces blemishes and prevents new breakouts.",
    price: 25,
    image: "https://images.unsplash.com/photo-1626273568913-38d94d1dda10",
    link: "#",
    skinType: ["acne-prone", "oily", "combination"],
    rating: 4.6,
    tags: ["treatment", "acne-care"],
  },
];

const hairProducts: Product[] = [
  {
    id: "hair-1",
    name: "Balancing Shampoo",
    brand: "Aveda",
    description:
      "Gently cleanses while maintaining natural oils and scalp balance.",
    price: 22,
    image: "https://images.unsplash.com/photo-1619451683204-a4cb0c3c750a",
    link: "#",
    scalpType: ["oily", "normal"],
    rating: 4.6,
    tags: ["shampoo", "daily-use"],
  },
  {
    id: "hair-2",
    name: "Hydrating Conditioner",
    brand: "Briogeo",
    description:
      "Deep conditioning treatment that nourishes without weighing hair down.",
    price: 26,
    image: "https://images.unsplash.com/photo-1583312708610-fe16a34b0826",
    link: "#",
    scalpType: ["dry", "normal"],
    rating: 4.7,
    tags: ["conditioner", "hydrating"],
  },
  {
    id: "hair-3",
    name: "Anti-Dandruff Shampoo",
    brand: "Nizoral",
    description:
      "Medicated shampoo that fights dandruff and soothes the scalp.",
    price: 19,
    image: "https://images.unsplash.com/photo-1619451683204-a4cb0c3c750a",
    link: "#",
    scalpType: ["flaky", "sensitive"],
    rating: 4.5,
    tags: ["shampoo", "anti-dandruff"],
  },
  {
    id: "hair-4",
    name: "Thickening Hair Paste",
    brand: "Hanz de Fuko",
    description:
      "Medium-hold paste that adds texture and volume to all hair types.",
    price: 24,
    image: "https://images.unsplash.com/photo-1626072770771-bbc382122a7c",
    link: "#",
    scalpType: ["all"],
    rating: 4.8,
    tags: ["styling", "medium-hold"],
  },
];

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </div>
          <div className="bg-elevate-purple text-white text-xs font-semibold px-2 py-1 rounded">
            ${product.price}
          </div>
        </div>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, idx) => (
            <svg
              key={idx}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={idx < Math.floor(product.rating) ? "currentColor" : "none"}
              stroke="currentColor"
              className={`w-4 h-4 ${
                idx < Math.floor(product.rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
          <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1">
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => (window as any).open(product.link, "_blank")}
        >
          Shop Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const GroomingAdvisor = () => {
  const [skinFilter, setSkinFilter] = useState("all");
  const [hairFilter, setHairFilter] = useState("all");

  const filteredSkinProducts = skinFilter === "all"
    ? skinProducts
    : skinProducts.filter((product) =>
      product.skinType?.includes(skinFilter) ||
      product.skinType?.includes("all")
    );

  const filteredHairProducts = hairFilter === "all"
    ? hairProducts
    : hairProducts.filter((product) =>
      product.scalpType?.includes(hairFilter) ||
      product.scalpType?.includes("all")
    );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h2 className="text-3xl font-semibold mb-8 text-amber-800 dark:text-amber-400">
        Grooming Advisor
      </h2>

      <Tabs defaultValue="skin" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="skin">Skincare</TabsTrigger>
          <TabsTrigger value="hair">Haircare</TabsTrigger>
        </TabsList>

        <TabsContent value="skin" className="mt-0">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Filter by Skin Type:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={skinFilter === "all" ? "default" : "outline"}
                onClick={() => setSkinFilter("all")}
              >
                All Types
              </Button>
              <Button
                variant={skinFilter === "oily" ? "default" : "outline"}
                onClick={() => setSkinFilter("oily")}
              >
                Oily
              </Button>
              <Button
                variant={skinFilter === "dry" ? "default" : "outline"}
                onClick={() => setSkinFilter("dry")}
              >
                Dry
              </Button>
              <Button
                variant={skinFilter === "combination" ? "default" : "outline"}
                onClick={() => setSkinFilter("combination")}
              >
                Combination
              </Button>
              <Button
                variant={skinFilter === "sensitive" ? "default" : "outline"}
                onClick={() => setSkinFilter("sensitive")}
              >
                Sensitive
              </Button>
              <Button
                variant={skinFilter === "acne-prone" ? "default" : "outline"}
                onClick={() => setSkinFilter("acne-prone")}
              >
                Acne-Prone
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSkinProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 bg-secondary p-6 rounded-xl">
            <h3 className="text-xl font-medium mb-4">
              Pro Tips: Daily Skincare Routine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Morning Routine</h4>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Cleanser</li>
                  <li>Toner (optional)</li>
                  <li>Serum (Vitamin C recommended)</li>
                  <li>Moisturizer</li>
                  <li>Sunscreen (SPF 30+)</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Evening Routine</h4>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Makeup/Sunscreen Remover</li>
                  <li>Cleanser</li>
                  <li>Exfoliate (2-3 times weekly)</li>
                  <li>Toner (optional)</li>
                  <li>Treatment Serum</li>
                  <li>Moisturizer</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Weekly Treatments</h4>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Face Mask (1-2 times)</li>
                  <li>Chemical Exfoliation (1 time)</li>
                  <li>Hydrating Treatment</li>
                </ol>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hair" className="mt-0">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Filter by Scalp Type:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={hairFilter === "all" ? "default" : "outline"}
                onClick={() => setHairFilter("all")}
              >
                All Types
              </Button>
              <Button
                variant={hairFilter === "oily" ? "default" : "outline"}
                onClick={() => setHairFilter("oily")}
              >
                Oily
              </Button>
              <Button
                variant={hairFilter === "dry" ? "default" : "outline"}
                onClick={() => setHairFilter("dry")}
              >
                Dry
              </Button>
              <Button
                variant={hairFilter === "flaky" ? "default" : "outline"}
                onClick={() => setHairFilter("flaky")}
              >
                Flaky/Dandruff
              </Button>
              <Button
                variant={hairFilter === "sensitive" ? "default" : "outline"}
                onClick={() => setHairFilter("sensitive")}
              >
                Sensitive
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHairProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 bg-secondary p-6 rounded-xl">
            <h3 className="text-xl font-medium mb-4">
              Pro Tips: Hair Care Routine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Washing Routine</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Wash 2-3 times per week</li>
                  <li>Use lukewarm water</li>
                  <li>Massage scalp gently</li>
                  <li>Rinse thoroughly</li>
                  <li>Apply conditioner to ends only</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Styling Tips</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Use heat protectant before styling</li>
                  <li>Let hair air-dry when possible</li>
                  <li>Apply styling products to damp hair</li>
                  <li>Use wide-tooth comb for wet hair</li>
                  <li>Trim regularly (every 4-6 weeks)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Weekly Treatments</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Deep conditioning mask</li>
                  <li>Scalp exfoliation</li>
                  <li>Oil treatment for dry ends</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroomingAdvisor;
