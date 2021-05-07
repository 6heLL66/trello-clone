import { Card, ListGroup, Row } from 'react-bootstrap'
import { useMemo, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

import ListItem from './ListItem'
import validateName from '../helpers/validateName'
import {
  dragAndDropTypes,
  listIdPrefix,
  loadingColor,
  loadingSizes,
  sendKey
} from '../constants/values'

function List({
  list,
  closeClick,
  items,
  loading,
  changeItem,
  closeItem,
  putItem,
  putList,
  alert
}) {
  const [listName, setListName] = useState('')
  const [taskName, setTaskName] = useState('')

  const childItems = useMemo(() => {
    return items
      .filter((e) => e.parentId === list.id)
      .sort((a, b) => a.ind - b.ind)
  }, [items, list.id])

  const keyInputHandler = (e) => {
    if (e.key === sendKey) {
      let valid = validateName(e.target.value, [])
      if (valid) {
        return alert(valid)
      } else if (e.target.name === 'list') {
        putList({ ...list, name: listName }, list.parentId, list.ownerId)
      } else if (e.target.name === 'item') {
        putItem(taskName, childItems.length, list.ownerId, list.id)
        setTaskName('')
      }
    }
  }

  return (
    <Draggable
      draggableId={`${listIdPrefix}-${list.id}`}
      index={list.ind}
      type={dragAndDropTypes.list}
    >
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
                    color={loadingColor}
                    height={loadingSizes.small}
                    width={loadingSizes.small}
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
                    color={loadingColor}
                    height={loadingSizes.small}
                    width={loadingSizes.small}
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
                  color={loadingColor}
                  height={loadingSizes.small}
                  width={loadingSizes.small}
                />
              )}
            </Row>
            <Droppable
              droppableId={String(list.id)}
              type={dragAndDropTypes.task}
            >
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
                          change={(item) => changeItem(item, list.ownerId)}
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
