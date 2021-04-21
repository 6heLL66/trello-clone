import { Row } from 'react-bootstrap'
import List from './List'
import ListCreateButton from './ListCreateButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { updateItems, updateLists } from '../redux/actions/actionCreators'

function ListsContainer({ closeClick, createList, board, items, lists }) {
  const dispatch = useDispatch()

  const onDragEnd = (info) => {
    if (info.reason === 'DROP' && info.destination && info.draggableId.split('-')[0] === 'dragList' && info.destination.index !== info.source.index) {
      const { destination, draggableId, source } = info
      dispatch(updateLists(lists.map(e => {
        if (e.id === draggableId.split('-')[1]) return {...e, index: destination.index}
        if (e.index >= source.index && e.index <= destination.index && source.index < destination.index) return {...e, index: e.index - 1}
        if (e.index <= source.index && e.index >= destination.index && source.index > destination.index) return {...e, index: e.index + 1}
        return e
      })))
    } else if (info.reason === 'DROP' && info.destination) {
      const { source, destination, draggableId } = info
      let newItems
      if (source.droppableId === destination.droppableId) {
        newItems = items.map(e => {
          if (e.parentId === source.droppableId && e.id !== draggableId) {
            if (e.index >= source.index && e.index <= destination.index && source.index < destination.index) return {...e, index: e.index - 1}
            if (e.index <= source.index && e.index >= destination.index && source.index > destination.index) return {...e, index: e.index + 1}
          }
          if (e.id === draggableId) return {...e, index: destination.index}
          return e
        })
      } else {
        newItems = items.map(e => {
          if (e.id !== draggableId) {
            if (e.parentId === destination.droppableId && e.index >= destination.index) return {...e, index: e.index + 1}
            if (e.parentId === source.droppableId && e.index >= source.index) return {...e, index: e.index - 1}
          } else {
            return {...e, parentId: destination.droppableId, index: destination.index}
          }
          return e
        })
      }
      dispatch(updateItems(newItems))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='container' direction='horizontal' type='LIST'>
        {
          provided => (
              <Row className='ml-5 mt-5 d-inline-flex flex-nowrap' ref={provided.innerRef}>
                {lists.sort((a, b) => a.index - b.index).map((e, i) => {
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
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
