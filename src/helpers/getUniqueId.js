export default function getUniqueId(type, size) {
  let codes = []
  do {
    for (let i = 0; i < size; i++) {
      codes[i] = Math.round(Math.random() * (127 - 32) + 32)
    }
  } while (type.find((e) => e.id === String.fromCharCode(...codes)))
  return String.fromCharCode(...codes)
}
