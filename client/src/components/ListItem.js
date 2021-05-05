import { Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Draggable } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

import { loadingColor, loadingSizes } from '../constants/values'

function ListItem({ item, closeItem, change, index, loading }) {
  const handleCheckbox = () => {
    change({ ...item, isDone: item.isDone === 1 ? 0 : 1 })
  }

  return (
    <Draggable index={Number(index)} draggableId={String(item.id)} type="TASK">
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
            <span className={item.isDone && 'line-through'}>{item.name}</span>
          </span>
          {loading.delete[2] !== item.id ? (
            <Icon.X className="list-close" onClick={() => closeItem(item.id)} />
          ) : (
            <ReactLoading
              type="spin"
              color={loadingColor}
              height={loadingSizes.small}
              width={loadingSizes.small}
            />
          )}
        </Row>
      )}
    </Draggable>
  )
}

export default ListItem
