module.exports = function getUniqueId(type, size) {
  let codes = []
  do {
    for (let i = 0; i < size; i++) {
      codes[i] = Math.round(Math.random() * 9)
    }
  } while (type.find((e) => e.id === Number(codes.join(''))))
  return Number(codes.join(''))
}
