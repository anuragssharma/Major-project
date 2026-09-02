import express from 'express'
import { GoogleGenAI } from '@google/genai'

const router = express.Router()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

router.post('/verify', async (req, res) => {
  try {
    const { imageBase64, mimeType, expectedDevice } = req.body

    if (!imageBase64) {
      return res.status(400).json({
        error: 'No image data provided'
      })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: imageBase64
          }
        },
        `Analyze this image for an e-waste donation.

Expected device: ${expectedDevice}

Determine:
1. What device is visible.
2. Whether it is a physical electronic device.
3. Whether it is relevant e-waste.
4. Whether the image appears AI-generated or manipulated.
5. Whether the detected device matches the expected device.
6. Image quality.
7. Confidence.

Return ONLY valid JSON in this format:

{
  "verified": true,
  "deviceDetected": "Laptop",
  "deviceMatch": true,
  "isPhysicalDevice": true,
  "isRelevant": true,
  "imageQuality": "Good",
  "confidence": 0.95,
  "aiGeneratedLikelihood": 0.05,
  "reason": "The image clearly shows a physical laptop."
}

Set verified to false if the image does not clearly show the expected physical electronic device.`
      ]
    })

    let result

    try {
      const text = response.text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      result = JSON.parse(text)
    } catch {
      return res.status(500).json({
        error: 'Gemini returned an invalid verification result.'
      })
    }

    res.json({
      verification: result
    })
  } catch (error) {
    console.error('Gemini verification error:', error)

    res.status(500).json({
      error: 'Failed to verify image.'
    })
  }
})

export default router
