import sharp from 'sharp'
import toIco from 'to-ico'
import { writeFileSync } from 'fs'

const GOLD = '#D6B037'
const BLACK = '#111111'

// ── Profile picture 512×512 ──
const profileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" fill="${BLACK}"/>
  <text
    x="256"
    y="375"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="340"
    font-weight="normal"
    fill="${GOLD}"
    text-anchor="middle"
  >T</text>
</svg>`

const profilePng = await sharp(Buffer.from(profileSvg)).png().toBuffer()
writeFileSync('public/profile.png', profilePng)
console.log('✓ public/profile.png (512×512)')

// ── Favicon ICO (16, 32, 48 px) ──
const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map(size => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="${BLACK}"/>
      <text
        x="${size / 2}"
        y="${Math.round(size * 0.78)}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${Math.round(size * 0.72)}"
        font-weight="normal"
        fill="${GOLD}"
        text-anchor="middle"
      >T</text>
    </svg>`
    return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
  })
)

const icoBuffer = await toIco(icoBuffers)
writeFileSync('public/favicon.ico', icoBuffer)
console.log('✓ public/favicon.ico (16/32/48px)')
