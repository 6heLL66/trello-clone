import { Row } from 'react-bootstrap'
import List from './List'
import ListCreateButton from './ListCreateButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { updateItems, updateLists } from '../redux/actions/actionCreators'
import getLayoutAfterDrag from '../helpers/getLayoutAfterDrag'

function ListsContainer({ closeClick, createList, board, items, lists }) {
  const dispatch = useDispatch()

  const onDragEnd = (info) => {
    const { reason, destination, draggableId, source } = info
    if (reason !== 'DROP' || !destination) return
    if (
      draggableId.split('-')[0] === 'dragList' &&
      destination.index !== source.index
    ) {
      dispatch(
        updateLists(
          getLayoutAfterDrag(
            lists,
            source,
            destination,
            draggableId.split('-')[1],
            false
          )
        )
      )
    } else {
      dispatch(
        updateItems(
          getLayoutAfterDrag(items, source, destination, draggableId, true)
        )
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="container" direction="horizontal" type="LIST">
        {(provided) => (
          <Row
            className="ml-5 mt-5 d-inline-flex flex-nowrap"
            ref={provided.innerRef}
          >
            {lists
              .sort((a, b) => a.index - b.index)
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
            <ListCreateButton onClick={createList} color={board.color} />
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
