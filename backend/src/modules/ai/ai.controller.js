import OpenAI from "openai";

let openai = null;

const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
        return null;
    }
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
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
