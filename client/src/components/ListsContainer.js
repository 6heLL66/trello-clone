import { Row } from 'react-bootstrap'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'

import List from './List'
import ListCreateButton from './ListCreateButton'
import getLayoutAfterDrag from '../helpers/getLayoutAfterDrag'
import { put_items, put_lists } from '../redux/actions/actionCreators'
import { dragAndDropTypes, dragType, listIdPrefix } from '../constants/values'

function ListsContainer({
  closeClick,
  createList,
  board,
  items,
  lists,
  token
}) {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.loading)

  const onDragEnd = (info) => {
    const { reason, destination, draggableId, source } = info
    if (reason !== dragType || !destination) {
      return
    }
    if (draggableId.split('-')[0] === listIdPrefix) {
      dispatch(
        put_lists(
          getLayoutAfterDrag(
            lists,
            source,
            destination,
            draggableId.split('-')[1],
            false
          ),
          token,
          board.parentId,
          board.id,
          true
        )
      )
    } else {
      dispatch(
        put_items(
          getLayoutAfterDrag(items, source, destination, draggableId, true),
          token,
          board.parentId,
          true
        )
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="container"
        direction="horizontal"
        type={dragAndDropTypes.list}
      >
        {(provided) => (
          <Row
            className="ml-5 mt-5 d-inline-flex flex-nowrap"
            ref={provided.innerRef}
          >
            {lists
              .sort((a, b) => a.ind - b.ind)
              .map((e, i) => {
                return (
                  <List
                    list={e}
                    key={e.id}
                    index={i}
                    closeClick={closeClick}
                    items={items}
                  />
                )
              })}
            {provided.placeholder}
            <ListCreateButton
              onClick={createList}
              color={board.color}
              loading={loading}
            />
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
