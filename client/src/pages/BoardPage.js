import '../styles/BoardPage.css'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../constants/colors'
import { useParams } from 'react-router-dom'
import {
  delete_list,
  get_board,
  put_lists
} from '../redux/actions/actionCreators'
import createListTemplate from '../helpers/createListTemplate'
import ListsContainer from '../components/ListsContainer'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'

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

  useEffect(() => {
    dispatch(get_board(id))
  }, [])

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
          token={token}
        />
      </Container>
    )
  } else if (!loading.loadData[1]) {
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
