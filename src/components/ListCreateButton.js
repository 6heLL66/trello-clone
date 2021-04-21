function ListCreateButton({ onClick, color }) {
  return (
    <div className={`list-create-button ${color}`} onClick={onClick}>
      add new list
    </div>
  )
}

export default ListCreateButton
