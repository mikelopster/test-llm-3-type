import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function GET(request) {
  const initialProducts = [{ id: 1, name: 'Product 1' }]

  // 1. Get Data from API Request
  const apiData = request.nextUrl.searchParams.get('apiData') // Assuming data is passed as a query parameter

  if (!apiData) {
    return Response.json(
      { error: 'Missing apiData parameter' },
      { status: 400 }
    )
  }

  let newProducts = []

  const pythonProcess = spawn('python3', ['my_script.py', apiData], {
    cwd: __dirname,
  })

  pythonProcess.stdout.on('data', (data) => {
    try {
      const convertProducts = JSON.parse(data.toString().trim())
      newProducts = convertProducts.new_products
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  })

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`)
  })

  await new Promise((resolve) => {
    pythonProcess.on('close', resolve)
  })

  const products = [...initialProducts, ...newProducts]
  return Response.json({ products })
}
