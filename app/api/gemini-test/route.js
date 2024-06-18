import { geminiText } from '../../utils/gemini'
export async function POST(request) {
  try {
    // 1. Parse JSON data from the request body
    const { message } = await request.json()
    const text = await geminiText(message)

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
