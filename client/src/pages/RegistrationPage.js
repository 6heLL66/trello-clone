import { Container, Row } from 'react-bootstrap'
import CustomForm from '../components/CustomForm'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import registerValidation from '../helpers/registerValidation'
import { loadingElements, loadingTypes, regStatuses } from '../constants/values'
import { regProps } from '../constants/forms'
import { setError } from '../redux/loadingReducer/actions'
import { register } from '../redux/authReducer/actions'
import { loginPage } from '../constants/routes'
import { useCallback } from 'react'

export default function RegistrationPage() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.auth.error)
  const status = useSelector((state) => state.auth.regStatus)

  const handleSubmit = useCallback(
    (e, fields) => {
      e.preventDefault()
      let validation = registerValidation(fields)
      if (!validation) {
        dispatch(register(fields.username.value, fields.password.value))
      } else {
        dispatch(setError(validation))
      }
    },
    [dispatch]
  )

  if (status === regStatuses.success) {
    return <Redirect push to={loginPage} />
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
          loading={loading[loadingTypes.auth][loadingElements.form]}
          error={error}
          link={regProps.link}
        />
      </Row>
    </Container>
  )
}
