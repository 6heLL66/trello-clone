import { Container, Row } from 'react-bootstrap'
import BoardCreateButton from '../components/BoardCreateButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeBoardProps,
  createBoard,
  deleteBoard,
  setAlert,
  setCurrentBoard
} from '../redux/actions/actionCreators'
import BoardButton from '../components/BoardButton'
import { boardCreatedAlert, boardPropsChangedAlert } from '../constants/alerts'
import validateName from '../helpers/validateName'

function BoardsList() {
  const boards = useSelector((state) => state.boards.boards)
  const dispatch = useDispatch()

  console.log(boards)

  const handleCreateClick = (board) => {
    let alert = validateName(board.name, boards)
    if (alert) return dispatch(setAlert(alert))

    dispatch(setAlert(boardCreatedAlert))
    dispatch(createBoard(board))
  }

  const handleBoardClick = (board) => {
    dispatch(setCurrentBoard(board))

    window.location.href = '/board'
  }

  const handleCrossClick = (id) => {
    dispatch(deleteBoard(id))
  }

  const handleColorClick = (board) => {
    dispatch(setAlert(boardPropsChangedAlert))
    dispatch(changeBoardProps(board))
  }

  return (
    <Container className={'mt-5'}>
      <Row>
        <BoardCreateButton onClick={handleCreateClick} />
        {boards.map((e, i) => {
          return (
            <BoardButton
              crossClick={handleCrossClick}
              colorClick={handleColorClick}
              board={e}
              key={i}
              onClick={handleBoardClick}
            />
          )
        })}
      </Row>
    </Container>
  )
}

export default BoardsList
