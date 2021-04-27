export default function registerValidation(fields) {
  if (Object.values(fields).find((e) => !e.value))
    return 'Not all fields are filled in.'
  if (fields.username.value.length < 3) return 'Username is too short.'
  if (fields.username.value.length > 16) return 'Username is too long.'
  if (fields.password.value.length > 16) return 'Password is too long.'
  if (fields.password.value.length < 6) return 'Password is too short.'
  if (fields.password.value !== fields.rpassword.value)
    return 'Password mismatch.'
  return false
}
