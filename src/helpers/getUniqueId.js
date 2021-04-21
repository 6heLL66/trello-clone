export default function getUniqueId(type, size) {
  let codes = [], id
  do {
    for (let i = 0; i < size; i++) {
      codes[i] = Math.round(Math.random() * (127 - 32) + 32)
    }
    id = String.fromCharCode(...codes)
  } while (type.find((e) => e.id === id))
  return id
}
