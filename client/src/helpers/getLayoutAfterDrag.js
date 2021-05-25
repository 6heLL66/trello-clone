function setIndexesSimple(
  subjects,
  sourceIndex,
  destinationIndex,
  draggableId,
  droppableId
) {
  return subjects.map((e) => {
    if (e.id === draggableId) {
      return { ...e, ind: destinationIndex }
    }
    if (
      sourceIndex < destinationIndex &&
      e.parentId === droppableId &&
      e.ind >= sourceIndex &&
      e.ind <= destinationIndex
    ) {
      return { ...e, ind: e.ind - 1 }
    }
    if (
      sourceIndex > destinationIndex &&
      e.parentId === droppableId &&
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
    if (e.id === dragId) {
      return { ...e, parentId: dstDropId, ind: destinationIndex }
    }
    if (e.parentId === dstDropId && e.ind >= destinationIndex) {
      return { ...e, ind: e.ind + 1 }
    }
    if (e.parentId === srsDropId && e.ind >= sourceIndex) {
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
  if (withChangingLocation) {
    if (source.droppableId === destination.droppableId) {
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
