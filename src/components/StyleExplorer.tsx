// Deno/SSR: Provide minimal types if not available
type History = typeof window extends { history: infer H } ? H : {
  pushState(data: unknown, unused: string, url?: string | null): void;
};
type Location = typeof window extends { location: infer L } ? L : {
  pathname: string;
};
// Utility for safe browser history/location access (Deno/SSR compatible)
function getBrowserHistory() {
  const history = (globalThis.history as unknown) as History | undefined;
  const location = (globalThis.location as unknown) as Location | undefined;
  return typeof history !== "undefined" && typeof location !== "undefined"
    ? { history, location }
    : undefined;
}
import React, { useCallback, useMemo, useState } from "react";
import StyleCard from "./StyleCard.tsx";
import OutfitCard from "./OutfitCard.tsx";
import { Button } from "./ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.tsx";
import { useIsMobile } from "../hooks/use-mobile.tsx";
import { optimizedImageUrl } from "../lib/utils.ts";

interface Style {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription: string;
  keyElements: string[];
  outfits: Outfit[];
}

interface Outfit {
  id: string;
  title: string;
  image: string;
  items: OutfitItem[];
}

interface OutfitItem {
  id: string;
  name: string;
  price: number;
  category: string;
  link: string;
  image: string;
}

const styles: Style[] = [
  {
    id: "grunge",
    title: "Grunge",
    description:
      "Rugged, rebellious aesthetic inspired by the 90s grunge music scene.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    longDescription:
      'Grunge style embodies a rebellious attitude with deliberately disheveled, layered clothing and a "I don\'t care" aesthetic. Originating from the Seattle music scene of the early 90s, grunge fashion rejects mainstream trends and embraces comfortable, often oversized pieces with a worn-in look.',
    keyElements: [
      "Flannel shirts",
      "Ripped jeans",
      "Band t-shirts",
      "Combat boots",
      "Beanies",
      "Layered clothing",
    ],
    outfits: [
      {
        id: "grunge-1",
        title: "Classic Grunge",
        image: "https://images.unsplash.com/photo-1561138494-573969e4955b",
        items: [
          {
            id: "g1-top",
            name: "Vintage Band T-Shirt",
            price: 25,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
          },
          {
            id: "g1-layer",
            name: "Plaid Flannel Shirt",
            price: 45,
            category: "Layer",
            link: "#",
            image:
              "https://images.unsplash.com/photo-158931024389-96a5483213a8",
          },
          {
            id: "g1-bottom",
            name: "Distressed Jeans",
            price: 60,
            category: "Bottom",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          },
          {
            id: "g1-shoes",
            name: "Combat Boots",
            price: 85,
            category: "Shoes",
            link: "#",
            image: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab",
          },
        ],
      },
    ],
  },
  {
    id: "techwear",
    title: "Techwear",
    description:
      "Futuristic, functional clothing with a focus on utility and advanced materials.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
    longDescription:
      "Techwear combines functionality with futuristic aesthetics, featuring waterproof fabrics, multiple pockets, and modular designs. This style prioritizes utility, comfort, and adaptability to urban environments while maintaining a sleek, often monochromatic appearance.",
    keyElements: [
      "Technical fabrics",
      "Multiple pockets",
      "Waterproof materials",
      "Modular components",
      "Utility straps",
      "Minimalist color palette",
    ],
    outfits: [
      {
        id: "tech-1",
        title: "Urban Techwear",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        items: [
          {
            id: "t1-top",
            name: "Moisture-Wicking T-Shirt",
            price: 45,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
          },
          {
            id: "t1-jacket",
            name: "Waterproof Technical Jacket",
            price: 180,
            category: "Outerwear",
            link: "#",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
          },
          {
            id: "t1-bottom",
            name: "Cargo Pants with Zippered Pockets",
            price: 120,
            category: "Bottom",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
          },
          {
            id: "t1-shoes",
            name: "Lightweight Technical Sneakers",
            price: 140,
            category: "Shoes",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
          },
        ],
      },
    ],
  },
  {
    id: "oldmoney",
    title: "Old Money / Quiet Luxury",
    description:
      "Refined, understated elegance that emphasizes quality over flashy logos.",
    image: "https://images.unsplash.com/photo-1592878897400-43fb1f1cc324",
    longDescription:
      "Old Money style, also known as Quiet Luxury, emphasizes understated elegance, quality materials, and timeless designs. This aesthetic values subtlety, craftsmanship, and longevity over trendy pieces or flashy logos, creating a sophisticated look that never goes out of style.",
    keyElements: [
      "Quality fabrics",
      "Tailored fit",
      "Neutral color palette",
      "Minimal branding",
      "Classic silhouettes",
      "Fine accessories",
    ],
    outfits: [
      {
        id: "oldmoney-1",
        title: "Refined Casual",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
        items: [
          {
            id: "om1-top",
            name: "Fine Cotton Oxford Shirt",
            price: 120,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
          },
          {
            id: "om1-bottom",
            name: "Tailored Chino Trousers",
            price: 150,
            category: "Bottom",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
          },
          {
            id: "om1-shoes",
            name: "Classic Leather Loafers",
            price: 280,
            category: "Shoes",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1614253429340-98120bd6d753",
          },
          {
            id: "om1-accessory",
            name: "Woven Leather Belt",
            price: 95,
            category: "Accessory",
            link: "#",
            image: "https://images.unsplash.com/photo-1553703651-31791d2a6551",
          },
        ],
      },
    ],
  },
  {
    id: "opium",
    title: "Opium (Gothic-Punk)",
    description: "Dark, dramatic aesthetic with Victorian and punk influences.",
    image: "https://images.unsplash.com/photo-1570215171323-4ec328f3f5fa",
    longDescription:
      "Opium style blends gothic romanticism with modern punk elements, creating a dark, dramatic aesthetic. This style features rich textures, Victorian-inspired silhouettes, and a predominantly black palette with occasional deep jewel tones for contrast.",
    keyElements: [
      "Black on black layering",
      "Victorian-inspired details",
      "Leather and lace elements",
      "Silver hardware and chains",
      "Velvet and silk textures",
      "Platform boots",
    ],
    outfits: [
      {
        id: "opium-1",
        title: "Modern Gothic",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
        items: [
          {
            id: "op1-top",
            name: "Black Silk Shirt",
            price: 85,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6",
          },
          {
            id: "op1-jacket",
            name: "Slim-Fit Leather Jacket",
            price: 220,
            category: "Outerwear",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504",
          },
          {
            id: "op1-bottom",
            name: "Skinny Black Jeans",
            price: 75,
            category: "Bottom",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
          },
          {
            id: "op1-shoes",
            name: "Platform Chelsea Boots",
            price: 160,
            category: "Shoes",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16",
          },
        ],
      },
    ],
  },
  {
    id: "starboy",
    title: "Starboy (Retro-Futurism)",
    description:
      "Blend of 80s aesthetics with futuristic elements and bold colors.",
    image: "https://images.unsplash.com/photo-1536243298747-ea8874136d64",
    longDescription:
      "Starboy style combines 80s retro aesthetics with futuristic elements, creating a unique visual language characterized by neon colors, metallic textures, and bold silhouettes. This style blends nostalgic references with forward-thinking design for a distinct look.",
    keyElements: [
      "Neon accents",
      "Metallic and reflective materials",
      "Bomber jackets",
      "Bold patterns",
      "Retro sneakers",
      "Statement accessories",
    ],
    outfits: [
      {
        id: "starboy-1",
        title: "Neon Nostalgia",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
        items: [
          {
            id: "sb1-top",
            name: "Graphic Print T-Shirt",
            price: 35,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
          },
          {
            id: "sb1-jacket",
            name: "Metallic Bomber Jacket",
            price: 125,
            category: "Outerwear",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1525695230005-efd074980869",
          },
          {
            id: "sb1-bottom",
            name: "Slim-Fit Joggers",
            price: 60,
            category: "Bottom",
            link: "#",
            image: "https://images.unsplash.com/photo-1560243563-062bfc001d68",
          },
          {
            id: "sb1-shoes",
            name: "Chunky Retro Sneakers",
            price: 110,
            category: "Shoes",
            link: "#",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
          },
        ],
      },
    ],
  },
  {
    id: "normcore",
    title: "Normcore",
    description:
      "Minimalist style that focuses on simplicity and practicality.",
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8",
    longDescription:
      "Normcore is a unisex fashion style characterized by unpretentious, average-looking clothing. The style is a reaction to fashion elitism and focuses on finding freedom in being rather than constantly seeking uniqueness or making a statement through clothing.",
    keyElements: [
      "Basic t-shirts",
      "Simple jeans",
      "Classic sneakers",
      "Practical outerwear",
      "Minimal branding",
      "Neutral colors",
    ],
    outfits: [
      {
        id: "normcore-1",
        title: "Effortless Essential",
        image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
        items: [
          {
            id: "n1-top",
            name: "Basic Cotton T-Shirt",
            price: 25,
            category: "Top",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
          },
          {
            id: "n1-layer",
            name: "Classic Denim Jacket",
            price: 70,
            category: "Layer",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1588099768523-f4e6a5300f6e",
          },
          {
            id: "n1-bottom",
            name: "Straight-Leg Jeans",
            price: 65,
            category: "Bottom",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
          },
          {
            id: "n1-shoes",
            name: "White Canvas Sneakers",
            price: 55,
            category: "Shoes",
            link: "#",
            image:
              "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
          },
        ],
      },
    ],
  },
];

const StyleExplorer = () => {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [tab, setTab] = useState("browse");
  const isMobile = useIsMobile();

  const handleStyleClick = useCallback((style: Style) => {
    setSelectedStyle(style);
    setTab("details");
  }, []);

  const handleBackClick = useCallback(() => {
    setTab("browse");
  }, []);

  // Add memoization for style cards
  const styleCards = useMemo(() => (
    styles.map((style) => (
      <StyleCard
        key={style.id}
        title={style.title}
        description={style.description}
        image={style.image}
        onClick={() => handleStyleClick(style)}
      />
    ))
  ), [handleStyleClick]);

  // Add memoization for details view
  const detailsContent = useMemo(() => {
    if (!selectedStyle) return null;

    return (
      <div className="space-y-8 animate-fade-in">
        <Button variant="outline" onClick={handleBackClick} className="mb-4">
          ← Back to All Styles
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={optimizedImageUrl(selectedStyle.image, 800, 85)}
              alt={selectedStyle.title}
              className="w-full h-[400px] object-cover rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold">{selectedStyle.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedStyle.longDescription}
            </p>

            <div>
              <h3 className="text-xl font-medium mb-2">Key Elements</h3>
              <ul className="grid grid-cols-2 gap-2">
                {selectedStyle.keyElements.map((element, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-elevate-purple mr-2 rounded-full">
                    </div>
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-2xl font-semibold mb-6">Example Outfits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedStyle.outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </div>
      </div>
    );
  }, [selectedStyle, handleBackClick]);

  // Use effect for back navigation handling
  React.useEffect(() => {
    const handlePopState = () => {
      if (tab === "details") {
        setTab("browse");
        // Prevent default back behavior if we're handling it ourselves
        const browser = getBrowserHistory();
        if (browser) {
          browser.history.pushState(null, "", browser.location.pathname);
        }
      }
    };

    const browser = getBrowserHistory();
    if (
      isMobile && tab === "details" && browser &&
      typeof globalThis.addEventListener === "function"
    ) {
      // Add a history entry when showing details on mobile
      browser.history.pushState(null, "", browser.location.pathname);
      globalThis.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (typeof globalThis.removeEventListener === "function") {
        globalThis.removeEventListener("popstate", handlePopState);
      }
    };
  }, [tab, isMobile]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-amber-800 dark:text-amber-400">Style Explorer</h2>
          {!isMobile && (
            <TabsList>
              <TabsTrigger value="browse">Browse Styles</TabsTrigger>
              <TabsTrigger value="details" disabled={!selectedStyle}>
                Style Details
              </TabsTrigger>
            </TabsList>
          )}
        </div>

        <TabsContent value="browse" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {styleCards}
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          {detailsContent}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StyleExplorer;
