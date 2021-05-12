import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ReactLoading from 'react-loading'

import BoardButton from '../components/BoardButton'
import validateName from '../helpers/validateName'
import BoardCreateButton from '../components/BoardCreateButton'
import { loadingColor, loadingSizes } from '../constants/values'
import { boardPage } from '../constants/routes'
import {
  delete_board,
  fetch_boards,
  put_board,
  putBoard
} from '../redux/boardReducer/actions'
import { setAlert } from '../redux/alertReducer/actions'

function BoardsList() {
  const boards = useSelector((state) => state.boards.boards)
  const userId = useSelector((state) => state.auth.userId)
  const loading = useSelector((state) => state.loading)

  const token = useSelector((state) => state.auth.token)

  const [redirect, setRedirect] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userId !== undefined && !boards) {
      dispatch(fetch_boards(userId))
    }
  }, [userId, dispatch, boards])

  useEffect(() => {
    setIsOpen(false)
  }, [boards])

  const handleCreateClick = (board) => {
    let alert = validateName(board.name, boards)
    if (alert) {
      return dispatch(setAlert(alert))
    }
    dispatch(put_board(board, token))
  }

  const handleBoardClick = (board) => {
    setRedirect(`${boardPage}/${board.id}`)
  }

  const handleCrossClick = (id) => {
    dispatch(delete_board(id, token))
  }

  const handleColorClick = (board) => {
    dispatch(putBoard(board))
    dispatch(put_board({ ...board }, token))
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  return (
    <Container className={'mt-5'}>
      <Row>
        <BoardCreateButton
          onClick={handleCreateClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loading={loading.create[0]}
        />
        {!loading.loadData[0] && boards ? (
          boards.map((e, i) => {
            return (
              <BoardButton
                crossClick={handleCrossClick}
                colorClick={handleColorClick}
                blocked={loading.colors[0]}
                board={e}
                key={i}
                loading={loading.delete[0]}
                onClick={handleBoardClick}
              />
            )
          })
        ) : (
          <Row>
            <ReactLoading
              type="spin"
              className="ml-5 my-auto"
              color={loadingColor}
              height={loadingSizes.big}
              width={loadingSizes.big}
            />
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default BoardsList
