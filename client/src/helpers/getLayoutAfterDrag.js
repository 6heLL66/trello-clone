function setIndexesSimple(subjects, sourceIndex, destinationIndex, id) {
  return subjects.map((e) => {
    if (String(e.id) === id) return { ...e, ind: destinationIndex }
    if (
      sourceIndex < destinationIndex &&
      e.ind >= sourceIndex &&
      e.ind <= destinationIndex
    )
      return { ...e, ind: e.ind - 1 }
    if (
      sourceIndex > destinationIndex &&
      e.ind <= sourceIndex &&
      e.ind >= destinationIndex
    )
      return { ...e, ind: e.ind + 1 }
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
    if (String(e.id) === dragId)
      return { ...e, parentId: Number(dstDropId), ind: destinationIndex }
    if (String(e.parentId) === dstDropId && e.ind >= destinationIndex)
      return { ...e, ind: e.ind + 1 }
    if (String(e.parentId) === srsDropId && e.ind >= sourceIndex)
      return { ...e, ind: e.ind - 1 }
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
        draggableId
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
      draggableId
    )
  }
}

export default getLayoutAfterDrag
