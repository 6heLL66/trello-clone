import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BoardPage from '../pages/BoardPage'
import BoardsPage from '../pages/BoardsPage'
import { Row } from 'react-bootstrap'
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import '../styles/App.css'
import { unsetAlert } from '../redux/actions/actionCreators'

function App() {
  const alert = useSelector((state) => state.alerts.alert)
  const dispatch = useDispatch()

  const clearAlert = () => {
    dispatch(unsetAlert())
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
          <BoardPage />
        </Route>
        <Route>
          <BoardsPage exact path="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
