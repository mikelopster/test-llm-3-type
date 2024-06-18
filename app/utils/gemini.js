import { GoogleGenerativeAI } from '@google/generative-ai'

export async function geminiText(message) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  // 1. Parse JSON data from the request body
  const result = await model.generateContent(message)
  const response = await result.response
  const text = await response.text()

  // Return the generated text
  return text
}
