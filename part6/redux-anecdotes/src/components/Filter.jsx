import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filtre <input onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  )
}

export default Filter