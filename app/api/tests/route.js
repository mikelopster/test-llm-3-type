import { PythonShell } from 'python-shell'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function GET() {
  const initialProducts = [{ id: 1, name: 'Product 1' }]
  let newProducts = []

  const pythonProcess = spawn('python3', ['my_script.py'], { cwd: __dirname }) // Replace 'python3' with your Python path if needed

  pythonProcess.stdout.on('data', (data) => {
    try {
      newProducts = JSON.parse(data.toString().trim())
      console.log('newProducts', newProducts)
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  })

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`)
  })

  await new Promise((resolve) => {
    pythonProcess.on('close', resolve) // Wait for the Python process to finish
  })

  const products = [...initialProducts, ...newProducts.new_products]
  return Response.json({ products })
}
