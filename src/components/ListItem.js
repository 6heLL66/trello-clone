import { Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Draggable } from 'react-beautiful-dnd'

function ListItem({ item, closeItem, change, index }) {
  const handleCheckbox = (e) => {
    change({ ...item, isDone: !item.isDone })
  }

  return (
    <Draggable index={index} draggableId={item.id} type="TASK">
      {(provided) => (
        <Row
          className={`list-item p-2 my-2 justify-content-between ${
            item.isDone ? 'done' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>
            <input
              type="checkbox"
              checked={item.isDone}
              className="my-auto mr-3"
              onChange={handleCheckbox}
            />
            <span className={item.isDone ? 'line-through' : ''}>
              {item.name}
            </span>
          </span>
          <Icon.X className="list-close" onClick={() => closeItem(item.id)} />
        </Row>
      )}
    </Draggable>
  )
}

export default ListItem
