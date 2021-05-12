import { Redirect, Route, Switch } from 'react-router-dom'

import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import {
  boardPage,
  boardsPage,
  loginPage,
  registrationPage
} from './constants/routes'

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path={boardsPage}>
          <BoardsPage />
        </Route>
        <Route path={`${boardPage}/:id`}>
          <BoardPage />
        </Route>
        <Redirect to={boardsPage} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path={loginPage}>
          <LoginPage />
        </Route>
        <Route path={registrationPage}>
          <RegistrationPage />
        </Route>
        <Redirect to={loginPage} />
      </Switch>
    )
  }
}
