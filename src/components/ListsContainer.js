import { Container, Row } from 'react-bootstrap'
import List from './List'
import ListCreateButton from './ListCreateButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { changeList, updateItems } from '../redux/actions/actionCreators'
import { useState } from 'react'

function ListsContainer({ closeClick, createList, board, items, lists }) {
  const [dropzone, setDropzone] = useState(1)
  const dispatch = useDispatch()

  console.log(lists)

  const onDragEnd = (info) => {
    if (info.reason === 'DROP' && info.destination && info.draggableId.split('-')[0] === 'dragList') {
      const { source, destination } = info
      let list1 = lists.find(e => e.index === source.index)
      let list2 = lists.find(e => e.index === destination.index)
      dispatch(changeList({...list1, index: destination.index}))
      dispatch(changeList({...list2, index: source.index}))
    } else if (info.reason === 'DROP' && info.destination) {
      const { source, destination, draggableId } = info
      let newItems
      if (source.droppableId === destination.droppableId) {
        newItems = items.map(e => {
          if (e.parentId === source.droppableId && e.id !== draggableId && e.index === destination.index) {
            return {...e, index: source.index}
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

  const onDragStart = (info) => {
    if (info.draggableId.split('-')[0] === 'dragList') setDropzone(2)
    else setDropzone(1)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId='container' direction='horizontal' isDropDisabled={dropzone === 1}>
        {
          provided => (
            <Container className="mt-5" ref={provided.innerRef}>
              <Row>
                {lists.sort((a, b) => a.index - b.index).map((e, i) => {
                  return (
                    <List
                      list={e}
                      key={e.id}
                      index={i}
                      closeClick={closeClick}
                      items={items}
                      dropzone={dropzone}
                    />
                  )
                })}
                {provided.placeholder}
                <ListCreateButton onClick={createList} color={board.color} />
              </Row>
            </Container>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
