export const lengthErrorAlert = {
  message: 'Name length must be more than 3 symbols and less then 16 symbols',
  type: 'Error'
}

export const uniqueNameAlert = {
  message: 'Board must have a unique name',
  type: 'Error'
}

export const boardCreatedAlert = {
  message: 'Board was successfully created',
  type: 'Success'
}

export const boardDeletedAlert = {
  message: 'Board was successfully deleted',
  type: 'Success'
}

export const customAlert = (message, type) => {
  return {
    message,
    type
  }
}

export const registerSuccess = {
  message: 'You successfully registered',
  type: 'Success'
}

export const colors = {
  Error: '#cd6363',
  Success: '#85ca77',
  Warning: '#d2c468'
}
