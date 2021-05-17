function setIndexesSimple(
  subjects,
  sourceIndex,
  destinationIndex,
  draggableId,
  droppableId
) {
  return subjects.map((e) => {
    if (String(e.id) === draggableId) {
      return { ...e, ind: destinationIndex }
    }
    if (
      sourceIndex < destinationIndex &&
      String(e.parentId) === droppableId &&
      e.ind >= sourceIndex &&
      e.ind <= destinationIndex
    ) {
      return { ...e, ind: e.ind - 1 }
    }
    if (
      sourceIndex > destinationIndex &&
      String(e.parentId) === droppableId &&
      e.ind <= sourceIndex &&
      e.ind >= destinationIndex
    ) {
      return { ...e, ind: e.ind + 1 }
    }
    return e
  })
}

function setIndexesHard(
  subjects,
  sourceIndex,
  destinationIndex,
  dragId,
  dstDropId,
  srsDropId
) {
  return subjects.map((e) => {
    if (String(e.id) === dragId) {
      return { ...e, parentId: Number(dstDropId), ind: destinationIndex }
    }
    if (String(e.parentId) === dstDropId && e.ind >= destinationIndex) {
      return { ...e, ind: e.ind + 1 }
    }
    if (String(e.parentId) === srsDropId && e.ind >= sourceIndex) {
      return { ...e, ind: e.ind - 1 }
    }
    return e
  })
}

function getLayoutAfterDrag(...props) {
  const [
    subjects,
    source,
    destination,
    draggableId,
    withChangingLocation
  ] = props
  console.log(props)
  if (withChangingLocation) {
    if (source.droppableId === destination.droppableId) {
      console.log(source)
      return setIndexesSimple(
        subjects,
        source.index,
        destination.index,
        draggableId,
        source.droppableId
      )
    } else {
      return setIndexesHard(
        subjects,
        source.index,
        destination.index,
        draggableId,
        destination.droppableId,
        source.droppableId
      )
    }
  } else {
    return setIndexesSimple(
      subjects,
      source.index,
      destination.index,
      draggableId,
      source.droppableId
    )
  }
}

export default getLayoutAfterDrag
