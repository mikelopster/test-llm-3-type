import fsPromises from 'fs/promises'
import { geminiText } from '../../utils/gemini'
import {
  getGenerateDescriptionPrompt,
  getGenerateLanguagePrompt,
} from '../../utils/prompt-generator'

export async function GET(request) {
  const filePath = 'app/api/products/products.json'

  try {
    const data = await fsPromises.readFile(filePath, 'utf-8')
    let products = JSON.parse(data)

    // if don't have description = generate description
    if (products.length > 0 && !products[0].description) {
      let generateResult = await geminiText(getGenerateDescriptionPrompt(data))
      const result = generateResult.replace(/```|json/g, '').trim()
      products = JSON.parse(result)
      // Write the updated data back to the file
      await fsPromises.writeFile(filePath, JSON.stringify(products, null, 2))
    }

    const language = request.nextUrl.searchParams.get('language')

    if (language) {
      const generateResult = await geminiText(
        getGenerateLanguagePrompt(language, data)
      )
      const result = generateResult.replace(/```|json/g, '').trim()
      products = JSON.parse(result)
    }

    return Response.json(products)
  } catch (error) {
    console.error('Error: ', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
