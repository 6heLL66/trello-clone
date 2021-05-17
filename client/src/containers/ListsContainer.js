import { Row } from 'react-bootstrap'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'

import List from '../components/List'
import ListCreateButton from '../components/ListCreateButton'
import getLayoutAfterDrag from '../helpers/getLayoutAfterDrag'
import {
  dragAndDropTypes,
  dragType,
  listIdPrefix,
  loadingElements,
  loadingTypes
} from '../constants/values'
import Item from '../helpers/ItemTemplate'
import { putLists } from '../redux/listReducer/actions'
import { deleteItem, putItems } from '../redux/itemReducer/actions'
import { setAlert } from '../redux/alertReducer/actions'
import { useCallback, useMemo } from 'react'

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

  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.ind - b.ind)
  }, [lists])

  const onDragEnd = useCallback(
    (info) => {
      const { reason, destination, draggableId, source } = info
      if (reason !== dragType || !destination) {
        return
      }
      if (draggableId.split('-')[0] === listIdPrefix) {
        return dispatch(
          putLists(
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
      }
      dispatch(
        putItems(
          getLayoutAfterDrag(items, source, destination, draggableId, true),
          token,
          board.parentId,
          true
        )
      )
    },
    [lists, board, dispatch, items, token]
  )

  const closeItem = useCallback(
    (id) => {
      dispatch(deleteItem(id, token))
    },
    [dispatch, token]
  )

  const changeItem = useCallback(
    (item, ownerId) => {
      dispatch(putItems([item], token, ownerId))
    },
    [dispatch, token]
  )

  const putItem = useCallback(
    (name, index, ownerId, parentId) => {
      dispatch(
        putItems([new Item(name, index, parentId)], token, ownerId)
      )
    },
    [dispatch, token]
  )

  const alert = useCallback(
    (alert) => {
      dispatch(setAlert(alert))
    },
    [dispatch]
  )

  const putList = useCallback(
    (list, parentId, ownerId) => {
      dispatch(putLists([list], token, ownerId, parentId))
    },
    [dispatch, token]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={String(board.id)}
        direction="horizontal"
        type={dragAndDropTypes.list}
      >
        {(provided) => (
          <Row
            className="ml-5 mt-5 d-inline-flex flex-nowrap"
            ref={provided.innerRef}
          >
            {sortedLists.map((e, i) => {
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
              loading={loading[loadingTypes.create][loadingElements.list]}
            />
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListsContainer
