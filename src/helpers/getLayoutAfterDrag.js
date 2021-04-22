function setIndexesSimple(subjects, sourceIndex, destinationIndex, id) {
  return subjects.map((e) => {
    if (e.id === id) return { ...e, index: destinationIndex }
    if (
      sourceIndex < destinationIndex &&
      e.index >= sourceIndex &&
      e.index <= destinationIndex
    )
      return { ...e, index: e.index - 1 }
    if (
      sourceIndex > destinationIndex &&
      e.index <= sourceIndex &&
      e.index >= destinationIndex
    )
      return { ...e, index: e.index + 1 }
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
    if (e.id === dragId)
      return { ...e, parentId: dstDropId, index: destinationIndex }
    if (e.parentId === dstDropId && e.index >= destinationIndex)
      return { ...e, index: e.index + 1 }
    if (e.parentId === srsDropId && e.index >= sourceIndex)
      return { ...e, index: e.index - 1 }
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
