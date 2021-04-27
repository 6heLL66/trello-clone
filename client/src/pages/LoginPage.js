import { Container, Row } from 'react-bootstrap'
import CustomForm from '../components/Form'
import { login } from '../redux/actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux'

const formProps = {
  header: 'Sign In',
  buttonText: 'Sign In',
  link: {
    href: '/registration',
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

export default function LoginPage() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

  const handleSubmit = (e, fields) => {
    e.preventDefault()
    dispatch(login(fields.username.value, fields.password.value))
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h1>Authentication</h1>
      </Row>
      <Row className="justify-content-center">
        <CustomForm
          header={formProps.header}
          buttonText={formProps.buttonText}
          labels={formProps.labels}
          onClick={handleSubmit}
          loading={loading}
          error={error}
          link={formProps.link}
        />
      </Row>
    </Container>
  )
}
