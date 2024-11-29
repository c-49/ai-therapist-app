// src/utils/colorUtils.js
import { colors } from 'quasar'

const { getPaletteColor, lighten, setBrand } = colors

export function getContrastColor(color) {
  const hex = getPaletteColor(color)
  const rgb = hexToRgb(hex)
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? 'black' : 'white'
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function setCustomColor(colorName, colorValue) {
  setBrand(colorName, colorValue)
}