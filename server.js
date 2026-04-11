import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Studio Texnæs running at http://localhost:${PORT}`)
})
