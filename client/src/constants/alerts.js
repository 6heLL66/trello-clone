export const alertTypes = {
  error: 'Error',
  success: 'Success'
}

export const lengthErrorAlert = {
  message: 'Name length must be more than 3 symbols and less then 16 symbols',
  type: alertTypes.error
}

export const uniqueNameAlert = {
  message: 'Board must have a unique name',
  type: alertTypes.error
}

export const boardCreatedAlert = {
  message: 'Board was successfully created',
  type: alertTypes.success
}

export const boardDeletedAlert = {
  message: 'Board was successfully deleted',
  type: alertTypes.success
}

export const customAlert = (message, type) => {
  return {
    message,
    type
  }
}

export const registerSuccess = {
  message: 'You successfully registered',
  type: alertTypes.success
}

export const colors = {
  Error: '#cd6363',
  Success: '#85ca77',
  Warning: '#d2c468'
}
