import ReactLoading from 'react-loading'

import { loadingColor, loadingSizes } from '../constants/values'

function ListCreateButton({ onClick, color, loading }) {
  return (
    <div className={`list-create-button ${color}`} onClick={onClick}>
      {!loading ? (
        'add new list'
      ) : (
        <ReactLoading
          type="spin"
          className={'m-auto'}
          color={loadingColor}
          height={loadingSizes.medium}
          width={loadingSizes.medium}
        />
      )}
    </div>
  )
}

export default ListCreateButton
