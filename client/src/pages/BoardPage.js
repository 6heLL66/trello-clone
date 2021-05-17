import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import ReactLoading from 'react-loading'

import '../styles/BoardPage.css'
import List from '../helpers/ListTemplate'
import ListsContainer from '../containers/ListsContainer'
import { colors } from '../constants/colors'
import {
  loadingColor,
  loadingElements,
  loadingSizes,
  loadingTypes
} from '../constants/values'
import { boardsPage } from '../constants/routes'
import { getBoard } from '../redux/boardReducer/actions'
import { deleteList, putLists } from '../redux/listReducer/actions'

function BoardPage() {
  const { id } = useParams()

  const board = useSelector((state) => state.boards.currentBoard)
  const token = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.loading)

  const lists = useSelector((state) => state.lists.lists).filter((e) => {
    return e.parentId === Number(id)
  })

  const items = useSelector((state) => state.items.items)
  const dispatch = useDispatch()

  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    dispatch(getBoard(id))
  }, [dispatch, id])

  const createList = useCallback(() => {
    dispatch(
      putLists(
        [new List(lists.length, board.id)],
        token,
        board.parentId,
        board.id
      )
    )
  }, [dispatch, token, lists, board])

  const closeClick = useCallback(
    (id) => {
      dispatch(deleteList(id, token))
    },
    [dispatch, token]
  )

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  if (board && board.id === Number(id)) {
    return (
      <Container fluid>
        <Row className="board-name ml-5">
          <Icon.ArrowLeft
            className="back"
            onClick={() => {
              setRedirect(boardsPage)
            }}
          />
          <div>
            <strong>Board </strong>
            <span style={{ color: colors[board.color] }}>{board.name}</span>
          </div>
        </Row>
        <ListsContainer
          closeClick={closeClick}
          createList={createList}
          board={board}
          lists={lists}
          items={items}
          token={token}
        />
      </Container>
    )
  }
  if (!loading[loadingTypes.loadData][loadingElements.lists]) {
    return (
      <Row className="justify-content-center w-100">
        <div className="border-error">Board did not found</div>
      </Row>
    )
  }
  return (
    <Row className="justify-content-center">
      <ReactLoading
        type="spin"
        className="my-auto"
        color={loadingColor}
        height={loadingSizes.big}
        width={loadingSizes.big}
      />
    </Row>
  )
}
export default BoardPage
