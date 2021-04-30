import { Card, ListGroup, Row } from 'react-bootstrap'
import ListItem from './ListItem'
import { useMemo, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import {
  delete_item,
  put_items,
  put_lists,
  setAlert
} from '../redux/actions/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import createItemTemplate from '../helpers/createItemTemplate'
import validateName from '../helpers/validateName'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

function List({ list, closeClick, items }) {
  const [listName, setListName] = useState('')
  const [taskName, setTaskName] = useState('')

  const token = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.loading)

  const childItems = useMemo(() => {
    return items
      .filter((e) => e.parentId === list.id)
      .sort((a, b) => a.ind - b.ind)
  }, [items, list.id])

  const dispatch = useDispatch()

  const keyInputHandler = (e) => {
    if (e.key === 'Enter') {
      let valid = validateName(e.target.value, [])
      if (valid) {
        return dispatch(setAlert(valid))
      } else if (e.target.name === 'list') {
        dispatch(
          put_lists(
            [{ ...list, name: listName }],
            token,
            list.ownerId,
            list.parentId
          )
        )
      } else if (e.target.name === 'item') {
        dispatch(
          put_items(
            [createItemTemplate(taskName, childItems.length, list.id)],
            token,
            list.ownerId
          )
        )
        setTaskName('')
      }
    }
  }

  const closeItem = (id) => {
    dispatch(delete_item(id, token))
  }

  const changeItem = (item) => {
    dispatch(put_items([item], token, list.ownerId))
  }

  return (
    <Draggable draggableId={`dragList-${list.id}`} index={list.ind} type="LIST">
      {(provided1) => (
        <Card
          className="list-card"
          ref={provided1.innerRef}
          {...provided1.draggableProps}
        >
          <Card.Header className="head py-1" {...provided1.dragHandleProps}>
            {!list.name ? (
              <Row className="justify-content-between">
                <input
                  type="text"
                  onKeyDown={keyInputHandler}
                  name="list"
                  placeholder="list name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                {loading.delete[1] !== list.id ? (
                  <Icon.X
                    className="list-close"
                    onClick={() => closeClick(list.id)}
                  />
                ) : (
                  <ReactLoading
                    type="spin"
                    color={'rgba(0, 0, 0, 0.4)'}
                    height={20}
                    width={20}
                  />
                )}
              </Row>
            ) : (
              <Row className="list-name justify-content-between px-2">
                {list.name}
                {loading.delete[1] !== list.id ? (
                  <Icon.X
                    className="list-close"
                    onClick={() => closeClick(list.id)}
                  />
                ) : (
                  <ReactLoading
                    type="spin"
                    color={'rgba(0, 0, 0, 0.4)'}
                    height={20}
                    width={20}
                  />
                )}
              </Row>
            )}
          </Card.Header>
          <Card.Body className="pt-0">
            <Row className="justify-content-center task-panel">
              <input
                type="text"
                placeholder="task name"
                onKeyDown={keyInputHandler}
                name="item"
                disabled={!list.name || loading.create[2] === list.id}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              {loading.create[2] === list.id && (
                <ReactLoading
                  type="spin"
                  className="ml-1"
                  color={'rgba(0, 0, 0, 0.4)'}
                  height={25}
                  width={25}
                />
              )}
            </Row>
            <Droppable droppableId={String(list.id)} type="TASK">
              {(provided2) => (
                <ListGroup
                  className="list-group-flush"
                  ref={provided2.innerRef}
                >
                  {childItems.length > 0 ? (
                    childItems.map((e) => {
                      return (
                        <ListItem
                          key={e.id}
                          item={e}
                          closeItem={closeItem}
                          index={e.ind}
                          change={changeItem}
                          loading={loading}
                        />
                      )
                    })
                  ) : (
                    <Row className="justify-content-center empty mt-2">
                      empty
                    </Row>
                  )}
                  {provided2.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}

export default List
