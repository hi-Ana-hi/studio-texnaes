import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutter
  max: 5,
  message: { error: 'For mange forsøk. Prøv igjen om 15 minutter.' },
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})


app.post('/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Alle felt må fylles ut.' })
  }

  try {
    await transporter.sendMail({
      from: `"Studio Texnæs" <${process.env.SMTP_USER}>`,
      to: 'hei@studio-texnaes.no',
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      text: `Navn: ${name}\nE-post: ${email}\n\n${message}`,
      html: `
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <br>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    res.status(500).json({ error: 'Kunne ikke sende melding. Prøv igjen senere.' })
  }
})

app.listen(PORT, () => {
  console.log(`Studio Texnæs running at http://localhost:${PORT}`)
})
