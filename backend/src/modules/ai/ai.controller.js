import OpenAI from "openai";
import Product from "../products/product.model.js";

let openai = null;

const getOpenAIClient = (keyType = "DEFAULT") => {
    const defaultKey = process.env.OPENAI_API_KEY;
    const chatbotKey = process.env.CHATBOT_API_KEY;

    const apiKey = (keyType === "CHATBOT" && chatbotKey) ? chatbotKey : defaultKey;

    if (!apiKey) {
        return null;
    }

    return new OpenAI({
        apiKey: apiKey,
    });
};

const getFallbackRecommendation = (goal) => {
    const fallbacks = {
        "Weight Loss": {
            title: "Weight Loss specialized Mix",
            description: "A high-fiber, low-calorie blend designed to keep you full longer and support metabolic health.",
            blend: [
                { grain: "Oats", percentage: 40 },
                { grain: "Sharbati Wheat", percentage: 30 },
                { grain: "Ragi", percentage: 20 },
                { grain: "Soybean", percentage: 10 }
            ],
            benefits: ["High fiber for satiety", "Low Glycemic Index", "Rich in complex carbs"]
        },
        "Muscle Gain": {
            title: "Protein-Rich Muscle Mix",
            description: "Packed with plant-based protein and essential minerals to support muscle repair and growth.",
            blend: [
                { grain: "Sharbati Wheat", percentage: 50 },
                { grain: "Soybean", percentage: 25 },
                { grain: "Oats", percentage: 15 },
                { grain: "Bajra", percentage: 10 }
            ],
            benefits: ["High protein content", "Sustained energy release", "Rich in Magnesium"]
        },
        "Diabetes Management": {
            title: "Gluten-Aware Diabetic Mix",
            description: "A low-GI blend focusing on slow-digesting grains to help maintain stable blood sugar levels.",
            blend: [
                { grain: "Jowar", percentage: 30 },
                { grain: "Bajra", percentage: 30 },
                { grain: "Ragi", percentage: 20 },
                { grain: "Oats", percentage: 20 }
            ],
            benefits: ["Zero spikes in blood sugar", "Gluten-free grains focus", "Rich in antioxidants"]
        }
    };

    return fallbacks[goal] || fallbacks["Weight Loss"];
};

export const recommendFlourMix = async (req, res) => {
    try {
        const { age, weight, goal, activityLevel } = req.body;

        const client = getOpenAIClient();

        if (!client) {
            return res.status(503).json({
                success: false,
                message: "AI recommendation service is currently unavailable. Please contact admin.",
            });
        }

        const prompt = `
      You are a professional nutritionist specializing in traditional Indian grains (Atta/Flour). 
      Based on the following user details, suggest a personalized healthy flour mix (blend).
      
      User Details:
      - Age: ${age}
      - Weight: ${weight} kg
      - Health Goal: ${goal}
      - Activity Level: ${activityLevel}

      Grains available: Sharbati Wheat, Oats, Ragi, Jowar, Bajra, Soybean.

      Please respond ONLY in the following JSON format:
      {
        "recommendation": {
          "title": "Short title for the mix",
          "description": "2-3 sentences explaining why this mix is good for them",
          "blend": [
            { "grain": "Grain Name", "percentage": 70 },
            { "grain": "Grain Name", "percentage": 20 },
            ...
          ],
          "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"]
        }
      }
      Ensure the total percentage sums to 100%.
    `;

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(response.choices[0].message.content);

        res.json({
            success: true,
            data: result.recommendation,
        });
    } catch (error) {
        console.error("AI Error:", error.message);

        // 💡 Smart Fallback: If OpenAI fails (quota, network, etc.), use rule-based logic
        const { goal } = req.body;
        const fallbackData = getFallbackRecommendation(goal);

        res.json({
            success: true,
            data: {
                ...fallbackData,
                isFallback: true,
                message: "Note: Using expert-curated recommendation."
            },
        });
    }
};

export const chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body;

        // Fetch products for context
        const products = await Product.find({}, "name category description variants");
        const productContext = products.map(p => {
            const prices = p.variants.map(v => `${v.label}: ₹${v.price}`).join(", ");
            return `- ${p.name} (${p.category}): ${p.description}. Prices: ${prices}`;
        }).join("\n");

        const client = getOpenAIClient("CHATBOT");

        if (!client) {
            return res.json({
                success: true,
                data: {
                    reply: "Hello! I'm the Healthy Chakki support bot. My AI brain is currently sleeping, but I can tell you that we deliver fresh flour within 2-4 days! How can I help you?",
                    isFallback: true
                }
            });
        }

        const systemPrompt = `
      You are the Customer Support AI for "Healthy Chakki", an online shop for fresh, healthy flour (Atta).
      
      Our Products:
      ${productContext}

      General Info:
      - Delivery: Takes 2-4 business days.
      - Quality: We grind flour only after receiving the order to ensure maximum freshness.
      - Returns: We offer a 7-day replacement if the seal is not broken.

      Guidelines:
      - Be polite, helpful, and concise.
      - If you don't know the answer, ask them to contact support@healthychakki.com.
    `;

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                ...(history || []).slice(-5).map(h => ({ role: h.role, content: h.content })),
                { role: "user", content: message }
            ],
            max_tokens: 250
        });

        res.json({
            success: true,
            data: {
                reply: response.choices[0].message.content
            }
        });
    } catch (error) {
        console.error("Chat AI Error:", error.message);

        // 💡 Smart Support Fallback: Answer common questions if AI fails
        const userMsg = (req.body.message || "").toLowerCase();
        let fallbackReply = "I'm having a little trouble connecting to my AI brain. But I can tell you that all our flours are ground fresh to order! For specific health advice, please contact support@healthychakki.com.";

        if (userMsg.includes("weight") || userMsg.includes("fat loss") || userMsg.includes("diet")) {
            fallbackReply = "For weight loss, our 'Weight Loss specialized Mix' (Oats, Ragi, Wheat blend) is highly recommended due to its high fiber content. You can find it in our Products section!";
        } else if (userMsg.includes("gym") || userMsg.includes("protein") || userMsg.includes("muscle")) {
            fallbackReply = "For muscle gain, our 'Protein-Rich Muscle Mix' with Soya and Sharbati Wheat is the best choice for high plant-based protein.";
        } else if (userMsg.includes("delivery") || userMsg.includes("time") || userMsg.includes("arrive")) {
            fallbackReply = "We deliver fresh flour within 2-4 business days across Greater Noida and nearby areas.";
        } else if (userMsg.includes("diabetes") || userMsg.includes("sugar")) {
            fallbackReply = "Our 'Gluten-Aware Diabetic Mix' (Jowar, Bajra, Ragi) is specially designed to have a low Glycemic Index for sugar management level.";
        } else if (userMsg.includes("price") || userMsg.includes("cost") || userMsg.includes("how much")) {
            const priceList = products.slice(0, 3).map(p => `${p.name}: ₹${p.variants[0]?.price || "N/A"}`).join(", ");
            fallbackReply = `Our prices vary by product. For example: ${priceList}. You can check the full price list in our Products page!`;
        }

        res.json({
            success: true,
            data: {
                reply: fallbackReply,
                isFallback: true,
                message: "Using pre-verified support database."
            }
        });
    }
};
