import fsPromises from 'fs/promises'
import { geminiText } from '../../utils/gemini'

export async function GET() {
  const filePath = 'app/api/products/products.json'

  try {
    const data = await fsPromises.readFile(filePath, 'utf-8')
    let generateResult = await geminiText(
      `Your task is to generate concise product descriptions based on the 'name' field in the JSON data provided below. Please follow these guidelines:

      1. Use the 'name' field as inspiration for the description.
      2. Add a new 'description' field to each product object.
      3. Return the entire modified JSON array with the new descriptions included.

      **JSON Data:**
      ${data}

      **Important:** 

      * Ensure the returned response is a strictly valid JSON array.
      * Do not include any additional text or explanations outside of the JSON structure.
      `
    )

    const result = generateResult.replace(/```|json/g, '').trim()
    const products = JSON.parse(result)
    // write the result to a new file in same path as filePath
    await fsPromises.writeFile(filePath, JSON.stringify(products, null, 2))
    return Response.json(products)
  } catch (error) {
    console.error('Error reading products.json:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
