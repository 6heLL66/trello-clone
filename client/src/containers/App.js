import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import BoardPage from '../pages/BoardPage'
import BoardsPage from '../pages/BoardsPage'
import { Button, Row } from 'react-bootstrap'
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import '../styles/App.css'
import { auth, setAuth, unsetAlert } from '../redux/actions/actionCreators'
import LoginPage from '../pages/LoginPage'
import RegistrationPage from '../pages/RegistrationPage'
import { useEffect } from 'react'

function App() {
  const alert = useSelector((state) => state.alerts.alert)
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth')).token
    if (token) dispatch(auth(token))
  }, [])

  const clearAlert = () => {
    dispatch(unsetAlert())
  }

  const logout = () => {
    dispatch(setAuth({}))
    localStorage.setItem('auth', JSON.stringify({}))
  }

  return (
    <BrowserRouter>
      <Row className={'justify-content-center my-2 w-100 mx-0'}>
        <a href="/">
          <img
            className="logo"
            src={logo}
            alt="My logo"
            width={40}
            height={40}
          />
        </a>
        {isAuth && <Button className='ml-5' variant='danger' onClick={logout}>Logout</Button>}
      </Row>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          clearAlert={clearAlert}
        />
      )}
      <Switch>
        <Route exact path="/board">
          {!isAuth ? <Redirect to="/login" /> : <BoardPage />}
        </Route>
        {
          !isAuth && <Route exact path="/login">
            <LoginPage />
          </Route>
        }
        {
          !isAuth && <Route exact path="/registration">
            <RegistrationPage />
          </Route>
        }
        <Route path="/">
          {!isAuth ? <Redirect to="/login" /> : <BoardsPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
