import { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Button, Row } from 'react-bootstrap'
import createBoardTemplate from '../helpers/createBoardTemplate'

function BoardCreateButton({ onClick }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const createBoard = () => {
    onClick(createBoardTemplate(name))
    setOpen(false)
    setName('')
  }

  if (open) {
    return (
      <div className="board-create-form">
        <Row className="w-100 justify-content-between">
          <label htmlFor="board_name">Create Board</label>
          <Icon.X onClick={() => setOpen(false)} />
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
          <Button variant={'success'} onClick={createBoard}>
            Create
          </Button>
        </Row>
      </div>
    )
  } else {
    return (
      <div className="board-button" onClick={() => setOpen(true)}>
        <span className="m-auto">Create New Board</span>
      </div>
    )
  }
}
export default BoardCreateButton
