const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyDeviceImage = async (filePath, mimeType) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_actual_ai_studio_api_key_here') {
    return {
      verified: false,
      isAiOrAltered: true,
      verdict: 'Unverified (API Key Missing)',
      confidenceScore: 0,
      explanation: 'System Gemini API key is missing. Image flagged for manual admin inspection.'
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Read the uploaded file saved by Multer into base64
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');

  const prompt = `You are an electronic hardware intake auditor.
Examine this image of an electronic device:
1. Is this photo authentic and taken of a real physical device in an authentic real-world setting?
2. Or does it show clear evidence of being AI-generated (e.g. Midjourney/DALL-E artifacts, warped ports, unnatural text/textures) or digitally altered/stock art?

Respond strictly in valid JSON matching this schema:
{
  "isAiOrAltered": boolean,
  "verdict": "Authentic Photo" or "AI-Generated / Altered",
  "confidenceScore": number,
  "explanation": "brief description of findings"
}`;

  // Use only models eligible for the free tier (no Pro models)
  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
    'gemini-3.5-flash'
  ];

  for (const modelName of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: base64Data
              }
            },
            { text: prompt }
          ],
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response && response.text) {
          const parsedResult = JSON.parse(response.text);
          return {
            verified: true,
            isAiOrAltered: !!parsedResult.isAiOrAltered,
            verdict: parsedResult.verdict || (parsedResult.isAiOrAltered ? 'AI-Generated / Altered' : 'Authentic Photo'),
            confidenceScore: Number(parsedResult.confidenceScore) || 90,
            explanation: parsedResult.explanation || `Visual verification completed via ${modelName}.`
          };
        }
      } catch (err) {
        const errMsg = err.message || JSON.stringify(err);
        const isUnavailable503 = errMsg.includes('503') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE');

        console.warn(`[Gemini - ${modelName} - Attempt ${attempt}]: ${isUnavailable503 ? 'Temporary 503 capacity spike' : errMsg}`);

        if (isUnavailable503 && attempt === 1) {
          await wait(2500); // Wait 2.5s before retrying
          continue;
        }
        break; // Move to the next free candidate model
      }
    }
  }

  // Fallback if all free tier models are temporarily under peak global load
  return {
    verified: false,
    isAiOrAltered: false,
    verdict: 'Pending Intake Review',
    confidenceScore: 0,
    explanation: 'Google AI verification servers are under temporary load. Image queued for NGO intake audit.'
  };
};

module.exports = { verifyDeviceImage };