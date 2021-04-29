export default function createItemTemplate(name, ind, id) {
  return {
    name,
    ind,
    parentId: id,
    isDone: 0
  }
}
