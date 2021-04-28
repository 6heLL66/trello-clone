import '../styles/BoardPage.css'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../constants/colors'
import { useParams } from 'react-router-dom'
import {
  createNewList,
  deleteList,
  get_board,
  setAlert
} from '../redux/actions/actionCreators'
import createListTemplate from '../helpers/createListTemplate'
import { listCreatedAlert, listDeletedAlert } from '../constants/alerts'
import ListsContainer from '../components/ListsContainer'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'

function BoardPage() {
  const { id } = useParams()
  const board = useSelector((state) => state.boards.currentBoard)
  const loading = useSelector((state) => state.boards.loading)
  const lists = useSelector((state) => state.lists.lists).filter((e) => {
    return e.parentId === id
  })
  const items = useSelector((state) => state.items.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_board(id))
  }, [])

  const createList = () => {
    dispatch(createNewList(createListTemplate(), board.id))
    dispatch(setAlert(listCreatedAlert))
  }

  const closeClick = (id) => {
    dispatch(deleteList(id))
    dispatch(setAlert(listDeletedAlert))
  }

  if (board) {
    return (
      <Container fluid>
        <Row className="w-50 ml-5">
          <div className="border-name" style={{ color: colors[board.color] }}>
            <strong>Board</strong> {board.name}
          </div>
        </Row>
        <ListsContainer
          closeClick={closeClick}
          createList={createList}
          board={board}
          lists={lists}
          items={items}
        />
      </Container>
    )
  } else if (!loading) {
    return (
      <Row className="justify-content-center w-100">
        <div className="border-error">Border did not chosen</div>
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
