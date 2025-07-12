import React, { useMemo } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { optimizedImageUrl } from "../lib/utils.ts";

interface TransformationItem {
  title: string;
  before: string;
  after: string;
  beforePoints: string[];
  afterPoints: string[];
}

const transformationData: TransformationItem[] = [
  {
    title: "Style Transformation",
    before:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop",
    beforePoints: [
      "Generic, unflattering clothing",
      "No coherent style direction",
      "Poor fit and proportions",
      "Limited understanding of personal colors",
      "Low style confidence",
    ],
    afterPoints: [
      "Refined personal aesthetic",
      "Well-fitting, flattering pieces",
      "Strategic use of colors that complement skin tone",
      "Coherent wardrobe that mixes and matches effortlessly",
      "Increased style confidence and presence",
    ],
  },
  {
    title: "Grooming Transformation",
    before:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1780&auto=format&fit=crop",
    beforePoints: [
      "Basic or non-existent skincare routine",
      "Unmanaged facial hair",
      "Neglected haircare and styling",
      "Common skin issues like acne or dryness",
      "Unflattering hairstyle for face shape",
    ],
    afterPoints: [
      "Targeted skincare regimen for specific needs",
      "Clear, healthy complexion",
      "Well-maintained facial hair (or smooth shave)",
      "Styled hair that enhances features",
      "Understanding of products that work for individual needs",
    ],
  },
  {
    title: "Confidence Transformation",
    before:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1770&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    beforePoints: [
      "Closed-off body language",
      "Difficulty making eye contact",
      "Limited social comfort and conversation skills",
      "Unsure presence in professional settings",
      "Hesitant decision-making in personal style",
    ],
    afterPoints: [
      "Confident, open body language",
      "Improved communication skills",
      "Comfortable in social and professional settings",
      "Authentic self-expression",
      "Decision-making based on personal style and preferences",
    ],
  },
];

const BeforeAfter = () => {
  // Memoize transformation data to prevent unnecessary recalculations
  const memoizedTransformations = useMemo(
    () =>
      transformationData.map((item, index) => {
        const beforeImg = optimizedImageUrl(item.before, 800, 80);
        const afterImg = optimizedImageUrl(item.after, 800, 80);

        return (
          <div
            key={index}
            className={`mb-20 ${
              index % 2 === 1
                ? "flex flex-col md:flex-row-reverse"
                : "flex flex-col md:flex-row"
            }`}
          >
            <h2 className="text-3xl font-semibold mb-10 text-center w-full md:hidden">
              {item.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6">
                <div className="hidden md:block mb-6">
                  <h2 className="text-3xl font-semibold mb-2">{item.title}</h2>
                </div>

                <Card className="overflow-hidden border-2 border-amber-500 dark:border-yellow-400">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-elevate-vibrant-red text-yellow-200 font-bold px-4 py-1">
                      BEFORE
                    </div>
                    <img
                      src={beforeImg}
                      alt="Before transformation"
                      className="w-full h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <CardContent className="p-6 border-amber-600 bg-warm-beige-gradient dark:bg-gray-800">
                    <ul className="space-y-2">
                      {item.beforePoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-5 h-5 bg-elevate-vibrant-red text-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                            ✕
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="overflow-hidden border-2 border-amber-300 dark:border-yellow-200">
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-elevate-vibrant-green text-yellow-200 font-bold px-4 py-1">
                      AFTER
                    </div>
                    <img
                      src={afterImg}
                      alt="After transformation"
                      className="w-full h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <CardContent className="p-6 border-amber-600 bg-warm-beige-gradient dark:border-yellow-400">
                    <ul className="space-y-2">
                      {item.afterPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-5 h-5 bg-elevate-vibrant-green text-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                            ✓
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      }),
    [],
  );

  // Memoize testimonials for performance
  const testimonials = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 glass-card">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-elevate-vibrant-orange rounded-full flex items-center justify-center text-white text-2xl mb-4">
              M
            </div>
            <p className="italic text-gray-600 dark:text-gray-300 mb-4">
              "Men's Mastery Framework taught me to command respect through
              style. I went from invisible to influential. My confidence and
              presence have completely transformed."
            </p>
            <p className="font-medium">- Michael, 32</p>
            <p className="text-sm text-elevate-vibrant-orange">
              Style Mastery
            </p>
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-elevate-vibrant-blue rounded-full flex items-center justify-center text-white text-2xl mb-4">
              J
            </div>
            <p className="italic text-gray-600 dark:text-gray-300 mb-4">
              "The grooming mastery system gave me the foundation for masculine
              excellence. My skin, hair, and overall presence now reflect the
              powerful man I've become."
            </p>
            <p className="font-medium">- James, 28</p>
            <p className="text-sm text-elevate-vibrant-blue">
              Grooming Mastery
            </p>
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-elevate-vibrant-green rounded-full flex items-center justify-center text-white text-2xl mb-4">
              D
            </div>
            <p className="italic text-gray-600 dark:text-gray-300 mb-4">
              "Men's Mastery Framework didn't just change my appearance—it
              forged my character. I now lead with authority, speak with
              conviction, and command the room wherever I go."
            </p>
            <p className="font-medium">- David, 35</p>
            <p className="text-sm text-elevate-vibrant-green">
              Leadership Mastery
            </p>
          </div>
        </Card>
      </div>
    ),
    [],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-elevate-purple/80 to-elevate-vibrant-blue/80">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-amber-800 dark:text-amber-400">
              Transform Your Look & Life
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-200">
              See the remarkable before and after transformations achieved
              through Men's Mastery Framework's personalized style guidance,
              grooming advice, and confidence coaching.
            </p>
          </div>
        </section>

        {/* Transformations */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {memoizedTransformations}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-elevate-purple/10 dark:bg-elevate-navy/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-semibold mb-12">Success Stories</h2>
            {testimonials}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Export as memoized component to prevent unnecessary re-renders
export default React.memo(BeforeAfter);
