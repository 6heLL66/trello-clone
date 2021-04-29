import ReactLoading from 'react-loading'

function ListCreateButton({ onClick, color, loading }) {
  return (
    <div className={`list-create-button ${color}`} onClick={onClick}>
      {!loading.create[1] ? (
        'add new list'
      ) : (
        <ReactLoading
          type="spin"
          className={'m-auto'}
          color={'rgba(0, 0, 0, 0.4)'}
          height={40}
          width={40}
        />
      )}
    </div>
  )
}

export default ListCreateButton
