import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function GET(request) {
  // 1. Get Data from API Request
  const text = request.nextUrl.searchParams.get('text') // Assuming data is passed as a query parameter

  if (!text) {
    return Response.json(
      { error: 'Missing apiData parameter' },
      { status: 400 }
    )
  }

  let newProducts = []

  const pythonProcess = spawn('python3', ['search.py', text], {
    cwd: __dirname,
  })

  pythonProcess.stdout.on('data', (data) => {
    try {
      const result = data.toString().replace(/```|json/g, '').trim()
      console.log('result', result)
      newProducts = JSON.parse(result)
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
  return Response.json(newProducts)
}
