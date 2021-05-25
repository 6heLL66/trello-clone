import { Toast } from 'react-bootstrap'

import { colors } from '../constants/alerts'
import { alertDelay } from '../constants/values'

function Alert({ message, type, clearAlert }) {
  return (
    <Toast
      style={{ background: colors[type] }}
      className="alert"
      onClose={clearAlert}
      show
      delay={alertDelay}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">{type}</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body className="alert-message">{message}</Toast.Body>
    </Toast>
  )
}

export default Alert
