import { Row } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { Draggable } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

import {
  doneStates,
  dragAndDropTypes,
  loadingColor,
  loadingElements,
  loadingSizes,
  loadingTypes
} from '../constants/values'
import { useCallback } from 'react'

function ListItem({ item, closeItem, change, index, loading }) {
  const handleCheckbox = useCallback(() => {
    change({
      ...item,
      isDone:
        item.isDone === doneStates.true ? doneStates.false : doneStates.true
    })
  }, [item, change])

  return (
    <Draggable
      index={Number(index)}
      draggableId={String(item.id)}
      type={dragAndDropTypes.task}
    >
      {(provided) => (
        <Row
          className={`list-item p-2 my-2 justify-content-between ${
            item.isDone && 'done'
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
          {loading[loadingTypes.delete][loadingElements.item] !== item.id ? (
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
