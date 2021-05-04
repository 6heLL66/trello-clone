import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import ReactLoading from 'react-loading'

import '../styles/BoardPage.css'
import {
  delete_list,
  get_board,
  put_lists
} from '../redux/actions/actionCreators'
import createListTemplate from '../helpers/createListTemplate'
import ListsContainer from '../components/ListsContainer'
import { colors } from '../constants/colors'


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
    if (!board || board.id !== Number(id)) dispatch(get_board(id))
  }, [dispatch, id, board])

  const createList = () => {
    dispatch(
      put_lists(
        [createListTemplate(lists.length, board.id)],
        token,
        board.parentId,
        board.id
      )
    )
  }

  const closeClick = (id) => {
    dispatch(delete_list(id, token))
  }

  if (redirect) return <Redirect push to="/" />

  if (board && board.id === Number(id)) {
    return (
      <Container fluid>
        <Row className="board-name ml-5">
          <Icon.ArrowLeft
            className="back"
            onClick={() => {
              setRedirect('/')
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
  } else if (!loading.loadData[1]) {
    return (
      <Row className="justify-content-center w-100">
        <div className="border-error">Board did not found</div>
      </Row>
    )
  } else {
    return (
      <Row className="justify-content-center">
        <ReactLoading
          type="spin"
          className="my-auto"
          color={'rgba(0, 0, 0, 0.5)'}
          height={100}
          width={100}
        />
      </Row>
    )
  }
}
export default BoardPage
