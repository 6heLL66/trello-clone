import { Redirect, Route, Switch } from 'react-router-dom'
import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/">
          <BoardsPage />
        </Route>
        <Route path="/board/:id">
          <BoardPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Redirect to="/login" />
      </Switch>
    )
  }
}
