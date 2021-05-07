import { Row } from 'react-bootstrap'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'

import List from '../components/List'
import ListCreateButton from '../components/ListCreateButton'
import getLayoutAfterDrag from '../helpers/getLayoutAfterDrag'
import {
  delete_item,
  put_items,
  put_lists,
  setAlert
} from '../redux/actions/actionCreators'
import { dragAndDropTypes, dragType, listIdPrefix } from '../constants/values'
import createItemTemplate from '../helpers/createItemTemplate'

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

  const closeItem = (id) => {
    dispatch(delete_item(id, token))
  }

  const changeItem = (item, ownerId) => {
    dispatch(put_items([item], token, ownerId))
  }

  const putItem = (name, index, ownerId, parentId) => {
    dispatch(
      put_items([createItemTemplate(name, index, parentId)], token, ownerId)
    )
  }

  const alert = (alert) => {
    dispatch(setAlert(alert))
  }

  const putList = (list, parentId, ownerId) => {
    dispatch(put_lists([list], token, parentId, ownerId))
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
                    loading={loading}
                    closeItem={closeItem}
                    changeItem={changeItem}
                    putItem={putItem}
                    putList={putList}
                    alert={alert}
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
