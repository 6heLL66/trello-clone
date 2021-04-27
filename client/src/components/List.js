import { Card, ListGroup, Row } from 'react-bootstrap'
import ListItem from './ListItem'
import { useMemo, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import {
  changeItemProps,
  changeList,
  createNewItem,
  deleteItem,
  setAlert
} from '../redux/actions/actionCreators'
import { useDispatch } from 'react-redux'
import createItemTemplate from '../helpers/createItemTemplate'
import { listChangedAlert } from '../constants/alerts'
import validateName from '../helpers/validateName'
import { Draggable, Droppable } from 'react-beautiful-dnd'

function List({ list, closeClick, items }) {
  const [listName, setListName] = useState('')
  const [taskName, setTaskName] = useState('')

  const childItems = useMemo(() => {
    return items
      .filter((e) => e.parentId === list.id)
      .sort((a, b) => a.index - b.index)
  }, [items, list.id])

  const dispatch = useDispatch()

  const keyInputHandler = (e) => {
    if (e.key === 'Enter') {
      let valid = validateName(e.target.value, [])
      if (valid) {
        return dispatch(setAlert(valid))
      } else if (e.target.name === 'list') {
        dispatch(changeList({ ...list, name: listName, stage: 2 }))
        dispatch(setAlert(listChangedAlert))
      } else if (e.target.name === 'item') {
        dispatch(createNewItem(createItemTemplate(taskName), list.id))
        setTaskName('')
      }
    }
  }

  const closeItem = (id) => {
    dispatch(deleteItem(id))
  }

  const changeItem = (item) => {
    dispatch(changeItemProps(item))
  }

  return (
    <Draggable
      draggableId={`dragList-${list.id}`}
      index={list.index}
      type="LIST"
    >
      {(provided1) => (
        <Card
          className="list-card"
          ref={provided1.innerRef}
          {...provided1.draggableProps}
        >
          <Card.Header className="head py-1" {...provided1.dragHandleProps}>
            {list.stage === 1 ? (
              <Row className="justify-content-between">
                <input
                  type="text"
                  onKeyDown={keyInputHandler}
                  name="list"
                  placeholder="list name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <Icon.X
                  className="list-close"
                  onClick={() => closeClick(list.id)}
                />
              </Row>
            ) : (
              <Row className="list-name justify-content-between px-2">
                {list.name}
                <Icon.X
                  className="list-close"
                  onClick={() => closeClick(list.id)}
                />
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
                disabled={list.stage === 1}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Row>
            <Droppable droppableId={list.id} type="TASK">
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
                          index={e.index}
                          change={changeItem}
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
