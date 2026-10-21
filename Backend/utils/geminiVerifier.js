/**
 * ============================================================================
 * Utility: geminiVerifier.js
 * Description: Hardware photo authenticity & device type mismatch verification
 *              via Google Gen AI SDK.
 * ============================================================================
 */
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyDeviceImage = async (filePath, mimeType, declaredDeviceType = '') => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_actual_ai_studio_api_key_here') {
    return {
      verified: false,
      isAiOrAltered: true,
      isTypeMismatch: false,
      detectedDevice: 'Unknown',
      verdict: 'Unverified (API Key Missing)',
      confidenceScore: 0,
      explanation: 'System Gemini API key is missing. Image flagged for manual inspection.'
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Read uploaded binary saved by Multer into base64
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');

  const prompt = `You are an electronic hardware intake auditor.
Examine this image of an electronic device:
1. Physical Authenticity: Is this photo authentic and taken of a real physical device in an authentic real-world setting, or does it show clear evidence of being AI-generated, synthetic, a 3D digital render, or digitally altered?
2. Device Identification: Identify what physical electronic device is primarily depicted in this image (e.g. Laptop, Mobile Phone, Desktop Computer, Monitor, Tablet, Keyboard, Mouse, Printer / Scanner, Cables & Accessories, Other Electronic).
3. Type Mismatch Check:
   The user selected: "${declaredDeviceType}".
   
   Rules for mismatch:
   - If user selected "Other Electronic", set "isTypeMismatch": false as long as it is an electronic item, gadget, peripheral, or appliance.
   - If user selected "Cables & Accessories", peripherals like keyboards, mice, cables, chargers, headphones, webcams, and adapters are VALID. Set "isTypeMismatch": false.
   - If user selected "Desktop Computer", computer towers, PC setups, or towers with monitor/keyboard are VALID.
   - Only set "isTypeMismatch": true when there is a major conflict (e.g., user selected "Laptop" but image only shows a standalone keyboard/mouse/cable, or user selected "Mobile Phone" but image shows a printer).

Respond strictly in valid JSON matching this schema:
{
  "isAiOrAltered": boolean,
  "detectedDevice": "string naming the primary device detected",
  "isTypeMismatch": boolean,
  "verdict": "string summarizing status ('Authentic Photo', 'Device Mismatch', or 'AI-Generated / Altered')",
  "confidenceScore": number between 0 and 100,
  "explanation": "brief description of findings"
}`;

  // Candidate models eligible for execution
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

          const isAi = !!parsedResult.isAiOrAltered;
          const isMismatch = !!parsedResult.isTypeMismatch;
          const detected = parsedResult.detectedDevice || 'Unrecognized Device';

          let finalVerdict = 'Authentic Photo';
          if (isAi) {
            finalVerdict = 'AI-Generated / Altered';
          } else if (isMismatch) {
            finalVerdict = `Device Mismatch: Detected ${detected}`;
          }

          return {
            verified: !isAi && !isMismatch,
            isAiOrAltered: isAi,
            isTypeMismatch: isMismatch,
            detectedDevice: detected,
            verdict: parsedResult.verdict || finalVerdict,
            confidenceScore: Number(parsedResult.confidenceScore) || 90,
            explanation:
              parsedResult.explanation ||
              `Verification completed via ${modelName}.`
          };
        }
      } catch (err) {
        const errMsg = err.message || JSON.stringify(err);
        const isUnavailable503 =
          errMsg.includes('503') ||
          errMsg.includes('high demand') ||
          errMsg.includes('UNAVAILABLE');

        console.warn(
          `[Gemini - ${modelName} Attempt ${attempt}]: ${
            isUnavailable503 ? 'Temporary 503 capacity spike' : errMsg
          }`
        );

        if (isUnavailable503 && attempt === 1) {
          await wait(2500);
          continue;
        }
        break; // Advance to next model candidate
      }
    }
  }

  // Graceful fallback when models are under peak load
  return {
    verified: false,
    isAiOrAltered: false,
    isTypeMismatch: false,
    detectedDevice: declaredDeviceType || 'Electronic Device',
    verdict: 'Pending Intake Review',
    confidenceScore: 0,
    explanation:
      'Google AI verification servers are under temporary load. Image queued for NGO intake audit.'
  };
};

module.exports = { verifyDeviceImage };