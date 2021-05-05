import { Button, Form, Row } from 'react-bootstrap'
import { useCallback, useMemo, useState } from 'react'
import ReactLoading from 'react-loading'
import { Redirect } from 'react-router-dom'
import { loadingColor } from '../constants/values'

export default function CustomForm({
  header,
  labels,
  buttonText,
  error,
  loading,
  onClick,
  link
}) {
  const [fields, setFields] = useState({ ...labels })
  const [redirect, setRedirect] = useState('')

  const handleInputs = useCallback(
    (e, key) => {
      setFields({ ...fields, [key]: { ...fields[key], value: e.target.value } })
    },
    [fields, setFields]
  )

  const items = useMemo(() => {
    let items = []
    for (let key in fields) {
      let e = fields[key]
      items.push(
        <Form.Group key={key}>
          <Form.Label>{e.label}</Form.Label>
          <Form.Control
            type={e.type}
            placeholder={e.placeholder}
            name={key}
            value={e.value}
            onChange={(evt) => handleInputs(evt, key)}
          />
          {e.muted && <Form.Text className="text-muted">{e.muted}</Form.Text>}
        </Form.Group>
      )
    }
    return items
  }, [fields, handleInputs])

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  return (
    <Form className={'form mt-3'}>
      <Row className="justify-content-center mb-1">
        <h3>{header}</h3>
      </Row>
      {items}
      {error && <Row className="error mb-3">{error}</Row>}
      {loading.auth[0] ? (
        <ReactLoading type="spin" color={loadingColor} height={30} width={30} />
      ) : (
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => onClick(e, fields)}
        >
          {buttonText}
        </Button>
      )}
      <Row>
        <button
          className={'mt-3'}
          onClick={(e) => {
            e.preventDefault()
            setRedirect(link.href)
          }}
        >
          {link.label}
        </button>
      </Row>
    </Form>
  )
}
