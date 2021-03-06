import { BrowserRouter } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRoutes } from '../routes'

import '../styles/App.css'
import logo from '../images/logo.png'
import Alert from '../components/Alert'
import { loadingTypes, logoSize } from '../constants/values'
import { loginPage } from '../constants/routes'
import { unsetAlert } from '../redux/alertReducer/actions'
import { auth } from '../redux/authReducer/actions'

function App() {
  const alert = useSelector((state) => state.alerts.alert)
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()
  const routes = useRoutes(isAuth)

  useEffect(() => {
    const token =
      !!JSON.parse(localStorage.getItem(loadingTypes.auth)) &&
      JSON.parse(localStorage.getItem(loadingTypes.auth)).token

    if (token) {
      dispatch(auth(token))
    }
  }, [dispatch])

  const clearAlert = () => {
    dispatch(unsetAlert())
  }

  const logout = () => {
    localStorage.setItem(loadingTypes.auth, JSON.stringify({}))
    window.location = loginPage
  }

  return (
    <BrowserRouter>
      <Row className={'justify-content-center my-2 w-100 mx-0'}>
        <a href="/">
          <img
            className="logo"
            src={logo}
            alt="My logo"
            width={logoSize.w}
            height={logoSize.h}
          />
        </a>
        {isAuth && (
          <Button className="ml-5" variant="danger" onClick={logout}>
            Logout
          </Button>
        )}
      </Row>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          clearAlert={clearAlert}
        />
      )}
      {routes}
    </BrowserRouter>
  )
}

export default App
