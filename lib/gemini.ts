
import { GoogleGenAI } from "@google/genai";

/**
 * Basic chat function using standard Gemini models.
 * Used by the AiChatAssistant component.
 */
export const chatWithGemini = async (message: string, fastMode: boolean = false) => {
  // Create a new instance right before making the API call to ensure it always uses the most up-to-date API key.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn('API key is not configured. AI assistant will return mock responses.');
    return "I'm currently offline. Please contact Tushar directly for inquiries.";
  }
  const ai = new GoogleGenAI({ apiKey });
  // Using recommended model aliases: 'gemini-1.5-flash' for fast tasks, 'gemini-1.5-pro' for complex ones.
  const model = fastMode ? 'gemini-1.5-flash' : 'gemini-1.5-pro';
  
  const response = await ai.models.generateContent({
    model,
    contents: message,
    config: {
        systemInstruction: `You are Singh AI Assistant, representing Tushar Singh, a freelance Data Scientist & Full-Stack Developer. Your responses must be accurate, specific, and based only on information from Tushar's portfolio. If asked about projects, mention specific project names from his portfolio. If asked about skills, reference specific technologies he specializes in. Be professional, concise, and helpful. Do not fabricate information. If you don't know specific details, say so and suggest contacting Tushar directly. His contact information is available on the Contact page.`
    }
  });
  
  // Access the .text property directly as per guidelines.
  return response.text;
};

/**
 * Advanced reasoning function using Gemini 3 Pro with thinking budget.
 * Used by the AiLab component.
 */
export const thinkDeeply = async (prompt: string) => {
  // Create a new instance right before making the API call to ensure it always uses the most up-to-date API key.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn('API key is not configured. Advanced AI features unavailable.');
    return "Advanced AI features are currently unavailable due to missing API key.";
  }
  const ai = new GoogleGenAI({ apiKey });
  
  // Complex Text Tasks (e.g., advanced reasoning, coding): 'gemini-1.5-pro'
  const response = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: prompt,
    config: {
      // Thinking Config is only available for the Gemini 2.5 series models.
      // Max thinking budget for gemini-1.5-pro is 32768.
      thinkingConfig: { thinkingBudget: 32768 } 
    },
  });
  
  // Use .text property directly.
  return response.text;
};

/**
 * High-quality image generation using Gemini 3 Pro Image.
 * Used by the AiLab component.
 */
export const generateImage = async (prompt: string, aspectRatio: string = '1:1') => {
  // Create a new instance right before making the API call to ensure it always uses the most up-to-date API key.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn('API key is not configured. Image generation unavailable.');
    throw new Error("Image generation is currently unavailable due to missing API key.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  // High-Quality Image Generation Tasks: 'gemini-1.5-pro'
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        // Supported values are "1:1", "3:4", "4:3", "9:16", and "16:9".
        aspectRatio: aspectRatio as any,
        // Supported values are "1K", "2K", and "4K".
        imageSize: "1K"
      },
    },
  });

  // The output response may contain both image and text parts; iterate through all parts to find the image part.
  const candidates = response.candidates;
  if (candidates && candidates.length > 0 && candidates[0].content) {
    for (const part of candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${base64EncodeString}`;
      }
    }
  }
  
  throw new Error("No image was returned by the model.");
};
