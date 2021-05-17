import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ReactLoading from 'react-loading'

import BoardButton from '../components/BoardButton'
import validateName from '../helpers/validateName'
import BoardCreateButton from '../components/BoardCreateButton'
import {
  loadingColor,
  loadingElements,
  loadingSizes,
  loadingTypes
} from '../constants/values'
import { boardPage } from '../constants/routes'
import {
  deleteBoard,
  fetchBoards,
  putBoard,
  putBoardLocal,
  setCurrentBoard
} from '../redux/boardReducer/actions'
import { setAlert } from '../redux/alertReducer/actions'

function BoardsList() {
  const boards = useSelector((state) => state.boards.boards)
  const currentBoard = useSelector((state) => state.boards.currentBoard)
  const userId = useSelector((state) => state.auth.userId)
  const loading = useSelector((state) => state.loading)

  const token = useSelector((state) => state.auth.token)

  const [redirect, setRedirect] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (userId !== undefined && !boards) {
      dispatch(fetchBoards(userId))
    }
  }, [userId, dispatch, boards])

  useEffect(() => {
    setIsOpen(false)
  }, [boards])

  const handleCreateClick = useCallback(
    (board) => {
      let alert = validateName(board.name, boards)
      if (alert) {
        return dispatch(setAlert(alert))
      }
      dispatch(putBoard(board, token))
    },
    [boards, token, dispatch]
  )

  const handleBoardClick = useCallback(
    (board) => {
      setRedirect(`${boardPage}/${board.id}`)
    },
    [setRedirect]
  )

  const handleCrossClick = useCallback(
    (id) => {
      dispatch(deleteBoard(id, token))
    },
    [token, dispatch]
  )

  const handleColorClick = useCallback(
    (board) => {
      dispatch(putBoardLocal(board))
      dispatch(putBoard({ ...board }, token))
      if (currentBoard && currentBoard.id === board.id) {
        dispatch(setCurrentBoard(board))
      }
    },
    [dispatch, currentBoard, token]
  )

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
          loading={loading[loadingTypes.create][loadingElements.board]}
        />
        {!loading[loadingTypes.loadData][loadingElements.boards] && boards ? (
          boards.map((e, i) => {
            return (
              <BoardButton
                crossClick={handleCrossClick}
                colorClick={handleColorClick}
                blocked={loading[loadingTypes.colors][loadingElements.board]}
                loading={loading[loadingTypes.delete][loadingElements.board]}
                board={e}
                key={i}
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
