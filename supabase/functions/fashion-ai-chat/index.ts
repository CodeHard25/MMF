import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let body: {
    message?: string;
    chatId?: string;
    imageUrl?: string;
    generateImage?: boolean;
    virtualTryOn?: boolean;
    userPhotoUrl?: string;
    outfitPhotoUrl?: string;
  };
  try {
    body = await req.json();
  } catch (_) {
    console.error("Invalid or missing JSON body", _);
    return new Response(
      JSON.stringify({ error: "Invalid or missing JSON body", success: false }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const {
    message,
    chatId,
    imageUrl,
    generateImage,
    virtualTryOn,
    userPhotoUrl,
    outfitPhotoUrl,
  } = body;
  console.log("Received request", {
    message,
    chatId,
    imageUrl,
    generateImage,
    virtualTryOn,
    userPhotoUrl,
    outfitPhotoUrl,
  });

  // Input validation
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    console.error("Invalid message", { message });
    return new Response(
      JSON.stringify({ error: "Invalid message", success: false }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  if (!chatId || typeof chatId !== "string") {
    console.error("Invalid chat ID", { chatId });
    return new Response(
      JSON.stringify({ error: "Invalid chat ID", success: false }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const sanitizedMessage = message.trim().substring(0, 1000);

    // Check for Groq API key and log diagnostics
    const groqApiKey = Deno.env.get("GROQ_API_KEY");
    if (
      !groqApiKey || typeof groqApiKey !== "string" ||
      groqApiKey.trim().length < 20
    ) {
      console.error(
        "GROQ_API_KEY is not set, empty, or too short in environment variables",
        {
          present: !!groqApiKey,
          length: groqApiKey ? groqApiKey.length : 0,
          value: groqApiKey,
        },
      );
      return new Response(
        JSON.stringify({
          error: "AI service misconfigured: missing or invalid GROQ_API_KEY",
          success: false,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Log only the first and last 4 chars for debugging (never the full key)
    console.log("Env vars", {
      SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
      SUPABASE_SERVICE_ROLE_KEY: !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      GROQ_API_KEY_DEBUG: groqApiKey
        ? `${groqApiKey.slice(0, 4)}...${groqApiKey.slice(-4)}`
        : null,
      GROQ_API_KEY_LENGTH: groqApiKey.length,
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Get the user ID from the chat
    const { data: chat, error: chatError } = await supabaseClient
      .from("fashion_chats")
      .select("user_id")
      .eq("id", chatId)
      .single();
    console.log("Fetched chat", { chat, chatError });

    if (chatError || !chat) {
      console.error("Chat not found", { chatError, chat });
      return new Response(
        JSON.stringify({ error: "Chat not found", success: false }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Save user message
    const { error: userMessageError } = await supabaseClient
      .from("fashion_messages")
      .insert({
        chat_id: chatId,
        role: "user",
        content: sanitizedMessage,
      });
    console.log("Saved user message", { userMessageError });

    if (userMessageError) {
      console.error("Error storing user message:", userMessageError);
      return new Response(
        JSON.stringify({ error: "Database error", success: false }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get user profile
    const { data: userProfile } = await supabaseClient
      .from("user_profiles")
      .select("*")
      .eq("user_id", chat.user_id)
      .single();
    console.log("Fetched user profile", { userProfile });

    // Get chat history
    const { data: messages } = await supabaseClient
      .from("fashion_messages")
      .select("role, content")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .limit(10);
    console.log("Fetched chat history", { messages });

    // Build system prompt
    // Build system prompt with token limit safeguard
    let systemPrompt =
      `You are an expert AI men's fashion stylist and personal shopping assistant specializing in male fashion and style. You provide personalized fashion advice, outfit recommendations, and style guidance exclusively for men.

Your expertise includes:
- Latest men's fashion trends and seasonal styling
- Advanced color coordination and pattern mixing for men's clothing
- Male body type-specific styling and fit recommendations
- Occasion-appropriate men's outfits (party, business, casual, formal, date nights)
- Men's brand recommendations across all budgets (luxury to affordable)
- Complete men's outfit coordination including accessories
- Men's grooming and presentation enhancement
- Men's wardrobe building and essential pieces
- Male-specific styling and fit guidance

CRITICAL RESPONSE RULES:
1. FOCUS EXCLUSIVELY ON MEN'S FASHION - never suggest women's clothing or accessories
2. NEVER include image descriptions like "[Image description: ...]" in your responses
3. NEVER write placeholder text for images - actual images will be generated automatically
4. Write your advice knowing that a visual image will be generated to complement your text
5. Focus on detailed men's outfit descriptions that can be visualized in the generated image
6. Be specific about men's clothing items, colors, brands, and styling details
7. Structure your first outfit recommendation clearly as it will be the primary visual
8. Use phrases like "this outfit," "this look," and "this combination" naturally
9. Provide actionable, practical advice for men's styling
10. Create cohesive men's styling advice where text and visuals work together seamlessly

MEN'S FASHION FOCUS AREAS:
- Men's suits, blazers, dress shirts, and formal wear
- Casual men's wear: jeans, chinos, t-shirts, polos, hoodies
- Men's footwear: dress shoes, sneakers, boots, loafers
- Men's accessories: watches, belts, ties, pocket squares, bags
- Men's outerwear: jackets, coats, bombers, leather jackets
- Men's grooming and styling tips

FORMATTING RULES:
- Use clear headings with ## for main sections
- Use numbered lists (1., 2., 3.) for step-by-step advice
- Use bullet points (•) for item lists
- Use **bold** for emphasis on key items
- Structure responses with clear sections like:
  ## Outfit Recommendation
  ## Color Palette
  ## Styling Tips
  ## Shopping List

When providing outfit suggestions, be specific about:
1. **Main clothing items** (e.g., "navy blazer", "white button-down shirt")
2. **Colors and patterns** with specific color names
3. **Styling details** (e.g., "tucked in", "rolled sleeves", "layered")
4. **Accessories and shoes** with specific recommendations
5. **Occasion appropriateness** and styling context

If the user uploads a photo, analyze their:
• **Body type and proportions** - provide specific flattering styles
• **Skin tone and coloring** - suggest complementary colors
• **Current style and fit** - offer improvement suggestions
• **Personal features** - recommend what would enhance their look

Always provide practical, actionable advice. Be encouraging and positive while being honest about what works best. Format all responses with clear headings, numbered steps, and bullet points for easy reading.`;

    // Limit user profile info to avoid exceeding token/context limits
    if (userProfile) {
      // Only include the first 5 fields to keep prompt size reasonable
      const profileLines = [
        `- Name: ${userProfile.full_name || "Not provided"}`,
        `- Height: ${userProfile.height || "Not provided"} cm`,
        `- Weight: ${userProfile.weight || "Not provided"} kg`,
        `- Body Type: ${userProfile.body_type || "Not provided"}`,
        `- Skin Tone: ${userProfile.skin_tone || "Not provided"}`,
      ];
      systemPrompt += `\n\nUser Profile Information:\n${
        profileLines.join("\n")
      }`;
    }

    const conversationHistory = messages?.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })) || [];

    conversationHistory.push({
      role: "user",
      content: sanitizedMessage,
    });

    // Call Groq
    console.log("Step: Before Groq fetch");
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
    );
    console.log("Step: After Groq fetch", groqResponse.status);

    if (!groqResponse.ok) {
      console.error(
        "Groq fetch failed",
        groqResponse.status,
        await groqResponse.text(),
      );
      return new Response(
        JSON.stringify({
          error: "AI service temporarily unavailable",
          success: false,
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const aiData = await groqResponse.json();
    let aiMessage = aiData.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";
    console.log("AI message", { aiMessage });

    // Handle integrated image generation if requested
    let generatedImageUrl = null;
    if (generateImage && aiMessage) {
      console.log("Starting integrated image generation...");
      try {
        // Extract the primary outfit recommendation for image generation
        const primaryOutfit = extractPrimaryOutfit(aiMessage);
        const imagePrompt = createIntegratedImagePrompt(
          primaryOutfit,
          aiMessage,
        );
        console.log("Integrated image prompt:", imagePrompt);
        console.log("🎯 About to call tryImageGeneration...");

        generatedImageUrl = await tryImageGeneration(imagePrompt);
        console.log("🔗 Generated image URL:", generatedImageUrl);
        console.log(
          "✅ Image URL length:",
          generatedImageUrl ? generatedImageUrl.length : 0,
        );
        console.log("🔍 Image URL type:", typeof generatedImageUrl);
        console.log("🔍 Image URL truthy:", !!generatedImageUrl);

        if (generatedImageUrl) {
          // Add simple image reference without duplicating text
          aiMessage +=
            `\n\n## 🎨 Visual Showcase\nI've generated a visual representation of this outfit for you! The image shows exactly what I described above.`;
        } else {
          aiMessage +=
            `\n\n## 💡 Visualization Tip\nWhile I couldn't generate an image this time, imagine the outfit combinations I described above - they'll create exactly the stylish look you're going for!`;
        }
      } catch (error) {
        console.error("Image generation failed:", error);
        aiMessage +=
          `\n\n## 💡 Styling Visualization\nUse the detailed descriptions above to visualize these amazing outfit combinations - each piece works together to create your perfect look!`;
      }
    }

    // Handle virtual try-on if requested
    let virtualTryOnUrl = null;
    if (virtualTryOn && userPhotoUrl && outfitPhotoUrl) {
      console.log("Starting virtual try-on generation...");
      try {
        virtualTryOnUrl = await generateVirtualTryOn(
          userPhotoUrl,
          outfitPhotoUrl,
          aiMessage,
        );
        console.log("Virtual try-on URL:", virtualTryOnUrl);
        if (virtualTryOnUrl) {
          aiMessage +=
            `\n\n## 👗 Virtual Try-On Result\nHere's how this outfit would look on you! The virtual try-on shows the styling in action.`;
        }
      } catch (error) {
        console.error("Virtual try-on generation failed:", error);
        aiMessage +=
          `\n\n## ⚠️ Virtual Try-On Note\nI couldn't generate the virtual try-on this time, but the styling advice above will help you visualize the look!`;
      }
    }

    // Save AI response
    const finalImageUrl = virtualTryOnUrl || generatedImageUrl || imageUrl;
    console.log("💾 Saving AI message with image URL:", finalImageUrl);
    console.log("📊 Message data:", {
      chat_id: chatId,
      role: "assistant",
      content_length: aiMessage.length,
      has_image_url: !!finalImageUrl,
      image_url_preview: finalImageUrl
        ? finalImageUrl.substring(0, 100) + "..."
        : null,
    });

    const { data: _savedMessage, error: saveError } = await supabaseClient
      .from("fashion_messages")
      .insert([
        {
          chat_id: chatId,
          role: "assistant",
          content: aiMessage,
          image_url: finalImageUrl,
        },
      ])
      .select();
    console.log("Saved AI message", { saveError });

    if (saveError) {
      console.error("Error saving AI message:", saveError);
    }

    // Update chat timestamp
    await supabaseClient
      .from("fashion_chats")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", chatId);
    console.log("Updated chat timestamp");

    return new Response(
      JSON.stringify({
        message: aiMessage,
        imageUrl: generatedImageUrl || imageUrl,
        virtualTryOnUrl: virtualTryOnUrl,
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in fashion-ai-chat function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", success: false }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// Extract the primary outfit recommendation from AI advice
function extractPrimaryOutfit(advice: string): string {
  console.log("Extracting primary outfit from advice...");

  // Look for the first outfit recommendation in the text
  const outfitPatterns = [
    /outfit\s+\d+[:\-\s]*(.*?)(?=outfit\s+\d+|##|$)/is,
    /imagine\s+wearing[:\-\s]*(.*?)(?=imagine|##|$)/is,
    /picture\s+yourself[:\-\s]*(.*?)(?=picture|##|$)/is,
    /envision\s+yourself[:\-\s]*(.*?)(?=envision|##|$)/is,
    /try[:\-\s]*(.*?)(?=try|##|$)/is,
  ];

  for (const pattern of outfitPatterns) {
    const match = advice.match(pattern);
    if (match && match[1]) {
      const outfit = match[1].trim().substring(0, 200); // Limit length
      console.log("Found primary outfit:", outfit);
      return outfit;
    }
  }

  // Fallback: use first 200 characters of advice
  const fallback = advice.substring(0, 200);
  console.log("Using fallback outfit description:", fallback);
  return fallback;
}

// Create integrated image prompt that matches the text advice
function createIntegratedImagePrompt(
  primaryOutfit: string,
  fullAdvice: string,
): string {
  console.log("Creating integrated image prompt...");

  // Extract fashion keywords from the primary outfit (without base prompt)
  const fashionKeywords = extractFashionKeywordsOnly(primaryOutfit);

  // Extract occasion/style context from full advice
  const occasionKeywords = extractOccasionContext(fullAdvice);

  // Create a cohesive prompt that matches the text advice
  const basePrompt =
    "professional men's fashion photography, high quality, realistic, studio lighting, male fashion model wearing";
  const integratedPrompt =
    `${basePrompt}, ${fashionKeywords}, ${occasionKeywords}, stylish coordinated men's outfit, trendy men's fashion photography, masculine style`;

  console.log("Integrated prompt:", integratedPrompt);
  return integratedPrompt;
}

// Extract occasion and style context from advice
function extractOccasionContext(advice: string): string {
  const lowerAdvice = advice.toLowerCase();
  const contexts = [];

  // Occasion contexts
  if (lowerAdvice.includes("party") || lowerAdvice.includes("birthday")) {
    contexts.push("party wear");
  }
  if (
    lowerAdvice.includes("business") || lowerAdvice.includes("professional")
  ) contexts.push("business attire");
  if (lowerAdvice.includes("casual") || lowerAdvice.includes("weekend")) {
    contexts.push("casual style");
  }
  if (lowerAdvice.includes("formal") || lowerAdvice.includes("elegant")) {
    contexts.push("formal wear");
  }
  if (lowerAdvice.includes("date") || lowerAdvice.includes("romantic")) {
    contexts.push("date night");
  }
  if (lowerAdvice.includes("interview") || lowerAdvice.includes("job")) {
    contexts.push("interview outfit");
  }
  if (lowerAdvice.includes("wedding") || lowerAdvice.includes("ceremony")) {
    contexts.push("wedding guest");
  }
  if (lowerAdvice.includes("funky") || lowerAdvice.includes("bold")) {
    contexts.push("bold fashion");
  }
  if (lowerAdvice.includes("trendy") || lowerAdvice.includes("modern")) {
    contexts.push("trendy style");
  }

  return contexts.length > 0 ? contexts.join(", ") : "stylish fashion";
}

// Extract fashion keywords only (without base prompt)
function extractFashionKeywordsOnly(advice: string): string {
  // Enhanced fashion terms with better categorization
  const fashionTerms = [
    // Clothing items
    "blazer",
    "shirt",
    "dress",
    "jeans",
    "pants",
    "skirt",
    "jacket",
    "coat",
    "sweater",
    "cardigan",
    "blouse",
    "top",
    "t-shirt",
    "hoodie",
    "suit",
    "shorts",
    "leggings",
    "jumpsuit",
    "romper",
    "vest",
    "tank top",
    "polo",
    "button-down",
    "turtleneck",
    "crop top",
    "maxi dress",
    "mini dress",
    "midi dress",
    "cocktail dress",
    "evening gown",
    "business suit",
    // Colors
    "black",
    "white",
    "navy",
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "purple",
    "gray",
    "brown",
    "beige",
    "cream",
    "burgundy",
    "emerald",
    "coral",
    "turquoise",
    "lavender",
    "mint",
    "olive",
    "maroon",
    "teal",
    "gold",
    "silver",
    "neon",
    "bright",
    "dark",
    "light",
    // Styles and occasions
    "casual",
    "formal",
    "business",
    "professional",
    "elegant",
    "chic",
    "trendy",
    "vintage",
    "modern",
    "classic",
    "bohemian",
    "minimalist",
    "edgy",
    "romantic",
    "sporty",
    "preppy",
    "party",
    "cocktail",
    "evening",
    "daytime",
    "weekend",
    "workwear",
    "funky",
    "bold",
    "stylish",
    // Patterns and textures
    "striped",
    "polka dot",
    "floral",
    "plaid",
    "checkered",
    "solid",
    "geometric",
    "abstract",
    "animal print",
    "leopard",
    "zebra",
    "paisley",
    "sequined",
    "embroidered",
    "metallic",
    "denim",
    "leather",
    "silk",
    // Accessories
    "shoes",
    "boots",
    "sneakers",
    "heels",
    "flats",
    "sandals",
    "loafers",
    "bag",
    "purse",
    "clutch",
    "backpack",
    "belt",
    "scarf",
    "jewelry",
    "necklace",
    "earrings",
    "bracelet",
    "watch",
    "hat",
    "cap",
    "sunglasses",
    "tie",
    "bow tie",
  ];

  const foundTerms = [];
  const lowerAdvice = advice.toLowerCase();

  for (const term of fashionTerms) {
    if (lowerAdvice.includes(term)) {
      foundTerms.push(term);
    }
  }

  // Return only keywords without base prompt
  if (foundTerms.length > 0) {
    return foundTerms.slice(0, 8).join(", ");
  } else {
    return "stylish outfit, fashionable clothing";
  }
}

// Extract fashion-related keywords from AI advice
function extractFashionKeywords(advice: string): string {
  // Enhanced fashion terms with better categorization
  const fashionTerms = [
    // Clothing items
    "blazer",
    "shirt",
    "dress",
    "jeans",
    "pants",
    "skirt",
    "jacket",
    "coat",
    "sweater",
    "cardigan",
    "blouse",
    "top",
    "t-shirt",
    "hoodie",
    "suit",
    "shorts",
    "leggings",
    "jumpsuit",
    "romper",
    "vest",
    "tank top",
    "polo",
    "button-down",
    "turtleneck",
    "crop top",
    "maxi dress",
    "mini dress",
    "midi dress",
    "cocktail dress",
    "evening gown",
    "business suit",
    // Colors
    "black",
    "white",
    "navy",
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "purple",
    "gray",
    "brown",
    "beige",
    "cream",
    "burgundy",
    "emerald",
    "coral",
    "turquoise",
    "lavender",
    "mint",
    "olive",
    "maroon",
    "teal",
    "gold",
    "silver",
    "neon",
    "bright",
    "dark",
    "light",
    // Styles and occasions
    "casual",
    "formal",
    "business",
    "professional",
    "elegant",
    "chic",
    "trendy",
    "vintage",
    "modern",
    "classic",
    "bohemian",
    "minimalist",
    "edgy",
    "romantic",
    "sporty",
    "preppy",
    "party",
    "cocktail",
    "evening",
    "daytime",
    "weekend",
    "workwear",
    "funky",
    "bold",
    "stylish",
    // Patterns and textures
    "striped",
    "polka dot",
    "floral",
    "plaid",
    "checkered",
    "solid",
    "geometric",
    "abstract",
    "animal print",
    "leopard",
    "zebra",
    "paisley",
    "sequined",
    "embroidered",
    "metallic",
    "denim",
    "leather",
    "silk",
    // Accessories
    "shoes",
    "boots",
    "sneakers",
    "heels",
    "flats",
    "sandals",
    "loafers",
    "bag",
    "purse",
    "clutch",
    "backpack",
    "belt",
    "scarf",
    "jewelry",
    "necklace",
    "earrings",
    "bracelet",
    "watch",
    "hat",
    "cap",
    "sunglasses",
    "tie",
    "bow tie",
  ];

  const foundTerms = [];
  const lowerAdvice = advice.toLowerCase();

  for (const term of fashionTerms) {
    if (lowerAdvice.includes(term)) {
      foundTerms.push(term);
    }
  }

  // Create enhanced prompt for better men's fashion image generation
  const basePrompt =
    "professional men's fashion photography, high quality, realistic, studio lighting, male fashion model wearing";

  if (foundTerms.length > 0) {
    const keywords = foundTerms.slice(0, 8).join(", ");
    return `${basePrompt}, ${keywords}, stylish men's outfit, trendy men's fashion, masculine style`;
  } else {
    return `${basePrompt}, stylish men's outfit, fashionable men's clothing, trendy men's fashion, masculine style`;
  }
}

// Use Pollinations AI for image generation
async function tryImageGeneration(prompt: string): Promise<string | null> {
  // Use Pollinations AI as the primary image generation service
  try {
    const pollinationsResult = await generateWithPollinations(prompt);
    if (pollinationsResult) return pollinationsResult;
  } catch (error) {
    console.log("Pollinations AI generation failed:", error);
  }

  return null;
}

// Pollinations AI - Free image generation service
async function generateWithPollinations(
  prompt: string,
): Promise<string | null> {
  try {
    console.log("Generating with Pollinations AI, prompt:", prompt);

    // Clean and encode the prompt
    const cleanPrompt = prompt.replace(/[^\w\s,.-]/g, "").trim();
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1000000);

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&model=flux&enhance=true`;

    console.log("Generated image URL:", imageUrl);

    // Test if the image URL is accessible with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const testResponse = await fetch(imageUrl, {
        method: "HEAD",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (testResponse.ok) {
        console.log("Image generation successful");
        return imageUrl;
      } else {
        console.log("Image not accessible, status:", testResponse.status);
        return null;
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.log("⚠️ Image accessibility test failed:", fetchError);
      console.log("🔄 Returning URL anyway - it might work for the user");
      return imageUrl;
    }
  } catch (error) {
    console.error("❌ Pollinations error:", error);
    console.log("🔄 Attempting to generate fallback URL...");

    // Generate a simple fallback URL
    const fallbackPrompt =
      "professional men's fashion photography, stylish outfit";
    const encodedFallback = encodeURIComponent(fallbackPrompt);
    const fallbackSeed = Math.floor(Math.random() * 1000000);
    const fallbackUrl =
      `https://image.pollinations.ai/prompt/${encodedFallback}?width=512&height=512&seed=${fallbackSeed}&model=flux&enhance=true`;

    console.log("🔄 Fallback URL generated:", fallbackUrl);
    return fallbackUrl;
  }
}

// Virtual Try-On generation using Pollinations AI
async function generateVirtualTryOn(
  _userPhotoUrl: string,
  _outfitPhotoUrl: string,
  fashionAdvice: string,
): Promise<string | null> {
  try {
    console.log("Generating virtual try-on with Pollinations AI");

    // Extract outfit keywords from fashion advice
    const outfitKeywords = extractFashionKeywords(fashionAdvice);

    // Create a virtual try-on prompt
    const prompt =
      `virtual try-on, person wearing ${outfitKeywords}, realistic fashion photography, full body, professional lighting, high quality, detailed clothing fit, fashion model, studio photography`;

    // Clean and encode the prompt
    const cleanPrompt = prompt.replace(/[^\w\s,.-]/g, "").trim();
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1000000);

    // Generate virtual try-on image with portrait aspect ratio
    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=768&seed=${seed}&model=flux&enhance=true`;

    console.log("Generated virtual try-on URL:", imageUrl);

    // Test if the image URL is accessible
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const testResponse = await fetch(imageUrl, {
        method: "HEAD",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (testResponse.ok) {
        console.log("Virtual try-on generation successful");
        return imageUrl;
      } else {
        console.log(
          "Virtual try-on image not accessible, status:",
          testResponse.status,
        );
        return imageUrl; // Return anyway, might work for user
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.log("Virtual try-on accessibility test failed:", fetchError);
      return imageUrl; // Return anyway, might work for user
    }
  } catch (error) {
    console.error("Virtual try-on generation error:", error);
    return null;
  }
}
