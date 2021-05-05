import {
  longPassword,
  longUsername,
  mismatchPassword,
  notFilled,
  shortPassword,
  shortUsername
} from '../constants/validationMessages'

export default function registerValidation(fields) {
  if (Object.values(fields).find((e) => !e.value)) {
    return notFilled
  }
  if (fields.username.value.length < 3) {
    return shortUsername
  }
  if (fields.username.value.length > 16) {
    return longUsername
  }
  if (fields.password.value.length > 16) {
    return longPassword
  }
  if (fields.password.value.length < 6) {
    return shortPassword
  }
  if (fields.password.value !== fields.rpassword.value) {
    return mismatchPassword
  }
  return false
}
