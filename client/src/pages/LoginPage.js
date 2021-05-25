import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CustomForm from '../components/CustomForm'
import { loginProps } from '../constants/forms'
import { login } from '../redux/authReducer/actions'
import { loadingElements, loadingTypes } from '../constants/values'
import { useCallback } from 'react'

export default function LoginPage() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.auth.error)

  const handleSubmit = useCallback(
    (e, fields) => {
      e.preventDefault()
      dispatch(login(fields.username.value, fields.password.value))
    },
    [dispatch]
  )

  return (
    <Container>
      <Row className="justify-content-center">
        <h1>Authentication</h1>
      </Row>
      <Row className="justify-content-center">
        <CustomForm
          header={loginProps.header}
          buttonText={loginProps.buttonText}
          labels={loginProps.labels}
          onClick={handleSubmit}
          loading={loading[loadingTypes.auth][loadingElements.form]}
          error={error}
          link={loginProps.link}
        />
      </Row>
    </Container>
  )
}
