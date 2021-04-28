import { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Button, Row } from 'react-bootstrap'
import createBoardTemplate from '../helpers/createBoardTemplate'
import ReactLoading from 'react-loading'

function BoardCreateButton({ onClick, isOpen, setIsOpen, loading }) {
  const [name, setName] = useState('')

  const createBoard = () => {
    onClick(createBoardTemplate(name))
    setName('')
  }

  if (isOpen) {
    return (
      <div className="board-create-form">
        <Row className="w-100 justify-content-between">
          <label htmlFor="board_name">Create Board</label>
          <Icon.X onClick={() => setIsOpen(false)} />
        </Row>
        <Row>
          <input
            type="text"
            id="board_name"
            placeholder="Best Board"
            value={name}
            onKeyDown={(e) => e.key === 'Enter' && createBoard()}
            onChange={(e) => setName(e.target.value)}
          />
        </Row>
        <Row>
          {!loading ? (
            <Button variant={'success'} onClick={createBoard}>
              Create
            </Button>
          ) : (
            <Row>
              <ReactLoading
                type="spin"
                className="ml-5"
                color={'rgba(0, 0, 0, 0.4)'}
                height={30}
                width={30}
              />
            </Row>
          )}
        </Row>
      </div>
    )
  } else {
    return (
      <div className="board-button" onClick={() => setIsOpen(true)}>
        <span className="m-auto">Create New Board</span>
      </div>
    )
  }
}
export default BoardCreateButton
