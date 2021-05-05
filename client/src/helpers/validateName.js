import { lengthErrorAlert, uniqueNameAlert } from '../constants/alerts'

function validateName(name, boards, min = 4, max = 16) {
  if (name.length < min || name.length > max) {
    return lengthErrorAlert
  }

  let isUnique = true
  boards.forEach((e) => {
    if (e.name === name) {
      isUnique = false
    }
  })

  if (!isUnique) {
    return uniqueNameAlert
  }
}

export default validateName
