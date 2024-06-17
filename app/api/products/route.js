import fsPromises from 'fs/promises'

export async function GET() {
  const filePath = 'app/api/products/products.json' // Simplified path

  try {
    const data = await fsPromises.readFile(filePath, 'utf-8')
    const products = JSON.parse(data)

    return Response.json(products) // Streamlined JSON response
  } catch (error) {
    console.error('Error reading products.json:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
