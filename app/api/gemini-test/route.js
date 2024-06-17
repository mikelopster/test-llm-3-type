import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request) {
  try {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // 1. Parse JSON data from the request body
    const { message } = await request.json()
    const result = await model.generateContent(message)
    const response = await result.response
    const text = response.text()

    // 2. Process the data (replace with your actual logic)
    const processedData = {
      message: text,
      receivedAt: new Date().toISOString(),
    }

    // 3. Send a JSON response
    return Response.json(processedData, { status: 201 }) // 201 Created status
  } catch (error) {
    console.log('error', error)
    // 4. Handle errors gracefully
    return Response.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    )
  }
}
