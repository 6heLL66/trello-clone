import { loginPage, registrationPage } from './routes'

export const regProps = {
  header: 'Sign Up',
  buttonText: 'Sign Up',
  link: {
    href: loginPage,
    label: 'Sign In'
  },
  labels: {
    username: {
      type: 'text',
      label: 'Username',
      placeholder: '',
      value: ''
    },
    password: {
      type: 'password',
      label: 'Password',
      placeholder: '',
      value: ''
    },
    rpassword: {
      type: 'password',
      label: 'Repeat Password',
      placeholder: '',
      value: ''
    }
  }
}

export const loginProps = {
  header: 'Sign In',
  buttonText: 'Sign In',
  link: {
    href: registrationPage,
    label: 'Sign Up'
  },
  labels: {
    username: {
      type: 'text',
      label: 'Username',
      placeholder: '',
      value: ''
    },
    password: {
      type: 'password',
      label: 'Password',
      placeholder: '',
      value: ''
    }
  }
}