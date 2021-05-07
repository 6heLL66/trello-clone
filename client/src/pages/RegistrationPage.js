import { Container, Row } from 'react-bootstrap'
import CustomForm from '../components/Form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { registerSuccess } from '../constants/alerts'
import { register, setAlert, setError } from '../redux/actions/actionCreators'
import registerValidation from '../helpers/registerValidation'
import { regStatuses } from '../constants/values'
import { regProps } from '../constants/forms'

export default function RegistrationPage() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.auth.error)
  const status = useSelector((state) => state.auth.regStatus)

  const handleSubmit = (e, fields) => {
    e.preventDefault()
    let validation = registerValidation(fields)
    if (!validation) {
      dispatch(register(fields.username.value, fields.password.value))
    } else {
      dispatch(setError(validation))
    }
  }
  if (status === regStatuses.success) {
    dispatch(setAlert(registerSuccess))
    return <Redirect to="/login" />
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h1>Registration</h1>
      </Row>
      <Row className="justify-content-center">
        <CustomForm
          header={regProps.header}
          buttonText={regProps.buttonText}
          labels={regProps.labels}
          onClick={handleSubmit}
          loading={loading}
          error={error}
          link={regProps.link}
        />
      </Row>
    </Container>
  )
}
