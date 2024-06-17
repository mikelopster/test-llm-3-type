import fs from 'fs'
import path from 'path'

const uploadDirectory = path.join(process.cwd(), 'uploads')

export async function POST(request) {
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true }) // Ensure directory creation
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file) {
    return new Response('No file uploaded', { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = path.join(uploadDirectory, file.name)

  try {
    await fs.promises.writeFile(filePath, buffer)
    return new Response('File uploaded successfully', { status: 200 })
  } catch (error) {
    console.error('Error writing file:', error)
    return new Response('Error uploading file', { status: 500 })
  }
}
